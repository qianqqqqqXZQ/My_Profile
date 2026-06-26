# Personal CV Website

This repository contains a personal portfolio / CV website built with React and Vite.
The main application lives in `generated-site/`, while workflow notes are stored in
`workspace-meta/` so they do not clutter the app source tree.

## Project Structure

- `src/pages/`: route-level pages
- `src/components/`: shared UI, animation, and interaction components
- `src/content/siteContent.js`: route content and structured display data
- `public/`: static assets served directly by Vite
- `src/assets/`: imported app assets bundled with the site

## Development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm run build
```

## Notes

- The site uses route-based background audio with two music groups.
- Several pages use custom animated backgrounds, including a Three.js contact globe.
- Local workflow documents such as `plans.md` and `agents.md` are intentionally kept in `workspace-meta/`.
