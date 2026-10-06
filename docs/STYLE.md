# Design language

Jacobi Glenn portfolio visual system. Marathon, Blade Runner, Neuromancer, and Evangelion are **references**, not templates. Do not copy Marathon Shapiro, scrape Bungie webfonts, or use Matrix rain.

## Type

Free Google Fonts only (no paid licenses):

- `--font-display`: **Big Shoulders Display** (headers)
- `--font-ui`: **Tektur** (body, nav)
- `--font-mono`: **IBM Plex Mono** (HUD, terminal, dates)

Tokens live in `src/index.css`. Cream ink `#efe8d6` on near-black ground.

## Color

- Ground: `#070908` with panel `#0e1410`
- Ink: `#efe8d6` / muted `#b7b09a`
- Accent: `#c5f240`
- Steel: `#7ec8c8` for links
- Alert: `#ff6a2a` for awards and errors — rare, not a second theme
- Lines: `#243028`

Readable mode (`html[data-readable="on"]`) switches to white / black / Arial.

## Surfaces

Cards let photography show through the header band. Failed images use `placeholderDataUri()`. Hover = brighter border + 1px lift. Focus rings use accent.

## Motion

CRT scanlines only on the terminal, and only if `prefers-reduced-motion` is unset. Boot text is short. Carousels use arrow buttons.

## Components

shadcn-style Button and Dialog, restyled. Site-specific: `HudNav`, `SiteCard`, `PhotoStack`, `ButtonCarousel`, `AwardRail`.
