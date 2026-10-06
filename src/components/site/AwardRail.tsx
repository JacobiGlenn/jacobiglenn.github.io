import { ButtonCarousel } from './ButtonCarousel'
import type { Honor } from '@/lib/types'

export function AwardRail({ honors }: { honors: Honor[] }) {
  return (
    <ButtonCarousel label="Honors // Awards">
      {honors.map((h) => (
        <article key={h.title} className="hud-frame w-[min(280px,80vw)] shrink-0 p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-alert)]">Award</p>
          <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl uppercase">{h.title}</h3>
          <p className="mt-1 font-mono text-[11px] text-[var(--color-muted)]">{h.issuer}</p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{h.desc}</p>
        </article>
      ))}
    </ButtonCarousel>
  )
}
