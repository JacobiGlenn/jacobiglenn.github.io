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
  const hero = project.headerUrl || project.coverUrl
  return (
    <div className="px-4 py-6 md:px-8">
      <StickyBack to={`/portfolio/${project.kind === 'design' ? 'design' : 'dev'}`} />
      {hero ? (
        <div className="relative h-56 overflow-hidden border border-[var(--color-line)]">
          <MediaImage src={assetPath(hero)} alt="" className="h-full w-full object-cover" />
        </div>
      ) : null}
      <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl uppercase">{project.title}</h1>
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
