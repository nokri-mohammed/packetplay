# svg-scenes: design plan

**Status:** Approved by the CEO on 2026-11-14 (stack confirmed: TypeScript on Bun). M1 tickets are in
`docs/tickets/` (T-20261114-1 to 5).

## Goal

A small open source framework. A structured scene file (YAML or JSON, one shared JSON Schema)
describes nodes, links, tracks and chapters of steps. A build turns it into one self-contained HTML
page where messages travel hop by hop along the links, with captions, data cards, pause, step,
speed and a clickable timeline.

## Decisions already made (CEO, 2026-11-14)

- Build a diagram language on an existing engine: anime.js v4 (MIT, npm `animejs` 4.5.0).
- Structured files, not free text.
- Support both YAML and JSON, with the same model and one JSON Schema.
- Runtime: Bun 1.4 and TypeScript.
- Public MIT repo `nokri-mohammed/svg-scenes`.

## Scene format

Top level: `title`, `nodes`, `groups`, `links`, `tracks`, `chapters`.

- `nodes`: id mapped to `label`, `icon`, optional `sub`, optional `group`, optional `at: [x, y]`.
- `groups`: id mapped to `label`.
- `links`: pairs of node ids.
- `tracks`: id mapped to `label` and `color`.
- `chapters`: `title`, optional `desc`, and `steps`.
- Step: `from`, `to`, optional `via`, `track`, `label`, `desc`, `data` (key/values shown on a card),
  `at: { <node>: { set: {...}, desc } }` (change the data at a hop), `mode: packet|flow`, `both`,
  `pause`.
- A `parallel:` list of steps runs them together.

The model is identical for YAML and JSON. One JSON Schema lives at `schema/scene.schema.json`.
TypeScript types are generated from it. VS Code autocomplete comes from the
`yaml-language-server` schema comment at the top of a scene file.

## Pipeline

1. Load (YAML or JSON).
2. Validate: the schema, plus semantic checks (unknown node, no route). Messages are specific, for
   example "chapter 2, step 1: node `stn` does not exist".
3. Route: shortest path over the links, honouring `via`.
4. Layout: automatic grid, with `at` overrides.
5. Compile to one anime.js timeline with a label per step and per hop.
6. Player UI.
7. Bundle to one HTML file with the icons inlined.

## Player

- Caption panel: chapter title, step label, description.
- Data card that rides the packet.
- Nodes pulse on arrival.
- Track legend.
- Controls: play/pause, step hop, step message, previous/next chapter, speed 0.5x to 2x.
- Timeline bar: a segment per chapter, a dot per step in the track colour, click to jump, drag to
  scrub.
- Keyboard shortcuts.
- `prefers-reduced-motion`: no movement, steps are still shown.

## CLI

```
svg-scenes build <file> -o <out.html>
svg-scenes convert <file> --to json|yaml
```

## Milestones

Each milestone: tdd-guide writes tests first, an implementer builds it, code-reviewer checks the
diff.

| | Milestone | Content |
|---|---|---|
| M1 | Core, pure | Schema, loader, validator, router |
| M2 | Render | Layout and SVG render |
| M3 | Motion | Animation compiler and player |
| M4 | CLI | `build` and `convert`, single-file output |
| M5 | Acceptance | WebRTC example renders end to end, docs |

## Validation

- M1: unit tests for the schema, loader (YAML and JSON give the same model), validator messages and
  router (shortest path, `via`, no route).
- M2: snapshot tests of the SVG for the example scene.
- M3: timeline tests (labels, order, durations) and a headless browser check of the controls.
- M4: build the example to one HTML file with no external requests; `convert` round-trips YAML and
  JSON.
- M5 (acceptance): `examples/webrtc.scene.yaml` and `.json` both render the same four chapters,
  and the page works with reduced motion on.
- Before every commit: `./scripts/check-public.sh` exits 0.

## Design changes requested by the CEO (2026-11-14, via the homelab-team session)

**Status: proposed, waiting for the CEO's confirmation. Nothing below is built.** M1 to M4 are
already built and pushed, so both changes are rework of shipped code, not new work on a clean slate.

### Change 1: isometric 3D grid background

Reference: `homelab-team-all/projects/learning-notes/notes/networking/file-journey.html`.

- The grid is a repeating SVG tile used as a CSS background of the page: tile 141.5 x 81.9 (half
  tile 70.75 x 40.95), the same 30 degree isometric numbers Isoflow uses. The tile is a diamond
  outline with a low opacity stroke.
- Scroll zooms (limits 0.2 to 1.6), drag pans. The grid moves and scales with the scene: background
  size is `tile * zoom`, background position follows pan, and the scene is drawn in a group with
  `translate(pan) scale(zoom)`. Zoom is centred on the pointer. Touch: pinch to zoom and one finger
  to pan. Plus and minus buttons and a percent label, and a "fit" action on load.
- Node `at: [x, y]` become isometric grid tile coordinates. Screen position of tile `(i, j)` is
  `x = (i - j) * 70.75`, `y = (i + j) * 40.95`. Auto layout snaps to whole tiles.
- Optional per-scene `grid: iso | none` (default `iso`) in the schema and types.
- Affects: M1 schema (`grid`, and the meaning and doc of `at`), M2 layout (`layoutScene` output and
  constants `CELL_W`, `CELL_H`, group rectangles), M2 render (background and viewBox), M3 player
  (zoom and pan, which are new). The M2 layout and render tests and the render snapshot change.

### Change 2: every link is two arrows, one per direction

- A link `[a, b]` is drawn as two arrows side by side with a small offset: one `a -> b`, one
  `b -> a`. Never a single line.
- A message from A to B travels on the A-to-B arrow, the reply on the B-to-A arrow. `mode: flow`
  with `both: true` animates both lanes at once.
- Affects: M2 render (two `data-link` elements per link, for example `a--b` and `b--a`, with
  arrowheads) and M3 compile and player (each hop records its lane, packet and flow positions use
  the lane geometry). Router, validator and schema stay as they are.

### Open points for the CEO

- Lane offset size and arrowhead style (proposal: offset about 8 px at zoom 1, small triangular
  heads, lane colour follows the track while moving and is neutral at rest).
- Whether `grid: none` is wanted at all (it is optional, costs little).
- Order of work: test the current page first, then do both changes in one rework ticket.

## Out of scope for now

Other icon packs with vendor terms (AWS, Azure, GCP, Kubernetes), npm publishing, and a hosted
editor.
