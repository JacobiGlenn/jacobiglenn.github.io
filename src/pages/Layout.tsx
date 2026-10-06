import { Atmosphere, SideChrome } from '@/components/site/Atmosphere'
import { HudNav } from '@/components/site/HudNav'
import { Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div className="relative min-h-dvh bg-[var(--color-ground)] text-[var(--color-ink)]">
      <Atmosphere />
      <HudNav />
      <SideChrome />
      <main className="relative z-[1] mx-auto w-full max-w-[1280px] px-4 pb-16 pt-2 md:px-8 xl:px-24">
        <Outlet />
      </main>
    </div>
  )
}
