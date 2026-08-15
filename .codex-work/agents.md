# Project Memo

## Overview

`My_CV_new` is a Vite + React personal CV site with routed pages for Home, Profile, Experience, Ready, Dance, and Contact. The Profile page is implemented in `src/pages/ProfilePage.jsx` and shares page styling from `src/styles/App.css`.

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

- Profile activity cards are rendered by `renderActivityEntries` in `ProfilePage.jsx` for both Campus Activities and Social Activities.
- Activity cards use `FadeContent` with alternating `initialX` values so each card enters from the opposite side as it reaches the viewport.
- Keep scroll animations one-time, keyboard/accessibility friendly, responsive, and disabled for users who prefer reduced motion.
