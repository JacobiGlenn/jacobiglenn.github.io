import { useEffect, useState } from 'react'

const LEFT = [
  'UPLINK // PACIFIC',
  'NODE JG-07',
  'SECTOR IRVINE',
  'LAT 33.64 N',
  'PING 12ms',
]

const RIGHT = [
  'SIGNAL 0.94',
  'THREAT LOW',
  'CACHE HOT',
  'BUILD LIVE',
  'AUTH OPEN',
]

export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="hud-grid" />
      <div className="hud-beams" />
      <div className="hud-vignette" />
      <div className="scanlines opacity-40" />
    </div>
  )
}

export function SideRail({ side }: { side: 'left' | 'right' }) {
  const lines = side === 'left' ? LEFT : RIGHT
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((n) => n + 1), 1800)
    return () => clearInterval(id)
  }, [])
  return (
    <div className={`sticky top-24 hidden h-[calc(100dvh-7rem)] px-3 py-6 font-mono text-[10px] tracking-[0.18em] text-[var(--color-muted)] lg:block ${side === 'right' ? 'text-right' : ''}`}>
      <p className="text-[var(--color-accent)]">{side === 'left' ? 'SYS // WEST' : 'SYS // EAST'}</p>
      <div className="mt-4 space-y-2 opacity-80">
        {lines.map((l, i) => (
          <p key={l} className={i === tick % lines.length ? 'text-[var(--color-ink)]' : ''}>
            {l}
          </p>
        ))}
      </div>
      <p className="mt-8 text-[var(--color-steel)]">{String((tick * 17) % 999).padStart(3, '0')}</p>
      <div className={`mt-6 h-24 w-px bg-gradient-to-b from-[var(--color-accent)] to-transparent ${side === 'right' ? 'ml-auto' : ''}`} />
    </div>
  )
}

export function StatusBar() {
  const [t, setT] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 hidden overflow-hidden border-t border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-ground)_82%,transparent)] py-1 font-mono text-[10px] tracking-[0.2em] text-[var(--color-muted)] md:block">
      <div className="ticker whitespace-nowrap">
        JG-07 LIVE · SOPH @ UC IRVINE · CODING TUTOR · US ARMY · REDMOND VECTOR LOCKED · NO MATRIX RAIN · MARATHON CHANNEL OPEN · {t.toISOString().slice(11, 19)} UTC ·
        JG-07 LIVE · SOPH @ UC IRVINE · CODING TUTOR · US ARMY · REDMOND VECTOR LOCKED ·
      </div>
    </div>
  )
}
