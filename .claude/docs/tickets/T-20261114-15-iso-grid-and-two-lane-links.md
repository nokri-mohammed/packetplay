# T-20261114-15: Isometric grid background and two-lane links (rework of M2, M3)

- **Owner:** general-purpose agent (implementer)
- **Project:** projects/packetplay
- **Opened by:** packetplay-manager, 2026-11-14
- **Model:** sonnet (spec below is exact; CEO wants low token use and tests the result by hand)
- **Status:** done

## Goal

In `dist/webrtc.html` (1) the diagram sits on an isometric 3D grid background that zooms with the
scroll wheel and pans with a drag, like the CEO's reference page, and (2) every link between two
nodes is drawn as TWO arrows, one per direction, side by side. Messages travel on the arrow of their
direction.

## Context

- CEO approved both changes on 2026-11-14. Read the plan section "Design changes requested by the
  CEO" in `.claude/docs/plans/2026-11-14-packetplay.md`, and `.claude/docs/LESSONS.md`.
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

Status: done

- **Did:** Steps 1 to 7 in order. (1) schema: optional `grid` (`iso` | `none`, default `iso`), `at` text now
  says isometric tile `[i, j]`, `gen:types` run. (2) `src/layout.ts` rewritten in tile space (exported
  `TILE_W TILE_H HALF_W HALF_H NODE_STEP ICON_SIZE MARGIN GROUP_PAD`, output `nodes {x,y,i,j}`,
  `groups {i0,j0,i1,j1,points}` where i0..j1 is the rectangle already grown by `GROUP_PAD`, `origin`).
  (3) new `src/lanes.ts` (`LANE_OFFSET`, `LANE_TRIM`, `laneId`, `lane`). (4) `src/render.ts`: svg
  `width/height 100%`, one `g.scene`, shared `<marker id="arrow">`, two `<line data-link>` per link, group
  `<polygon data-group>`. (5) `src/timeline.ts` (`link` = lane id, lane motion coordinates, new `back`) and
  `src/player-core.ts` (return packet of `both` moves along `back`). (6) `src/page.ts` and `src/player.ts`:
  stage with grid div (tile data URI, black or white at 0.15 by `prefers-color-scheme`, omitted for
  `grid: none`), wheel zoom at pointer, drag pan, two-finger pinch, `-` `+` Fit buttons with percent label,
  fit on load, zoom 0.2 to 1.6, `backgroundSize = tile * zoom`, `backgroundPosition` follows pan and
  `layout.origin`; overlay, packets, flow dots, pulses and the data card live in `g.scene`, card scaled
  by `1 / zoom` and kept inside the stage. At runtime the player sets the svg viewBox to the stage pixel
  size so user units are CSS pixels (the static viewBox stays for the file on its own). Stage geometry
  (`data-w data-h data-ox data-oy`) is passed in data attributes. Flow dots ride the lanes (forward, and
  `back` in reverse hop order with `both`). Node centres for pulses are read from the rendered
  `g[data-node]` transforms. `keyAction` untouched. (7) README paragraph and example mention `grid`.
- **Changed tests (reason):**
  - `test/layout.test.ts`: rewritten for tile space, new constants, exact tiles of the example
    (`client [0,2] r1 [2,2] net [4,2] stun [6,2] sig [6,4] r2 [6,0] sam [8,0]`), exact canvas size
    1057 x 657.5, origin, group tile rectangle `[5,-1,9,1]` and point-in-rectangle rule in tile space.
  - `test/render.test.ts`: fixtures gained `i, j, origin` and the new group shape; root attributes;
    two lines per link with exact lane coordinates and `marker-end`; shared marker; `g.scene`; group
    polygons with exact points and labels; example now 12 `data-link`, 1 `data-group`, viewBox
    `0 0 1057 657.5`. Snapshot `test/__snapshots__/render.test.ts.snap` regenerated with `bun test -u`
    (diff reviewed: scene group, polygons, lanes, markers, new node positions).
  - `test/render-escape.test.ts`: unchanged, passes as is.
  - `test/build.test.ts`: added two tests (iso grid default, `grid: none`). Existing test unchanged and
    still shows only the namespace URI.
  - New: `test/lanes.test.ts` (6 exact tests), `test/timeline-lanes.test.ts` (7 tests: lane ids,
    coordinates, `back`, reply lanes, flow lanes, return packet on `back`, packet endpoints).
  - `test/schema*.test.ts`: unchanged, still pass (icon enum drift test included).
- **Verified (real output):**
  - Intermediate steps: after step 1, `139 pass, 0 fail`, typecheck clean. After steps 2 and 3 the
    suite was red by design (render and its tests still used the old layout shape: 2 render failures
    and TS errors in `render.ts` and `render.test.ts`); step 4 fixed them. After steps 4, 5 and 6: all
    green, typecheck clean.
  - `bun test`: `156 pass, 0 fail, 1 snapshots, 1050 expect() calls, 13 files`.
  - `bun run typecheck`: `tsc --noEmit` exits 0, no output.
  - `bun run gen:types`: run twice, second output identical (idempotent).
  - `bun run build:example`: `Wrote dist/webrtc.html (77794 bytes)`.
  - Built HTML: `grep -o "http[^\"' )<>]*"` gives only `http://www.w3.org/2000/svg` (4 occurrences,
    two of them inside the two grid data URIs); 12 `data-link=`, 1 `data-group=`; no `src=`, no
    external requests.
  - `./scripts/check-public.sh --all`: exit 0.
  - Not run in a browser (CEO rule). Pointer, wheel and pinch code is therefore untested by machine.
- **Left / needs a decision:** The CEO's hand test. Possible tuning after that: lane offset (8) and
  trim (44), arrowhead size, group label position (top corner, 22 px below it), grid opacity. Group
  region `i0..j1` is the grown rectangle, not the bare member bounds. `dist/` is ignored by git.
- **Lessons:**
  - A layout shape change breaks render and its fixtures at once, so layout and render cannot both be
    green between steps 2 and 4. Next time plan layout, lanes and render as one red-to-green block.
  - Keep SVG content in canvas units and set the runtime viewBox to the stage pixel size: zoom and pan
    then reduce to one `translate scale` on `g.scene` and the grid math matches the reference exactly.
  - Anything that scales with zoom but must stay readable (the data card) is placed in stage pixels
    first, then mapped back with `scale(1 / zoom)`.
  - The build test counts `data-node=` in the whole HTML, so the player bundle must not contain that
    literal (use `g[data-node]` and `getAttribute`).
- **Browser checklist for the CEO** (open `dist/webrtc.html` after `bun run build:example`):
  1. The diagram sits on a faint isometric diamond grid, and the picture fits the stage on load.
  2. The mouse wheel zooms around the pointer, from 20% to 160%, and the percent label follows.
  3. Dragging the stage pans; the grid and the scene move together and the grid stays aligned with the nodes.
  4. `+`, `-` and Fit buttons work; Fit recentres and rescales.
  5. On a touch screen, two fingers pinch to zoom and one finger pans.
  6. Every link shows two arrows side by side, each with an arrowhead, about 16 px apart.
  7. In chapter 1 the request runs on one arrow and the reply (joined, waiting for Sam) on the other.
  8. The NAT data card in chapter 2 stays the same readable size at 20% and at 160%, and stays on screen.
  9. In chapter 4 (flow, both directions) dots run on both arrows, in opposite directions.
  10. The "Sam's home" group is a diamond around the two right-hand nodes with its label near the top corner.
  11. Dark mode (system setting): grid lines turn white at low opacity, arrows and text stay visible.
  12. Phone width (about 390 px): stage is at least 320 px high, controls and timeline bar below still work.
  13. Dragging the stage never moves the timeline bar, and scrubbing the bar never pans the stage.
  14. Keys `=` and `-` still change speed, Space plays and pauses.
