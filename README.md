# Ziqian Xiong | Personal CV & Portfolio

An interactive personal CV and portfolio website for Ziqian Xiong, a Computer Science student at the University of Nottingham Ningbo China. The site combines structured academic and activity information with a visual, motion-focused presentation.

## What This Project Contains

- A home introduction with English and Chinese copy, a language selector, and a gated navigation experience.
- A **Profile** page with personal highlights, campus activities, leadership experience, and the Shuffle Crew performance gallery.
- An **Academic** page covering research, project, work, and other development experience, with bilingual content where available.
- A **Dance Videos** page with an autoplaying hero video and dance-related media content.
- A **Contact** page with Gmail, Outlook, GitHub, and WeChat contact options. The WeChat card opens a QR-code modal.
- Shared background audio with a global mute/unmute control.
- Motion and 3D presentation effects, including GSAP transitions, animated visual backgrounds, a Three.js contact globe, and interactive card treatments.

## Routes

| Path | Purpose |
| --- | --- |
| `/` | Home introduction and language selection |
| `/profile` | Personal profile and campus activities |
| `/experience` | Academic, research, project, and work experience |
| `/dance` | Dance video and performance content |
| `/contact` | Contact links and WeChat QR code |
| `/ready` | Internal route selector opened from the home CTA |

Unknown paths are redirected to `/`.

## Tech Stack

- React 18 and React Router 6
- Vite 5 for development and production bundling
- Three.js, React Three Fiber, Drei, and OGL for interactive visual scenes
- GSAP, Motion, and related components for transitions and interaction
- ESLint 9 with React and React Hooks rules

## Project Structure

```text
.
|-- public/
|   `-- media/             # Audio, video, globe textures/data, and gallery images
|-- src/
|   |-- assets/            # Assets imported through the Vite module graph
|   |-- components/        # Shared layout, audio, animation, 3D, and UI components
|   |-- content/           # Route content and bilingual copy (siteContent.js)
|   |-- pages/             # Home, Profile, Academic, Dance, and Contact routes
|   `-- styles/            # Global and application-level styles
|-- index.html
|-- package.json
`-- vite.config.js
```

## Local Development

### Requirements

- Node.js 18 or newer
- npm

### Install and start the development server

```bash
npm install
npm run dev
```

Vite will print the local URL, normally `http://localhost:5173`.

### Available scripts

```bash
npm run dev      # Start the Vite development server
npm run lint     # Run ESLint across the project
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build locally
```

This repository does not currently include an automated unit or end-to-end test suite. The expected validation for a change is therefore `npm run lint` followed by `npm run build`, plus manual browser checks for the affected route and its media-heavy interactions.

## Content and Media Notes

- Route copy is centralized in `src/content/siteContent.js`; update that file when changing profile, experience, contact, or bilingual text.
- Files under `public/media/` are served at the site root, so `/media/...` URLs are used for video, audio, globe, and gallery assets.
- Imported assets such as the profile portrait and WeChat QR code live under `src/assets/` and are bundled by Vite.
- Background audio is shared across routes. Browsers may require the first user interaction before audio can play.
- The Contact page defers and lazy-loads the globe scene so the initial hero content can render before the WebGL scene is initialized.

## Production Build

Run `npm run build` to generate the deployable static output in `dist/`. The project is a client-side React application, so a host should serve `index.html` as the fallback for the routes listed above when history-based navigation is enabled.

## License

## Acknowledgements
