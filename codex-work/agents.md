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
- The first two campus activity entries in `generated-site/src/content/siteContent.js` now display `Zhang Shu Senior High School Student Union / President` and `University of Nottingham Ningbo China Student Union / Public Relation Office`.
- Latest verification commands run for the campus activity title update: `npm run lint` and `npm run build`.
- The `Profile` page campus activities section now uses `Experience` as the eyebrow, `Campus Activities` as the main heading, and a lower-spaced intro paragraph describing the campus activities and optional photo galleries.
- Latest verification commands run for the profile campus activities header update: `npm run build`, then `npm run lint` rerun separately after an initial lint/build parallel-run timestamp race.
- The `Profile` hero background now covers the full Campus Activities area by placing that section inside the profile `HeroBackground` container. This replaced the earlier numeric overflow extension, which could be limited by canvas and stacking-context behavior. The section still appears immediately after the hero and reaches through the Shuffle Crew card.
- Latest verification commands run for the profile hero background extension: `npm run lint` and `npm run build`.
- The follow-up fix for the profile background disappearing on scroll moved the visibility observer from the hero-only section to the full HeroBackground scope. The earlier observer paused `Waves` after the hero left the viewport, and the pause transition cleared the canvas before any new frame was drawn.
- Latest verification commands run for the profile background scroll fix: `npm run lint` and `npm run build`.
- `generated-site/src/App.css` now gives `.page-profile #campus-activities` extra responsive top padding so the Profile first viewport does not reveal Activity/Campus Activities wording while keeping that section inside the hero background.
- Latest verification commands run for the profile activity spacing task: `npm run lint`, `npm run build`, and Chrome headless screenshots at 1440x900 and 390x844.
- `generated-site/src/pages/ProfilePage.jsx` now keeps all Profile page sections inside the shared `HeroBackground` scope, so the animated Waves background covers Profile hero, Campus Activities, Off-Campus Activities, and Strengths instead of stopping after Campus Activities.
- Latest verification commands run for the full-profile background task: `npm run lint`, `npm run build`, and a Playwright full-page Chrome screenshot at `codex-work/screenshots/profile-full-page-background.png`.
- The `Experience` page research module now uses `Research` as the section eyebrow, `Research Experience` as the heading, and an intro that directs users to click `View details` for specifics.
- Research cards now place `View details` directly after the supervisor line. Focus tags are rendered only when a `focus` value exists, and the current Edge/Dynamic research entries intentionally omit those tags.
- The Dynamic Dual-Branch keyword spotting entry links `Prof. Heng Yu` to `https://research.nottingham.edu.cn/en/persons/heng-yu/`.
- Latest verification commands run for the experience research module update: `npm run lint` and `npm run build`.
- The research module follow-up uses `.section-header--research` to lower only that intro paragraph and gives `.research-card-action` a left offset so `View details` sits to the right of the supervisor line; mobile reduces the offset.
- Latest verification commands run for the experience research layout follow-up: `npm run lint` and `npm run build`.
- The `Experience` page project module intentionally contains only one placeholder entry: `UNNC Group Research Project (GRP)`, dated `Oct 2026 - Jun 2027`, because the project has not started yet.
- Do not add completed-project language or additional project cards unless the user provides real project details.
- Latest verification commands run for the UNNC GRP placeholder task: `npm run lint` and `npm run build`.
- Both entries in `researchExperience` now include the University of Nottingham SVG logo URL supplied by the user. `generated-site/src/pages/ExperiencePage.jsx` renders it inside `.research-card-logo-shell` on the right side of each detailed research card, with a single-column mobile fallback.
- Latest verification commands run for the Nottingham research logo task: `npm run lint` and `npm run build`.
- `generated-site/src/components/HomeLanguageSelector.jsx` exports the shared `FlagIcon` SVG component. `generated-site/src/components/SiteLayout.jsx` reuses it in the topbar language switcher so the buttons show the US and China flags instead of `EN` and `ZH`.
- Latest verification commands run for the topbar flag language switcher task: `npm run lint` and `npm run build`.
- The `Experience` page keeps the detailed Research, Working, and Project modules as separate sections below the top timeline.
- Only the top `Timeline` area is unified: it lists project, research, and working entries chronologically with a small type badge (`Project`, `Research`, or `Working`) and no logos, detail buttons, or modal behavior.
- Latest verification commands run for the simple experience timeline task: `npm run lint` and `npm run build`.
- The `Experience` page Research Focus paragraph is split into three explicit desktop lines using inline spans inside `.research-focus-text`; mobile switches those spans back to inline so the paragraph can wrap naturally.
- Latest verification commands run for the Research Focus three-line copy task: `npm run lint` and `npm run build`.
- `generated-site/src/App.jsx` now passes the global `homeLanguage` state into `ExperiencePage`.
- `generated-site/src/components/SiteLayout.jsx` enables the topbar flag language switcher on both `/contact` and `/experience`; other topbar routes still show disabled language buttons.
- `generated-site/src/pages/ExperiencePage.jsx` localizes the Experience hero, Research Focus, unified timeline, Research, Working, Project, and research-detail modal copy from a local `pageCopy` map.
- `generated-site/src/content/siteContent.js` keeps English experience fields as the source fields and adds `*Zh` variants plus `sortValue` for project, research, and working entries. The timeline uses `sortValue` so Chinese date strings do not affect ordering.
- Latest verification commands run for the Experience Chinese mode task: `npm run lint` and `npm run build`.
- Follow-up Chinese copy fix: `ExperiencePage.jsx` keeps `Hello World!` in English for the Chinese hero while translating the following hero lines; `siteContent.js` adds `companyZh: '小马智行'` and the Experience timeline/work card renders localized company names. Latest verification commands: `npm run lint` and `npm run build`.

## Dance Hero

- `generated-site/src/pages/DancePage.jsx` now starts with a text-free full-viewport video hero instead of the shared `PageBanner`.
- The dance hero video lives at `generated-site/public/generated/dance/dance-hero.mp4` and is referenced as `/generated/dance/dance-hero.mp4`.
- The provided source video was HEVC/H.265, which rendered black in Chromium. The site copy was transcoded to H.264 with no audio for browser-safe autoplay background use; the original desktop source file was not changed.
- Latest verification commands run for the dance video hero task: `npm run lint`, `npm run build`, HTTP 200 checks for `/dance` and `/generated/dance/dance-hero.mp4`, and Playwright screenshots at `codex-work/screenshots/dance-hero-desktop.png` and `codex-work/screenshots/dance-hero-mobile.png`.

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

## Homepage Language Recommendation

- `generated-site/src/components/HomeLanguageSelector.jsx` shows a two-line recommendation beside the homepage language selector.
- The recommendation text is `Recommended: use the English version first` on the first line and `推荐优先使用英文版本` on the second line, with no slash separator.
- `generated-site/src/App.css` styles `.home-language-recommendation` as a compact glass pill; the Chinese line is centered with `.home-language-recommendation span + span`.
- Latest verification commands run for this task: `npm run lint` and `npm run build`.
