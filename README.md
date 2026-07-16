# Personal CV Website

This repository contains a personal portfolio / CV website built with React and Vite.

## Repository Layout

- `src/pages/`: route-level pages
- `src/components/`: shared UI, animation, audio, and interaction components
- `src/content/siteContent.js`: structured content used by the routes
- `src/assets/`: imported assets bundled by Vite
- `src/styles/`: global application styles
- `public/`: static assets served directly by Vite
- `public/media/`: public audio, video, image, and contact globe assets

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

- The site uses route-based background audio with shared playback state.
- Several routes use custom animated visuals, including a Three.js contact globe.
