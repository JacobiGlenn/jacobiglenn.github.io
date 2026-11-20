import { useState } from 'react'
import { Link } from 'react-router-dom'
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

function HonorLink({
  href,
  label,
  onClick,
}: {
  href: string
  label: string
  onClick?: () => void
}) {
  const className =
    'pointer-events-auto relative z-[3] mt-3 inline-block font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-accent)]'
  if (href.startsWith('http')) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
        {label}
      </a>
    )
  }
  return (
    <Link to={href} className={className} onClick={onClick}>
      {label}
    </Link>
  )
}

function HonorCarousel({
  honor,
  imgs,
  onOpen,
}: {
  honor: Honor
  imgs: string[]
  onOpen: (index: number) => void
}) {
  return (
    <div className="mb-3">
      <button
        type="button"
        className="pointer-events-auto relative z-[3] block w-full cursor-pointer"
        onClick={() => onOpen(0)}
        aria-label={`Open ${honor.title}`}
      >
        <MediaImage
          src={assetPath(imgs[0])}
          alt={honor.title}
          className="h-28 w-full border border-[var(--color-line)] object-cover object-center"
        />
      </button>
    </div>
  )
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
            <article key={h.title} className="exp-card hud-frame relative w-[min(280px,80vw)] shrink-0 self-start p-4">
              {imgs.length ? (
                <button
                  type="button"
                  className="absolute inset-0 z-[1] cursor-pointer"
                  aria-label={`Open ${h.title}`}
                  onClick={() => setOpen({ honor: h, index: 0 })}
                />
              ) : null}
              <div className="pointer-events-none relative z-[2]">
              {imgs.length === 1 ? (
                <button
                  type="button"
                  className="pointer-events-auto relative z-[3] mb-3 block w-full cursor-pointer"
                  onClick={() => setOpen({ honor: h, index: 0 })}
                  aria-label={`Open ${h.title}`}
                >
                  <MediaImage
                    src={assetPath(imgs[0])}
                    alt={h.title}
                    className={
                      h.imageFit === 'contain'
                        ? 'h-36 w-full border border-[var(--color-line)] object-contain'
                        : 'h-28 w-full border border-[var(--color-line)] object-cover object-center'
                    }
                    style={h.imageFit === 'contain' ? { background: h.imageBg || '#fff' } : undefined}
                  />
                </button>
              ) : null}
              {h.carousel || imgs.length > 2 ? <HonorCarousel honor={h} imgs={imgs} onOpen={(i) => setOpen({ honor: h, index: i })} /> : null}
              {!h.carousel && imgs.length === 2 ? (
                <div className="mb-3 grid grid-cols-2 gap-1">
                  {imgs.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      className="pointer-events-auto relative z-[3] cursor-pointer"
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
              {h.href ? <HonorLink href={h.href} label={h.hrefLabel || 'Case study'} /> : null}
              </div>
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
        {open?.honor.href ? (
          <p className="mt-4 text-center">
            <HonorLink href={open.honor.href} label={open.honor.hrefLabel || 'Case study'} onClick={() => setOpen(null)} />
          </p>
        ) : null}
      </Lightbox>
    </>
  )
}
