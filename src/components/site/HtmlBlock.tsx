function absolutizeMedia(html: string) {
  return html.replace(/\s(src|poster)=(["'])(?!https?:|\/\/|\/|data:)([^"']+)\2/gi, (_m, attr: string, q: string, val: string) => {
    const clean = val.replace(/^\.\//, '')
    return ` ${attr}=${q}/${clean}${q}`
  })
}

export function HtmlBlock({ html, className = '' }: { html: string; className?: string }) {
  return <div className={`prose-html ${className}`} dangerouslySetInnerHTML={{ __html: absolutizeMedia(html) }} />
}
