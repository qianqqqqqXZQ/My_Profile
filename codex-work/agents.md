# Project Notes

## Overview

This repository contains a personal CV website. The active frontend lives in `generated-site/` and is built with Vite + React.

## Structure

- `generated-site/`: React application and build output.
- `generated-site/public/`: static assets copied directly into the build.
- `generated-site/src/`: app code and components.
- `codex-work/`: Codex-maintained working notes such as plans and agent context.

## Run And Test

- Dev server: `npm run dev`
- Production build: `npm run build`
- Lint: `npm run lint`

Run commands from `C:\Users\asus\Desktop\My_CV\generated-site`.

## Current Asset Rule

- Keep Codex-generated planning files inside `codex-work/`.
- Keep generated site assets for this task inside `generated-site/public/generated/`.
- The favicon is currently referenced from `generated-site/index.html`.

## UI Notes

- `generated-site/src/pages/ReadyPage.jsx` now renders its four navigation cards with the reflective `BorderGlow` treatment.
- `generated-site/src/pages/ContactPage.jsx` now reuses `generated-site/src/components/ReadyChromaGrid.jsx` so the four contact cards inherit the colored hover/follow-light effect while keeping their original link and modal behaviors.
- Latest verification commands run for the card swap: `npm run build` and `npm run lint`.
- `generated-site/src/components/ContactBrandIcon.jsx` now contains rebuilt SVG variants for Gmail, Outlook, GitHub, and WeChat with monochrome idle rendering and chroma-triggered brand-color reveal on the contact page.
- `generated-site/src/pages/ContactPage.jsx` injects a dedicated card theme order for the contact grid: Gmail red, Outlook blue, GitHub gold, WeChat green. `generated-site/src/pages/ReadyPage.jsx` still uses the original shared palette.
- The contact-card chroma palette and the contact logos are intentionally decoupled: card hover rendering follows the requested four card colors, while each SVG logo always shows its own native brand appearance.

## Favicon Task Output

- Active favicon assets for the Stardew-inspired bear head:
  - `generated-site/public/generated/favicon-bear-stardew-master.png`
  - `generated-site/public/generated/favicon-bear-stardew-32.png`
  - `generated-site/public/generated/favicon-bear-stardew-16.png`
  - `generated-site/public/generated/favicon-bear-stardew.ico`
  - `generated-site/public/generated/favicon-bear-stardew-preview.png`
- The favicon generation script lives at `codex-work/scripts/generate_bear_favicon.py` and uses the provided local photo as a color reference.
- `generated-site/index.html` now points at `/generated/favicon-bear-stardew-32.png` and `/generated/favicon-bear-stardew.ico`.
- Latest verification command run for the favicon refresh: `npm run build`
