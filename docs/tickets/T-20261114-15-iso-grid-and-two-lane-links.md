# T-20261114-15: Isometric grid background and two-lane links (rework of M2, M3)

- **Owner:** general-purpose agent (implementer)
- **Project:** projects/svg-scenes
- **Opened by:** svg-scenes-manager, 2026-11-14
- **Model:** sonnet (spec below is exact; CEO wants low token use and tests the result by hand)
- **Status:** open

## Goal

In `dist/webrtc.html` (1) the diagram sits on an isometric 3D grid background that zooms with the
scroll wheel and pans with a drag, like the CEO's reference page, and (2) every link between two
nodes is drawn as TWO arrows, one per direction, side by side. Messages travel on the arrow of their
direction.

## Context

- CEO approved both changes on 2026-11-14. Read the plan section "Design changes requested by the
  CEO" in `docs/plans/2026-11-14-svg-scenes.md`, and `docs/LESSONS.md`.
- Reference page to copy the grid, zoom and pan approach from (read it, do not edit it):
  `learning-notes/notes/networking/file-journey.html` (a sibling project under `homelab-team-all/projects/`; the manager gives you the full path in the task prompt, never write it into a repo file)
  (tile `141.5 x 81.9`, `MIN_ZOOM 0.2`, `MAX_ZOOM 1.6`, background image is an SVG data URI tile,
  `backgroundSize = tile * zoom`, `backgroundPosition` follows pan, scene drawn in a group with
  `translate(pan) scale(zoom)`, zoom centred on the pointer, fit on load).
- Existing code to rework: `schema/scene.schema.json`, `src/layout.ts`, `src/render.ts`,
  `src/timeline.ts`, `src/player-core.ts`, `src/player.ts`, `src/page.ts`, and their tests
  (`test/layout.test.ts`, `test/render.test.ts` and its snapshot, `test/render-escape.test.ts`,
  `test/schema*.test.ts`, `test/build.test.ts`). M1 behaviour (loader, validator, router) stays.
- CEO rules: no tester, reviewer or browser-automation agents; he tests by hand. You MAY and must
  update the existing tests and the snapshot to the new geometry, but keep every assertion exact (no
  weakening, no deleting a behaviour test without replacing it). List every changed test file and why
  in the Report.
- No new dependencies.

## Spec

### 1. Schema (`schema/scene.schema.json`, then `bun run gen:types`)

- New optional top-level `grid`: `"iso" | "none"`, default `iso`.
- `at` is now `[i, j]`, isometric TILE coordinates (numbers, minimum 0, fractions allowed). Update the
  description text. Types stay in sync (`gen:types` idempotent).

### 2. Layout (`src/layout.ts`)

- Constants (exported): `TILE_W = 141.5`, `TILE_H = 81.9`, `HALF_W = TILE_W / 2`,
  `HALF_H = TILE_H / 2`, `NODE_STEP = 2` (auto layout puts nodes 2 tiles apart so icons and labels
  do not touch), `ICON_SIZE = 96`, `MARGIN = 80`, `GROUP_PAD = 1` (tiles).
- World position of tile `(i, j)`: `wx = (i - j) * HALF_W`, `wy = (i + j) * HALF_H`.
- Node `at: [i, j]` is never moved. Auto placement keeps the same idea as before in tile space:
  BFS depth over `links` from the first declared node gives `i = NODE_STEP * depth`; siblings get
  distinct `j` (multiples of `NODE_STEP`), a child prefers its BFS parent's `j`, a free tile is searched
  outward; disconnected components start after the last used depth; no two auto nodes share a tile;
  `j` is normalised so the smallest auto `j` is 0. Deterministic.
- Group region: in tile space the axis-aligned rectangle around the member tiles grown by
  `GROUP_PAD` tiles on every side. Its on-screen shape is the isometric diamond of that rectangle
  (4 world points). Rule kept from M2: on `examples/webrtc.scene.yaml` no non-member node is inside
  the `sams-home` region (test it with point-in-rectangle in tile space).
- `Layout` output: `nodes: Record<string, { x, y, i, j }>` (x, y are CANVAS px, see below),
  `groups: Record<string, { i0, j0, i1, j1, points: [number, number][] }>` (canvas px points, in order
  top, right, bottom, left), `width`, `height`, and `origin: { x, y }` = canvas position of world
  `(0, 0)` (tile `(0,0)` centre). Canvas = bounding box of all node icons (`ICON_SIZE` box), labels
  (add 40 px below) and group points, plus `MARGIN` on every side, translated so everything is at
  positive coordinates.

### 3. Lanes (NEW `src/lanes.ts`, single source of truth for arrow geometry)

- Constants: `LANE_OFFSET = 8` (each lane sits 8 px to the right of its travel direction, so the two
  lanes of a link are 16 px apart), `LANE_TRIM = 44` (arrows start and end this far from the node
  centre so they do not run under icons).
- `export function laneId(from: string, to: string): string` returns `` `${from}--${to}` ``.
- `export function lane(layout: Layout, from: string, to: string): { id: string; x1; y1; x2; y2;
  ax1; ay1; ax2; ay2 }`: `x1..y2` is the MOTION line, from node centre to node centre shifted by the
  offset; `ax1..ay2` is the DRAWN arrow, the same line trimmed by `LANE_TRIM` at both ends. Right-hand
  side of a direction `(dx, dy)` (screen y points down) is `(-dy, dx)` normalised.
- Render, timeline and player all use `lane()`. Nobody recomputes this geometry.

### 4. Render (`src/render.ts`)

- The SVG fills its container (`width="100%" height="100%"`, `viewBox="0 0 W H"`,
  `preserveAspectRatio="xMidYMid meet"` kept) and everything is wrapped in one
  `<g class="scene">` (the player sets its transform for zoom and pan). The overlay layers the player
  adds later also live inside `g.scene`.
- Each link `[a, b]` gives TWO `<line>` elements: `data-link="a--b"` (a to b) and `data-link="b--a"`
  (b to a), drawn from `ax1,ay1` to `ax2,ay2`, with `marker-end` pointing to one shared
  `<marker id="arrow">` defined once in `<defs>` (small triangle, `fill="currentColor"`). Lines use
  `stroke="currentColor"` and a low `stroke-opacity`. Never a single line per link. Document order:
  groups, links, nodes.
- Groups are `<polygon data-group="id" points="...">` with the label near the top corner. Still no
  `<style>`, no script, no external references in the SVG (presentation attributes only).
- Node `translate(x,y)` as before, now at the iso canvas position.
- Illegal-XML stripping and escaping stay.

### 5. Timeline (`src/timeline.ts`) and player core (`src/player-core.ts`)

- `HopTL.link` is now the lane id `laneId(hop.from, hop.to)`. `HopTL` coordinates `x1..y2` are the
  lane MOTION line from `lane()`. Add `back: { link: string; x1; y1; x2; y2 }` = the same for the
  reverse direction `laneId(hop.to, hop.from)` (the other lane).
- A packet moves along its hop's lane. With `both: true` the second packet moves along `back` of each
  hop, in reverse hop order, with the same timing (its direction value is -1). A reply step
  (`from: B, to: A`) therefore uses the B-to-A lane automatically. Flow with `both: true` animates both
  lanes.
- Timing, data overlay, navigation and keys are unchanged.

### 6. Player and page (`src/player.ts`, `src/page.ts`)

- Page layout: the stage (grid plus SVG) fills the width and most of the height (for example
  `min(70vh, 640px)`, at least 320 px), caption, legend, controls and the timeline bar below, as now.
- Grid: a `div` behind the SVG with the tile as a `data:image/svg+xml` CSS background (diamond outline,
  black at 0.15 opacity in light mode, white at 0.15 in dark mode via `prefers-color-scheme`; switch
  the data URI or use a CSS variable approach, your choice). If `scene.grid === "none"` there is no
  grid, zoom and pan still work.
- Zoom limits 0.2 to 1.6, wheel zooms around the pointer (`preventDefault` on the stage only), drag on
  the stage pans (pointer events, `touch-action: none` on the stage), two-finger pinch zooms on touch,
  `+` and `-` buttons with a percent label, a "Fit" button, and fit on load
  (`zoom = clamp(min(w / W, h / H) * 0.92)`, centred). Keyboard `=` / `-` stay mapped to SPEED as
  before (do not change `keyAction`); zoom has its own buttons and the wheel.
- Grid `backgroundSize = TILE * zoom`; `backgroundPosition` follows pan and the SVG origin so tile
  `(0,0)` stays under the scene origin (`layout.origin`), exactly as in the reference.
- Packets, data card, pulses and flow dots are drawn inside `g.scene` so they scale and pan with the
  scene. The data card must stay readable at any zoom (scale it by `1 / zoom`).
- Reduced motion behaviour unchanged. Dragging the stage must not start a timeline-bar scrub and vice
  versa.

### 7. Docs

- README: one short paragraph on the grid and the two-lane links, update the Example so it mentions
  `grid`. Plan: nothing more to change.

## Scope

- Do, in this order, running `bun test` and `bun run typecheck` after each step: 1 schema and types,
  2 layout (+ its tests), 3 lanes (+ a few exact tests for `lane()`), 4 render (+ tests and snapshot),
  5 timeline and player core (+ keep the smoke tests green, add a few exact tests for lane use and
  `back`), 6 player and page, 7 README, then `bun run build:example`.
- Do not: change M1 behaviour or message wording, add dependencies, add a tester or reviewer step,
  commit, push or publish.

## Approvals

CEO approved both changes and said "good start" on 2026-11-14; the CEO also said not to spend tokens
on a tester. No npm publishing or tags.

## Rules

- Follow `CLAUDE.md`. Public repo: no private values. No em dashes anywhere.
- Never put the literal heading text of the Report section anywhere else in this file.

## Validation

- Real output in the Report: `bun test` (all green, count), `bun run typecheck`,
  `bun run gen:types` (idempotent), `bun run build:example` (size), `./scripts/check-public.sh --all`,
  and every `http` string in the built HTML (only namespace URIs allowed, the grid data URI included).
- Write a numbered list of what the CEO should look at in the browser (grid, wheel zoom, drag pan,
  pinch, fit, two arrows per link with arrowheads, replies on the other arrow, NAT card, flow in both
  directions in chapter 4, dark mode, phone width).

## Done when

- Steps 1 to 7 are done and the commands above pass.
- `dist/webrtc.html` is one file with no external requests; the example SVG has exactly 12
  `data-link` elements (6 links x 2) and 1 `data-group`.

## Report

<The agent fills this in when finished. Start with `Status: done` (or `blocked`), then:>

- **Did:**
- **Verified (real output):**
- **Left / needs a decision:**
- **Lessons:**
