import { renderHeadFrame } from '@/lib/ascii'
import { useEffect, useState } from 'react'

export function AsciiHead({ boostUntil = 0, className = '' }: { boostUntil?: number; className?: string }) {
  const [phase, setPhase] = useState(0)
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
  return (
    <pre className={`m-0 overflow-hidden whitespace-pre leading-[1] text-[clamp(4px,0.7vw,8px)] text-[var(--color-ink)] ${className}`}>
      {renderHeadFrame(phase)}
    </pre>
  )
}
