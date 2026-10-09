import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Lightbox } from '@/components/site/Lightbox'
import { ButtonCarousel } from './ButtonCarousel'
import { assetPath, MediaImage } from './MediaImage'
import type { Honor } from '@/lib/types'

function honorImages(h: Honor) {
  if (h.images?.length) return h.images
  if (h.image) return [h.image]
  return []
}

export function AwardRail({ honors }: { honors: Honor[] }) {
  const [open, setOpen] = useState<{ honor: Honor; index: number } | null>(null)
  const slides = open ? honorImages(open.honor) : []
  const slide = open ? slides[open.index] : ''
  return (
    <>
      <ButtonCarousel label="Honors // Awards">
        {honors.map((h) => {
          const imgs = honorImages(h)
          return (
            <article key={h.title} className="exp-card hud-frame w-[min(280px,80vw)] shrink-0 p-4">
              {imgs.length === 1 ? (
                <button
                  type="button"
                  className="mb-3 block w-full cursor-pointer"
                  onClick={() => setOpen({ honor: h, index: 0 })}
                  aria-label={`Open ${h.title}`}
                >
                  <MediaImage
                    src={assetPath(imgs[0])}
                    alt={h.title}
                    className="h-36 w-full border border-[var(--color-line)] bg-white object-contain"
                  />
                </button>
              ) : null}
              {imgs.length > 1 ? (
                <div className="mb-3 grid grid-cols-2 gap-1">
                  {imgs.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      className="cursor-pointer"
                      onClick={() => setOpen({ honor: h, index: i })}
                      aria-label={`Open ${h.title} photo ${i + 1}`}
                    >
                      <MediaImage
                        src={assetPath(src)}
                        alt={`${h.title} photo ${i + 1}`}
                        className="h-28 w-full border border-[var(--color-line)] object-cover"
                      />
                    </button>
                  ))}
                </div>
              ) : null}
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-alert)]">Award</p>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl uppercase">{h.title}</h3>
              <p className="mt-1 font-mono text-[11px] text-[var(--color-muted)]">{h.issuer}</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{h.desc}</p>
            </article>
          )
        })}
      </ButtonCarousel>
      <Lightbox open={!!open} onClose={() => setOpen(null)} title={open?.honor.title || 'Award'}>
        {slide ? <MediaImage src={assetPath(slide)} alt={open?.honor.title || 'Award'} className="max-h-[62vh] w-full object-contain" /> : null}
        {slides.length > 1 && open ? (
          <div className="mt-4 flex items-center justify-between">
            <Button type="button" onClick={() => setOpen({ honor: open.honor, index: (open.index - 1 + slides.length) % slides.length })}>
              Prev
            </Button>
            <span className="font-mono text-xs text-[var(--color-muted)]">
              {open.index + 1} / {slides.length}
            </span>
            <Button type="button" onClick={() => setOpen({ honor: open.honor, index: (open.index + 1) % slides.length })}>
              Next
            </Button>
          </div>
        ) : null}
      </Lightbox>
    </>
  )
}
