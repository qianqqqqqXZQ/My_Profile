# Ziqian Xiong | Personal CV & Portfolio

[English] | [中文](README.zh-CN.md)

An interactive personal website by Ziqian Xiong, a Computer Science student at the University of Nottingham Ningbo China. It brings academic work, campus life, dance, and contact details together in a bilingual, motion-focused portfolio.

[**Enter the Website**](https://qqqqqprofile.vercel.app)

![Homepage preview](public/media/images/readme/homepage-preview.png)

## Pages

| Page | Route | Purpose |
| --- | --- | --- |
| Profile | `/profile` | Presents non-academic background: basic personal information, activities on and off campus, and a personal photo collection. |
| Academic | `/experience` | Presents academic background, including work experience, research experience, project experience, grades, and completed courses. |
| Dance Videos | `/dance` | Collects dance videos and related media, including performances, battles, cyphers, and other dance content. |
| Contact | `/contact` | Provides ways to get in touch, including GitHub, email, and WeChat. |

The home page (`/`) introduces the site and lets visitors choose English or Chinese. `/ready` is the internal page selector opened by the home-page call to action. Unrecognised routes redirect to `/`.

More pages and features are under active development.

## Features

- English and Chinese content with a shared language switcher.
- Shared background audio with a global mute control.
- Motion-led UI built with GSAP and Motion.
- Interactive visuals including a Three.js contact globe and WebGL-based backgrounds.
- Media galleries for campus activities, personal photos, and dance content.

## Project Structure

```text
.
|-- public/                         # Static files served directly by Vite
|   |-- media/
|   |   |-- audio/                  # Background music files
|   |   |-- contact-globe/          # Globe textures and geographic data
|   |   |-- images/                 # Gallery, activity, Dance, and README images
|   |   `-- video/                  # Browser-ready video files
|   |-- favicon.svg                 # Browser tab icon
|   `-- icons.svg                   # Shared SVG icon sprite
|-- src/                            # Application source code
|   |-- assets/                     # Media imported through the Vite module graph
|   |-- components/                 # Reusable UI, animation, audio, and 3D components
|   |-- content/                    # Centralised route data and bilingual copy
|   |-- pages/                      # Route-level React pages
|   |-- styles/                     # Global and application-level CSS
|   |-- App.jsx                     # Application routes and page composition
|   `-- main.jsx                    # React entry point
|-- codex-work/                     # Local Agent notes, logs, screenshots, and temporary files (ignored)
|-- dist/                           # Generated production build (ignored)
|-- .gitignore                      # Version-control exclusions
|-- eslint.config.js                # ESLint configuration
|-- index.html                      # Vite HTML entry document
|-- LICENSE                         # Reuse and permission terms
|-- package.json                    # Project scripts and dependencies
|-- vercel.json                     # Vercel SPA rewrite configuration
`-- vite.config.js                  # Vite configuration
```

## Tech Stack

- React 18 and React Router 6
- Vite 5
- Three.js, React Three Fiber, Drei, and OGL
- GSAP and Motion
- ESLint 9 with React and React Hooks rules

## Quick Start

### Requirements

- Node.js 18 or later
- npm

### Run locally

```bash
git clone https://github.com/qianqqqqqXZQ/My_Profile.git
cd My_Profile
npm install
npm run dev
```

Open the local address printed by Vite, normally [http://localhost:5173](http://localhost:5173).

### Available commands

```bash
npm run dev      # Start the local development server
npm run lint     # Check the source with ESLint
npm run build    # Create a production build in dist/
npm run preview  # Serve the production build locally
```

## Content and Media

- Update page content and bilingual copy in `src/content/siteContent.js`.
- Place directly served media in `public/media/` and reference it with `/media/...` paths.
- Put assets imported by React components in `src/assets/`.
- The Vercel configuration serves `index.html` as a fallback so React Router routes work after direct navigation or refresh.

## Development Checklist

- [x] Deploy the website on Vercel.
- [x] Develop English and Chinese versions.
- [ ] Enable direct browsing and playback of the dance video collection.

## License

This project is released under the custom terms in [LICENSE](LICENSE). The website structure, layouts, and source code may not be reused without notifying the author and obtaining written permission in advance.
