import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export function StickyBack({ to, label = '← Back' }: { to: string; label?: string }) {
  return (
    <div className="sticky top-20 z-30 -mx-1 mb-4 w-fit bg-[color-mix(in_srgb,var(--color-ground)_78%,transparent)] p-1 backdrop-blur-sm">
      <Button asChild size="sm">
        <Link to={to}>{label}</Link>
      </Button>
    </div>
  )
}
