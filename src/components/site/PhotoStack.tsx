import { useState } from 'react'
import { Lightbox } from '@/components/site/Lightbox'
import { galleryMap } from '@/lib/content'
import type { GallerySlide } from '@/lib/types'
import { assetPath, MediaImage } from './MediaImage'
import { Button } from '@/components/ui/button'

function SlideView({ slide }: { slide: GallerySlide }) {
  if (slide.kind === 'img') {
    return <MediaImage src={assetPath(slide.src)} alt={slide.caption} className="max-h-[62vh] w-full object-contain" />
  }
  if (slide.kind === 'solid') {
    return <div className="h-56 w-full border border-[var(--color-line)]" style={{ background: slide.color }} />
  }
  if (slide.kind === 'smiley') {
    return <div className="flex h-56 items-center justify-center bg-[#111] text-6xl text-[var(--color-accent)]">☺</div>
  }
  return (
    <div className="flex h-56 items-center justify-center gap-6 bg-[#111]">
      <span className="h-16 w-24 rounded-full border border-[var(--color-accent)]" />
      <span className="h-0 w-0 border-l-[18px] border-r-[18px] border-b-[32px] border-l-transparent border-r-transparent border-b-[var(--color-accent)]" />
      <span className="h-16 w-16 border border-[var(--color-steel)]" />
    </div>
  )
}

export function PhotoStack({
  galleryId,
  photos,
}: {
  galleryId?: string
  photos?: string[]
}) {
  const [open, setOpen] = useState(false)
  const [idx, setIdx] = useState(0)
  const slides: GallerySlide[] =
    (galleryId && galleryMap[galleryId]) ||
    (photos || []).map((src) => ({ kind: 'img' as const, src, caption: '' }))
  if (!slides.length) return null
  const preview = slides.slice(0, 3)
  return (
    <>
      <button
        type="button"
        className="group/stack relative h-24 w-28 shrink-0 cursor-pointer"
        onClick={() => {
          setIdx(0)
          setOpen(true)
        }}
        aria-label="Open photo gallery"
      >
        {preview.map((s, i) => (
          <span
            key={i}
            className="absolute inset-0 border border-[var(--color-line)] transition-transform duration-200 group-hover/stack:-translate-y-1"
            style={{
              transform: `translate(${i * 7}px, ${i * -5}px)`,
              zIndex: 3 - i,
              background:
                s.kind === 'img' ? `center / cover no-repeat url(${assetPath(s.src)})` : s.kind === 'solid' ? s.color : '#1a241c',
            }}
          />
        ))}
        <span className="absolute -bottom-1 left-0 z-10 font-mono text-[8px] uppercase tracking-[0.16em] text-[var(--color-accent)] opacity-0 transition-opacity group-hover/stack:opacity-100">
          Open
        </span>
      </button>
      <Lightbox open={open} onClose={() => setOpen(false)} title="Gallery">
        <SlideView slide={slides[idx]} />
        <p className="mt-3 text-sm text-[var(--color-muted)]">{slides[idx].caption}</p>
        <div className="mt-4 flex items-center justify-between">
          <Button type="button" onClick={() => setIdx((i) => (i - 1 + slides.length) % slides.length)}>
            Prev
          </Button>
          <span className="font-mono text-xs text-[var(--color-muted)]">
            {idx + 1} / {slides.length}
          </span>
          <Button type="button" onClick={() => setIdx((i) => (i + 1) % slides.length)}>
            Next
          </Button>
        </div>
      </Lightbox>
    </>
  )
}
