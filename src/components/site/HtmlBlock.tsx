export function HtmlBlock({ html, className = '' }: { html: string; className?: string }) {
  return <div className={`prose-html ${className}`} dangerouslySetInnerHTML={{ __html: html }} />
}
