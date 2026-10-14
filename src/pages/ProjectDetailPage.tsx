import { HtmlBlock } from '@/components/site/HtmlBlock'
import { MediaImage, assetPath } from '@/components/site/MediaImage'
import { PhotoStack } from '@/components/site/PhotoStack'
import { StickyBack } from '@/components/site/StickyBack'
import { projectById } from '@/lib/content'
import { Link, useParams } from 'react-router-dom'

export function ProjectDetailPage() {
  const { id = '', kind = 'dev' } = useParams()
  const project = projectById(id)
  if (!project) {
    return (
      <div className="p-8">
        <p>Project not found.</p>
        <Link to={`/portfolio/${kind}`}>Back</Link>
      </div>
    )
  }
  if (project.wip) {
    return (
      <div className="py-6">
        <StickyBack to={`/portfolio/${project.kind === 'design' ? 'design' : 'dev'}`} />
        <p className="mt-6 max-w-md text-[var(--color-ink)]">This is a work in progress, come back later.</p>
      </div>
    )
  }
  const hero = project.headerUrl || project.coverUrl
  return (
    <div className="py-6">
      <StickyBack to={`/portfolio/${project.kind === 'design' ? 'design' : 'dev'}`} />
      {hero ? (
        <div className="relative h-56 overflow-hidden border border-[var(--color-line)]">
          <MediaImage
            src={assetPath(hero)}
            alt={project.title}
            className="h-full w-full"
            style={{
              objectFit: project.coverSize === 'contain' ? 'contain' : 'cover',
              background: project.coverBg || '#fff',
            }}
          />
        </div>
      ) : null}
      <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl uppercase">{project.title}</h1>
      {project.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-1">
          {project.tags.map((t) => (
            <span key={t} className="border border-[var(--color-line)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em]">
              {t}
            </span>
          ))}
        </div>
      ) : null}
      {project.github ? (
        <a href={project.github} className="mt-2 inline-block font-mono text-xs uppercase tracking-[0.16em]" target="_blank" rel="noopener noreferrer">
          GitHub ↗
        </a>
      ) : null}
      {project.galleryId ? (
        <div className="mt-4">
          <PhotoStack galleryId={project.galleryId} />
        </div>
      ) : null}
      <HtmlBlock html={project.bodyHtml} className="mt-6" />
    </div>
  )
}
