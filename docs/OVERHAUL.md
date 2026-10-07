# Overhaul notes

Design choices, architectural change, and why Vite is in the stack.

## Why Vite + React (and why it is not a cost)

The previous site was a single `index.html` with thousands of lines of CSS and JS. Fast to open, painful to restyle holistically: every card, modal, and page had its own one-off markup. Adding a project already needed a Node generator; the “no build” story was already over.

Vite is a **bundler for a static site**, not a paid host. GitHub Pages is still free. React and shadcn/ui are free. The deploy artifact is still HTML, CSS, and JS. Visitors do not run a server.

What actually changed for shipping:

- Content still lives in folders and JSON; generators still write files you commit or CI rebuilds.
- Components share one HUD theme, so project pages, blog modals, and experience galleries do not drift back to the old light-gray cards.
- `npm run dev` hot-reloads. Production is `dist/` on Pages.

Tradeoff: first paint downloads a JS bundle instead of one giant HTML file. For a portfolio that is the right trade: maintainability and a complete visual language beat micro-optimizing a 4k-line file.

## Design

Marathon, Blade Runner, Neuromancer, and Evangelion are **references**. We did not copy Marathon Shapiro, scrape their webfonts, or use Matrix rain.

Type (all Google Fonts, no paid licenses):

- **Big Shoulders Display** — tall condensed headers
- **Tektur** — UI / body
- **IBM Plex Mono** — HUD labels, terminal, metadata

Ink on black is cream (`#efe8d6`), not neon white, so long reading does not sting. Accent is acid lime (`#c5f240`). Surfaces are hairline frames with corner ticks. Photography shows through card headers; broken images get a scan-texture placeholder.

The navbar is a **command deck**, not a list of underlined links: clipped seal + logo, segmented modules, Design / Dev as a split cell, live clock, Readable toggle.

**Readable** is the employer/accessibility escape hatch: white background, black text, Arial. Theme stays cyberpunk by default.

Motion: short boot, no guest-number sequence, no typewriter dump. Carousels move with **buttons**, not wheel hijack.

## Features kept vs cut

Kept: terminal commands (HELP, ABOUT, PROJECTS, EXP, SPIN, TIME, WISDOM, ROLL, 8BALL, CLS), skip for return visits, logo, featured work, designer/developer split, experience photo stacks and skill chips, education cards, honors, blog articles + LinkedIn + YouTube, likes/stats when keys exist, `cgg` bypass.

Cut: CRS glitch site, Flappy, sketchpad, code rain, ocean, contemporary-UI-patch popup, guest counter, About page (goals + contact moved to Home), CollIDE as a published project (`draft: true`).

## Content systems

Unchanged in spirit, documented in the README and `folderlogic.txt` / `bloglogic.txt` / `experiencelogic.txt`. Experience can also ingest a LinkedIn `Positions.csv` without deleting your photos.
