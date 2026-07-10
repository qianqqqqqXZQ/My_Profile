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

Run commands from `C:\Users\asus\Desktop\My_CV_new\generated-site`.

## Current Asset Rule

- Keep Codex-generated planning files inside `codex-work/`.
- Keep generated site assets for this task inside `generated-site/public/generated/`.
- The favicon is currently referenced from `generated-site/index.html`.

## UI Notes

- `generated-site/src/components/ProfileLanyard.jsx` renders the profile-page lanyard card and now sources its portrait image from `img/profile-card-photo.jpg`.
- Latest verification commands run for the profile card photo swap: `npm run lint` and `npm run build`.
- The current source photo is high resolution; the production build emits `profile-card-photo-*.jpg` at roughly 3.8 MB, so image compression is the main remaining optimization if page weight becomes a concern.
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
- `generated-site/src/components/SiteLayout.jsx` now renders a text-only `Back to start` button at the left side of the fixed topbar, ahead of the language switcher, and it routes to `/`.
- The shared header styling for that button lives in `generated-site/src/App.css` and intentionally uses the same glass-metal treatment as the rest of the topbar without any iconography.
- Latest verification commands run for the topbar back-button task: `npm run lint` and `npm run build`.
- The `UNNC Department of Campus Life / Administrative Intern` profile card uses a static cover image sourced from `generated-site/public/generated/unnc-intern/department-of-campus-life.jpg`.
- Latest verification commands run for the UNNC intern photo task: `npm run lint` and `npm run build`.
- Campus activity media now separates static `coverPhoto` images from gallery `photos` in `generated-site/src/pages/ProfilePage.jsx`; only entries with `photos` render the `Open gallery` button and modal behavior.
- Zhangshu Middle School, UNNC Students Union, and Shuffle Crew logo covers live in `generated-site/public/generated/campus-activity-covers/` as 16:10 images. Zhangshu and UNNC Students Union are white expanded covers; Shuffle Crew is a black expanded cover.
- The DCL card now uses its existing `department-of-campus-life.jpg` as a static `coverPhoto`, so the gallery is disabled for that card.
- The Shuffle Crew card uses `shuffle-crew-cover.jpg` as the visible cover while the gallery still opens the original `shuffle-crew-01.jpg` through `shuffle-crew-17.jpg` photos only.
- Latest verification commands run for the campus activity logo cover task: `npm run lint` and `npm run build`.
- The Shuffle Crew entry now uses a custom `galleryLabel` (`View my performance photo`) and `linkAfterBulletIndex` to render the Douyin `View the video` link directly after the performance-view bullet instead of below the whole card.
- Latest verification commands run for the Shuffle Crew copy refinement task: `npm run lint` and `npm run build`.

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
