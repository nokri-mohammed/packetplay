# T-20261114-33: follow camera (the view tracks the packet, readable zoom)

- **Owner:** general-purpose agent (implements); manager verifies and commits
- **Project:** projects/packetplay
- **Opened by:** packetplay-manager, 2026-11-15
- **Model:** sonnet (contained change in the page script, plus a small export option; no new dependency)
- **Status:** done

## Goal

On a big diagram the viewer can switch on a **Follow** camera: the view zooms to a readable level and
pans so the moving packet stays at the centre of the stage, smoothly, through the whole animation.

## Context

- CEO request, 2026-11-15: "implement zoom and trace for big diagram, cannot read; is it possible to
  do follow camera, the packet dot stays at the centre?" Fit zoom on large scenes (for example
  homenet, 2000 px canvas, or learning-notes' file-journey at about 49%) makes text unreadable.
- View model (read `src/player.ts` first): canvas point (X, Y) is at stage pixel
  `(tx + zoom * X, ty + zoom * Y)`. Existing functions: `fit()`, `zoomBy(px, py, factor)`,
  `applyView()`, `clampZoom` (MIN 0.2, MAX 1.6), wheel, drag and pinch handlers on the stage
  (around line 700 to 760). Zoom pills live in `src/page.ts` (`.zoombar`: zoom-out, label, zoom-in,
  Fit). The packet dot position along its route is computed in the player's timeline code (steps have
  `path`, per hop `durMs`, node dwell, flow steps, parallel children, typing holds). `nodePos` holds node
  centres.
- **Design (manager decision):**
  1. **Focus point as a pure function of the clock.** Add `focusAt(clock)` (pure, in
     `src/player-core.ts` or a new pure module) returning `{x, y}` in canvas coordinates: while a
     step's packet moves, the dot position; during dwell at a node, that node; during the gap between
     steps, a linear interpolation from the previous focus to the first node of the next step; before
     the first step the first node; after the last step the last node. For `parallel` or flow steps
     with several packets, use the centroid of the moving dots. No hidden state, so seeking, scrubbing
     and the export tool (which seeks frame by frame) give the same camera.
  2. **Smoothing without state.** Camera target = average of `focusAt` over a window of 800 ms around
     the clock (for example 9 evenly spaced samples from clock-400 to clock+400, clamped to the
     timeline). Also pure.
  3. **UI.** A `Follow` toggle pill in the `.zoombar` next to Fit, `aria-pressed`, highlighted when on.
     Keyboard `F` toggles. When on: zoom is set to `FOLLOW_ZOOM = 1.0` (clamped) the first time it is
     switched on, unless the current zoom is already at least that; the user can still change zoom with
     the buttons, wheel or pinch and the camera keeps following at the new zoom (zoom pivots on the
     centre). Dragging the stage with the mouse or touch, or pressing Fit, switches Follow off. Switching
     it off leaves the view where it is. Follow state is not persisted.
  4. **Each view update while following** (the existing per-frame or per-seek hook): compute the target
     and set `tx, ty` so the target is at the stage centre (`sw / 2`, `sh / 2`), then `applyView()`.
     The camera must not fight the user: no easing state, no timers beyond the existing frame loop.
  5. **Export.** `packetplay export ... --follow [--zoom N]` renders with the camera following at zoom
     N (default 1.0). Implement by adding `follow` and `zoom` to the `window.__packetplay` hook
     (`setFollow(true, zoom)`) and calling it from `src/export.ts` before the frame loop. The exported
     size is the stage size as before.
  6. Docs: README (Controls, Command line), `skills/packetplay/SKILL.md` (one short paragraph:
     "for big scenes use --follow"), keyboard list. Rebuild the one-file skill.
- Reproduction scenes in the repo: `examples/homenet.scene.yaml` (2000 px canvas) and
  `test/fixtures/file-journey.scene.yaml`.

## Scope

- Do: the pure `focusAt` and smoothing with unit tests (dot position at known clocks for a small
  scene, gap interpolation, before first and after last step, parallel centroid, purity: same clock,
  same answer after seeking back and forth), the UI toggle and keyboard shortcut, drag and Fit turn it
  off, the export option, docs, skill rebuild.
- Do not: change timing, icons, layout, the scene format or the schema; add dependencies; commit or
  push; edit files outside this project.

## Approvals

CEO, 2026-11-15: asked for this feature in his own words (quoted above). No approval to release.

## Rules

- Follow the project's CLAUDE.md. Public repo: no private values, no absolute home paths, no em
  dashes. Never write the literal Report-section heading text in the ticket body.
- Stay inside the scope.

## Validation

- `bun test` all green, `bun run typecheck` clean, `./scripts/check-public.sh --all` exit 0.
- Headless Chrome (`chrome-headless-shell` from `~/.cache/ms-playwright/`, see `src/export.ts` for
  how it is launched): build `examples/homenet.scene.yaml`, enable follow through the hook, seek to
  three different times, screenshot each, and view them: the packet dot is at the stage centre and
  text is readable at 100%.
- Render a short follow clip: `export examples/homenet.scene.yaml -o <scratch>/f.mp4 --follow
  --from 0 --to 8 --speed 2` and extract one frame with ffmpeg to confirm. Also run it through the
  one-file `skills/packetplay/packetplay.js`.

## Done when

- Follow works live and in export, is seek-safe, and turns off on drag or Fit.
- Tests, typecheck and the public check pass; docs and skill updated.

## Report

Status: done

- **Did:** Added `src/camera.ts` (pure `focusAt(tl, nodes, t)` and `cameraTarget` smoothing: 9 samples over 800 ms, clamped to the timeline; `FOLLOW_ZOOM = 1.0`). Player: `Follow` pill in the `.zoombar` (aria-pressed, highlighted, `aria-keyshortcuts="F"`), key F (`follow` action in `player-core.ts`), camera applied in every `render` (so playing, seeking and scrubbing agree), zoom pivots on the stage centre while following, drag (first real move) or Fit switches it off and leaves the view, not persisted, first switch-on zooms to at least 100%. Export: `--follow [--zoom N]` (zoom 0.2 to 1.6, default 1, `--zoom` without `--follow` is a usage error), `window.__packetplay.setFollow(on, zoom)`. Docs: README (Controls, Command line), `skills/packetplay/SKILL.md`, CLI usage; rebuilt `skills/packetplay/packetplay.js`. Tests: new `test/camera.test.ts` (before first, after last, moving dot, dwell node, gap interpolation, typing, parallel centroid, purity under seek back and forth, smoothing, F key), plus export arg and page markup tests.
- **Verified (real output):**
  - `bun test`: 322 pass, 0 fail. `bun run typecheck`: clean. `./scripts/check-public.sh --all`: exit 0.
  - Headless Chrome on `examples/homenet.scene.yaml` (1280x720): Follow click gave `pressed true`, zoom `100%`. Seek 3000 ms: dot at (538.04, 251.97) vs stage centre (538, 252). Seek 12000 ms: screenshot shows the Internet node, text readable at 100%, dot about 8 px right and 44 px below the centre (smoothing lag by design). Drag: `after drag pressed false`. Fit: `after fit pressed false`, label `47%`.
  - `export examples/homenet.scene.yaml -o f.mp4 --follow --from 0 --to 8 --speed 2`: `Wrote f.mp4 (763115 bytes, 120 frames)`; ffmpeg frame at 2 s viewed: zoomed, switch and packet near centre, text readable. Same through `bun skills/packetplay/packetplay.js export ... --follow --zoom 0.8`: `Wrote g.mp4 (875939 bytes, 120 frames)`.
- **Left / needs a decision:** (1) For `flow` steps the camera travels along the route from first to last node over the flow time instead of using the centroid of the tokens (tokens spread over the whole route, so their centroid would hardly move). (2) For a `both` step the focus is the centroid of the forward and reverse dots, as for parallel. (3) At a hop start the camera target jumps from the node centre to the trimmed lane end (a few px); the 800 ms smoothing hides it. (4) Reduced motion: the camera sits on the last node of the current step. (5) Not run through code-reviewer; not committed.
- **Lessons:**
  - [project] `ExportOptions` is compared with `toEqual` in `test/export.test.ts`, so a new export option needs the default added there.
  - [project] A pure function of the clock (no easing state) made seek, scrub and export consistent with no extra code; keep new view features stateless in the same way.
