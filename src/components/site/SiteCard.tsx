import { Link } from 'react-router-dom'
import { useState } from 'react'
import type { Project } from '@/lib/types'
import { assetPath, MediaImage } from './MediaImage'
import { WipNotice } from './WipNotice'

export function SiteCard({ project }: { project: Project }) {
  const [wipOpen, setWipOpen] = useState(false)
  const to = `/portfolio/${project.kind}/${project.id}`
  const face = (
    <>
      <div
        className="relative h-44 overflow-hidden bg-[var(--color-ground-2)]"
        style={project.coverBg ? { background: project.coverBg } : undefined}
      >
        {project.wip ? <span className="wip-tag">Work in progress</span> : null}
        {project.coverUrl ? (
          <MediaImage
            src={assetPath(project.coverUrl)}
            alt={project.title}
            className="h-full w-full object-cover opacity-85 group-hover:opacity-100"
            style={{
              objectFit: ((project.cardFit || project.coverSize || 'cover') as 'cover' | 'contain'),
              transform: project.cardScale ? `scale(${project.cardScale})` : undefined,
            }}
          />
        ) : (
          <MediaImage alt={project.title} className="h-full w-full object-cover" />
        )}
      </div>
      <div className="p-3">
        <span className="font-[family-name:var(--font-display)] text-xl uppercase tracking-wide text-[var(--color-ink)] group-hover:text-[var(--color-accent)]">
          {project.title}
        </span>
        {project.dateLabel ? (
          <p className="mb-1 mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-accent)]">
            {project.dateLabel}
          </p>
        ) : null}
        <p className="text-sm leading-relaxed text-[var(--color-muted)]">{project.description}</p>
      </div>
    </>
  )
  return (
    <article className="site-card hud-frame group relative overflow-hidden">
      {project.wip ? (
        <button
          type="button"
          className="relative z-[1] block w-full cursor-pointer text-left text-inherit"
          onClick={() => setWipOpen(true)}
        >
          {face}
        </button>
      ) : (
        <Link to={to} className="relative z-[1] block text-inherit hover:text-inherit">
          {face}
        </Link>
      )}
      {project.github ? (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-[1] block border-t border-[var(--color-line)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em]"
        >
          GitHub ↗
        </a>
      ) : null}
      {project.wip ? <WipNotice open={wipOpen} onClose={() => setWipOpen(false)} /> : null}
    </article>
  )
}
