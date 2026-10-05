# 4DGS Project Experience Update

- [x] Locate the academic project data, localization behavior, and existing GitHub button patterns.
- [x] Create a Git safety checkpoint by confirming the worktree is clean before editing.
- [x] Add `4DGS-Edit-and-Compare` before GRP with polished English and Chinese copy and the personal-project tag.
- [x] Add the GitHub hover-expand button to the project card.
- [x] Run lint and production build checks.
- [x] Review the final diff and record any residual risks; no blocking issues found.

## Follow-up: Compact Project Actions

- [x] Shorten the 4DGS personal-project label for both languages.
- [x] Place the label and GitHub button in one horizontal action row.
- [x] Re-run lint and production build checks.

## Follow-up: Center Expanded GitHub Label

- [x] Identify the expanded-label positioning issue.
- [x] Center the GitHub label across the full expanded button.
- [x] Re-run lint and production build checks.

# Algorithm Intern Title Update

- [x] Locate the bilingual working-experience title source.
- [x] Create a Git safety checkpoint before editing.
- [x] Update the English and Chinese titles for the Pony.ai role.
- [x] Run lint and production build checks.
- [x] Review the final diff and record any residual risks; no blocking issues found.

## Verification

- `npm run lint` passed on 2026-09-16.
- `npm run build` passed on 2026-09-16 with only the existing Vite large-chunk advisory.
- `git diff --check` passed; only the bilingual Pony.ai role title was changed in application content.

# Profile Cover Full-Image Preview (2026-09-16)

- [x] Inspect the existing static cover and multi-photo gallery behavior.
- [x] Create a Git checkpoint before changing the preview interaction.
- [x] Add a clickable full-image modal for static Profile activity covers, including background click, close button, and Escape support.
- [x] Keep the existing multi-photo Stack gallery behavior unchanged and add bilingual accessible labels.
- [x] Run lint, production build, diff checks, and complete a focused code review.

## Verification

- `npm run lint` passed on 2026-09-16.
- `npm run build` passed on 2026-09-16 with only the existing Vite large-chunk advisory.
- `git diff --check` passed; the static cover now uses `object-fit: contain` in the full-image modal.

# Project Experience Order Update (2026-10-04)

- [x] Locate the `projectExperience` entries for MomoFocus and UNNC GRP.
- [x] Create a Git safety checkpoint before editing (`ed037a9`).
- [x] Move MomoFocus before the GRP entry without changing either record's content.
- [x] Run lint, production build, and diff checks.
- [x] Review the final diff; no unrelated changes were introduced.

## Verification

- `npm run lint` passed on 2026-10-04.
- `npm run build` passed on 2026-10-04 with only the existing Vite large-chunk advisory.
- `git diff --check` passed.

# Link Dual-Branch_EE to the Second Research Entry (2026-10-05)

- [x] Inspect the existing research-entry layout and the `Dual-Branch_EE` repository.
- [x] Create a Git safety checkpoint before editing (`ce9065e`).
- [x] Add the second research repository URL while preserving the existing bilingual modal layout.
- [x] Run lint, production build, and diff checks.
- [x] Complete a focused code review; the existing modal consumes the new URL without component changes.
- [ ] Push the verified commit to `origin/main`.

## Follow-up: Timeline Ordering

- [x] Confirm the bottom Project Experience grid and the sorted Experience timeline use different ordering behavior.
- [x] Align MomoFocus and GRP to the same timeline sort month so the source order keeps MomoFocus first in both views.
- [x] Run lint, production build, and diff checks.

## Verification

- `npm run lint` passed on 2026-10-05.
- `npm run build` passed on 2026-10-05 with only the existing Vite large-chunk advisory.
- `git diff --check` passed.
