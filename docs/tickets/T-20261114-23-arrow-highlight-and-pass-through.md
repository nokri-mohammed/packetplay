# T-20261114-23: Colour and animate the arrow itself; packets pass through node icons

- **Owner:** general-purpose agent (implementer)
- **Project:** projects/packetplay
- **Opened by:** packetplay-manager, 2026-11-14
- **Model:** sonnet (player drawing change plus hop endpoints, clear spec)
- **Status:** done

## Goal

(1) The highlight of the route is the arrow itself: the existing lane arrow lines of the active step
turn the track colour, become dotted and animate toward the destination. No separate extra line on top.
(2) A packet no longer rests in the middle of a node icon. It travels edge to edge along the arrow,
stops at the near edge of the node, and then appears on the far side of the icon, as if it went through.

## Context

- CEO feedback after T-20261114-22, 2026-11-14: "arrow itself should be coloured and dotted, not a new
  line; also animation should not stop (pause) in the middle then continue, it should stop at the start
  and appear on the other side of the icon like it went through".
- Today (`src/player.ts`, `src/player-core.ts`, `src/timeline.ts`): `routeHighlight(t, step)` drives a
  separate dotted polyline layer (added in T-20261114-22). Hop coordinates `HopTL.x1,y1,x2,y2` run
  between node centres on the lane, so at each node the packet sits on the icon during the 750 ms rest.
  The static arrows are two `data-link` lines per link, trimmed `LANE_TRIM = 44` px at each end
  (`src/lanes.ts`, `src/render.ts`) with a shared arrow marker.
- Interpretation of the second point: during the rest at a node the packet (with its balloon) waits at
  the edge of the icon where it arrived, then the next hop starts at the edge of the icon where the
  arrow leaves (the other side). Nothing is drawn over the middle of the icon. Timing is unchanged (hop
  1300 ms, rest 750 ms): only positions change.
- Read `docs/LESSONS.md`. CEO rules: no tester or browser automation (he tests by hand). PUBLIC repo: no
  absolute local paths or usernames. No em dashes. No new dependencies. Keep `render.ts` free of
  `<style>`; the static page must still show plain arrows without JavaScript.

## Spec

### 1. The arrow is the highlight (player)

- Remove the separate route polyline layer from `src/player.ts`. Keep `routeHighlight` in
  `src/player-core.ts` (it still gives the fade and the dash offset) and its tests.
- For the active step, find the arrow line(s) of every hop on its lane (use the existing `data-link`
  attributes and `laneId`; add a `data-lane` style attribute to `render.ts` only if none identifies the
  lane, keeping existing render tests green). While `routeHighlight` is non-null set on those lines:
  `stroke` to the track colour, `stroke-width` 3, `stroke-dasharray` "2 9", `stroke-linecap` round,
  `stroke-dashoffset` from `offset`, and an opacity that blends from the base look to full with the
  `opacity` value. When it ends (and for every other line) restore the exact original attributes (store
  them at load). Both lanes of a `both` step are highlighted, each flowing in its own travel direction.
- The arrowhead should take the track colour while highlighted if the marker can follow the line colour
  (for example `context-stroke`); if that cannot be done without a second marker per track, leave the
  arrowhead as is and say so in the Report.
- Reduced motion: the arrow of the active step is coloured and dotted but static.

### 2. Pass-through packets (timeline and player)

- Hop endpoints used for the packet, balloon and flow tokens become the trimmed ends of the arrow:
  `x1,y1` is `LANE_TRIM` px from the source node centre along the lane, `x2,y2` is `LANE_TRIM` px short
  of the destination node centre (same lane offset as now). Use the helpers in `src/lanes.ts`; do not
  duplicate its maths. A hop shorter than twice the trim must stay valid (clamp so it never reverses).
- Rest: at the end of a hop the packet sits at `x2,y2` of that hop (the near edge); the next hop starts
  at its own `x1,y1` (the far edge). Between them the packet is not drawn inside the icon. The jump is
  instant at the next hop start (no tween through the icon). Keep the balloon logic (`balloonRect`,
  `BALLOON_GAP`) unchanged, so the box still sits above the dot.
- The first hop starts at the source node's far edge and the last hop ends at the destination's near
  edge. Flow tokens run between the same trimmed ends.
- Pulses stay at the node centre at the arrival time (they mark the node, not the packet). Keep
  `NODE_DWELL_MS`, `HOP_MS`, navigation boundaries and the data shown on the packet exactly as they are.
- Update every test that encodes hop coordinates or packet positions with exact values computed from
  `LANE_TRIM` and the lane offset (state two hand calculations in the Report). Add exact tests for the
  new endpoints: a straight horizontal hop, a diagonal hop, and a short hop that clamps.

## Scope

- Do: the player, the hop endpoint rule, `render.ts` only if a lane attribute is missing, their tests,
  then `bun run build:examples`.
- Do not: change the schema, layout maths, lane offsets or `LANE_TRIM`, timing constants, zoom, pan, or
  the examples. No commit, no push.

## Approvals

CEO asked for this on 2026-11-14 and said earlier "go until everything is done".

## Rules

- Follow `CLAUDE.md`. Run `./scripts/check-public.sh --all` before finishing; it must exit 0.
- Never put the literal heading text of the Report section anywhere else in this file.

## Validation

- Real output in the Report section: `bun test` (count), `bun run typecheck`, `bun run build:examples`
  (all sizes), `./scripts/check-public.sh --all`, two hand calculations of hop endpoints.
- A short numbered browser checklist for the CEO (the arrow itself turns coloured, dotted and flows; no
  extra line; the packet stops at the edge of the icon, then appears on the far side; nothing sits over
  the middle of an icon; both lanes in a `both` step; the arrow returns to normal after the step;
  reduced motion; all four examples).

## Done when

- Tests are green, all four pages build, the highlight is the arrow itself, and packets never rest on
  the middle of an icon.

## Report

**What was done**

1. Arrow highlight (`src/player.ts`): removed the separate route layer. At load the player stores the original
   `stroke`, `stroke-width`, `stroke-dasharray`, `stroke-linecap`, `stroke-dashoffset` and `stroke-opacity` of every
   `line[data-link]`. While `routeHighlight` is non-null the lane lines of the active step (and the back lanes when
   `both`) get the track colour, width 3, dasharray "2 9", round caps, the dash offset, and
   stroke-opacity = base + (1 - base) * opacity. Every other line, and a line after the step, gets its exact
   original attributes back. Reduced motion: coloured and dotted, offset 0, opacity 1. `render.ts` unchanged:
   the existing `data-link` (the lane id, same as `hop.link` and `hop.back.link`) was enough, and `routeHighlight`
   and its tests are unchanged.
2. Arrowhead: left as is. The shared marker is `fill="currentColor"`; following the line colour needs
   `context-stroke` (uneven support, and it would change the static output) or one marker per track.
3. Pass-through endpoints: new `lanePacketEnds(lane)` in `src/lanes.ts` returns the trimmed arrow ends
   (`ax1..ay2`), or the lane midpoint at both ends when the lane is shorter than 2 * LANE_TRIM (so it never
   reverses). `src/timeline.ts` uses it for `hop.x1..y2` and `hop.back.*`. Rest and jump need no player change:
   `hopAt` already holds f = 1 at the end of a hop, so the packet rests at `x2,y2` (near edge), and the next hop
   starts at its own `x1,y1` (far edge) with no tween. Flow tokens and the reduced-motion packet use the same
   ends. Pulses, timing constants, balloon logic and data are untouched.
4. Naming: `lanePacketEnds` (new, in `lanes.ts`). No other names added.

**Verified (real output)**

- `bun test`: 205 pass, 0 fail (200 before, plus 5 new), 1150 expect() calls.
- `bun run typecheck`: clean (`tsc --noEmit`, no errors; first run caught a missing `Layout` import in the new test, fixed).
- `bun run build:examples`: webrtc.html 80817 bytes, udp.html 67593, website.html 113384, osi.html 71844.
- `./scripts/check-public.sh --all`: exit 0.

**Hand calculations (LANE_OFFSET 8, LANE_TRIM 44), all encoded as exact tests**

- Horizontal (0,0) to (200,0): u = (1,0), lane offset (0,8). x1 = 0 + 44 = 44, x2 = 200 - 44 = 156, y = 8, so
  (44,8) to (156,8). Reverse lane: (156,-8) to (44,-8).
- Diagonal (0,0) to (60,80): length 100, u = (0.6,0.8), offset (-6.4,4.8). x1 = -6.4 + 26.4 = 20,
  y1 = 4.8 + 35.2 = 40, x2 = 53.6 - 26.4 = 27.2, y2 = 84.8 - 35.2 = 49.6.
- Short (0,0) to (60,0): 60 < 88, so both ends are the lane midpoint (30,8); reverse lane (30,-8).
- Also tested: exactly 88 px keeps full trim (zero length), and a two-hop path a-b-c at x = 0, 200, 400: the
  packet rests at (156,8) at t = 2000 and the next hop starts at (244,8).

Two existing tests encoded lane motion-line coordinates (hop ends and `back`); they now expect the trimmed ends.

**Left for the CEO (browser checklist)**

1. The arrow of the active step turns the track colour, dotted, and flows toward the destination.
2. No extra line is drawn over it.
3. The packet stops at the edge of the icon, then appears on the far side for the next hop.
4. Nothing sits over the middle of an icon.
5. In a `both` step, both lanes are coloured and each flows in its own direction.
6. After the step the arrow returns to the plain grey look.
7. Reduced motion: arrow coloured and dotted but still.
8. Check all four examples (webrtc, udp, website, osi), including hidden-node reveals in website.

**Lessons**

- Packet endpoints and the drawn arrow are now the same points, so one helper in `lanes.ts` serves the timeline,
  flow tokens and any future highlight. Keep geometry there.
- Restoring original attributes from a snapshot taken at load is simpler and safer than computing "base" values.
- Arrowhead colour per track needs `context-stroke` or per-track markers; decide only if the CEO wants it.
- The hop rest/jump behaviour already existed in `hopAt` (f clamps to 1); only the coordinates had to change.
- Not committed or pushed, per the ticket.

