import { renderHeadFrame } from '@/lib/ascii'
import { useEffect, useRef, useState } from 'react'

export function AsciiHead({ boostUntil = 0, className = '' }: { boostUntil?: number; className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const preRef = useRef<HTMLPreElement>(null)
  const [phase, setPhase] = useState(0)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    let raf = 0
    let last = performance.now()
    const tick = (t: number) => {
      const dt = t - last
      last = t
      const boost = Date.now() < boostUntil
      setPhase((p) => p + (boost ? dt * 0.08 : dt * 0.012))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [boostUntil])

  useEffect(() => {
    const wrap = wrapRef.current
    const pre = preRef.current
    if (!wrap || !pre) return
    const fit = () => {
      const cw = wrap.clientWidth
      const ch = wrap.clientHeight
      const bw = pre.scrollWidth
      const bh = pre.scrollHeight
      if (!cw || !ch || !bw || !bh) return
      setScale(Math.max(cw / bw, ch / bh))
    }
    fit()
    document.fonts?.ready?.then(fit).catch(() => {})
    const ro = new ResizeObserver(fit)
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className={`relative h-full min-h-32 w-full overflow-hidden ${className}`}>
      <pre
        ref={preRef}
        className="pointer-events-none m-0 whitespace-pre leading-[1] text-[8px] text-[var(--color-ink)]"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        {renderHeadFrame(phase)}
      </pre>
    </div>
  )
}
