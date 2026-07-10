# Codex Task Plans

## Completed Task: Favicon Refresh

- [x] Inspect the website entrypoint and current favicon wiring.
- [x] Create a dedicated workspace folder for Codex planning notes and generated assets.
- [x] Create a Git backup commit before favicon changes.
- [x] Generate a chibi pixel avatar asset set from the provided photo traits.
- [x] Wire the new favicon assets into the Vite site.
- [x] Run build verification and review the output.
- [x] Update this checklist and the agent notes with final paths and commands.

## Current Task: Swap Ready And Contact Card Effects

- [x] Inspect the `ready` and `contact` card implementations and identify their effect boundaries.
- [x] Create a Git backup commit before changing the page interactions.
- [x] Swap the `ready` page cards to the reflective `BorderGlow` treatment while keeping copy and layout intact.
- [x] Swap the `contact` page cards to the colored `ReadyChromaGrid` treatment while preserving each card action type.
- [x] Run verification and check for regressions.
- [x] Update the working notes after validation.

## Current Task: Recolor And Restore Contact Logos

- [x] Create a Git backup commit before adjusting the contact logos.
- [x] Remap the four contact brand colors to WeChat green, GitHub gold, Outlook blue, and Gmail red.
- [x] Replace the simplified icon drawings with closer SVG logo reconstructions.
- [x] Reveal each logo's brand colors only inside the active chroma sweep while keeping the idle state monochrome.
- [x] Run verification and check for regressions.
- [x] Bind the `contact` card-level chroma colors to Gmail red, Outlook blue, GitHub gold, and WeChat green without changing the `ready` page palette.
- [x] Restore the contact logos to always display their own native appearance instead of tying logo coloring to the hover sweep.

## Current Task: Bear Head Stardew Favicon

- [x] Inspect the current favicon wiring and existing generated asset paths.
- [x] Create a Git backup commit before replacing the favicon assets.
- [x] Generate a Stardew Valley-inspired pixel bear head icon from the provided reference photo.
- [x] Export favicon PNG and ICO files into the site public assets folder.
- [x] Update the Vite entry HTML to reference the new bear favicon files.
- [x] Run build verification and do a quick review for asset path regressions.
- [x] Update the working notes with final asset paths and commands.

## Current Task: Shuffle Crew Photo Gallery

- [x] Inspect the `Profile` page campus activity module and identify the Shuffle Crew placeholder photo area.
- [x] Create a Git backup commit before implementing the gallery upgrade.
- [x] Copy the provided Shuffle Crew photos into `generated-site/public/generated/shuffle-crew/`.
- [x] Extend the Shuffle Crew activity data with a `photos` array while keeping existing link behavior intact.
- [x] Replace the placeholder frame with a single clickable cover photo and a click-to-open gallery entry point.
- [x] Preserve fallback placeholder rendering for campus activity entries without photo data.
- [x] Swap the expanded gallery modal from the static carousel layout to a React Bits-inspired `Stack` interaction powered by `motion`.
- [x] Run verification, review for regressions, and update working notes.

## Current Task: Add More Shuffle Crew Photos

- [x] Inspect the existing Shuffle Crew gallery asset naming and source data wiring.
- [x] Copy the four newly provided Shuffle Crew photos into `generated-site/public/generated/shuffle-crew/`.
- [x] Append the new photo entries to the Shuffle Crew `photos` array in `generated-site/src/content/siteContent.js`.
- [x] Run verification, review for regressions, and update working notes.

## Current Task: Add Off-Campus Activities Section

- [x] Inspect the existing `Campus Activities` section structure and identify the shared render/data path.
- [x] Add a dedicated `offCampusActivities` content export for future external-experience entries.
- [x] Insert a new `Off-Campus Activities` module immediately after the campus activity section.
- [x] Render a non-fabricated empty state so the new module is visible before real entries are provided.
- [x] Run verification, review for regressions, and update working notes.

## Current Task: Rework Working Experience And Add Pony.ai

- [x] Inspect the `Experience` page `Working Experience` module and confirm the current data/rendering shape.
- [x] Create a Git backup commit before changing the work-experience content and layout.
- [x] Replace the generic `workingExperience` content with a real Pony.ai work entry using a bullet-based structure.
- [x] Update the `Experience` page work card rendering to show company logo, company name, period, role, and responsibility bullets.
- [x] Restyle the `Working Experience` card so it reads like a resume/work-history module on desktop and mobile.
- [x] Run `npm run build` and `npm run lint`, then review the diff for regressions.

## Current Task: Update Top Navigation And Add GitHub Button

- [x] Inspect the topbar layout, navigation data source, and current `Contact` button wiring.
- [x] Create a Git backup commit before changing the shared header.
- [x] Remove `Home` from the centered navigation and add `Contact` as the final centered nav item.
- [x] Replace the right-side `Contact` button with a GitHub-style `View the code` external button.
- [x] Run `npm run lint` and `npm run build`, then review the diff for regressions.
- [x] Update the working notes after validation if any new repo guidance is discovered.

## Current Task: Replace Profile Card Photo

- [x] Inspect the `Profile` card component and locate the current portrait asset import.
- [x] Copy the user-provided photo into the project asset area.
- [x] Update the profile lanyard card to use the new photo asset.
- [x] Run verification and review for regressions.
- [x] Update the working notes with the new asset path and validation commands.

## Current Task: Add Back To Start Button In Topbar

- [x] Inspect the shared topbar layout and identify the left-side insertion point.
- [x] Add a new `Back to start` button on the left side of the navigation area linking to `/`.
- [x] Remove the temporary icon treatment and keep the button text-only per final direction.
- [x] Run `npm run lint` and `npm run build`, then review for regressions.
- [x] Update the working notes after validation.

## Current Task: Add UNNC Intern Photo

- [x] Inspect the `Profile` page activity rendering path and confirm how photo placeholders are replaced.
- [x] Copy the user-provided UNNC intern image into `generated-site/public/generated/unnc-intern/`.
- [x] Attach the new image to the `UNNC Department of Campus Life / Administrative Intern` entry in `generated-site/src/content/siteContent.js`.
- [x] Run `npm run lint` and `npm run build`, then review for regressions.
- [x] Update the working notes with the new asset path and validation commands.

## Current Task: Campus Activity Logo Covers

- [x] Create a Git backup commit before changing the campus activity media behavior.
- [x] Generate 16:10 white/black expanded logo cover images for Zhangshu Middle School, UNNC Student Union, and Shuffle Crew.
- [x] Add Zhangshu Middle School and UNNC Student Union covers without enabling gallery behavior.
- [x] Disable gallery behavior for the UNNC Department of Campus Life card while keeping its existing logo visible.
- [x] Use the Shuffle Crew logo as the card cover while keeping the existing gallery photos unchanged.
- [x] Run `npm run lint` and `npm run build`, then review the code for regressions.
- [x] Update the working notes with the final asset paths and validation commands.

## Current Task: Refine Shuffle Crew Activity Copy

- [x] Update the Shuffle Crew activity bullet wording and add the cross-organization collaboration responsibility.
- [x] Move the Douyin link button directly after the performance-view bullet and rename it to `View the video`.
- [x] Rename the Shuffle Crew gallery trigger to `View my performance photo`.
- [x] Run `npm run lint` and `npm run build`, then review the content/rendering diff.
- [x] Update the working notes with the final content behavior.

## Current Task: Update Campus Activity Titles

- [x] Update the Zhang Shu senior high school student union organization and role display text.
- [x] Update the UNNC student union organization and department display text.
- [x] Run `npm run lint` and `npm run build`, then review the diff.
- [x] Update the working notes with the final content changes.

## Current Task: Update Profile Campus Activities Header

- [x] Inspect the `Profile` page campus activities section text.
- [x] Update the section eyebrow, title, and intro copy.
- [x] Lower the intro copy spacing under the new `Campus Activities` heading.
- [x] Run `npm run lint` and `npm run build`, then review the diff.
- [x] Update the working notes with the final content changes.
