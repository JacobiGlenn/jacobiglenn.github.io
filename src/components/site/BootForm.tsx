import { useEffect, useRef } from 'react'

export function BootForm({ onDone }: { onDone: () => void }) {
  const wrap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const shell = wrap.current
    if (!shell) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onDone()
      return
    }
    const start = performance.now()
    const dur = 2100
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur)
      shell.style.opacity = String(p < 0.82 ? 1 : Math.max(0, 1 - (p - 0.82) / 0.18))
      if (p < 1) raf = requestAnimationFrame(tick)
      else onDone()
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <div ref={wrap} className="boot-hold" aria-hidden>
      <div className="boot-cluster">
        <span className="boot-rule boot-rule-a" />
        <div className="boot-marks">
          <i className="boot-dia" />
          <i className="boot-tri" />
          <i className="boot-sq" />
          <i className="boot-cir" />
        </div>
        <span className="boot-rule boot-rule-b" />
      </div>
    </div>
  )
}
