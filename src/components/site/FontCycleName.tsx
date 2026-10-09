import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const FONTS = [
  '"Big Shoulders Display", sans-serif',
  'Tektur, sans-serif',
  '"IBM Plex Mono", monospace',
  'Orbitron, sans-serif',
  '"Black Ops One", sans-serif',
  '"Share Tech Mono", monospace',
  'Bungee, sans-serif',
  '"Russo One", sans-serif',
]
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ█▓▒░'

export function FontCycleName({ text }: { text: string }) {
  const [font, setFont] = useState(0)
  const [shown, setShown] = useState(text)
  const [scale, setScale] = useState(1)
  const boxRef = useRef<HTMLHeadingElement>(null)
  const liveRef = useRef<HTMLSpanElement>(null)
  const holdRef = useRef<number | undefined>(undefined)
  const scrambleRef = useRef<number | undefined>(undefined)

  useLayoutEffect(() => {
    const box = boxRef.current
    const live = liveRef.current
    if (!box || !live) return
    const need = live.scrollWidth
    const avail = box.clientWidth
    setScale(need > 0 && avail > 0 ? Math.min(1, avail / need) : 1)
  }, [shown, font, text])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const clearAll = () => {
      if (holdRef.current) window.clearInterval(holdRef.current)
      if (scrambleRef.current) window.clearInterval(scrambleRef.current)
      holdRef.current = undefined
      scrambleRef.current = undefined
    }

    const runScramble = () => {
      if (scrambleRef.current) window.clearInterval(scrambleRef.current)
      let n = 0
      scrambleRef.current = window.setInterval(() => {
        n += 1
        setShown(
          text
            .split('')
            .map((c) => (c === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
            .join(''),
        )
        if (n > 6) {
          if (scrambleRef.current) window.clearInterval(scrambleRef.current)
          scrambleRef.current = undefined
          setFont((f) => (f + 1) % FONTS.length)
          setShown(text)
        }
      }, 40)
    }

    const start = () => {
      clearAll()
      setShown(text)
      if (reduce) return
      holdRef.current = window.setInterval(runScramble, 2400)
    }

    const onVis = () => {
      if (document.hidden) {
        clearAll()
        setShown(text)
      } else {
        start()
      }
    }

    if (!document.hidden) start()
    document.addEventListener('visibilitychange', onVis)
    return () => {
      document.removeEventListener('visibilitychange', onVis)
      clearAll()
    }
  }, [text])

  return (
    <h1
      ref={boxRef}
      className="name-cycle relative mt-2 block w-full overflow-hidden text-[clamp(2.6rem,12vw,6.5rem)] leading-none uppercase tracking-wide"
    >
      <span className="sr-only">{text}</span>
      <span
        ref={liveRef}
        aria-hidden
        className="absolute top-1/2 left-0 whitespace-nowrap"
        style={{
          fontFamily: FONTS[font],
          transform: `translateY(-50%) scale(${scale})`,
          transformOrigin: 'left center',
        }}
      >
        {shown}
      </span>
    </h1>
  )
}
