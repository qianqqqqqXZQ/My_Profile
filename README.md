# Personal CV Website

This repository contains a personal portfolio / CV website built with React and Vite.
The public-facing app lives in `generated-site/`.

## Repository Layout

- `generated-site/`: main application source, static assets, and Vite configuration
- `generated-site/src/pages/`: route-level pages
- `generated-site/src/components/`: shared UI, animation, audio, and interaction components
- `generated-site/src/content/siteContent.js`: structured content used by the routes
- `generated-site/public/`: static assets served directly by Vite

## Development

```bash
cd generated-site
npm install
npm run dev
```

## Validation

```bash
cd generated-site
npm run lint
npm run build
```

## Notes

- The site uses route-based background audio with shared playback state.
- Several routes use custom animated visuals, including a Three.js contact globe.
- Internal workflow notes are kept out of the public repository surface.
