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
- [ ] Re-run lint and production build checks.

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
