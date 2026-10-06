import { useEffect, useMemo, useState, type CSSProperties } from 'react'

const SIGNS = ['◆', '△', '□', '○', '✕', '▣']

function shuffle<T>(arr: T[]) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function makePuzzle() {
  const digits = shuffle([1, 2, 3, 4])
  const base = [
    [0, 1, 2, 3],
    [2, 3, 0, 1],
    [1, 0, 3, 2],
    [3, 2, 1, 0],
  ]
  const rows = [0, 1, 2, 3]
  if (Math.random() > 0.5) [rows[0], rows[1]] = [rows[1], rows[0]]
  if (Math.random() > 0.5) [rows[2], rows[3]] = [rows[3], rows[2]]
  const cols = [0, 1, 2, 3]
  if (Math.random() > 0.5) [cols[0], cols[1]] = [cols[1], cols[0]]
  if (Math.random() > 0.5) [cols[2], cols[3]] = [cols[3], cols[2]]
  const solved = rows.map((r) => cols.map((c) => digits[base[r][c]]))
  const given: boolean[][] = solved.map((row) => row.map(() => true))
  const cells = shuffle(Array.from({ length: 16 }, (_, i) => i)).slice(0, 8)
  for (const i of cells) given[Math.floor(i / 4)][i % 4] = false
  const start = solved.map((row, r) => row.map((n, c) => (given[r][c] ? n : 0)))
  return { solved, given, start }
}

type Burst = { id: number; glyph: string; x: number; y: number; dx: number; dy: number; rot: number }

export function MiniGridCard() {
  const puzzle = useMemo(() => makePuzzle(), [])
  const [grid, setGrid] = useState(puzzle.start)
  const [bursts, setBursts] = useState<Burst[]>([])
  const [won, setWon] = useState(false)

  const cycle = (r: number, c: number) => {
    if (puzzle.given[r][c] || won) return
    setGrid((prev) => {
      const next = prev.map((row) => [...row])
      next[r][c] = (next[r][c] + 1) % 5
      return next
    })
  }

  useEffect(() => {
    if (won) return
    const complete = grid.every((row, i) => row.every((n, j) => n === puzzle.solved[i][j]))
    if (!complete) return
    setWon(true)
    setBursts(
      Array.from({ length: 28 }, (_, k) => ({
        id: k,
        glyph: SIGNS[k % SIGNS.length],
        x: 50,
        y: 42,
        dx: (Math.random() - 0.5) * 280,
        dy: -40 - Math.random() * 180,
        rot: (Math.random() - 0.5) * 540,
      })),
    )
  }, [grid, won, puzzle.solved])

  return (
    <article className="site-card hud-frame relative overflow-hidden">
      <div className="relative z-[1] p-4">
        <div className="relative mx-auto grid w-[min(100%,220px)] grid-cols-4 gap-0 border border-[var(--color-accent)]">
          {grid.map((row, r) =>
            row.map((n, c) => {
              const box = (Math.floor(r / 2) + Math.floor(c / 2)) % 2 === 0
              return (
                <button
                  key={`${r}-${c}`}
                  type="button"
                  onClick={() => cycle(r, c)}
                  className={`aspect-square border border-[var(--color-line)] font-mono text-lg ${
                    c === 1 ? 'border-r-[var(--color-accent)]' : ''
                  } ${r === 1 ? 'border-b-[var(--color-accent)]' : ''} ${
                    puzzle.given[r][c] ? 'text-[var(--color-ink)]' : 'text-[var(--color-accent)]'
                  } ${box ? 'bg-[var(--color-ground-2)]' : 'bg-[var(--color-panel)]'}`}
                  aria-label={`cell ${r + 1} ${c + 1}`}
                >
                  {n || ''}
                </button>
              )
            }),
          )}
        </div>
        {bursts.map((b) => (
          <span
            key={b.id}
            className="mini-burst pointer-events-none absolute z-[4] font-mono text-[var(--color-accent)]"
            style={
              {
                left: `${b.x}%`,
                top: `${b.y}%`,
                '--dx': `${b.dx}px`,
                '--dy': `${b.dy}px`,
                '--rot': `${b.rot}deg`,
              } as CSSProperties
            }
          >
            {b.glyph}
          </span>
        ))}
      </div>
      <p className="relative z-[1] border-t border-[var(--color-line)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
        {won ? 'Solved. Thank you for viewing my website!' : 'Thank you for viewing my website!'}
      </p>
    </article>
  )
}
