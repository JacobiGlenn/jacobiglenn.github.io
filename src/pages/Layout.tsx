import { Atmosphere, SideRail, StatusBar } from '@/components/site/Atmosphere'
import { HudNav } from '@/components/site/HudNav'
import { Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div className="relative min-h-dvh bg-[var(--color-ground)] text-[var(--color-ink)]">
      <Atmosphere />
      <HudNav />
      <div className="relative z-[1] grid pb-10 lg:grid-cols-[168px_minmax(0,1fr)_168px] xl:grid-cols-[210px_minmax(0,1fr)_210px]">
        <SideRail side="left" />
        <main className="min-w-0">
          <Outlet />
        </main>
        <SideRail side="right" />
      </div>
      <StatusBar />
    </div>
  )
}
