import { Button } from '@/components/ui/button'
import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

export function Lightbox({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 md:p-6">
      <button type="button" className="absolute inset-0 bg-[#020403]/88 backdrop-blur-[2px]" aria-label="Close overlay" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-[81] flex max-h-[90vh] w-[min(920px,100%)] flex-col overflow-hidden border border-[var(--color-accent)] bg-[var(--color-panel)] shadow-[0_0_80px_rgba(197,242,64,0.16)]"
      >
        <div className="flex items-center justify-between gap-3 border-b border-[var(--color-line)] px-4 py-3">
          <p className="min-w-0 truncate font-[family-name:var(--font-display)] text-xl uppercase tracking-wide">{title}</p>
          <Button type="button" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
        <div className="min-h-0 flex-1 overflow-auto p-4">{children}</div>
      </div>
    </div>,
    document.body,
  )
}
