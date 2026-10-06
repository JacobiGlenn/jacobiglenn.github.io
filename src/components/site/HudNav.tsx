import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'

const modules = [
  { to: '/', label: 'Home', end: true },
  { to: '/experience', label: 'Work' },
  { to: '/blog', label: 'Log' },
]

function Clock() {
  const [t, setT] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="hidden font-mono text-[10px] tracking-[0.16em] text-[var(--color-muted)] sm:inline">
      {t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
    </span>
  )
}

export function HudNav() {
  const location = useLocation()
  const [menu, setMenu] = useState(false)
  const [menuShown, setMenuShown] = useState(false)
  const [ports, setPorts] = useState(false)
  const [portsShown, setPortsShown] = useState(false)
  const portRef = useRef<HTMLDivElement>(null)
  const onPortfolio = location.pathname.startsWith('/portfolio')

  useEffect(() => {
    if (menu) setMenuShown(true)
    else {
      const id = window.setTimeout(() => setMenuShown(false), 280)
      return () => window.clearTimeout(id)
    }
  }, [menu])

  useEffect(() => {
    if (ports) setPortsShown(true)
    else {
      const id = window.setTimeout(() => setPortsShown(false), 220)
      return () => window.clearTimeout(id)
    }
  }, [ports])

  useEffect(() => {
    setMenu(false)
    setPorts(false)
  }, [location.pathname])

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!portRef.current?.contains(e.target as Node)) setPorts(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-b from-[var(--color-ground)] via-[color-mix(in_srgb,var(--color-ground)_88%,transparent)] to-transparent px-3 pb-2 pt-3 md:px-5">
      <div className="mx-auto flex max-w-[1400px] items-center gap-3">
        <NavLink to="/" className="group relative z-10 flex items-center gap-2 text-inherit hover:text-[var(--color-ink)]">
          <span className="nav-seal relative grid h-11 w-11 place-items-center border border-[var(--color-accent)] [clip-path:polygon(18%_0,100%_0,100%_82%,82%_100%,0_100%,0_18%)]">
            <img src="/assets/logo-mark.png" alt="" className="h-7 w-7 object-contain" />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block font-mono text-[9px] tracking-[0.28em] text-[var(--color-accent)]">JG-07 // SEAL</span>
            <span className="font-[family-name:var(--font-display)] text-lg uppercase tracking-[0.08em]">Jacobi Glenn</span>
          </span>
        </NavLink>

        <div className="relative mx-auto hidden min-w-0 flex-1 justify-center md:flex">
          <div className="nav-island-glow" />
          <nav
            className="nav-island relative flex items-stretch overflow-visible"
            aria-label="Primary"
          >
            {modules.map((m) => (
              <NavLink
                key={m.to}
                to={m.to}
                end={m.end}
                className={({ isActive }) =>
                  `island-tab ${isActive ? 'island-tab-on' : ''}`
                }
              >
                {m.label}
              </NavLink>
            ))}
            <div className="relative" ref={portRef}>
              <button
                type="button"
                className={`island-tab border-l border-[var(--color-line)] ${onPortfolio ? 'island-tab-on' : ''}`}
                aria-expanded={ports}
                onClick={() => setPorts((v) => !v)}
              >
                Portfolios ▾
              </button>
              {portsShown ? (
                <div className={`port-drop ${ports ? 'port-drop-in' : 'port-drop-out'}`}>
                  <NavLink to="/portfolio/design" className="port-link" onClick={() => setPorts(false)}>
                    Designer
                  </NavLink>
                  <NavLink to="/portfolio/dev" className="port-link" onClick={() => setPorts(false)}>
                    Developer
                  </NavLink>
                </div>
              ) : null}
            </div>
          </nav>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Clock />
          <Button type="button" size="sm" className="md:hidden" onClick={() => setMenu((v) => !v)} aria-expanded={menu}>
            Menu
          </Button>
        </div>
      </div>

      {menuShown ? (
        <div className={`mobile-sheet md:hidden ${menu ? 'mobile-sheet-in' : 'mobile-sheet-out'}`}>
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
