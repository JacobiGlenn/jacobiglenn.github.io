import { useEffect, useState } from 'react'

const HEX = ['0x07', '0xC5', '0xF2', '0x40', '0x1A', '0x3E']
const TICKS = ['LINK', 'HOLD', 'SYNC', 'VOTE', 'LOCK', 'IDLE']

const P = {
  B: [180, 40],
  M: [52, 92],
  R: [308, 92],
  J: [180, 136],
  nBM: [110, 62],
  nBR: [250, 62],
  nMJ: [110, 120],
  nRJ: [250, 120],
  nL: [92, 92],
  nR: [268, 92],
} as const

type Node = keyof typeof P

const CORES: { id: Node; label: string; shape: 'dia' | 'tri' | 'sq' | 'cir'; fill?: boolean }[] = [
  { id: 'B', label: 'BALTHASAR', shape: 'tri' },
  { id: 'M', label: 'MOLLY', shape: 'dia', fill: true },
  { id: 'R', label: 'RIVER', shape: 'sq' },
  { id: 'J', label: 'JIANG', shape: 'cir' },
]

const SUBS: Node[] = ['nBM', 'nBR', 'nMJ', 'nRJ', 'nL', 'nR']

const BACKBONE: Node[][] = [
  ['B', 'nBM', 'M'],
  ['B', 'nBR', 'R'],
  ['M', 'nMJ', 'J'],
  ['R', 'nRJ', 'J'],
  ['M', 'nL', 'nBM'],
  ['R', 'nR', 'nBR'],
  ['M', 'nL', 'nMJ'],
  ['R', 'nR', 'nRJ'],
]

const SILK: Node[][] = [
  ['nBM', 'nRJ'],
  ['nBR', 'nMJ'],
]

const PACKETS: { nodes: Node[]; dur: string; delay: string }[] = [
  { nodes: ['B', 'nBM', 'M', 'nMJ', 'J', 'nRJ', 'R', 'nBR', 'B'], dur: '6.8s', delay: '0s' },
  { nodes: ['M', 'nL', 'nBM', 'nBR', 'nR', 'R'], dur: '5s', delay: '0.8s' },
  { nodes: ['B', 'nBM', 'nRJ', 'J'], dur: '4.4s', delay: '1.6s' },
]

function pathOf(nodes: Node[]) {
  return nodes.map((id, i) => `${i ? 'L' : 'M'}${P[id][0]} ${P[id][1]}`).join(' ')
}

function MagiShape({ shape, fill }: { shape: 'dia' | 'tri' | 'sq' | 'cir'; fill?: boolean }) {
  const cls = fill ? 'boot-head-node is-fill' : 'boot-head-node'
  if (shape === 'dia') return <polygon className={cls} points="0,-13 13,0 0,13 -13,0" />
  if (shape === 'tri') return <polygon className={cls} points="0,-12 -11,10 11,10" />
  if (shape === 'sq') return <rect className={cls} x="-10" y="-10" width="20" height="20" />
  return <circle className={cls} r="11" />
}

export function BootLoopCard() {
  return (
    <div className="boot-card" aria-hidden>
      <span className="boot-card-rule" />
      <div className="boot-card-field">
        <i className="boot-card-mark boot-card-dia" />
        <i className="boot-card-mark boot-card-tri" />
        <i className="boot-card-mark boot-card-sq" />
        <i className="boot-card-mark boot-card-cir" />
      </div>
      <span className="boot-card-rule" />
    </div>
  )
}

export function BootLoopHeader() {
  const [hex, setHex] = useState(0)
  const [tick, setTick] = useState(0)
  const [live, setLive] = useState(true)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setLive(false)
      return
    }
    let id: number | undefined
    const start = () => {
      if (id) window.clearInterval(id)
      id = window.setInterval(() => {
        setHex((n) => (n + 1) % HEX.length)
        setTick((n) => (n + 1) % TICKS.length)
      }, 1400)
    }
    const onVis = () => {
      if (document.hidden) {
        if (id) window.clearInterval(id)
        id = undefined
        setLive(false)
      } else {
        setLive(true)
        start()
      }
    }
    if (!document.hidden) start()
    document.addEventListener('visibilitychange', onVis)
    return () => {
      document.removeEventListener('visibilitychange', onVis)
      if (id) window.clearInterval(id)
    }
  }, [])

  return (
    <div className="boot-head" aria-hidden>
      <span className="boot-head-br br-tl" />
      <span className="boot-head-br br-tr" />
      <span className="boot-head-br br-bl" />
      <span className="boot-head-br br-br" />
      <div className="boot-head-top">
        <span>MAGI-07</span>
        <span className="boot-head-dot" />
        <span>BLOG CHANNEL</span>
        <span className="boot-head-dot" />
        <span>{TICKS[tick]}</span>
      </div>
      <span className="boot-head-rule" />
      <div className="boot-head-body">
        <div className="boot-head-col">
          <p>{HEX[hex]}</p>
          <p>BAL.OK</p>
          <p>MOL.OK</p>
          <p>RIV.OK</p>
          <p>JIA.OK</p>
        </div>
        <svg className="boot-head-magi" viewBox="0 0 360 186" role="presentation">
          {BACKBONE.map((nodes, i) => (
            <path key={`b${i}`} className="boot-head-web" d={pathOf(nodes)} style={{ animationDelay: `${i * 0.35}s` }} />
          ))}
          {SILK.map((nodes, i) => (
            <path key={`s${i}`} className="boot-head-silk" d={pathOf(nodes)} style={{ animationDelay: `${i * 0.22}s` }} />
          ))}
          {SUBS.map((id, i) => (
            <circle
              key={id}
              className="boot-head-sub"
              cx={P[id][0]}
              cy={P[id][1]}
              r={id.startsWith('in') || id.startsWith('mid') ? 2.1 : 1.7}
              style={{ animationDelay: `${(i % 7) * 0.4}s` }}
            />
          ))}
          {live &&
            PACKETS.map((pkt, i) => (
              <circle key={`p${i}`} className="boot-head-pkt" r={i % 2 ? 1.8 : 2.2}>
                <animateMotion dur={pkt.dur} begin={pkt.delay} repeatCount="indefinite" path={pathOf(pkt.nodes)} />
              </circle>
            ))}
          {CORES.map((c) => (
            <g key={c.label} transform={`translate(${P[c.id][0]} ${P[c.id][1]})`}>
              <MagiShape shape={c.shape} fill={c.fill} />
              <text className="boot-head-core-lab" y={c.shape === 'tri' ? 22 : 24}>
                {c.label}
              </text>
            </g>
          ))}
          <text className="boot-head-site" x="180" y="182">
            NV · USA
          </text>
        </svg>
        <div className="boot-head-col boot-head-col-r">
          <p>◆ △ □ ○</p>
          <p>VOTE 3/4</p>
          <p>LINK</p>
          <p>{HEX[(hex + 2) % HEX.length]}</p>
          <p>HOLD</p>
        </div>
      </div>
      <span className="boot-head-rule" />
    </div>
  )
}
