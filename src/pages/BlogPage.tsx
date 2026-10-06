import { AsciiHead } from '@/components/site/AsciiHead'
import { ButtonCarousel } from '@/components/site/ButtonCarousel'
import { HtmlBlock } from '@/components/site/HtmlBlock'
import { Lightbox } from '@/components/site/Lightbox'
import { MediaImage, assetPath } from '@/components/site/MediaImage'
import { StickyBack } from '@/components/site/StickyBack'
import { Button } from '@/components/ui/button'
import { blogPosts, linkedInPosts, youtubeVideos } from '@/lib/content'
import { getLikeCount, setLikeCount, youtubeStats } from '@/lib/likes'
import type { LinkedInPost, YouTubeVideo } from '@/lib/types'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function LinkedInCard({ post, onOpen }: { post: LinkedInPost; onOpen: () => void }) {
  const media = post.media[0]
  return (
    <button type="button" onClick={onOpen} className="media-card hud-frame w-[min(320px,82vw)] shrink-0 overflow-hidden text-left">
      <div className="h-36 bg-[var(--color-ground-2)]">
        {post.thumb ? (
          <MediaImage src={assetPath(post.thumb)} alt="" className="h-full w-full object-cover" />
        ) : media?.type === 'video' ? (
          media.src.endsWith('.mp4') ? (
            <video src={assetPath(media.src)} muted className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full place-items-center font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
              Video
            </div>
          )
        ) : (
          <MediaImage alt={post.date} className="h-full w-full object-cover" />
        )}
      </div>
      <div className="p-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-accent)]">{post.date}</p>
        <p className="mt-2 line-clamp-4 text-sm text-[var(--color-muted)]">{post.text.replace(/<[^>]+>/g, ' ')}</p>
      </div>
    </button>
  )
}

function YtCard({ video, onOpen }: { video: YouTubeVideo; onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} className="media-card hud-frame w-[min(320px,82vw)] shrink-0 overflow-hidden text-left">
      <MediaImage
        src={`https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`}
        alt={video.title}
        className="h-36 w-full object-cover"
      />
      <div className="p-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-accent)]">{video.date}</p>
        <p className="mt-2 font-[family-name:var(--font-display)] text-lg uppercase">{video.title}</p>
      </div>
    </button>
  )
}

export function BlogPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [shown, setShown] = useState(3)
  const [li, setLi] = useState<LinkedInPost | null>(null)
  const [yt, setYt] = useState<YouTubeVideo | null>(null)
  const [likeCount, setLike] = useState(0)
  const [liked, setLiked] = useState(false)
  const [stats, setStats] = useState<{ views: string; likes: string } | null>(null)
  const post = id ? blogPosts.find((p) => p.id === id) : null

  useEffect(() => {
    if (!yt) return
    const key = `yt-like-${yt.videoId}`
    setLiked(localStorage.getItem(key) === '1')
    getLikeCount(yt.videoId).then(setLike)
    youtubeStats(yt.videoId).then(setStats)
  }, [yt])

  if (post) {
    return (
      <div className="py-6">
        <StickyBack to="/blog" />
        {post.banner === 'ascii-face' ? (
          <div className="h-48 overflow-hidden border border-[var(--color-line)]">
            <AsciiHead />
          </div>
        ) : post.coverUrl ? (
          <MediaImage src={assetPath(post.coverUrl)} alt="" className="max-h-64 w-full object-cover" />
        ) : null}
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent)]">{post.dateDisplay}</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl uppercase">{post.title}</h1>
        <HtmlBlock html={post.bodyHtml} className="mt-6" />
      </div>
    )
  }

  return (
    <div className="space-y-10 py-6">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent)]">Transmission log</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-5xl uppercase">Blog</h1>
      </div>

      <section className="grid gap-4">
        {blogPosts.slice(0, shown).map((p) => (
          <button
            key={p.id}
            type="button"
            className="blog-row hud-frame group relative flex overflow-hidden text-left"
            onClick={() => navigate(`/blog/${p.id}`)}
          >
            <span className="card-sweep" />
            <div className="h-36 w-44 shrink-0 bg-[var(--color-ground-2)]">
              {p.banner === 'ascii-face' ? (
                <AsciiHead className="h-full" />
              ) : (
                <MediaImage src={p.coverUrl ? assetPath(p.coverUrl) : undefined} alt={p.title} className="h-full w-full object-cover" />
              )}
            </div>
            <div className="p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-accent)]">{p.dateDisplay}</p>
              <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl uppercase group-hover:text-[var(--color-accent)]">{p.title}</h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{p.excerpt}</p>
            </div>
          </button>
        ))}
        {shown < blogPosts.length ? (
          <Button type="button" onClick={() => setShown((n) => n + 3)}>
            Show more
          </Button>
        ) : null}
      </section>

      <ButtonCarousel label="LinkedIn posts">
        {linkedInPosts.map((p) => (
          <LinkedInCard key={p.id} post={p} onOpen={() => setLi(p)} />
        ))}
      </ButtonCarousel>

      <ButtonCarousel label="YouTube">
        {youtubeVideos.map((v) => (
          <YtCard key={v.id} video={v} onOpen={() => setYt(v)} />
        ))}
      </ButtonCarousel>

      <Lightbox open={!!li} onClose={() => setLi(null)} title={li?.date || 'LinkedIn'}>
        {li ? (
          <>
            <HtmlBlock html={li.text} />
            {li.media[0]?.type === 'image' ? (
              <MediaImage src={assetPath(li.media[0].src)} alt={li.media[0].alt || ''} className="mt-4 w-full" />
            ) : null}
            {li.media[0]?.type === 'video' ? (
              li.media[0].src.includes('youtube') ? (
                <iframe title="video" src={li.media[0].src} className="mt-4 aspect-video w-full border-0" allowFullScreen />
              ) : (
                <video src={assetPath(li.media[0].src)} controls className="mt-4 w-full" />
              )
            ) : null}
          </>
        ) : null}
      </Lightbox>

      <Lightbox open={!!yt} onClose={() => setYt(null)} title={yt?.title || 'YouTube'}>
        {yt ? (
          <>
            <iframe
              title={yt.title}
              src={`https://www.youtube.com/embed/${yt.videoId}`}
              className="aspect-video w-full border-0"
              allowFullScreen
            />
            <p className="mt-3 font-mono text-xs text-[var(--color-muted)]">{yt.date}</p>
            {stats ? (
              <p className="font-mono text-xs">
                {stats.views} views · {stats.likes} likes
              </p>
            ) : null}
            <p className="mt-2 text-sm text-[var(--color-muted)]">{yt.description}</p>
            <div className="mt-4 flex gap-2">
              <Button
                type="button"
                variant={liked ? 'solid' : 'default'}
                onClick={async () => {
                  const next = !liked
                  const n = likeCount + (next ? 1 : -1)
                  setLiked(next)
                  setLike(Math.max(0, n))
                  localStorage.setItem(`yt-like-${yt.videoId}`, next ? '1' : '0')
                  await setLikeCount(yt.videoId, Math.max(0, n))
                }}
              >
                Like {likeCount}
              </Button>
              <Button asChild>
                <a href={`https://www.youtube.com/watch?v=${yt.videoId}`} target="_blank" rel="noopener noreferrer">
                  Watch on YouTube
                </a>
              </Button>
            </div>
          </>
        ) : null}
      </Lightbox>
    </div>
  )
}
