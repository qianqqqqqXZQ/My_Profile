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

## 2026-06-24 Full-Height Hanging Lanyard Revision

- [x] Create a Git backup commit before the full-height refactor
- [x] Remove the boxed shell treatment around the widget
- [x] Move the identity text onto the hanging composition itself
- [x] Expand the lanyard to occupy the hero as a natural full-height element
- [x] Keep the portrait and name visible on the hanging card
- [x] Re-run `npm run lint`
- [x] Re-run `npm run build`
- [x] Refresh `workspace-meta/agents.md` with the final layout notes

## 2026-06-24 React Bits Original-Style Restore

- [x] Create a Git backup commit before restoring the original-style component
- [x] Download the official `card.glb` and `lanyard.png` assets into the project
- [x] Reconnect the component to the local original-style assets
- [x] Keep the lanyard naturally visible on the right side of the home hero
- [x] Raise the hero layering so the widget is not hidden by surrounding content
- [x] Run `npm run lint`
- [x] Run `npm run build`
- [x] Update `workspace-meta/agents.md` with the restored component notes

## 2026-06-24 Lanyard Hero Revision

- [x] Create a Git backup commit before the size and anchor revision
- [x] Enlarge the full lanyard composition while preserving physics behavior
- [x] Move the visible hanging point above the page top so the card reads as dropping in
- [x] Brighten the portrait render without changing the rest of the lanyard appearance
- [x] Rebalance the hero layout and lanyard wrapper sizing for the larger composition
- [x] Run `npm run lint`
- [x] Run `npm run build`
- [x] Perform a final self-review and refresh `workspace-meta/agents.md`

## 2026-06-24 Hero Ferrofluid Background

- [x] Create a Git backup commit before replacing the hero video background
- [x] Install `ogl` and add the local `Ferrofluid` component
- [x] Replace the hero video with the black-and-white `Ferrofluid` background
- [x] Tune hero layering so the navbar, copy, CTA, and lanyard stay readable
- [x] Run `npm run lint`
- [x] Run `npm run build`
- [x] Perform a final self-review and update `workspace-meta/agents.md`

## 2026-06-24 Desktop Lanyard Stabilization and Layering Fix

- [x] Create a Git backup commit before the stabilization pass
- [x] Rebuild the rope path from the full joint chain through the card attachment
- [x] Smooth all dynamic rope joints and clamp drag translation impulses
- [x] Replace the current angular correction with bounded spin control
- [x] Adjust desktop hero overflow and stacking so the lanyard is not clipped or buried
- [x] Run `npm run lint`
- [x] Run `npm run build`
- [x] Perform a final self-review and update `workspace-meta/agents.md`

## 2026-06-24 Contact Waves Integration

- [x] Create a Git backup commit before the contact background integration
- [x] Add a local `Waves` component under `generated-site/src/components/`
- [x] Layer the `Waves` background into the existing `#contact` section
- [x] Tune the contact scrim and preserve CTA readability/clickability
- [x] Run `npm run lint`
- [x] Run `npm run build`
- [x] Perform a final self-review and update `workspace-meta/agents.md`

## 2026-06-24 Performance Relief Pass

- [x] Identify the main sources of UI slowness in the site shell and heavy visual widgets
- [x] Pause the hero and contact animation loops when their sections are offscreen
- [x] Reduce the default render pressure of the 3D hero and lanyard widget
- [x] Split the heavy visual widgets into lazy-loaded chunks with lightweight fallbacks
- [x] Re-run `npm run lint`
- [x] Re-run `npm run build`
- [x] Record the new performance notes in `workspace-meta/agents.md`

## 2026-06-24 Home and Contact Background Swap

- [x] Create a Git backup snapshot before the background swap
- [x] Move the `Waves` background effect from `#contact` to `#home`
- [x] Remove the `Ferrofluid` hero background from the homepage
- [x] Leave the contact section as a clean content-only layout
- [x] Re-run `npm run lint`
- [x] Re-run `npm run build`
- [x] Update `workspace-meta/agents.md` with the new background placement

## 2026-06-25 Top Scroll Lock for Home

- [x] Create a Git backup snapshot before the scroll behavior change
- [x] Keep the current home hero visual layout intact
- [x] Prevent upward top-edge bounce / blank-space reveal on the page
- [x] Add global overscroll constraints for the viewport
- [x] Re-run `npm run lint`
- [x] Re-run `npm run build`
- [x] Update `workspace-meta/agents.md` with the new scroll rule

## 2026-06-25 Homepage Photo Lens Replacement

- [x] Create a Git backup snapshot before the hero visual replacement
- [x] Keep `generated-site/src/components/ProfileLanyard.jsx` untouched as the preserved source widget
- [x] Add a new layered hero photo lens component for `img/img1.jpg` and `img/img2.jpg`
- [x] Generate transparent cutout variants for the two portrait assets
- [x] Update the homepage hero copy and right-side visual layout to match the new interaction
- [x] Re-run `npm run lint`
- [x] Re-run `npm run build`
- [x] Update `workspace-meta/agents.md` with the new photo-lens notes

## 2026-06-25 Right-Side Interaction Smoothing

- [x] Create a Git backup snapshot before the motion smoothing pass
- [x] Move the cursor-follow path in `PhotoLens` to a ref-driven RAF loop with direct style updates
- [x] Remove cursor-critical 300ms easing from the reveal and ring layers
- [x] Keep the echo effect independent so it does not block the main cursor-follow path
- [x] Run `npm run lint`
- [x] Run `npm run build`
- [x] Update `workspace-meta/agents.md` with the new motion behavior notes

## 2026-06-25 Multi-Page Site Split

- [x] Create a Git backup snapshot before the routing refactor
- [x] Split the single-page site into routed pages for Home, Profile, Experience, Dance, and Contact
- [x] Add a shared site layout with active navigation state and top-level page scrolling reset
- [x] Reuse the existing visual system and move the old single-page sections into page-specific layouts
- [x] Install and wire `react-router-dom`
- [x] Run `npm run lint`
- [x] Run `npm run build`
- [x] Update `workspace-meta/agents.md` with the new route map and verification notes

## 2026-06-25 English Content Pass

- [x] Translate all visitor-facing text to English
- [x] Update the document language marker to `en`
- [x] Align the shared header and navigation labels with the English-only content
- [x] Re-run `npm run lint`
- [x] Re-run `npm run build`
- [x] Update `workspace-meta/agents.md` with the English content note

## 2026-06-25 Home / Profile Visual Swap

- [x] Create a Git backup commit before the visual swap
- [x] Replace the homepage background with the supplied `Ferrofluid` component
- [x] Move the previous homepage atmospheric background style to the Profile page
- [x] Rebuild the Profile hero as a left `ProfileLanyard` / right headline layout
- [x] Keep contact and strengths content below the Profile hero
- [x] Re-run `npm run lint`
- [x] Re-run `npm run build`
- [x] Update `workspace-meta/agents.md` with the new page layout notes

## 2026-06-25 Profile Hero Desktop Rebalance

- [x] Create a Git backup commit before the desktop layout adjustment
- [x] Rebalance the Profile hero desktop grid so the copy sits deeper into the right half
- [x] Shift the lanyard presentation slightly left within the left half without touching widget logic
- [x] Run `npm run lint`
- [x] Run `npm run build`
- [x] Perform a final self-review and update `workspace-meta/agents.md`

## 2026-06-25 Profile Hero Readability And Layer Fix

- [x] Create a Git backup commit before the readability and layer fix
- [x] Reduce the Profile hero copy scale so the title and highlight cards fit inside the first screen
- [x] Raise the lanyard layer above the right-side copy while keeping the top navigation highest
- [x] Run `npm run lint`
- [x] Run `npm run build`
- [x] Perform a final self-review and update `workspace-meta/agents.md`

## 2026-06-25 Profile Hero True Front-Layer Fix

- [x] Create a Git backup commit before the front-layer restructure
- [x] Separate the Profile hero lanyard from the normal left-column flow into a desktop foreground layer
- [x] Keep the right-side copy readable while the lanyard remains above the copy and below the top navigation
- [x] Run `npm run lint`
- [x] Run `npm run build`
- [x] Perform a final self-review and update `workspace-meta/agents.md`

## 2026-06-25 Profile Widget Vertical Nudge

- [x] Raise the Profile page lanyard/widget slightly on desktop without changing widget logic
- [x] Run `npm run lint`
- [x] Run `npm run build`
- [x] Perform a final self-review

## 2026-06-25 Profile Hero Stronger Vertical Offset

- [x] Increase the desktop Profile hero lanyard lift beyond the previous nudge without changing widget logic
- [x] Push the desktop right-side Profile hero copy lower as a single content block
- [x] Keep tablet and mobile breakpoints on the existing non-offset stacking behavior
- [x] Run `npm run lint`
- [x] Run `npm run build`
- [x] Perform a final self-review

## 2026-06-25 Profile Hero Extreme Vertical Offset

- [x] Double the existing desktop Profile hero lanyard lift again from the stronger-offset state
- [x] Double the existing desktop right-side Profile hero copy drop again from the stronger-offset state
- [x] Preserve the zeroed extra offset on smaller breakpoints
- [x] Run `npm run lint`
- [x] Run `npm run build`
- [x] Perform a final self-review

## 2026-06-25 Profile Top Black Gap Removal

## 2026-06-26 Home Hero Background Continuity

- [x] Create a Git backup snapshot before the homepage continuity refactor
- [x] Lift the particle background to a homepage-level layer
- [x] Keep the welcome hero as the first visible content block on open
- [x] Remove the hard black transition between the hero and the sections below it
- [x] Preserve the lower homepage sections as a continuation instead of a separate black block
- [x] Run `npm run lint`
- [x] Run `npm run build`
- [x] Perform a final self-review and update `workspace-meta/agents.md`

## 2026-06-26 Home Hero Copy Update

- [x] Replace the homepage eyebrow copy with `This is a personal webpage.`
- [x] Change the hero summary line to `You're ready to go?`
- [x] Move the summary line slightly lower on the homepage hero
- [x] Run `npm run lint`
- [x] Perform a quick self-review

## 2026-06-26 Home Hero SplitText Animation

- [x] Install `gsap` and `@gsap/react`
- [x] Add a local `SplitText` component under `generated-site/src/components/`
- [x] Replace the homepage `h1` with the new animated SplitText heading
- [x] Run `npm run lint`
- [x] Run `npm run build`
- [x] Perform a quick self-review

## 2026-06-26 Home Hero SplitText Layout Fix

- [x] Restore the homepage title to the original visual scale
- [x] Remove the bottom clipping on the animated headline
- [x] Run `npm run lint`
- [x] Run `npm run build`
- [x] Perform a quick self-review

## 2026-06-26 Home Hero Title Enlargement

- [x] Increase the homepage animated title size substantially
- [x] Add a mobile-specific size cap so the headline still fits
- [x] Run `npm run lint`
- [x] Perform a quick self-review

## 2026-06-26 Home Hero Title Vertical Nudge

- [x] Move the homepage animated title slightly upward
- [x] Run `npm run lint`
- [x] Perform a quick self-review

## 2026-06-26 Home Hero Title Fine Nudge

- [x] Move only the homepage title a little higher without shifting the hero visual column
- [x] Run `npm run lint`
- [x] Perform a quick self-review

- [x] Remove the blank black top gap above the Profile page hero background
- [x] Run `npm run lint`
- [x] Run `npm run build`
- [x] Perform a final self-review

## 2026-06-25 Profile Hero Copy Extra Drop

- [x] Increase only the desktop right-side Profile hero copy offset from the current extreme-offset state
- [x] Leave the lanyard lift unchanged
- [x] Keep smaller breakpoints on the zeroed extra offset behavior
- [x] Run `npm run lint`
- [x] Run `npm run build`
- [x] Perform a final self-review

## 2026-06-25 Home LiquidEther Background + Profile Waves Interaction + Nav Cleanup

- [x] Create a Git backup commit before the homepage background and nav update
- [x] Add the supplied `LiquidEther` component under `generated-site/src/components/`
- [x] Replace the homepage `Ferrofluid` background with `LiquidEther`
- [x] Restore cursor-reactive `Waves` motion on the Profile background only
- [x] Remove the duplicate `Contact` item from the main nav while keeping the standalone contact button
- [x] Run `npm run lint`
- [x] Run `npm run build`
- [x] Perform a final self-review and update `workspace-meta/agents.md`

## 2026-06-25 Home Right-Side Image Replacement

- [x] Create a Git backup commit before replacing the homepage right-side visuals
- [x] Copy the user-supplied portrait and armor source JPGs into `img/home-hero/`
- [x] Attempt transparent cutout generation and verify the result against the dark armor source
- [x] Drop the cutout approach after the armor subject proved unsuitable for clean background separation
- [x] Rewire `PhotoLens` to the final original JPG assets while preserving the current reveal interaction
- [x] Retune `PhotoLens.css` for full-frame image assets and stable face / helmet framing
- [x] Run `npm run lint`
- [x] Run `npm run build`
- [x] Perform a final self-review and update `workspace-meta/agents.md`

## 2026-06-25 Home Hero Background Swap to LiquidEther

- [x] Create a Git backup snapshot before the background swap
- [x] Switch the homepage hero background to the reference `LiquidEther` palette and motion settings
- [x] Preserve the existing hero interaction stack above the canvas
- [x] Slightly relax the scrim/noise overlay so the fluid background stays visible
- [x] Run `npm run lint`
- [x] Run `npm run build`
- [x] Perform a final self-review and update `workspace-meta/agents.md`

## 2026-06-25 Home Hero Background Swap to Particles

- [x] Create a Git backup snapshot before the background swap
- [x] Add the supplied `Particles` component under `generated-site/src/components/`
- [x] Replace the homepage hero background with `Particles`
- [x] Keep the hero interaction stack clickable above the canvas
- [x] Run `npm run lint`
- [x] Run `npm run build`
- [x] Perform a final self-review and update `workspace-meta/agents.md`

## 2026-06-26 Home Hero Background Coverage Fix

- [x] Create a Git backup snapshot before the hero background coverage fix
- [x] Extend the homepage particle background so it tracks the full hero container
- [x] Relax the hero scrim and noise fade so the lower hero no longer drops to a hard black block
- [x] Preserve the clickable foreground stack for the avatar and CTA area
- [x] Run `npm run lint`
- [x] Run `npm run build`
- [x] Perform a final self-review and update `workspace-meta/agents.md`

## 2026-06-26 Home Split And Single-Entry Ready Page

- [x] Create a Git backup commit before the homepage route split
- [x] Reduce the homepage to the hero section and interaction only
- [x] Replace the two homepage buttons with one white boxed `Sure, I'm ready !` entry action
- [x] Move the former lower-homepage content to a new routed page
- [x] Gate the new page behind the homepage button so direct entry redirects back home
- [x] Remove other direct entry points that would bypass the homepage button
- [x] Run `npm run lint`
- [x] Run `npm run build`
- [x] Perform a final self-review and update `workspace-meta/agents.md`

## 2026-06-26 Grouped Route BGM

- [x] Create a Git backup snapshot before the grouped BGM integration
- [x] Copy `bgm/bgm1.mp3` and `bgm/bgm2.mp3` into `generated-site/public/`
- [x] Add a root-level background audio manager that survives route changes
- [x] Route `/` and `/ready` to `bgm1`, and all other pages to `bgm2`
- [x] Keep playback continuous inside the same route group and restart only on cross-group switches
- [x] Add autoplay recovery after first user interaction when the browser blocks initial playback
- [x] Run `npm run lint`
- [x] Run `npm run build`
- [x] Perform a final self-review and update `workspace-meta/agents.md`

## 2026-06-26 Global Mute Button

- [x] Fix the BGM control flow so manual mute is not undone by route changes
- [x] Add a small global mute toggle in the top-left corner on every route
- [x] Keep the audio state shared across the root provider and the button UI
- [x] Keep the button visually minimal and accessible
- [x] Re-run `npm run lint`
- [x] Re-run `npm run build`
- [x] Perform a final self-review and update `workspace-meta/agents.md`

## 2026-06-26 Experience LetterGlitch Background

- [x] Create a Git backup commit before the Experience background update
- [x] Add a local `LetterGlitch` component under `generated-site/src/components/`
- [x] Replace the Experience page background with the supplied `LetterGlitch` effect
- [x] Add a dark scrim and light grid-noise overlay so the cards stay readable
- [x] Run `npm run lint`
- [x] Run `npm run build`
- [x] Perform a final self-review and update `workspace-meta/agents.md`

## 2026-06-26 Contact Amazing Globe Hero

- [x] Create a Git backup commit before the Contact hero integration
- [x] Replace the Contact page banner-first layout with a route-level hero
- [x] Add a local `ContactGlobe` component with a Contact-specific Three.js runtime
- [x] Vendor only the minimum Contact globe data and local public assets needed for the effect
- [x] Keep the existing contact CTA and card section below the new hero
- [x] Keep the visual treatment isolated to Contact-specific classes without global style takeover
- [x] Pause the globe animation when the Contact hero leaves the viewport and clean up on unmount
- [x] Run `npm run lint`
- [x] Run `npm run build`
- [x] Perform a final self-review and update `workspace-meta/agents.md`

## 2026-06-26 Contact Globe Lit Earth Upgrade

- [x] Inspect the reference globe's higher-end Earth implementations
- [x] Upgrade the Contact globe from the flat single-texture material to a lit day/night/specular Earth shader
- [x] Add the required local day, night, and specular cloud textures under `generated-site/public/contact-globe/`
- [x] Keep the existing Contact globe arcs, points, and page structure unchanged
- [x] Run `npm run lint`
- [x] Run `npm run build`
- [x] Perform a final self-review and update `workspace-meta/agents.md`

## 2026-06-26 Experience TextType + Home Header Removal

- [x] Add a local `TextType` component under `generated-site/src/components/`
- [x] Replace the Experience banner headline with the requested two-line typing sequence
- [x] Hide the homepage top header only while keeping other route headers unchanged
- [x] Rebalance the homepage top spacing after removing the home header
- [x] Run `npm run lint`
- [x] Run `npm run build`
- [x] Perform a final self-review and update `workspace-meta/agents.md`

## 2026-06-26 Experience 首页感重排

- [x] Replace the banner-style Experience intro with a centered first-screen hero
- [x] Update the first typing block to the requested three-line text
- [x] Reserve fixed intro height so typing does not push lower sections downward
- [x] Move the timeline and project sections farther below the intro hero
- [x] Run `npm run lint`
- [x] Run `npm run build`
- [x] Perform a final self-review and update `workspace-meta/agents.md`
