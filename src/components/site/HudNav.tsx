import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'

const modules = [
  { to: '/', label: 'Home', end: true },
  { to: '/experience', label: 'Work' },
  { to: '/blog', label: 'Blog' },
]

function Clock() {
  const [t, setT] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="hidden font-mono text-[10px] tracking-[0.16em] text-[var(--color-muted)] lg:inline">
      {t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
    </span>
  )
}

export function HudNav() {
  const location = useLocation()
  const [menu, setMenu] = useState(false)
  const [ports, setPorts] = useState(false)
  const portRef = useRef<HTMLDivElement>(null)
  const onPortfolio = location.pathname.startsWith('/portfolio')
  const onDesign = location.pathname.startsWith('/portfolio/design')
  const onDev = location.pathname.startsWith('/portfolio/dev')

  useEffect(() => {
    setMenu(false)
    setPorts(false)
  }, [location.pathname])

  useEffect(() => {
    if (!ports) return
    const onDoc = (e: PointerEvent) => {
      if (!portRef.current?.contains(e.target as Node)) setPorts(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPorts(false)
    }
    document.addEventListener('pointerdown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [ports])

  useEffect(() => {
    if (!menu) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenu(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menu])

  return (
    <header className="sticky top-0 z-40 overflow-visible bg-gradient-to-b from-[var(--color-ground)] via-[color-mix(in_srgb,var(--color-ground)_88%,transparent)] to-transparent px-3 pb-2 pt-3 md:px-5">
      <div className="mx-auto flex max-w-[1400px] items-center gap-4">
        <NavLink to="/" className="group relative z-10 flex min-w-0 shrink-0 items-center gap-2 text-inherit hover:text-[var(--color-ink)]">
          <span className="nav-seal relative grid h-11 w-11 shrink-0 place-items-center border border-[var(--color-accent)] [clip-path:polygon(18%_0,100%_0,100%_82%,82%_100%,0_100%,0_18%)]">
            <img src="/assets/logo.svg" alt="Jacobi Glenn" className="h-7 w-7 object-contain" />
          </span>
          <span className="hidden leading-tight md:block">
            <span className="block whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.08em] text-[var(--color-accent)]">
              Soph @ UC Irvine | Coding Tutor | US Army
            </span>
            <span className="font-[family-name:var(--font-display)] text-lg uppercase tracking-[0.08em]">Jacobi Glenn</span>
          </span>
        </NavLink>

        <div className="relative mx-auto hidden min-w-0 flex-1 justify-center md:flex">
          <div className="nav-island-glow" />
          <div className="relative z-10" ref={portRef}>
            <nav className="nav-island flex items-stretch" aria-label="Primary">
              {modules.map((m) => (
                <NavLink
                  key={m.to}
                  to={m.to}
                  end={m.end}
                  className={({ isActive }) => `island-tab ${isActive ? 'island-tab-on' : ''}`}
                >
                  {m.label}
                </NavLink>
              ))}
              <button
                type="button"
                className={`island-tab border-l border-[var(--color-line)] ${onPortfolio ? 'island-tab-on' : ''}`}
                aria-expanded={ports}
                aria-haspopup="menu"
                onClick={() => setPorts((v) => !v)}
              >
                Portfolios ▾
              </button>
            </nav>
            {ports ? (
              <div className="port-drop port-drop-in" role="menu">
                <NavLink
                  to="/portfolio/design"
                  role="menuitem"
                  className={`port-link ${onDesign ? 'port-link-on' : ''}`}
                  onClick={() => setPorts(false)}
                >
                  Designer
                </NavLink>
                <NavLink
                  to="/portfolio/dev"
                  role="menuitem"
                  className={`port-link ${onDev ? 'port-link-on' : ''}`}
                  onClick={() => setPorts(false)}
                >
                  Developer
                </NavLink>
              </div>
            ) : null}
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Clock />
          <Button
            type="button"
            size="sm"
            className="md:hidden"
            onClick={() => setMenu((v) => !v)}
            aria-expanded={menu}
            aria-controls="mobile-nav"
          >
            Menu
          </Button>
        </div>
      </div>

      {menu ? (
        <div id="mobile-nav" className="mobile-sheet mobile-sheet-in md:hidden">
          {[
            { to: '/', label: 'Home' },
            { to: '/portfolio/design', label: 'Designer' },
            { to: '/portfolio/dev', label: 'Developer' },
            { to: '/experience', label: 'Work Experience' },
            { to: '/blog', label: 'Blog' },
          ].map((l) => (
            <NavLink key={l.to} to={l.to} onClick={() => setMenu(false)} className="mobile-link">
              {l.label}
            </NavLink>
          ))}
        </div>
      ) : null}
    </header>
  )
}
