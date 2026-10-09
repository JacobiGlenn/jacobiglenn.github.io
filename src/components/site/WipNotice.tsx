import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export function WipNotice({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <button type="button" className="absolute inset-0 bg-[#020403]/70" aria-label="Close" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="wip-notice-title"
        className="relative z-[81] w-[min(22rem,100%)] border border-[var(--color-accent)] bg-[var(--color-panel)] p-5 shadow-[0_0_40px_rgba(197,242,64,0.12)]"
      >
        <p id="wip-notice-title" className="text-sm leading-relaxed text-[var(--color-ink)]">
          This is a work in progress, come back later.
        </p>
        <Button type="button" size="sm" className="mt-4" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>,
    document.body,
  )
}
