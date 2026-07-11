# Codex Task Plans

## Current Task: Add Homepage English Version Recommendation

- [x] Add a bilingual recommendation beside the homepage language selector.
- [x] Style the recommendation so it stays readable next to the selector on desktop and mobile.
- [x] Run `npm run lint` and `npm run build`, then review the diff.
- [x] Update working notes with the final behavior.

## Current Task: Fix Experience Chinese Copy Gaps

- [x] Keep `Hello World!` in English while translating the rest of the Experience hero in Chinese mode.
- [x] Render Pony.ai as 小马智行 in Chinese mode.
- [x] Run `npm run lint` and `npm run build`, then review the diff.
- [x] Update working notes with the final behavior.

## Current Task: Develop Chinese Mode For Experience Page

- [x] Create a Git backup commit before changing the experience page language behavior.
- [x] Pass the global language state into the Experience page and enable the topbar switcher there.
- [x] Add Chinese copy fields for research, working, project, timeline, and modal details.
- [x] Render localized Experience page text without changing the existing English layout.
- [x] Run `npm run lint` and `npm run build`, then review the diff.
- [x] Update working notes with the final behavior.

## Current Task: Split Research Focus Copy Into Three Lines

- [x] Locate the Research Focus paragraph on the Experience page.
- [x] Split the copy into three explicit desktop lines without changing the wording.
- [x] Add responsive styling so mobile can still wrap naturally.
- [x] Run `npm run lint` and `npm run build`, then review the diff.
- [x] Update working notes with the final behavior.

## Current Task: Build Simple Experience Timeline

- [x] Create a Git backup commit before changing the experience page structure.
- [x] Restore the original detailed Research, Working, and Project modules.
- [x] Replace only the top Timeline area with a simple chronological list across project, research, and working entries.
- [x] Add a small type badge to each timeline item without logos, buttons, or details.
- [x] Run `npm run lint` and `npm run build`, then review the diff.
- [x] Update working notes with the final timeline behavior.

## Current Task: Use Flags In Topbar Language Switcher

- [x] Create a Git backup commit before changing the shared header.
- [x] Export and reuse the existing homepage flag SVG component.
- [x] Replace the topbar `EN` and `ZH` labels with the US and China flags.
- [x] Add focused CSS so the topbar flag buttons keep stable sizing.
- [x] Run `npm run lint` and `npm run build`, then review the diff.
- [x] Update working notes with the final navigation behavior.

## Current Task: Add Nottingham Logos To Research Cards

- [x] Create a Git backup commit before changing the research card layout.
- [x] Add the provided University of Nottingham logo URL to both research entries.
- [x] Render the logo on the right side of each research card with responsive styling.
- [x] Run `npm run lint` and `npm run build`, then review the diff.
- [x] Update working notes with the final layout change and validation commands.

## Current Task: Keep Only UNNC GRP Project Placeholder

- [x] Create a Git backup commit before changing the project experience content.
- [x] Replace the project experience list with a single 2026.10-2027.06 UNNC GRP placeholder.
- [x] Adjust the project section intro so it accurately describes a future placeholder.
- [x] Run `npm run lint` and `npm run build`, then review the diff.
- [x] Update working notes with the final content change and validation commands.

## Current Task: Update Working Experience Description

- [x] Replace the working experience intro with the requested computer science internship/work wording.
- [x] Run `npm run lint` and `npm run build`, then review the diff.

## Current Task: Refine Experience Header Copy

- [x] Change the working section title to `Working Experience`.
- [x] Change the working section description wording to `intern or working experience`.
- [x] Change the project section title to `Project Experience`.
- [x] Run `npm run lint` and `npm run build`, then review the diff.

## Current Task: Match Experience Header Spacing

- [x] Inspect the shared section header spacing and the research-specific intro spacing.
- [x] Apply the same intro spacing treatment to the working and project section headers.
- [x] Run `npm run lint` and `npm run build`, then review the diff.

## Current Task: Update Experience Section Labels

- [x] Locate the hard-coded `Experience` page section header copy.
- [x] Update the working section eyebrow, heading, and intro sentence.
- [x] Update the bottom project section eyebrow, heading, intro sentence, and card micro-label.
- [x] Run `npm run lint` and `npm run build`, then review the diff.

## Current Task: Polish Research Details Actions

- [x] Inspect the experience page research module layout and existing staged changes.
- [x] Swap `View details` before the supervisor line inside each research card.
- [x] Add a shared action row so the button and supervisor keep a consistent, responsive gap.
- [x] Restyle `View details` as a visible pill button instead of plain text.
- [x] Run `npm run lint` and `npm run build`, then review the diff.

## Current Task: Fine Tune Experience Research Layout

- [x] Create a Git backup commit before changing the research layout follow-up.
- [x] Lower the research module intro copy so it does not overlap the large heading.
- [x] Move each `View details` control further right from the supervisor text.
- [x] Run verification and review the diff.
- [x] Update working notes with the final behavior and validation commands.

## Current Task: Update Experience Research Module

- [x] Create a Git backup commit before changing the experience page research module.
- [x] Update the research module eyebrow, heading, and intro copy.
- [x] Move each research card `View details` button below the supervisor line.
- [x] Remove the Edge and Dynamic research focus tags without leaving empty tag placeholders.
- [x] Add Prof. Heng Yu's supervisor profile link.
- [x] Run `npm run lint` and `npm run build`, then review the diff.
- [x] Update working notes with the final behavior and validation commands.

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

## Current Task: Extend Profile Hero Background

- [x] Inspect the profile hero background and campus activity layout.
- [x] Extend the profile hero background layer downward behind the campus activities section without moving the section.
- [x] Run `npm run lint` and `npm run build`, then review the diff.
- [x] Update the working notes with the final layout behavior.

## Current Task: Fix Profile Background Disappearing On Scroll

- [x] Inspect the profile background visibility and canvas pause behavior.
- [x] Move the profile background visibility observer from the hero section to the full hero-plus-campus background scope.
- [x] Run `npm run lint` and `npm run build`, then review the diff.
- [x] Update the working notes with the root cause and final behavior.
