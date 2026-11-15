# T-20261114-32: data card must not hide group labels, and small text needs a minimum size

- **Owner:** general-purpose agent (implements); manager verifies and commits
- **Project:** projects/packetplay
- **Opened by:** packetplay-manager, 2026-11-15
- **Model:** sonnet (two contained fixes in the page script and renderer, no new dependency)
- **Status:** done

## Goal

1. A packet's data card (balloon) never covers a group label. 2. Group labels and node subtitles stay
readable when the page is zoomed out to fit.

## Context

- Reported by the learning-notes session on 0.10.0. Scene to reproduce with:
  `homelab-team-all/projects/learning-notes/notes/networking/file-journey.scene.yaml` (path relative to
  the homelab-team-all folder, two levels above this project). The SYN card at the client kernel node
  hides the group label "Client laptop: kernel"; only "rnel" shows. At fit zoom (about 53%) group
  labels (font 14) and node subtitles (font 12) are tiny.
- Group label is an SVG `<text class="group-label">` at the first corner of the group polygon, drawn in
  `src/render.ts` (about line 41 to 50). Node `label` (15) and `sub` (12) are in the same file.
- The balloon is placed by `balloonRect(x, y, w, h, direction)` (see `src/player.ts` around lines 183
  to 200 and 339, and wherever `balloonRect` is defined). Direction 1 is above the dot, the other
  below (reply packets).
- Chosen fixes (manager decision):
  1. **Label avoidance.** Compute each group label's rectangle in scene coordinates (text width
     estimated from character count times about 0.6 times the font size, height from the font size,
     centred on its x). When placing a balloon, if the rectangle intersects any label rectangle, try
     in order: the opposite vertical side, then shift the balloon horizontally clear of the label,
     keeping it inside the scene. Pure function, so it can be unit tested. The balloon keeps its
     tether to the dot. Do not change where labels are drawn.
  2. **Minimum on-screen text size.** On every zoom change, set a CSS variable on the SVG root and
     make `.group-label`, `.sub` and `.label` use `font-size: calc(<base>px * var(--ts-<kind>))`,
     where the factor is `clamp(1, MIN_PX / (base * zoom), 2)` with `MIN_PX = 10` for group labels and
     subtitles and `9` for node labels. Normal zoom (100% and above) must be unchanged (factor 1).
     Keep text centred on the same anchor. Export mode (`#export`) uses the same code, so it benefits.
- Real facts: exact function names and zoom handling are in `src/player.ts`; read it first.

## Scope

- Do: the two fixes, unit tests for the pure parts (label rectangle estimate, rectangle overlap,
  balloon candidate choice, factor clamp), a regression test using the real
  `file-journey.scene.yaml` content copied into `test/fixtures/` (rename the node and group labels
  to documentation values if they contain private details, and check) that asserts the SYN card at
  the client kernel node no longer overlaps the "kernel" group label, rebuild the one-file skill.
- Do not: change timing, icons, layout, or the scene format; add dependencies; commit or push; edit
  files outside this project.

## Approvals

CEO standing instruction: tickets and fixes inside this repo go ahead. No approval to release; the
manager asks the CEO about the version.

## Rules

- Follow the project's CLAUDE.md. Public repo: no private values, no absolute home paths, no em
  dashes. Never write the literal Report-section heading text in the ticket body.
- Stay inside the scope.

## Validation

- `bun test` all green, `bun run typecheck` clean, `./scripts/check-public.sh --all` exit 0.
- Render the reproduction scene with the dev CLI and with the one-file tool; page must be identical
  between them (compare bytes). Take a headless Chrome screenshot (`chrome-headless-shell` from
  `~/.cache/ms-playwright/`, see `src/export.ts`) at fit zoom on the SYN step via the page's
  `window.__packetplay.seek(ms)` hook and view it: the "kernel" label must be fully visible and the
  small text readable.

## Done when

- The reported overlap is gone on the reproduction scene (test and screenshot).
- Text is at least the minimum size at fit zoom and unchanged at 100%.
- Tests, typecheck and the public check pass; skill rebuilt.

## Report

Status: done

- **Did:** Added pure functions in `src/player-core.ts`: `labelRect`, `rectsOverlap`, `placeBalloon` (preferred side, opposite side, then shortest sideways shift clamped to the scene, tether to the dot via `tetherX`) and `textFactor` (clamp(min / (base * zoom), 1, 2), minimum 10 px for group labels and subtitles, 9 px for node labels). `src/player.ts` reads the group label positions from the SVG, places each packet balloon with `placeBalloon`, and on every view change sets `--ts-group`, `--ts-sub` and `--ts-label` on the SVG root. `src/page.ts` sizes `.group-label`, `.sub` and `.label` (scoped to `.stage svg`, fallback factor 1) with `calc(<base>px * var(--ts-...))`. Label drawing in `src/render.ts` is unchanged. New tests: `test/label-avoid.test.ts` (unit) and `test/label-regression.test.ts` with `test/fixtures/file-journey.scene.yaml` (copied unchanged; it only uses documentation addresses). Skill rebuilt.
- **Verified (real output):**
  - `bun test`: 310 pass, 0 fail (was 294). The regression test first asserts the plain balloon does hit a group label on this scene, then that the placed balloon hits none.
  - `bun run typecheck`: clean (`tsc --noEmit`, no output).
  - `./scripts/check-public.sh --all`: exit 0.
  - `bun run build:skill`: `Wrote skills/packetplay/packetplay.js (691030 bytes, 51 icons)`.
  - Dev CLI page vs one-file tool page for the fixture: `cmp` reported identical (both 150020 bytes).
  - Headless Chrome screenshot at fit zoom (38%) on the SYN step: the card now sits above-left and "Client laptop: kernel" is fully visible; group labels, subtitles and node labels are visibly larger than before at that zoom. Screenshot at `/tmp/tmp.mGbDXHx6Nb/shot.png` (temporary).
- **Left / needs a decision:** The label rectangle is an estimate (0.6 em per character), as the ticket chose. The typing bubble (`typingMarkup`) still uses plain `balloonRect` and is not label-aware (out of scope). Not committed. Version for the release is the CEO's call (suggested `fix:` commit).
- **Lessons:**
  - [project] Use `var(--x, 1)` fallbacks in page CSS so standalone SVG output and old pages without the variable keep their base sizes.
  - [project] A regression test should first prove the bug exists on the real scene (naive placement hits a label) before asserting the fix.
