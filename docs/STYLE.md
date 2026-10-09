# Design language

## Type

Google Fonts:

- `--font-display`: **Big Shoulders Display** (headers)
- `--font-ui`: **Tektur** (body, nav)
- `--font-mono`: **IBM Plex Mono** (HUD, terminal, dates)

## Color

- Ground: `#070908` with panel `#0e1410`
- Ink: `#efe8d6` / muted `#b7b09a`
- Accent: `#c5f240`
- Steel: `#7ec8c8` for links
- Alert: `#ff6a2a` for awards and errors
- Lines: `#243028`

Readable mode (`html[data-readable="on"]`) switches to white / black / Arial.

## Surfaces

Cards let photography show through the header band. Failed images use `placeholderDataUri()`. Hover = brighter border + 1px lift. Focus rings use accent colors.

## Components

shadcn-style Button and Dialog, restyled. Site-specific: `HudNav`, `SiteCard`, `PhotoStack`, `ButtonCarousel`, `AwardRail`.
