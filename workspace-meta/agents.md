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

- The site includes Hero, About, Projects, Strengths, and Contact sections
- The hero uses a fixed frosted-glass navbar, a right-side hanging profile widget, and a local OGL-powered `Ferrofluid` background
- The `ProfileLanyard` component now uses a React 18-compatible 3D physics stack:
  - `three`
  - `@react-three/fiber`
  - `@react-three/drei`
  - `@react-three/rapier`
  - `meshline`
- The hero background now depends on:
  - `ogl`
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
- The `Ferrofluid` hero treatment is fixed to a black background with white fluid highlights using the user-supplied reference values:
  - `colors=['#ffffff', '#ffffff', '#ffffff']`
  - `backgroundColor='#120f17'`
  - `flowDirection='down'`
  - `speed=0.5`
  - `scale=1.9`
  - `turbulence=1`
  - `fluidity=0.1`
  - `rimWidth=0.27`
  - `sharpness=2.5`
  - `shimmer=1.5`
  - `glow=3.6`
  - `mouseStrength=1`
  - `mouseRadius=0.35`
- The hero background disables pointer capture and lowers DPR on touch devices so it does not interfere with the lanyard interaction
- The previous hero signature panel remains below the hero in its own section as supporting context, while the main lanyard stays visually unblocked on the hero right side

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
