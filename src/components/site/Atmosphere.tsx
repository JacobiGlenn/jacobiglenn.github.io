export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="hud-grid" />
      <div className="hud-beams" />
      <div className="hud-vignette" />
      <div className="scanlines opacity-40" />
    </div>
  )
}
