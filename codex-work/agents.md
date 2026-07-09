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
- `generated-site/src/pages/ProfilePage.jsx` now upgrades only the `Shuffle Crew / Vice Captain` campus activity entry from a placeholder frame to a single clickable cover photo.
- Clicking that single side photo now opens a full gallery modal whose main interaction is a local `generated-site/src/components/Stack.jsx` card stack powered by the `motion` package.
- The expanded gallery no longer uses the previous previous/next buttons or thumbnail filmstrip; users browse by clicking or dragging the top stack card.
- Shuffle Crew gallery assets now live in `generated-site/public/generated/shuffle-crew/`, and the corresponding `photos` array is stored on the Shuffle Crew item in `generated-site/src/content/siteContent.js`.
- The stack cards use a fixed outer frame with `object-fit: contain` and a blurred same-image backdrop so mixed portrait and landscape photos remain fully visible.
- Latest verification commands run for the Shuffle Crew gallery update: `npm run lint` and `npm run build`.
- The Shuffle Crew gallery now includes four additional images at `shuffle-crew-14.jpg` through `shuffle-crew-17.jpg`, covering both outdoor showcase and stage-performance shots supplied on 2026-07-09.
- Latest verification commands run for the additional Shuffle Crew photos task: `npm run lint` and `npm run build`.
- `generated-site/src/pages/ProfilePage.jsx` now renders a second profile section, `Off-Campus Activities`, immediately after `Campus Activities`, reusing the same activity-card layout.
- The new off-campus section is backed by `offCampusActivities` in `generated-site/src/content/siteContent.js`, which is currently an empty array and therefore shows an intentional empty-state card instead of fabricated experience content.
- Latest verification commands run for the off-campus activities section task: `npm run lint` and `npm run build`.

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
