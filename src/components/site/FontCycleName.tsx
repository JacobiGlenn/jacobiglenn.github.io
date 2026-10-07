import { useEffect, useRef, useState } from 'react'

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
  const holdRef = useRef<number | undefined>(undefined)
  const scrambleRef = useRef<number | undefined>(undefined)

  useEffect(() => {
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
        if (n > 8) {
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
      holdRef.current = window.setInterval(runScramble, 2200)
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
      className="name-cycle min-h-[1.05em] text-5xl uppercase leading-[0.9] tracking-wide md:text-8xl"
      style={{ fontFamily: FONTS[font] }}
    >
      {shown}
    </h1>
  )
}
