import { SiteCard } from '@/components/site/SiteCard'
import { projects, sortPortfolio } from '@/lib/content'
import { Navigate, useLocation } from 'react-router-dom'

export function PortfolioPage() {
  const { pathname } = useLocation()
  const key = pathname.startsWith('/portfolio/design') ? 'design' : pathname.startsWith('/portfolio/dev') ? 'dev' : null
  if (!key) return <Navigate to="/portfolio/dev" replace />
  const list = sortPortfolio(projects[key])
  return (
    <div className="py-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent)]">
        Portfolios // {key}
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-5xl uppercase">
        {key === 'design' ? 'Designer' : 'Developer'}
      </h1>
      <p className="mt-3 max-w-2xl text-[var(--color-muted)]">
        {key === 'design'
          ? 'Digital and visual work. More case studies coming — drop a folder in designProjects to add one.'
          : 'Apps, extensions, and other builds with repos and write-ups.'}
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((p) => (
          <SiteCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  )
}
