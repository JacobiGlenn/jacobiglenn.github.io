import { SiteCard } from '@/components/site/SiteCard'
import { projects, sortPortfolio } from '@/lib/content'
import { Navigate, useParams } from 'react-router-dom'

export function PortfolioPage() {
  const { kind } = useParams()
  if (kind !== 'design' && kind !== 'dev') return <Navigate to="/portfolio/dev" replace />
  const list = sortPortfolio(projects[kind])
  return (
    <div className="px-4 py-8 md:px-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent)]">
        Portfolios // {kind}
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-5xl uppercase">
        {kind === 'design' ? 'Designer' : 'Developer'}
      </h1>
      <p className="mt-3 max-w-2xl text-[var(--color-muted)]">
        {kind === 'design'
          ? 'Digital and visual work. More case studies coming — drop a folder in designProjects to add one.'
          : 'Apps, extensions, and other builds with repos and write-ups.'}
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <SiteCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  )
}
