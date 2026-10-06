import { useEffect, useState } from 'react'

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

  useEffect(() => {
    let scramble: number | undefined
    const hold = window.setInterval(() => {
      let n = 0
      scramble = window.setInterval(() => {
        n += 1
        setShown(
          text
            .split('')
            .map((c) => (c === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
            .join(''),
        )
        if (n > 8) {
          if (scramble) window.clearInterval(scramble)
          setFont((f) => (f + 1) % FONTS.length)
          setShown(text)
        }
      }, 40)
    }, 2200)
    return () => {
      window.clearInterval(hold)
      if (scramble) window.clearInterval(scramble)
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
