import { useState, type CSSProperties } from 'react'
import { placeholderDataUri } from '@/lib/utils'

export function MediaImage({
  src,
  alt,
  className,
  style,
}: {
  src?: string
  alt: string
  className?: string
  style?: CSSProperties
}) {
  const [failed, setFailed] = useState(!src)
  const url = failed ? placeholderDataUri(alt) : src
  return (
    <img
      src={url}
      alt={alt}
      className={className}
      style={style}
      onError={() => setFailed(true)}
    />
  )
}

export function assetPath(src: string) {
  if (!src) return ''
  if (src.startsWith('http') || src.startsWith('data:') || src.startsWith('/')) return src
  return `/${src}`
}
