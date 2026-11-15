# T-20261114-27: Packets move at the same speed on every arrow, whatever its length

- **Owner:** general-purpose agent (implementer)
- **Project:** projects/packetplay
- **Opened by:** packetplay-manager, 2026-11-14
- **Model:** sonnet (timeline rule change plus exact test updates; careful arithmetic)
- **Status:** done

## Goal

A packet crosses a long arrow in proportionally more time than a short one, so its speed on screen is
the same on every arrow. Today every hop takes `HOP_MS` (1100 ms), so a long arrow looks fast.

## Context

- CEO feedback, 2026-11-14: "long arrow, it goes faster as it seems; it takes the same amount of time
  from start to finish; instead it should be the same movement speed independently from the arrow size".
- Where it lives: `src/timeline.ts` (`HOP_MS`, `compileTimeline`, hop `startMs`/`endMs`, step `endMs`),
  `src/player-core.ts` (`hopAt`, `frameAt`: `f = (t - hop.startMs) / HOP_MS`, the reverse packet of a
  `both` step uses the mirrored hop with the same `f`), `src/lanes.ts` (`lanePacketEnds`: the trimmed
  arrow ends, the path a packet really travels). Hop coordinates `x1,y1,x2,y2` are those trimmed ends.
- Reference length: in the isometric grid two neighbour nodes are 163.5 px apart, so the trimmed arrow
  (`LANE_TRIM = 44` at each end) is 75.5 px long and takes 1100 ms today. Pick a round speed that keeps
  that ordinary hop close to today's time: `HOP_SPEED = 0.07` px per ms (75.5 px takes about 1079 ms).
- Read `.claude/docs/LESSONS.md`. CEO rules: no tester or browser automation (he tests by hand). PUBLIC repo: no
  absolute local paths or usernames. No em dashes. No new dependencies. No schema change.

## Spec

- `src/timeline.ts`: remove the fixed hop duration. New exported constants `HOP_SPEED = 0.07` (px per
  ms) and `HOP_MIN_MS = 350` (so a very short arrow is not a blink). The duration of a hop is
  `hopMs = max(HOP_MIN_MS, round(len / HOP_SPEED))` with `len` the straight distance from `(x1,y1)` to
  `(x2,y2)` (use `Math.hypot`). Store it on the hop as `durMs` (new field on `HopTL`) so the player does
  not recompute it. Hops run back to back with the rest `NODE_DWELL_MS` (650) between them:
  `hop[0].startMs = goMs`, `hop[i].startMs = hop[i-1].endMs + NODE_DWELL_MS`, `hop[i].endMs = startMs +
  durMs`, and the step `endMs` is the last hop's `endMs + NODE_DWELL_MS`. Remove `HOP_MS` or keep it
  only if something else still needs it (update every import).
- `both` steps: the two packets share one clock. The forward hop `i` and the reverse packet on the
  mirrored hop `n - 1 - i` travel at the same time, so give both the same duration: for such a step use
  `durMs = max(hopMs(i), hopMs(n - 1 - i))` for both. The longer arrow then has the exact speed and the
  shorter one is at most slightly slower. Say so in the Report.
- Flow steps: unchanged (`FLOW_MS`); the token spacing and speed stay as they are. Mention in the
  Report that flow speed along very long routes is not constant (not in this ticket).
- `src/player-core.ts`: `hopAt` and `frameAt` use `hop.durMs` instead of `HOP_MS`. Everything else (dot
  hidden while the node bumps, bump length `SHAKE_MS` = `NODE_DWELL_MS`, pulses, typing, route
  highlight, navigation boundaries) stays as it is.
- Exact tests: update every test that encodes hop or step times (`test/timeline-lanes.test.ts`,
  `test/build.test.ts` for all five examples, `test/node-shake.test.ts`, `test/route-highlight.test.ts`,
  `test/typing-reveal.test.ts` and any other). Recompute each value by hand from the real hop lengths
  of the layout (compute them with `layoutScene` plus `lanePacketEnds`, for example by a throwaway
  script; do not commit it). Hop lengths in the fixtures with explicit coordinates are exact (for
  example a hop from x 156 to x 244 is 88 px, so `round(88 / 0.07)` = 1257 ms). State two or three
  hand calculations in the Report, and the new `totalMs` of each example (webrtc, udp, website, osi,
  homenet) next to the old one.
- New exact tests: a short hop clamps to `HOP_MIN_MS`; two hops of different length have durations in
  proportion; a `both` step gives mirrored hops the same duration; hop `i + 1` starts at hop `i`'s
  `endMs + NODE_DWELL_MS`; and the speed (length divided by `durMs`) of every hop of the website
  example lies within 2 percent of `HOP_SPEED` except clamped ones.

## Scope

- Do: the timeline rule, the player use of `durMs`, tests, then `bun run build:examples`.
- Do not: change the schema, layout, lanes, trims, balloon, bump, arrow highlight, speeds list, or the
  examples. No commit, no push.

## Approvals

CEO asked for this on 2026-11-14 and said earlier "go until everything is done".

## Rules

- Follow `CLAUDE.md`. Run `./scripts/check-public.sh --all` before finishing; it must exit 0.
- Never put the literal heading text of the Report section anywhere else in this file.

## Validation

- Real output in the Report section: `bun test` (count), `bun run typecheck`, `bun run build:examples`
  (all sizes), `./scripts/check-public.sh --all`, the hand calculations, old and new `totalMs` for all
  five examples, the shortest and longest hop duration found in each example.
- A short numbered browser checklist for the CEO (long and short arrows look the same speed, in
  homenet and website; the rest at nodes is unchanged; a very short arrow is not a blink; both-way steps;
  run times).

## Done when

- Tests are green, all five pages build, and packet speed is constant per arrow length.

## Report

**What was done**

- `src/timeline.ts`: removed `HOP_MS`; added exported `HOP_SPEED = 0.07` and `HOP_MIN_MS = 350`, a private
  `hopDuration(len) = max(HOP_MIN_MS, round(len / HOP_SPEED))`, and `durMs` on `HopTL`. Lengths come from
  `Math.hypot` of the trimmed lane ends (`lanePacketEnds`). Hops run back to back: `hop[0].startMs = goMs`,
  `hop[i].startMs = hop[i-1].endMs + NODE_DWELL_MS`, step `endMs = last hop endMs + NODE_DWELL_MS`.
  Flow steps still use `FLOW_MS`.
- `both` steps: forward hop `i` and the reverse packet on hop `n - 1 - i` share the larger of the two
  durations, so the longer arrow has exact speed and the shorter one is slightly slower (at most the ratio of
  the two lengths). No packet-mode example uses `both` today (the `both` steps in webrtc, udp are flow), so
  only the new fixture test exercises it.
- `src/player-core.ts`: `hopAt` divides by `hop.durMs`; `HOP_MS` import removed. Nothing else changed.
- Flow speed along very long routes is not constant (a flow always takes `FLOW_MS`). Not in this ticket.
- Ticket example check: a hop "from x 156 to x 244" is the 88 px gap between two hops (node dwell), not a hop;
  a real 200 px apart hop is 112 px (44 trim each end) = 1600 ms. The 88 / 0.07 = 1257 ms figure is not used.

**Hand calculations** (hop lengths from `layoutScene` + `lanePacketEnds`, printed by a throwaway script kept
outside the repo)

- Neighbour hop: 75.4927 / 0.07 = 1078.47, so 1078 ms. Server link hop: 75.8 / 0.07 = 1082.86, so 1083 ms.
  Hop of 195 px (webrtc): 2785.71, so 2786 ms. Homenet hops: 157.7 / 0.07 = 2252.86, so 2253 ms;
  484.2244 / 0.07 = 6917.49, so 6917 ms.
- webrtc step 1: 1078 + 1078 + 1083 = 3239, plus 3 rests of 650 = 1950, so 5189 ms. Whole example:
  5189 + 5189 + 5184 + 5184 + 12086 + 12086 + 4300 (flow) + 6 gaps * 450 = 51918.
- website: 1780 typing + 2 * 6912 + 8 * 6917 + 9 * 450 = 1780 + 13824 + 55336 + 4050 = 74990.
- homenet: chapter 1 steps 12198 each, chapter 2 18590, chapter 3 3461, chapter 4 flow 4300, gaps 450:
  0 to 12198, 12648 to 24846, 25296 to 43886, 44336 to 47797, flow 48247 to 52547.
- Fixture a(0), b(200), c(500): hops 112 px (1600 ms) and 212 px (212 / 0.07 = 3028.57, so 3029 ms). With `both`
  both hops take 3029: [0, 3029], [3679, 6708], step end 7358.

**Old and new totalMs**

| Example | Old | New | Shortest hop | Longest hop |
|---|---|---|---|---|
| webrtc | 49000 | 51918 | 1078 ms | 2786 ms |
| udp | 15700 | 15568 | 1078 ms | 1078 ms |
| website | 75830 | 74990 | 1078 ms | 1083 ms |
| osi | 17150 | 16974 | 1078 ms | 1078 ms |
| homenet | 27100 | 52547 | 1078 ms | 6917 ms |

**Verification (real output)**

- `bun test`: `240 pass, 0 fail, 1 snapshots, 1353 expect() calls, Ran 240 tests across 18 files` (before the
  change: 235 pass; 5 new exact tests added, 7 test files' values recomputed).
- `bun run typecheck`: `tsc --noEmit`, no errors.
- `bun run build:examples`: `Wrote dist/webrtc.html (85672 bytes)`, `udp.html (71754)`, `website.html (106522)`,
  `osi.html (76226)`, `homenet.html (108783)`.
- `./scripts/check-public.sh --all`: exit 0.
- Tests changed: `timeline-lanes`, `build` (udp, website, osi, homenet), `node-shake`, `typing-reveal`,
  `route-highlight` (fixture gets `durMs`). New in `timeline-lanes`: constants, short hop clamps to 350,
  proportional durations (1600 and 3029), `both` mirrored hops share 3029, hop `i + 1` starts at `endMs + 650`,
  website speed within 2 percent of `HOP_SPEED` for all 40 non-clamped hops.
- Not committed, not pushed.

**Browser checklist for the CEO**

1. Open `dist/homenet.html`, chapter 1: the dot on the long arrows (the two long links) takes clearly longer
   (about 6.9 s) than on the short ones (about 1.1 s) and looks the same speed.
2. Open `dist/website.html`: all arrows look the same speed; the run is about 75 s.
3. At each node the rest is unchanged: the dot goes into the icon, the icon bumps for 650 ms, the dot leaves the
   far side.
4. A very short arrow is not a blink: the minimum is 350 ms (no example has one; the unit test covers it).
5. Both-way packet steps: none in the examples; the unit test covers them. Both dots take the longer time.
6. Run times: webrtc 51.9 s (was 49.0), udp 15.6 s, website 75.0 s, osi 17.0 s, homenet 52.5 s (was 27.1).

**Left open**

- Flow steps keep a fixed 4300 ms, so flow speed on a long route is not constant.
- Homenet is now long (52.5 s) because its two long links take about 6.9 s each; if that feels slow, raise
  `HOP_SPEED` (a one-line change plus the exact test values).

**Lessons**

- A hand calculation example in a ticket can be a gap, not a hop: always take lengths from `lanePacketEnds`
  (the 156 to 244 gap is 88 px, the hops either side are 112 px).
- When a rule makes duration depend on geometry, every exact test needs the real lengths. Print them with a
  throwaway script (`layoutScene` plus `compileTimeline`) first, then write the sums by hand and compare.
- Hand-built layouts in tests (x 0, 200, 400) give 112 px hops (1600 ms), unlike the real grid (1078 ms), so
  the same scene has different numbers in `node-shake` and `typing-reveal`.
- Keep `both` mirrored hops on one clock by giving both the larger duration; the speed of the shorter one is
  then slightly low.
