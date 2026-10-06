import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { writeReadable } from '@/lib/readable'
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
    <span className="font-mono text-[10px] tracking-[0.16em] text-[var(--color-muted)]">
      {t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
    </span>
  )
}

export function HudNav({ readable, setReadable }: { readable: boolean; setReadable: (v: boolean) => void }) {
  const [menu, setMenu] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-ground)_88%,transparent)] backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1200px] items-stretch gap-3 px-3 py-2 md:px-5">
        <NavLink to="/" className="group relative flex items-center gap-2 pr-3 text-inherit hover:text-[var(--color-ink)]">
          <span className="nav-seal relative grid h-11 w-11 place-items-center border border-[var(--color-accent)] [clip-path:polygon(18%_0,100%_0,100%_82%,82%_100%,0_100%,0_18%)]">
            <img src="/assets/logo.svg" alt="Jacobi Glenn" className="h-7 w-7 object-contain" />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block font-mono text-[9px] tracking-[0.28em] text-[var(--color-accent)]">JG-07 // SEAL</span>
            <span className="font-[family-name:var(--font-display)] text-lg uppercase tracking-[0.12em]">Glenn</span>
          </span>
        </NavLink>

        <nav className="relative hidden min-w-0 flex-1 items-center md:flex" aria-label="Primary">
          <div className="flex w-full items-center border border-[var(--color-line)] [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]">
            {modules.map((m) => (
              <NavLink
                key={m.to}
                to={m.to}
                end={m.end}
                className={({ isActive }) =>
                  `flex-1 px-3 py-3 text-center font-mono text-[11px] uppercase tracking-[0.22em] border-r border-[var(--color-line)] ${
                    isActive
                      ? 'bg-[var(--color-accent)] text-[#111]'
                      : 'text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-ground-2)]'
                  }`
                }
              >
                {m.label}
              </NavLink>
            ))}
            <div className="relative flex-[1.4]">
              <div className="flex">
                <NavLink
                  to="/portfolio/design"
                  className={({ isActive }) =>
                    `flex-1 px-2 py-3 text-center font-mono text-[11px] uppercase tracking-[0.14em] border-r border-[var(--color-line)] ${
                      isActive
                        ? 'bg-[var(--color-accent)] text-[#111]'
                        : 'text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-ground-2)]'
                    }`
                  }
                >
                  Design
                </NavLink>
                <NavLink
                  to="/portfolio/dev"
                  className={({ isActive }) =>
                    `flex-1 px-2 py-3 text-center font-mono text-[11px] uppercase tracking-[0.14em] ${
                      isActive
                        ? 'bg-[var(--color-accent)] text-[#111]'
                        : 'text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-ground-2)]'
                    }`
                  }
                >
                  Dev
                </NavLink>
              </div>
            </div>
          </div>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Clock />
          <Button
            type="button"
            size="sm"
            variant={readable ? 'solid' : 'default'}
            onClick={() => {
              const next = !readable
              setReadable(next)
              writeReadable(next)
            }}
            aria-pressed={readable}
          >
            Readable
          </Button>
          <Button type="button" size="sm" className="md:hidden" onClick={() => setMenu((v) => !v)} aria-expanded={menu}>
            Menu
          </Button>
        </div>
      </div>
      {menu ? (
        <div className="grid gap-1 border-t border-[var(--color-line)] p-3 md:hidden">
          {[
            { to: '/', label: 'Home' },
            { to: '/portfolio/design', label: 'Designer' },
            { to: '/portfolio/dev', label: 'Developer' },
            { to: '/experience', label: 'Work Experience' },
            { to: '/blog', label: 'Blog' },
          ].map((l) => (
            <NavLink key={l.to} to={l.to} onClick={() => setMenu(false)} className="border border-[var(--color-line)] px-3 py-2 font-mono text-xs uppercase tracking-[0.16em]">
              {l.label}
            </NavLink>
          ))}
        </div>
      ) : null}
    </header>
  )
}
