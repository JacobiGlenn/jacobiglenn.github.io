import { blogPosts, experience, projects, sortPortfolio } from '@/lib/content'
import { useEffect, useMemo, useState, type MouseEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'

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

function pageIndex(pathname: string) {
  if (pathname === '/') {
    return [
      { to: '#pitch', label: 'Intro', hash: true },
      { to: '#objective', label: 'Objective', hash: true },
      { to: '#featured', label: 'Featured', hash: true },
      { to: '#contact', label: 'Contact', hash: true },
    ]
  }
  if (pathname.startsWith('/experience')) {
    return [
      { to: '#summary', label: 'Summary', hash: true },
      ...experience.jobs.map((j) => ({ to: `#${j.id}`, label: j.company, hash: true })),
      { to: '#education', label: 'Education', hash: true },
      { to: '#honors', label: 'Honors', hash: true },
    ]
  }
  if (pathname === '/blog') {
    return blogPosts.slice(0, 8).map((p) => ({ to: `/blog/${p.id}`, label: p.title, hash: false }))
  }
  if (pathname.startsWith('/portfolio/design')) {
    return sortPortfolio(projects.design).map((p) => ({
      to: `/portfolio/design/${p.id}`,
      label: p.title,
      hash: false,
    }))
  }
  if (pathname.startsWith('/portfolio/dev')) {
    return sortPortfolio(projects.dev).map((p) => ({
      to: `/portfolio/dev/${p.id}`,
      label: p.title,
      hash: false,
    }))
  }
  return []
}

function hereLabel(pathname: string) {
  if (pathname.startsWith('/portfolio/design')) return 'Designer'
  if (pathname.startsWith('/portfolio/dev')) return 'Developer'
  if (pathname.startsWith('/experience')) return 'Work'
  if (pathname.startsWith('/blog')) return 'Log'
  return 'Home'
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
  const { pathname, hash } = useLocation()
  const items = useMemo(() => pageIndex(pathname), [pathname])
  const progress = useScrollProgress()
  const label = hereLabel(pathname)

  const jumpScroll = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const t = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
    const max = document.documentElement.scrollHeight - window.innerHeight
    window.scrollTo({ top: t * max, behavior: 'smooth' })
  }

  return (
    <>
      <aside className="pointer-events-none fixed top-24 bottom-8 left-3 z-[2] hidden w-[5.5rem] xl:block">
        <div className="pointer-events-auto flex h-full flex-col border-l border-[var(--color-line)] pl-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--color-accent)]">{label}</p>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--color-muted)]">On this page</p>
          <nav className="mt-3 min-h-0 flex-1 space-y-1 overflow-auto pr-1" aria-label="On this page">
            {items.map((item) => {
              const active = item.hash && hash === item.to
              const cls = `block truncate font-mono text-[10px] uppercase tracking-[0.12em] ${
                active ? 'text-[var(--color-accent)]' : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
              }`
              return item.hash ? (
                <a key={item.to} href={item.to} className={cls}>
                  {item.label}
                </a>
              ) : (
                <Link key={item.to} to={item.to} className={cls}>
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>

      <aside className="pointer-events-none fixed top-24 bottom-8 right-3 z-[2] hidden w-14 xl:block">
        <div className="pointer-events-auto flex h-full flex-col items-center border-r border-[var(--color-line)] pr-3">
          <button
            type="button"
            className="relative h-full w-2 cursor-pointer border border-[var(--color-line)] bg-[var(--color-ground-2)]"
            aria-label="Scroll position. Click to jump."
            title="Click to jump"
            onClick={jumpScroll}
          >
            <span
              className="absolute inset-x-0 top-0 bg-[var(--color-accent)]"
              style={{ height: `${Math.max(4, progress * 100)}%` }}
            />
          </button>
          <button
            type="button"
            className="mt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--color-muted)] hover:text-[var(--color-accent)]"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Top
          </button>
        </div>
      </aside>
    </>
  )
}
