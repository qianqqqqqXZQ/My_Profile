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

- Research-interest copy is defined in the localized `pageCopy` object in `src/pages/ExperiencePage.jsx`.
- The `focusLines` arrays render as individual display lines in the `research-focus-card` section.
- Check line lengths on desktop and mobile after changing this copy, since each item maps to a displayed line.
- Working-experience records are defined in `src/content/siteContent.js`; `getLocalizedValue` uses a `fieldZh` value for Chinese when present, otherwise falls back to English.
