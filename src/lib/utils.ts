import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function placeholderDataUri(title: string) {
  const safe = title.replace(/[<>&]/g, '')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
    <defs>
      <pattern id="s" width="8" height="8" patternUnits="userSpaceOnUse">
        <rect width="8" height="8" fill="#0c100d"/>
        <rect width="8" height="1" fill="#1a241c"/>
      </pattern>
    </defs>
    <rect width="640" height="360" fill="url(#s)"/>
    <rect x="12" y="12" width="616" height="336" fill="none" stroke="#c5f240" stroke-width="1" opacity="0.5"/>
    <text x="32" y="48" fill="#8a9a8e" font-family="IBM Plex Mono, monospace" font-size="12">IMG // OFFLINE</text>
    <text x="32" y="190" fill="#e8eee9" font-family="Tektur, sans-serif" font-size="28">${safe.slice(0, 42)}</text>
  </svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}
