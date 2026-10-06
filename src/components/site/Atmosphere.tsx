import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function useScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return p
}

function hereLabel(pathname: string) {
  if (pathname.startsWith('/portfolio/design')) return 'DESIGN'
  if (pathname.startsWith('/portfolio/dev')) return 'DEV'
  if (pathname.startsWith('/experience')) return 'WORK'
  if (pathname.startsWith('/blog')) return 'BLOG'
  return 'HOME'
}

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

export function SideChrome() {
  const { pathname } = useLocation()
  const progress = useScrollProgress()
  const label = hereLabel(pathname)

  return (
    <>
      <aside className="pointer-events-none fixed top-24 bottom-8 left-3 z-[2] hidden w-[5.5rem] xl:block" aria-hidden>
        <div className="flex h-full flex-col border-l border-[var(--color-line)] pl-3">
          <p
            className="font-[family-name:var(--font-display)] text-2xl uppercase leading-none tracking-wide text-[var(--color-ink)]"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            {label}
          </p>
          <div className="relative mt-6 w-px flex-1 bg-[var(--color-line)]">
            <span className="absolute inset-x-0 top-0 bg-[var(--color-accent)]" style={{ height: `${progress * 100}%` }} />
          </div>
          <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
            {String(Math.round(progress * 100)).padStart(3, '0')}
          </p>
        </div>
      </aside>

      <aside className="pointer-events-none fixed top-24 bottom-8 right-3 z-[2] hidden w-14 xl:block" aria-hidden>
        <div className="flex h-full flex-col items-end border-r border-[var(--color-line)] pr-3">
          <div className="relative h-full w-px bg-[var(--color-line)]">
            <span className="absolute inset-x-0 top-0 w-full bg-[var(--color-accent)]" style={{ height: `${progress * 100}%` }} />
          </div>
        </div>
      </aside>
    </>
  )
}
