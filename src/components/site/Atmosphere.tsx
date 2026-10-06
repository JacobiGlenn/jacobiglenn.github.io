import { useLocation } from 'react-router-dom'

const SIGNS = ['◆', '△', '□', '○', '✕', '▣']

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
  const label = hereLabel(pathname)

  return (
    <>
      <aside className="pointer-events-none fixed top-24 bottom-8 left-3 z-[2] hidden w-12 xl:block" aria-hidden>
        <div className="flex h-full flex-col items-center gap-4">
          <p
            className="font-[family-name:var(--font-display)] text-2xl uppercase leading-none tracking-wide text-[var(--color-ink)]"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            {label}
          </p>
          <div className="flex flex-1 flex-col items-center justify-evenly font-mono text-[10px] text-[var(--color-accent)]">
            {SIGNS.map((s) => (
              <span key={s} className="opacity-70">
                {s}
              </span>
            ))}
          </div>
        </div>
      </aside>
      <aside className="pointer-events-none fixed top-24 bottom-8 right-3 z-[2] hidden w-12 xl:block" aria-hidden>
        <div className="flex h-full flex-col items-center justify-evenly font-mono text-[10px] text-[var(--color-muted)]">
          {SIGNS.slice()
            .reverse()
            .map((s) => (
              <span key={s} className="opacity-60">
                {s}
              </span>
            ))}
        </div>
      </aside>
    </>
  )
}
