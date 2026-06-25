# Project Memory

## Project Overview

This repository is used to build a personal resume website. The active site lives in `generated-site/` and uses React + Vite. Workflow and memory documents are stored in `workspace-meta/` so project bookkeeping does not disturb the main app structure.

## Directory Structure

- `generated-site/`: React resume site source, config, and build output
- `generated-site/src/`: application components, page structure, and CSS
- `generated-site/src/components/ProfileLanyard.jsx`: custom hanging card widget used in the hero
- `generated-site/src/components/ProfileLanyard.css`: styling and motion system for the hanging card widget
- `generated-site/src/components/Ferrofluid.jsx`: OGL-based hero background renderer
- `generated-site/src/components/Ferrofluid.css`: absolute-positioned hero background container
- `generated-site/src/components/Waves.jsx`: canvas-based line-wave renderer used in the contact section
- `generated-site/src/components/Waves.css`: absolute-positioned background styles for the `Waves` component
- `img/`: user-provided image assets, currently including `Ziqian.jpg`
- `workspace-meta/`: working documents such as `plans.md` and `agents.md`
- `CV.html`: standalone static resume file in the repo root, separate from the React site

## Current Design Constraints

- Prioritize a polished desktop presentation while keeping the layout responsive
- Maintain the restrained dark high-end technology visual language already established
- Keep the hero section as the primary visual identity area
- Store workflow documents under `workspace-meta/`
- Create a Git backup commit before major UI or structural changes
- After code edits, validate with project checks before marking work complete

## Current Implementation State

- The site has been split into routed pages with a shared layout:
  - `/` Home
  - `/profile` Personal introduction
  - `/experience` Development experience
  - `/dance` Dance video page
  - `/contact` Contact page
- The visitor-facing site copy is fully English, with short portfolio-style content and no internal instruction text
- The document language marker is `en`
- The top navigation now uses `react-router-dom` links with active-state styling instead of in-page anchors
- A shared `SiteLayout` component now owns the fixed frosted header, while `ScrollToTop` resets the viewport on route changes
- The site includes Hero, About, Projects, Strengths, and Contact sections
- The hero uses a fixed frosted-glass navbar, a right-side hanging profile widget, and a local `LiquidEther` fluid background
- The contact section now uses a local React Bits-style `Waves` canvas background layered under a dark scrim so the CTA remains readable and clickable
- The `ProfileLanyard` component now uses a React 18-compatible 3D physics stack:
  - `three`
  - `@react-three/fiber`
  - `@react-three/drei`
  - `@react-three/rapier`
  - `meshline`
- The hero background now depends on:
  - `Waves` for the Profile atmospheric layer
  - `three` for the local `LiquidEther` homepage effect
- The current lanyard behavior now includes:
  - the official React Bits `card.glb` and `lanyard.png` assets stored locally under `generated-site/src/assets/lanyard/`
  - a real rope simulation with connected rigid bodies
  - drag-to-pull interaction and release swing-back motion
  - a page-right hanging composition that reads as a natural hero feature
  - the user's portrait rendered on the card face and the user's name shown in the composition area
  - a larger hero presentation with the anchor hidden above the visible top edge
  - portrait-specific brightness compensation applied during card texture compositing
  - a reduced card scale relative to the enlarged rope so the portrait does not overpower the hero
  - the rope path rendered from the card's top attachment point so the strap visually connects to the card correctly
  - desktop-first stabilization that renders the visible rope through the full chain `fixed -> j1 -> j2 -> j3 -> card attachment`
  - persistent smoothing on all dynamic rope joints so the rendered strap does not twitch when the physics bodies settle
  - clamped drag target movement so fast pointer jumps do not inject extreme impulses into the rope
  - bounded angular-velocity control instead of quaternion-component correction, preserving strong swing while reducing spin artifacts
  - desktop hero overflow and stacking isolation so the lanyard can hang below the hero boundary without being clipped or buried by the next section
- The homepage now uses a local React Bits-style `LiquidEther` background with a restrained light monochrome palette, moderate auto motion, and touch-safe reduced pointer force
- The homepage hero background layer remains non-interactive at the DOM level so CTA buttons and the right-side visual stay clickable
- The contact section is now content-only; the `Waves` background was moved to the hero and removed from `#contact`
- The previous hero signature panel remains below the hero in its own section as supporting context, while the main lanyard stays visually unblocked on the hero right side
- The homepage now includes a top-edge scroll guard so upward wheel, touch, and keyboard scroll cannot reveal blank space above the first screen
- Performance relief notes:
  - `LiquidEther`, `ProfileLanyard`, and `Waves` now pause their animation loops when their sections are offscreen
  - The heavy hero widgets are loaded with `React.lazy` and `Suspense` so the main shell stays lighter on first load
  - The hero lanyard canvas now uses a lower default DPR, and the physics step is slightly softened to reduce per-frame pressure
  - The main bundle is much smaller than before, but `ProfileLanyard` still owns the largest deferred chunk because it includes `three`, `rapier`, and the GLB asset
- The homepage now uses the supplied `LiquidEther` component as its hero background, while the Profile page uses the atmospheric `Waves` treatment behind a left-lanyard / right-headline composition
- The Profile page now keeps contact cards and strengths below the hero so the top section reads as a cleaner, more editorial layout
- The Profile hero `Waves` layer is cursor-reactive again, while the lanyard/widget interaction model was intentionally left unchanged in that pass
- The main nav no longer duplicates `Contact`; the route is exposed only through the standalone right-side contact button
- The Profile hero desktop layout now uses a wider right column and controlled copy offset so the title block sits nearer the center of the right half, while the lanyard remains slightly left-weighted inside the left half
- The Profile hero now overrides the global `h1` scale locally and tightens lead/action/highlight spacing so the right-side title block fits more cleanly within the first desktop viewport
- The Profile hero visual column now sits above the right-side copy in page-level stacking order, while the fixed top navigation remains the highest layer
- The Profile hero lanyard is now detached from the normal desktop two-column flow and positioned as a hero foreground layer, which is intended to keep it visually above the copy instead of competing with the right content block
- The desktop Profile hero now uses a stronger vertical split: the foreground lanyard is lifted further upward while the full right-side copy block is pushed lower, and smaller breakpoints still reset that extra offset
- The current desktop Profile hero offset is intentionally extreme for visual separation: the lanyard sits much higher than the original desktop placement and the entire right-side text block sits much lower, while tablet and mobile continue to collapse back to the standard stacked alignment
- The current desktop Profile hero copy block has been pushed even lower again after the extreme-offset pass, while the raised lanyard position was kept unchanged for asymmetric separation

## Notes About The React Bits Lanyard Reference

The user-provided reference describes the React Bits `Lanyard` component, which depends on:

- `three`
- `meshline`
- `@react-three/fiber`
- `@react-three/drei`
- `@react-three/rapier`
- `card.glb`
- `lanyard.png`

The original `card.glb` and `lanyard.png` assets are now present locally and wired into the component so the implementation matches the React Bits structure more closely while remaining self-contained inside this repo.

## Notes About The Photo Lens Replacement

- `generated-site/src/components/ProfileLanyard.jsx` remains preserved as the original source widget file and was not overwritten
- `generated-site/src/components/PhotoLens.jsx` is the new hero implementation used on the homepage
- `generated-site/src/components/PhotoLens.css` handles the black-backed reveal surface, smooth delayed cursor follow, and echo trail treatment
- The hero now uses the photo lens interaction instead of the hanging lanyard widget, while the rest of the site structure remains unchanged

## Notes About The 2026-06-25 Home Hero Image Swap

- The current homepage hero now uses user-supplied originals copied into `img/home-hero/`
- The final wired assets are:
  - `img/home-hero/person-source.jpg`
  - `img/home-hero/armor-source.jpg`
- The attempted transparent cutout outputs were kept as workspace artifacts only and are not part of the final homepage rendering because the dark armor subject did not separate cleanly from its black background
- `generated-site/src/components/PhotoLens.jsx` now uses the original JPG portrait as the default front layer and the original JPG armor image as the reveal layer
- `generated-site/src/components/PhotoLens.css` is tuned for full-frame image assets again, with adjusted `object-position` values so the face and helmet stay centered in the card
- Validation for this pass should use:
  - `npm run build`
  - `npm run lint` if ESLint's temporary config-file issue is not present; otherwise record the failure mode and keep `build` as the successful hard check

## Notes About The Photo Lens Smoothing Pass

- The cursor-follow path in `generated-site/src/components/PhotoLens.jsx` now runs through a ref-driven RAF loop with direct style updates instead of frame-by-frame React state updates
- The reveal mask, ring, core, and glow are written directly from the animation loop so the cursor tracking stays responsive under fast pointer movement
- The echo trail remains separate from the main cursor position update so it can animate independently without slowing the reveal layer
- The cursor-critical CSS transitions were removed from `generated-site/src/components/PhotoLens.css`; motion now relies on the JS smoothing curve and the browser's native paint pipeline
- The smoothing goal is immediate-but-fluid motion, not a long trailing delay

## Run And Test

```powershell
cd "C:\Users\asus\Desktop\My_CV\generated-site"
npm install
npm run dev
npm run lint
npm run build
```

If PowerShell has trouble spawning `npm`, set:

```powershell
$env:ComSpec='C:\Windows\System32\cmd.exe'
$env:SystemRoot='C:\Windows'
$env:windir='C:\Windows'
```

## Working Rules

- Do not revert unrelated user changes
- Use `apply_patch` for manual file edits
- Run at least `npm run lint` or `npm run build` after code changes
- Update `workspace-meta/plans.md` after verification
- Perform a quick self-review before handing off work
- Keep route-based page content in `generated-site/src/pages/` and shared data in `generated-site/src/content/`
