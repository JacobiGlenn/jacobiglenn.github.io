import { useEffect, useRef } from 'react'

export function BootForm({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const wrap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const shell = wrap.current
    if (!canvas || !shell) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onDone()
      return
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const cols = 56
    const rows = 36
    const seeds = Float32Array.from({ length: cols * rows }, () => Math.random())
    const start = performance.now()
    const dur = 1250
    let raf = 0

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur)
      const w = canvas.width
      const h = canvas.height
      const cw = w / cols
      const ch = h / rows
      ctx.fillStyle = '#070908'
      ctx.fillRect(0, 0, w, h)

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x
          const appear = seeds[i] * 0.55
          if (p < appear) continue
          const local = Math.min(1, (p - appear) / 0.22)
          const fade = p > 0.62 ? 1 - (p - 0.62) / 0.38 : 1
          ctx.fillStyle = `rgba(197,242,64,${(0.15 + 0.75 * local) * Math.max(0, fade)})`
          const inset = local < 0.4 ? 0.28 : 0.08
          ctx.fillRect(x * cw + cw * inset, y * ch + ch * inset, cw * (1 - inset * 2), ch * (1 - inset * 2))
        }
      }

      canvas.style.opacity = '1'
      shell.style.opacity = String(Math.max(0, 1 - Math.max(0, p - 0.78) / 0.22))

      if (p < 1) raf = requestAnimationFrame(tick)
      else onDone()
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [onDone])

  return (
    <div ref={wrap} className="fixed inset-0 z-[90] bg-[#070908]" aria-hidden>
      <canvas ref={ref} className="h-full w-full" />
      <p className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--color-accent)]">
        Forming uplink
      </p>
    </div>
  )
}
