import { SiteCard } from '@/components/site/SiteCard'
import { projects, sortPortfolio } from '@/lib/content'
import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const DESIGN_TAGS = ['Graphic Design', 'Social Media', 'UI/UX'] as const
const DEV_TAGS = ['Python', 'JavaScript', 'TypeScript', 'Full Stack'] as const

export function PortfolioPage() {
  const { pathname } = useLocation()
  const key = pathname.startsWith('/portfolio/design') ? 'design' : pathname.startsWith('/portfolio/dev') ? 'dev' : null
  const [tag, setTag] = useState<string | null>(null)

  useEffect(() => {
    setTag(null)
  }, [key])

  if (!key) return <Navigate to="/portfolio/dev" replace />

  const filters = key === 'design' ? DESIGN_TAGS : DEV_TAGS
  const all = sortPortfolio(projects[key])
  const list = tag ? all.filter((p) => p.tags.includes(tag)) : all
  const chip = (on: boolean) =>
    `border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${
      on ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-[#111]' : 'border-[var(--color-line)] text-[var(--color-muted)]'
    }`

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
          ? 'Graphic design, social media, and UI/UX projects with write-ups.'
          : 'Apps, extensions, and other builds with repos and write-ups.'}
      </p>

      <div className="mt-6 space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)]">Tags</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={chip(!tag)} onClick={() => setTag(null)}>
            All
          </button>
          {filters.map((t) => (
            <button key={t} type="button" className={chip(tag === t)} onClick={() => setTag(tag === t ? null : t)}>
              {t}
            </button>
          ))}
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
          Showing {list.length} of {all.length}
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((p) => (
          <SiteCard key={p.id} project={p} />
        ))}
      </div>
      {!list.length ? (
        <p className="mt-6 font-mono text-sm text-[var(--color-muted)]">No projects match that filter.</p>
      ) : null}
    </div>
  )
}
