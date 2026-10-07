import { HEAD_ASCII_RAW } from './ascii-raw'

const lines = HEAD_ASCII_RAW.split('\n').filter((line) => line.trim().length > 0)
const indents = lines.map((l) => (l.match(/^ */) || [''])[0].length)
const minIndent = indents.length ? Math.min(...indents) : 0
const leftTrimmed = lines.map((l) => l.slice(minIndent))
let rightMost = 0
for (const line of leftTrimmed) {
  const coreLen = line.replace(/\s+$/g, '').length
  if (coreLen > rightMost) rightMost = coreLen
}
export const HEAD_ASCII_BASE = leftTrimmed.map((l) => l.slice(0, rightMost))

export function renderHeadFrame(phase: number) {
  const trimmed = HEAD_ASCII_BASE
  const width = rightMost
  const h = trimmed.length
  const mid = (h - 1) / 2
  let out = ''
  for (let row = 0; row < h; row++) {
    const line = trimmed[row].padEnd(width, ' ')
    const y = mid === 0 ? 0 : (row - mid) / mid
    const bandShift = Math.floor(phase * Math.cos(y * (Math.PI / 2))) % width
    const rotated = bandShift >= 0 ? line.slice(bandShift) + line.slice(0, bandShift) : line
    out += rotated + (row < h - 1 ? '\n' : '')
  }
  return out
}
