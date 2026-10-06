import { Link } from 'react-router-dom'
import type { Project } from '@/lib/types'
import { assetPath, MediaImage } from './MediaImage'

export function SiteCard({ project }: { project: Project }) {
  const to = `/portfolio/${project.kind}/${project.id}`
  return (
    <article className="hud-frame group relative overflow-hidden">
      <span className="card-sweep" />
      <Link to={to} className="relative z-[1] block text-inherit hover:text-inherit">
        <div className="relative h-40 overflow-hidden bg-[var(--color-ground-2)]">
          {project.coverUrl ? (
            <MediaImage
              src={assetPath(project.coverUrl)}
              alt={project.title}
              className="h-full w-full object-cover opacity-85 transition duration-300 group-hover:scale-[1.06] group-hover:opacity-100"
              style={{ objectFit: (project.coverSize as 'cover' | 'contain') || 'cover' }}
            />
          ) : (
            <MediaImage alt={project.title} className="h-full w-full object-cover" />
          )}
          <span className="absolute right-2 top-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[#111] bg-[var(--color-accent)] px-2 py-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            Open file
          </span>
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
      </Link>
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
    </article>
  )
}
