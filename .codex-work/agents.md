# Project Memo

## Overview

`My_CV_new` is a Vite + React personal CV site with routed pages for Home, Profile, Experience, Ready, Dance, and Contact. The Experience page is implemented in `src/pages/ExperiencePage.jsx` and shares page styling from `src/styles/App.css`.

## Structure

- `src/pages/`: route-level page components.
- `src/components/`: reusable visual and animation components. `FadeContent.jsx` uses GSAP ScrollTrigger for one-time scroll reveals.
- `src/content/`: localized page content.
- `src/styles/`: global and route styling.
- `.codex-work/`: task plans and project notes.

## Commands

- `npm run dev` starts the Vite development server.
- `npm run lint` runs ESLint.
- `npm run build` creates the production bundle.

## Working Notes

- The current task adds the `4DGS-Edit-and-Compare` personal project before the GRP entry in `projectExperience`, with English/Chinese copy and a GitHub link button rendered by `ExperiencePage.jsx`.

- Research-interest copy is defined in the localized `pageCopy` object in `src/pages/ExperiencePage.jsx`.
- The `focusLines` arrays render as individual display lines in the `research-focus-card` section.
- Check line lengths on desktop and mobile after changing this copy, since each item maps to a displayed line.
- Working-experience records are defined in `src/content/siteContent.js`; `getLocalizedValue` uses a `fieldZh` value for Chinese when present, otherwise falls back to English.
- The Pony.ai working-experience title is localized through `role` and `roleZh`; keep these fields synchronized when changing the displayed job title.

## Profile Cover Full-Image Preview (2026-09-16)

- Static Profile activity covers are rendered in `src/pages/ProfilePage.jsx`; clicking one sets `activePhoto` and opens the single-image modal.
- Multi-photo activities continue to use `activeGallery` and the existing `Stack` component.
- The full-image modal styles are in `src/styles/App.css` under `.campus-gallery-modal--image` and use `object-fit: contain` so poster edges remain visible.
- Both English and Chinese labels for opening and closing the full image are defined in `profilePageContent.gallery` in `src/content/siteContent.js`.
