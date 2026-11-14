# T-20261114-22: Highlight the full route of a step, and nodes that appear later

- **Owner:** general-purpose agent (implementer)
- **Project:** projects/svg-scenes
- **Opened by:** svg-scenes-manager, 2026-11-14
- **Model:** sonnet (clear spec; touches schema, validator, timeline, player and one example)
- **Status:** done

## Goal

(1) While a step plays, its whole route (source node to destination node, through every hop) is
highlighted as an animated dotted line in the track colour, so the viewer sees where the packet is
going before and while it travels. (2) A node can be hidden at the start and appear when a step says so.
The website example uses it: `shop.example.com` does not exist on the page until the DNS answer arrives.

## Context

- CEO request, 2026-11-14: "when packet goes it should highlight the steps, like animate one way the
  full route it should travel ... in website.html show all arrow from user to dns with a colour
  highlighter dotted and animated. shop.example.com should not exist until dns replies back. is it
  possible with current schema?"
- Answer to the CEO's question: the highlight needs no schema change (player only). Hiding a node needs
  a small, optional, backwards-compatible schema addition (below).
- Read `docs/LESSONS.md`, `src/timeline.ts` (`HopTL`, `StepTL`, lanes), `src/player-core.ts`
  (`frameAt`, `Frame`), `src/player.ts`, `src/render.ts`, `src/validate.ts`, `src/lanes.ts`,
  `schema/scene.schema.json`. CEO rules: no tester, reviewer or browser automation (he tests by hand).
  PUBLIC repo: documentation addresses only, no absolute local paths or usernames. No em dashes. No new
  dependencies. Keep existing behaviour for scenes that use neither feature. The static SVG
  (`render.ts`) must still contain no `<style>` and must still show every node (hiding is done by the
  player at runtime), so the page is complete without JavaScript.

## Spec

### 1. Route highlight (player and `player-core.ts`)

- During a packet-mode step, from the step's `startMs` until its `endMs`, draw the full route as one
  dotted polyline per hop on that step's lane (use the same lane coordinates as the packet hops, so the
  line sits exactly where the packets travel; for a `both` step draw both lanes). Track colour, stroke
  width 3, `stroke-dasharray` "2 9" with round caps, opacity 0.85. The dashes flow in the travel
  direction: `stroke-dashoffset` is a pure function of the clock time (for example `-t / 25` px, so
  seeking and pausing work and nothing runs on its own), reversed for the second lane of a `both` step.
- The route fades in over the first 300 ms of the step and out over the last 300 ms (opacity ramp from
  the time, no CSS transitions).
- Flow-mode steps: highlight the same way for the whole step.
- Reduced motion: the dotted route is drawn static (no offset change) for the active step.
- New pure helper in `src/player-core.ts`, exported and covered by exact unit tests:
  `routeHighlight(t: number, step: StepTL): { hops: HopTL[]; opacity: number; offset: number } | null`
  (null when `t` is outside `[startMs, endMs]`; opacity ramps 0 to 1 over 300 ms after start and 1 to
  0 over 300 ms before `endMs`; `offset` is `-t / 25`). Put the rendering in `player.ts` inside
  `g.scene` below the packets and above the static links. State in the Report if you chose other names.

### 2. Hidden nodes that appear later (schema, validator, timeline, player)

- Schema (`schema/scene.schema.json`, then `bun run gen:types`): optional `hidden: boolean` on a node
  (default false; description: "Not shown until a step reveals it") and optional `reveal: string[]` on a
  step (node ids; description: "Nodes that appear when this step's message arrives"). Update
  `docs/` or README only if they list schema fields.
- Validator (`src/validate.ts`), exact messages in the existing style, with the same path style as the
  other semantic issues:
  - `chapter N, step M: reveal node "x" does not exist`
  - `chapter N, step M: reveal node "x" is not hidden`
  - `chapter N, step M: node "x" is already revealed` (revealed twice)
  - `chapter N, step M: node "x" is used before it is revealed` (a hidden node is a `from`, `to`, `via`
    or lies on the routed path of a step that comes before, or is, its revealing step; steps in
    document order, `parallel` children as they are visited today). A hidden node never revealed and
    never used is allowed.
- Timeline (`src/timeline.ts`): `compileTimeline` records for each revealed node `revealMs` = the
  `endMs` of the revealing step's last hop (arrival time), exported on the timeline (for example
  `reveals: { node: string; atMs: number }[]`); hidden nodes not in it are never shown. It must
  serialise into the page JSON like the rest.
- Player: a hidden node, its label and sub text, and every link that touches it (both lanes, the
  arrowheads) are invisible until `atMs`, then fade in over 600 ms (opacity from the time). Seeking
  backwards hides them again. Use `data-` ids already emitted by `render.ts` (add a `data-node` attribute
  only if one is missing, keeping existing tests green). A packet may never be drawn to or through a
  hidden node (the validator guarantees it).
- Layout is unchanged: a hidden node keeps its place, the diagram does not move when it appears.
- Reduced motion: the node is shown from the step that reveals it, with no fade.

### 3. Website example

- `examples/website.scene.yaml` and `.json` (regenerate with `bun run src/cli.ts convert <yaml> --to
  json -o <json>`): `web` gets `hidden: true`; the `DNS answer` step (dns to laptop) gets
  `reveal: [web]`. Nothing else changes.
- The `desc` of the DNS answer step already says the browser now knows where to connect; add one short
  sentence that the server now appears.

### 4. Tests (small and exact)

- Schema: `hidden` and `reveal` accepted, wrong types rejected.
- Validator: each of the four messages, plus a valid scene.
- Timeline: `revealMs` of the website example equals the `endMs` of the DNS answer step's last hop
  (compute by hand from `HOP_MS` 1300 and `NODE_DWELL_MS` 750: hop starts at step start plus
  `i * 2050`, arrival is start plus 1300; state the numbers).
- `routeHighlight`: null outside, opacity at 0, 150, 300, middle, and the last 300 ms, `offset` value.
- `build.test.ts`: the website example still builds with 5 chapters and 11 steps and the same
  `totalMs` (68550).
- Update any existing test the change breaks and list the changes.

## Scope

- Do: the items above, `bun test` and `bun run typecheck` after each part, then `bun run build:examples`.
- Do not: change layout maths, lane geometry, timing constants, zoom or pan, or other examples (they
  must build unchanged). No commit, no push.

## Approvals

CEO asked for this on 2026-11-14 and said earlier "go until everything is done". It adds two optional
schema fields; backwards compatible.

## Rules

- Follow `CLAUDE.md`. Run `./scripts/check-public.sh --all` before finishing; it must exit 0.
- Never put the literal heading text of the Report section anywhere else in this file.

## Validation

- Real output in the Report section: `bun test` (count), `bun run typecheck`, `bun run build:examples`
  (all sizes), `./scripts/check-public.sh --all`, the hand calculation of the website reveal time, and
  the `http` strings found in the website page (namespace URIs only).
- A short numbered browser checklist for the CEO (dotted route appears and flows toward the
  destination, fades at the end, both lanes in a `both` step, shop.example.com and its link are absent
  at the start and fade in when the DNS answer reaches the laptop, seeking back hides it, reduced
  motion, the other examples unchanged).

## Done when

- Tests are green, all four pages build, the website page hides `shop.example.com` until the DNS answer
  and every step shows an animated dotted route.

## Report

Implemented in the ticket's order, with `bun test` and `bun run typecheck` after each part.

**Verification (real output)**

- `bun test`: `200 pass, 0 fail, 1 snapshots, 1138 expect() calls, Ran 200 tests across 16 files`
  (was 179 across 15 before this ticket).
- `bun run typecheck`: `tsc --noEmit`, no errors.
- `bun run build:examples`:
  `Wrote dist/webrtc.html (80516 bytes)`, `Wrote dist/udp.html (67254 bytes)`,
  `Wrote dist/website.html (113027 bytes)`, `Wrote dist/osi.html (71519 bytes)`.
- `./scripts/check-public.sh --all`: exit 0.
- `http` strings in `dist/website.html`: only `http://www.w3.org/2000/svg` (4 occurrences, namespace URIs).

**Hand calculation of the website reveal time** (`HOP_MS` 1300, `NODE_DWELL_MS` 750, hop stride 2050)

- Chapter 1, step 1 (you to laptop): 1 hop, 0 to 2050. Gap 500, so the DNS query starts at 2550.
- DNS query (laptop, router, net, dns): 3 hops, 3 * 2050 = 6150, ends 8700. Gap 500, so the DNS answer
  starts at 9200.
- DNS answer hops start at 9200, 11250, 13300 (`start + i * 2050`). The last hop arrives at
  13300 + 1300 = 14600 ms. So `reveals` is `[{ node: "web", atMs: 14600, stepId: "c2s2" }]`.
  The step itself ends at 9200 + 6150 = 15350, but the node appears at the arrival, 14600.
  Asserted in `test/build.test.ts`. `totalMs` is still 68550.

**What changed**

- `schema/scene.schema.json` and `src/types.generated.ts` (via `bun run gen:types`): node `hidden`, step
  `reveal`. README lists no schema fields, so no doc change.
- `src/player-core.ts`: `routeHighlight(t, step)` exactly as specified (null outside
  `[startMs, endMs]`, opacity 0 to 1 over 300 ms, 1 to 0 over the last 300 ms, `offset = -t / 25`),
  plus `revealOpacity(t, atMs)` (0 to 1 over 600 ms) and the constants `ROUTE_FADE_MS`, `ROUTE_DASH_MS`,
  `REVEAL_FADE_MS`.
- `src/validate.ts`: the four exact messages. The existing route check became `checkRoute` (returns the
  routed path), and a new `checkStep` wraps it with the hidden and reveal checks, in document order,
  parallel children as visited today. Paths: `...reveal[i]` for the three reveal messages, the step path
  for "used before it is revealed". A hidden node that is used and never revealed also gets the
  "used before" message; the revealing step itself may not use the node it reveals.
- `src/timeline.ts`: `Timeline.reveals: { node, atMs, stepId }[]` and `Timeline.hidden: string[]`.
- `src/player.ts`: a route layer (`g` inserted before `g.nodes`, so above the static links and below the
  nodes and the packet overlay) drawing one dotted `line` per hop per lane with the step colour, width 3,
  dasharray "2 9", round caps, opacity 0.85 times the fade. A `both` step also draws the back lane; each
  lane is drawn in its own travel direction, so the same `-t / 25` offset flows along it, which is the
  reversed direction for the second lane. Hidden nodes: the node group and every `data-link` lane that
  touches it get an `opacity` attribute from the clock, so seeking back hides them again. In reduced
  motion the route is static (offset 0, full opacity) for the current step and a node is shown (no fade)
  from the revealing step on. `render.ts` is unchanged, so the static SVG still shows every node and has
  no `<style>`.
- `examples/website.scene.yaml` and `.json` (regenerated with the CLI): `web` has `hidden: true`, the
  DNS answer step has `reveal: [web]` and the desc gained "The server now appears."

**Tests**

- New `test/route-highlight.test.ts`: `routeHighlight` null outside, opacity at 0, 150, 300, middle,
  6850, 7000, 7150, offset values, and `revealOpacity`.
- `test/schema.test.ts`: hidden and reveal accepted, wrong types rejected.
- `test/validate.test.ts`: valid scene, never-revealed-unused allowed, each of the four messages, via and
  routed-path use, parallel block.
- `test/build.test.ts`: reveal time of the website example (14600, hand calculation in the comment), the
  static SVG still has the node and no style; the website build test also asserts `hidden` is `["web"]`.
  5 chapters, 11 steps and `totalMs` 68550 are unchanged. No existing test needed changing.

**Naming choices**

- Beyond the suggested `reveals: { node, atMs }[]` I added `stepId` to each entry (the reduced-motion
  player needs the revealing step) and `Timeline.hidden: string[]` (the player must know which nodes
  start hidden, including ones no step reveals). Both serialise into the page JSON. Other examples now
  carry `"hidden":[],"reveals":[]` in their page JSON, so their byte sizes changed slightly; their
  scenes, layout and timing are unchanged.
- Helper names: `routeHighlight` (as given), `revealOpacity`, `ROUTE_FADE_MS`, `ROUTE_DASH_MS`,
  `REVEAL_FADE_MS`.

**Browser checklist for the CEO**

1. Open `dist/website.html`, press Play. At the start `shop.example.com` and its link to the Internet
   are not visible; everything else is.
2. Each step shows a dotted line in its track colour along the whole route, fading in over the first
   0.3 s and out over the last 0.3 s; the dots flow toward the destination.
3. In the DNS answer step the server and its link fade in over about 0.6 s when the packet reaches the
   laptop (14.6 s on the 1x clock). The layout does not move.
4. Drag the timeline back before 14.6 s: the server and link disappear again.
5. Pause: the dots stop moving; scrub: they follow the clock.
6. Open `dist/udp.html` (it has a `both` flow step) and `dist/webrtc.html`: both lanes are dotted, flowing
   in opposite directions along their own arrows.
7. Turn on reduced motion in the OS: the route is static, and the server is shown from the DNS answer step.
8. `dist/osi.html` and the others look and play as before, plus the dotted routes.

**Not done / left**

- Not checked in a real browser (CEO tests by hand, per the rule). No commit, no push.

**Lessons**

- Adding fields to the compiled timeline changes every example's page size even when the scene is
  untouched; a ticket that says "build unchanged" should mean scene, layout and timing, not bytes.
- A "used before revealed" check needs the routed path, not just `from`, `to` and `via`, so route
  validation had to return its path; keep `checkRoute` as the single place that routes.
- A line drawn on the back lane is already in its own travel direction, so the same dash offset flows
  correctly on both lanes of a `both` step without a sign flip.
