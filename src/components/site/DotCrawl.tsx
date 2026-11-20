import { useEffect, useRef } from 'react'

type V = { x: number; y: number }

// Each leg owns a wedge around the body. Angles are radians from forward.
// Gaps are wide enough that a step along the leg's own ray never crosses the next leg.
const LEGS = [
  { ang: -0.58, reach: 96, group: 0 },
  { ang: 0.58, reach: 96, group: 1 },
  { ang: -1.22, reach: 124, group: 1 },
  { ang: 1.22, reach: 124, group: 0 },
  { ang: -1.92, reach: 116, group: 0 },
  { ang: 1.92, reach: 116, group: 1 },
  { ang: -2.58, reach: 100, group: 1 },
  { ang: 2.58, reach: 100, group: 0 },
]

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n))
}

function norm(v: V): V {
  const l = Math.hypot(v.x, v.y) || 1
  return { x: v.x / l, y: v.y / l }
}

function angDiff(a: number, b: number) {
  let d = b - a
  while (d > Math.PI) d -= Math.PI * 2
  while (d < -Math.PI) d += Math.PI * 2
  return d
}

function makePath(w: number, h: number): V[] {
  const pad = 260
  const sideIn = Math.random()
  const start: V =
    sideIn < 0.5
      ? { x: w * (0.2 + Math.random() * 0.6), y: h + pad }
      : sideIn < 0.75
        ? { x: -pad, y: h * (0.7 + Math.random() * 0.18) }
        : { x: w + pad, y: h * (0.7 + Math.random() * 0.18) }
  let x = clamp(start.x, w * 0.2, w * 0.8)
  let y = h * (0.66 + Math.random() * 0.06)
  const pts: V[] = [start, { x, y }]
  const topY = h * (0.16 + Math.random() * 0.1)
  const bends = 3
  for (let i = 1; i <= bends; i++) {
    y = y + (topY - y) / (bends - i + 1)
    x = clamp(x + (Math.random() - 0.5) * w * 0.14, w * 0.16, w * 0.84)
    pts.push({ x, y })
  }
  const sideOut = Math.random()
  const end: V =
    sideOut < 0.5
      ? { x: clamp(x + (Math.random() - 0.5) * w * 0.1, w * 0.18, w * 0.82), y: -pad }
      : sideOut < 0.75
        ? { x: -pad, y: h * (0.06 + Math.random() * 0.14) }
        : { x: w + pad, y: h * (0.06 + Math.random() * 0.14) }
  pts.push(end)
  return pts
}

function pathAt(pts: V[], dist: number) {
  let left = dist
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1]
    const b = pts[i]
    const len = Math.hypot(b.x - a.x, b.y - a.y)
    if (left <= len || i === pts.length - 1) {
      const u = len ? clamp(left / len, 0, 1) : 1
      return {
        pos: { x: a.x + (b.x - a.x) * u, y: a.y + (b.y - a.y) * u },
        dir: norm({ x: b.x - a.x, y: b.y - a.y }),
      }
    }
    left -= len
  }
  const a = pts[pts.length - 2]
  const b = pts[pts.length - 1]
  return { pos: b, dir: norm({ x: b.x - a.x, y: b.y - a.y }) }
}

function pathLen(pts: V[]) {
  let n = 0
  for (let i = 1; i < pts.length; i++) n += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y)
  return n
}

export function requestCrawl() {
  window.dispatchEvent(new Event('dot-crawl'))
}

export function DotCrawl() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const running = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let raf = 0
    let waitTimer = 0
    let coolTimer = 0
    const waitMs = 3 * 60 * 1000
    const coolMs = 3 * 60 * 1000

    const arm = () => {
      window.clearTimeout(waitTimer)
      waitTimer = window.setTimeout(() => {
        if (running.current) arm()
        else crawl()
      }, waitMs)
    }

    const crawl = () => {
      if (running.current) return
      window.clearTimeout(waitTimer)
      window.clearTimeout(coolTimer)
      running.current = true
      const pts = makePath(window.innerWidth, window.innerHeight)
      const total = pathLen(pts)
      const holds = [
        { at: 0.28 + Math.random() * 0.06, len: 0.08 },
        { at: 0.6 + Math.random() * 0.08, len: 0.09 },
      ]
      const steps = 64
      const cumul = [0]
      const speedAt = (t: number) => {
        let s = 1
        for (const hold of holds) {
          const x = (t - hold.at) / (hold.len / 2 + 0.02)
          if (x > -1 && x < 1) s *= 1 - 0.98 * (0.5 + 0.5 * Math.cos(x * Math.PI))
        }
        return s
      }
      for (let i = 0; i < steps; i++) cumul.push(cumul[i] + speedAt((i + 0.5) / steps))
      const distAt = (t: number) => {
        const x = clamp(t, 0, 1) * steps
        const i = Math.min(steps - 1, Math.floor(x))
        const c = cumul[i] + (cumul[i + 1] - cumul[i]) * (x - i)
        return (c / cumul[steps]) * total
      }
      const ms = 20000
      const started = performance.now()
      const first = pathAt(pts, 1)
      let heading = Math.atan2(first.dir.x, -first.dir.y)
      const feet = LEGS.map(() => ({
        planted: { x: 0, y: 0 },
        from: { x: 0, y: 0 },
        to: { x: 0, y: 0 },
        at: { x: 0, y: 0 },
        swing: false,
        ready: false,
      }))
      let travel = 0
      let gait = 0
      let last = started

      const frame = (now: number) => {
        const dpr = window.devicePixelRatio || 1
        const w = window.innerWidth
        const h = window.innerHeight
        if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
          canvas.width = Math.floor(w * dpr)
          canvas.height = Math.floor(h * dpr)
        }
        canvas.style.width = `${w}px`
        canvas.style.height = `${h}px`
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.clearRect(0, 0, w, h)

        const t = clamp((now - started) / ms, 0, 1)
        const want = distAt(t)
        const dt = Math.min(0.05, (now - last) / 1000)
        last = now
        const look = pathAt(pts, Math.min(total - 1, travel + 90))
        const aim = Math.atan2(look.dir.x, -look.dir.y)
        const err = angDiff(heading, aim)
        heading += clamp(err, -0.45 * dt, 0.45 * dt)
        const left = Math.abs(angDiff(heading, aim))
        let step = 0
        if (left < 0.35) {
          const speed = (total / (ms / 1000)) * 1.35
          step = clamp(want - travel, 0, speed * dt)
          travel += step
        }
        gait += step > 0 ? step : left > 0.2 ? 48 * dt : 0
        const sample = pathAt(pts, travel)
        const scale = 0.78 + 0.34 * clamp(sample.pos.y / h, 0, 1)
        const cycle = (gait / 40) % 1
        const fwd = { x: Math.sin(heading), y: -Math.cos(heading) }
        const side = { x: Math.cos(heading), y: Math.sin(heading) }
        const rock = Math.sin(cycle * Math.PI * 2) * 5 * scale
        const pos = { x: sample.pos.x + side.x * rock, y: sample.pos.y + side.y * rock }

        const world = (lx: number, ly: number) => {
          const c = Math.cos(heading)
          const s = Math.sin(heading)
          return { x: pos.x + (lx * c - ly * s) * scale, y: pos.y + (lx * s + ly * c) * scale }
        }

        const dot = (p: V, r: number, color: string) => {
          ctx.fillStyle = color
          ctx.beginPath()
          ctx.arc(p.x, p.y, Math.max(0.7, r * scale), 0, Math.PI * 2)
          ctx.fill()
        }

        const chain = (a: V, b: V, n: number, r0: number, r1: number, c0: string, c1: string) => {
          for (let k = 0; k < n; k++) {
            const q = n === 1 ? 1 : k / (n - 1)
            dot(
              { x: a.x + (b.x - a.x) * q, y: a.y + (b.y - a.y) * q },
              r0 + (r1 - r0) * q,
              q < 0.5 ? c0 : c1,
            )
          }
        }

        const swingDur = 0.32
        const phaseOf = (n: number) => (cycle + (LEGS[n].group ? 0.5 : 0) + (n % 2) * 0.07) % 1
        const hipOf = (ang: number) => world(Math.sin(ang) * 9, -8 - Math.cos(ang) * 10)

        const placeFoot = (hip: V, ang: number, reach: number) => {
          const rest = heading + ang
          const dir = { x: Math.sin(rest), y: -Math.cos(rest) }
          let tx = hip.x + dir.x * reach * scale + fwd.x * 8 * scale
          let ty = hip.y + dir.y * reach * scale + fwd.y * 8 * scale
          const vx = tx - hip.x
          const vy = ty - hip.y
          const err = angDiff(rest, Math.atan2(vx, -vy))
          const len = Math.hypot(vx, vy) || 1
          const clamped = rest + clamp(err, -0.1, 0.1)
          tx = hip.x + Math.sin(clamped) * len
          ty = hip.y - Math.cos(clamped) * len
          return { x: tx, y: ty }
        }

        for (let n = 0; n < LEGS.length; n++) {
          const spec = LEGS[n]
          const phase = phaseOf(n)
          const swinging = phase < swingDur
          const leg = feet[n]
          const hip = hipOf(spec.ang)
          if (!leg.ready) {
            const planted = placeFoot(hip, spec.ang, spec.reach)
            leg.planted = planted
            leg.at = planted
            leg.ready = true
            leg.swing = false
          } else if (swinging && !leg.swing) {
            leg.from = leg.planted
            leg.to = placeFoot(hip, spec.ang, spec.reach)
            leg.swing = true
          } else if (!swinging && leg.swing) {
            leg.planted = leg.at
            leg.swing = false
          }
          if (leg.swing) {
            const e = phase / swingDur
            const u = clamp((e - 0.38) / 0.62, 0, 1)
            const s = 1 - (1 - u) ** 3
            const tuck = Math.sin(Math.min(1, e / 0.42) * Math.PI) * 22 * scale
            const ray = norm({ x: leg.from.x - hip.x, y: leg.from.y - hip.y })
            leg.at = {
              x: leg.from.x + (leg.to.x - leg.from.x) * s - ray.x * tuck,
              y: leg.from.y + (leg.to.y - leg.from.y) * s - ray.y * tuck - Math.sin(Math.PI * e) * 3 * scale,
            }
          } else leg.at = leg.planted
        }

        const paintLeg = (n: number) => {
          const spec = LEGS[n]
          const hip = hipOf(spec.ang)
          const foot = feet[n].at
          const dx = foot.x - hip.x
          const dy = foot.y - hip.y
          const len = Math.hypot(dx, dy) || 1
          const mx = hip.x + (dx / len) * Math.min(len * 0.46, spec.reach * 0.42 * scale)
          const my = hip.y + (dy / len) * Math.min(len * 0.46, spec.reach * 0.42 * scale)
          const phase = phaseOf(n)
          const folding = phase < swingDur ? Math.sin((phase / swingDur) * Math.PI) : 0
          const sign = spec.ang >= 0 ? 1 : -1
          const bow = (13 + folding * 11) * scale
          const knee = { x: mx + (-dy / len) * sign * bow, y: my + (dx / len) * sign * bow }
          chain(hip, knee, 7, 2.55, 2.15, '#1c2c0e', '#3c5414')
          chain(knee, foot, 8, 2.15, 1.6, '#466218', '#8fb83a')
          dot(knee, 2.15, '#c6ee5c')
          dot(foot, 1.55, '#b6dc48')
        }

        ;[6, 7, 4, 5, 2, 3, 0, 1].forEach(paintLeg)

        const blob = (ox: number, oy: number, rx: number, ry: number, step: number) => {
          const gxN = Math.ceil(rx / step)
          const gyN = Math.ceil(ry / step)
          for (let gy = -gyN; gy <= gyN; gy++) {
            for (let gx = -gxN; gx <= gxN; gx++) {
              const lx = gx * step
              const ly = gy * step
              const e = (lx * lx) / (rx * rx) + (ly * ly) / (ry * ry)
              if (e > 1) continue
              const p = world(ox + lx, oy + ly)
              const r = e < 0.2 ? 2.15 : e < 0.55 ? 1.8 : 1.3
              const color = e < 0.2 ? '#6e9428' : e < 0.55 ? '#3a5216' : '#1a280e'
              dot({ x: p.x, y: p.y + 8 * scale }, r * 0.75, '#0c120a')
              dot(p, r, color)
            }
          }
        }
        blob(0, 14, 20, 26, 4)
        blob(0, -8, 12, 14, 4)
        for (const ly of [-4, 4, 12, 20, 28]) dot(world(0, ly), 0.85, '#b6dc48')
        if (Math.sin(now / 140) < 0.93) {
          dot(world(-3.6, -20), 1.15, '#c6e25a')
          dot(world(3.6, -20), 1.15, '#c6e25a')
        }

        if (t < 1) raf = requestAnimationFrame(frame)
        else {
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
          ctx.clearRect(0, 0, w, h)
          running.current = false
          coolTimer = window.setTimeout(arm, coolMs)
        }
      }
      raf = requestAnimationFrame(frame)
    }

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) arm()
    window.addEventListener('dot-crawl', crawl)
    return () => {
      window.removeEventListener('dot-crawl', crawl)
      window.clearTimeout(waitTimer)
      window.clearTimeout(coolTimer)
      cancelAnimationFrame(raf)
      running.current = false
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-30" aria-hidden />
}
