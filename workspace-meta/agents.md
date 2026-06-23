# Project Memory

## Project Overview

This repository is used to build a personal resume website. The active site lives in `generated-site/` and uses React + Vite. Workflow and memory documents are stored in `workspace-meta/` so project bookkeeping does not disturb the main app structure.

## Directory Structure

- `generated-site/`: React resume site source, config, and build output
- `generated-site/src/`: application components, page structure, and CSS
- `generated-site/src/components/ProfileLanyard.jsx`: custom hanging card widget used in the hero
- `generated-site/src/components/ProfileLanyard.css`: styling and motion system for the hanging card widget
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
- The hero uses a fixed frosted-glass navbar and a right-side hanging profile widget
- The `ProfileLanyard` component now uses a React 18-compatible 3D physics stack:
  - `three`
  - `@react-three/fiber`
  - `@react-three/drei`
  - `@react-three/rapier`
  - `meshline`
- The current lanyard behavior now includes:
  - a real rope simulation with connected rigid bodies
  - drag-to-pull interaction and release swing-back motion
  - a smaller card footprint to keep the hero column balanced
  - the user's portrait and name rendered directly in the hanging card
- The previous hero signature panel remains below the hero in its own section and matches the tightened widget scale

## Notes About The React Bits Lanyard Reference

The user-provided reference describes the React Bits `Lanyard` component, which depends on:

- `three`
- `meshline`
- `@react-three/fiber`
- `@react-three/drei`
- `@react-three/rapier`
- `card.glb`
- `lanyard.png`

The current repository still does not include the original `card.glb` and `lanyard.png` assets. The implemented solution recreates the interaction and visual balance with a programmatic 3D card so the widget stays self-contained and does not depend on missing model files.

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
