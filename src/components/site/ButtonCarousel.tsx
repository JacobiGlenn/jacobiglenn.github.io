import { useRef, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'

export function ButtonCarousel({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const move = (dir: number) => {
    const el = ref.current
    if (!el) return
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 560), behavior: 'smooth' })
  }
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)]">{label}</p>
        <div className="flex gap-2">
          <Button type="button" size="sm" onClick={() => move(-1)} aria-label="Scroll left">
            ←
          </Button>
          <Button type="button" size="sm" onClick={() => move(1)} aria-label="Scroll right">
            →
          </Button>
        </div>
      </div>
      <div
        ref={ref}
        className="carousel-track flex gap-3 scroll-smooth pb-2"
      >
        {children}
      </div>
    </div>
  )
}
