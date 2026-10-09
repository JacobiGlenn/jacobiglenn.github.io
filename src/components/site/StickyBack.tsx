import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export function StickyBack({ to, label = '← Back' }: { to: string; label?: string }) {
  const navigate = useNavigate()
  return (
    <div className="sticky top-20 z-30 -mx-1 mb-4 w-fit bg-[color-mix(in_srgb,var(--color-ground)_78%,transparent)] p-1 backdrop-blur-sm">
      <Button
        size="sm"
        onClick={() => {
          const idx = window.history.state?.idx ?? 0
          if (idx > 0) navigate(-1)
          else navigate(to)
        }}
      >
        {label}
      </Button>
    </div>
  )
}
