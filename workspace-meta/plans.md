# Resume Website Plan

- [x] Create isolated workspace docs under `workspace-meta/`
- [x] Create and maintain `workspace-meta/plans.md` and `workspace-meta/agents.md`
- [x] Make baseline Git backup commits before major code changes
- [x] Initialize the React + Vite site under `generated-site/`
- [x] Build the base single-page resume layout and content structure
- [x] Implement the hero section with video background, nav, and CTA area
- [x] Implement About, Projects, Strengths, and Contact sections
- [x] Tune the desktop-first layout around a wide `1700px` shell
- [x] Verify the generated site with `npm run lint` and `npm run build`

## 2026-06-24 Lanyard Widget Integration

- [x] Place a personal lanyard widget in the Hero area
- [x] Evaluate the React Bits `Lanyard` reference against the current stack
- [x] Implement an equivalent in-project lanyard component without introducing incomplete 3D assets
- [x] Use `img/Ziqian.jpg` as the hanging card portrait
- [x] Add premium card styling, identity copy, and supporting metrics
- [x] Verify with `npm run lint`
- [x] Verify with `npm run build`

## 2026-06-24 Lanyard Interaction Fix

- [x] Restore hover and pointer-driven interaction for the lanyard
- [x] Add tilt, swing, and highlight response from pointer movement
- [x] Remove the layout overlap between the widget and the signature panel
- [x] Re-run `npm run lint` and `npm run build`

## 2026-06-24 Draggable Lanyard Motion Update

- [x] Create a Git backup commit before the interaction refactor
- [x] Resize and rebalance the hero widget so it fits the right column
- [x] Add a first-load drop-in animation from outside the viewport
- [x] Add drag-to-pull interaction with release swing-back behavior
- [x] Split the entrance motion layer from the interactive motion layer to avoid transform conflicts
- [x] Re-run `npm run lint` and `npm run build`

## 2026-06-24 Long Rope Lanyard Update

- [x] Create another Git backup commit before the long-rope motion rewrite
- [x] Replace the dual-strap look with a longer single hanging rope presentation
- [x] Make the anchor start above the viewport so the widget appears to drop from an unseen point
- [x] Rework the interaction model so rope bend, stretch, and card swing move together
- [x] Move the signature panel below the Hero into its own section to avoid overlap with the hanging card
- [x] Run `npm run lint`
- [x] Run `npm run build`
- [x] Perform a final self-review and update workspace documentation

## 2026-06-24 React Bits-Style 3D Lanyard Replacement

- [x] Create a Git backup commit before replacing the existing lanyard
- [x] Install a React 18-compatible `three` / `@react-three/*` / `meshline` stack
- [x] Replace the CSS-only widget with a true 3D physics lanyard
- [x] Use the user's portrait and name as the card content
- [x] Reduce the widget footprint so it fits the hero column cleanly
- [x] Validate with `npm run lint`
- [x] Validate with `npm run build`
- [x] Update `workspace-meta/agents.md` with the new implementation notes
