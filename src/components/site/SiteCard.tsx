import { Link } from 'react-router-dom'
import type { Project } from '@/lib/types'
import { assetPath, MediaImage } from './MediaImage'

export function SiteCard({ project }: { project: Project }) {
  const to = `/portfolio/${project.kind}/${project.id}`
  return (
    <article className="hud-frame group overflow-hidden transition-transform duration-150 hover:-translate-y-0.5">
      <Link to={to} className="block text-inherit hover:text-inherit">
        <div className="relative h-36 overflow-hidden bg-[var(--color-ground-2)]">
          {project.coverUrl ? (
            <MediaImage
              src={assetPath(project.coverUrl)}
              alt={project.title}
              className="h-full w-full object-cover opacity-90 group-hover:opacity-100"
              style={{ objectFit: (project.coverSize as 'cover' | 'contain') || 'cover' }}
            />
          ) : (
            <MediaImage alt={project.title} className="h-full w-full object-cover" />
          )}
        </div>
        <div className="p-3">
          <span className="font-[family-name:var(--font-display)] text-xl uppercase tracking-wide text-[var(--color-ink)]">
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
          className="block border-t border-[var(--color-line)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em]"
        >
          GitHub ↗
        </a>
      ) : null}
    </article>
  )
}
