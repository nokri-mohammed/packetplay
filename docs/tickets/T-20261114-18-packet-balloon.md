# T-20261114-18: Packet info box must not cover the icons (balloon layout)

- **Owner:** general-purpose agent (implementer)
- **Project:** projects/svg-scenes
- **Opened by:** svg-scenes-manager, 2026-11-14
- **Model:** sonnet (small drawing change in the player plus one pure helper)
- **Status:** open

## Goal

The info box of a packet (header and data rows, from T-20261114-17) no longer sits on top of the node
icons, in particular on the UDP example and while the packet rests at a node.

## Context

- CEO feedback, 2026-11-14: "now the box of informations covers the icons especially on udp".
- Cause: `src/player.ts` centres the box on the lane point. At every node the lane point is the node
  centre, so the box covers the icon. Node icons are `ICON_SIZE = 96` px (a 96 px box centred on the
  node), the label sits about 40 px below. Lane geometry is in `src/lanes.ts`.
- CEO rules: no tester, reviewer or browser automation; he tests by hand. Public repo: no absolute
  local paths or usernames in any file. No em dashes. No new dependencies.

## Spec

- Balloon layout. The packet's true position is still the lane point `(x, y)`. There, draw a small
  dot (circle radius 5, track colour). The info box floats ABOVE the dot and is joined to it by a thin
  tether line (track colour, low opacity). No change to timing, lanes or the data shown.
  - New exported constants in `src/player-core.ts`: `BALLOON_GAP = 60` (distance from the dot to the
    bottom edge of the box; icons reach 48 px above a node centre, so the box clears them).
  - New exported pure helper `balloonRect(x: number, y: number, width: number, height: number,
    direction: 1 | -1): { x: number; y: number; tetherY: number }`: the box is horizontally centred
    on `x`; for `direction` 1 its bottom edge is `y - BALLOON_GAP` (so the returned `y` is the top
    edge `y - BALLOON_GAP - height`) and `tetherY` is the bottom edge of the box; for `direction` -1
    (the reply packet of a `both` step) the box is BELOW: its top edge is `y + BALLOON_GAP` and
    `tetherY` is that top edge. Cover it with a few exact unit tests (both directions, odd sizes).
  - Forward packets use direction 1 (above), the second packet of a `both` step uses direction -1
    (below), so the two boxes do not stack on each other.
- Flow tokens (tiny packets in a flow step) stay on the lane, no balloon.
- Reduced motion: the static packet is drawn as a balloon above the destination node.
- The box keeps its current content, colours and font size. Keep the box inside the visible canvas
  where cheap, but do not add collision logic.
- Update the tests that encode the box position, keeping assertions exact, and list them.

## Scope

- Do: the helper and constants, the drawing in `src/player.ts`, their tests, then
  `bun run build:examples`.
- Do not: change layout, lanes, timing, schema, data rules, zoom or pan. No commit, no push.

## Approvals

CEO reported the problem on 2026-11-14 and said "go until everything is done".

## Rules

- Follow `CLAUDE.md`. Run `./scripts/check-public.sh --all` before finishing; it must exit 0.
- Never put the literal heading text of the Report section anywhere else in this file.

## Validation

- Real output in the Report: `bun test` (count), `bun run typecheck`, `bun run build:examples`,
  `./scripts/check-public.sh --all`.
- Numbered list for the CEO to check in the browser (box above the dot, tether line, no box over
  icons on both examples, reply packet below, reduced motion).

## Done when

- Tests are green, both pages rebuilt, the box is drawn above the lane point with a dot and tether.

## Report

Status: done

- **Did:** Added `BALLOON_GAP = 60` and `balloonRect` to `src/player-core.ts`. `src/player.ts` now draws, per packet, a dot (r 5, track colour) on the lane point, a thin tether (track colour, opacity 0.5) and the info box above the dot (direction 1) or below it (direction -1, the reply packet of a `both` step). Content, colours, font size, timing, lanes and flow tokens are unchanged. Reduced motion reuses the same drawing, so the static packet is a balloon above the destination node. New tests in `test/balloon.test.ts` (5 exact tests: gap constant, both directions, odd sizes, icon clearance). No existing test encoded the box position, so none needed changing.
- **Verified (real output):** `bun test`: 175 pass, 0 fail (15 files). `bun run typecheck`: clean. `bun run build:examples`: wrote dist/webrtc.html (78727 bytes) and dist/udp.html (65465 bytes). `./scripts/check-public.sh --all`: exit 0. Not checked in a browser (CEO tests by hand).
- **Browser checklist for the CEO:**
  1. Open dist/udp.html and play: each packet is a small dot on the lane with its info box floating above, joined by a thin line.
  2. Pause while a packet rests at a node: the box is above the icon and covers no icon or label.
  3. Repeat on dist/webrtc.html.
  4. In a `both` step, the forward packet's box is above and the reply packet's box is below its dot, so they do not stack.
  5. Flow tokens in flow steps are still tiny packets on the lane with no box.
  6. Zoom and pan: boxes, dots and tethers move and scale with the scene.
  7. Reduced motion (OS setting): each step shows one static packet as a balloon above the destination node.
  8. Near the top edge of the canvas a box may be cut off (no collision logic, as specced).
- **Left / needs a decision:** Nothing blocking. The reply packet box has only a header strip because its data is empty. Not committed or pushed.
- **Lessons:** Typecheck does not flag unused imports here (no `noUnusedLocals`), so check imports by hand.
