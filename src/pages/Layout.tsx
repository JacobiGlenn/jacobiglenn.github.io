import { HudNav } from '@/components/site/HudNav'
import { Outlet } from 'react-router-dom'

export function Layout({ readable, setReadable }: { readable: boolean; setReadable: (v: boolean) => void }) {
  return (
    <div className="min-h-dvh bg-[var(--color-ground)] text-[var(--color-ink)]">
      <HudNav readable={readable} setReadable={setReadable} />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
