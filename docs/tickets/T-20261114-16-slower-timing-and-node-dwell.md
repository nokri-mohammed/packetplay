# T-20261114-16: Slower default speed and a pause at every node

- **Owner:** general-purpose agent (implementer)
- **Project:** projects/svg-scenes
- **Opened by:** svg-scenes-manager, 2026-11-14
- **Model:** sonnet (two constants and one timing rule, small)
- **Status:** open (starts after T-20261114-15 is done, because both edit the timeline and player core)

## Goal

At 1x the packets move at a calmer pace, and a packet rests for a moment at every node it reaches, so
the viewer can read the node pulse, the caption note and the data card before it moves on.

## Context

- CEO feedback after trying the build, 2026-11-14: "1x is too fast", "pause for a bit when it arrives
  at one node", "1x should be slower".
- Timing today (see `src/timeline.ts`, spec in the cancelled ticket T-20261114-13): `HOP_MS = 800`,
  `FLOW_MS = 3000`, `STEP_GAP_MS = 400`, `PULSE_MS = 500` in `src/player-core.ts`. A packet-mode step
  runs its hops back to back, hop `i` starts at `step.startMs + i * HOP_MS`.
- The speed list stays `[0.5, 1, 1.5, 2]` and the keys stay as they are.
- CEO rules: no tester, reviewer or browser automation; he tests by hand. Public repo: no private
  values, no absolute local paths in any file. No em dashes. No new dependencies.

## Spec

- `HOP_MS = 1600` (travel time of one hop, twice as slow as before).
- New exported constant `NODE_DWELL_MS = 900`: after every hop the packet rests at the node it
  arrived at for this long. Hop `i` therefore starts at `step.startMs + i * (HOP_MS + NODE_DWELL_MS)`
  and its travel ends at `startMs + HOP_MS` (`HopTL.endMs` stays the arrival time). The step's
  `endMs` is the last hop's `endMs + NODE_DWELL_MS` (the packet also rests at the final destination).
- `FLOW_MS = 6000` (flow steps are twice as slow too). `STEP_GAP_MS = 600`.
- `PULSE_MS = 900` in `src/player-core.ts` (the pulse ring lasts about the dwell).
- Player core rules stay: while resting the packet sits on the end of the last arrived hop, the data
  card stays next to it with the data of that hop, the caption note of the arrived hop stays shown
  until the next hop starts, and the step stays "active" until its `endMs` (so the card is visible
  during the final rest). Pulses fire at the arrival time (`hop.endMs`) as before.
- Navigation boundaries unchanged (hop `startMs`, step `startMs`, chapter `startMs`).
- Reduced motion unchanged (it uses its own 2 s per step clock).
- Update the tests, the smoke test numbers and any snapshot that depend on these timings, keeping
  assertions exact. For the example, `totalMs` changes: recompute it by hand from the rules and assert
  the exact value in the smoke test.
- Mention the new timings in the README only if it already states timings.

## Scope

- Do: the constants, the hop start rule, the step end rule, and the tests that encode them. Then run
  `bun run build:example`.
- Do not: change layout, lanes, render, schema, the zoom and pan, or any M1 behaviour. No commit, no
  push.

## Approvals

CEO asked for these changes on 2026-11-14 and said "go until everything is done".

## Rules

- Follow `CLAUDE.md`. Run `./scripts/check-public.sh --all` before finishing; it must exit 0.

## Validation

- Real output in the Report: `bun test` (all green, count), `bun run typecheck`,
  `bun run build:example` (size), `./scripts/check-public.sh --all`, and the hand calculation of the
  new `totalMs` for the WebRTC example next to the value the code gives.

## Done when

- The constants and rules above are in place, tests are green, `dist/webrtc.html` is rebuilt.

## Report

Status: done

- **Did:** `src/timeline.ts`: HOP_MS 1600, new exported NODE_DWELL_MS 900, FLOW_MS 6000, STEP_GAP_MS 600; hop `i` starts at `startMs + i * (HOP_MS + NODE_DWELL_MS)`, ends at start + HOP_MS; packet step `endMs` = `startMs + hops * (HOP_MS + NODE_DWELL_MS)` (last hop endMs + dwell). `src/player-core.ts`: PULSE_MS 900, and `hopAt` fixed: with dwell gaps between hops the old loop fell through to the last hop at f=1 during a rest; it now picks the latest hop that has started and clamps f to 1, so the packet sits on the arrived node. Added two tests in `test/timeline-lanes.test.ts`. No existing test encoded the old numbers (no timeline test file exists), so nothing needed rewriting. README states no timings.
- **Verified (real output):** `bun test`: 158 pass, 0 fail. `bun run typecheck`: clean. `bun run build:example`: Wrote dist/webrtc.html (77847 bytes). `./scripts/check-public.sh --all`: exit 0.
  Hand calculation of totalMs: hop steps cost n * 2500 ms (3 hops = 7500, 6 hops = 15000), flow = 6000, gap 600 after each step. Steps: 0-7500, 8100-15600, 16200-23700, 24300-31800, 32400-47400, 48000-63000, 63600-69600. 4*7500 + 2*15000 + 6000 + 6*600 = 69600. The code gives 69600 (asserted exactly in the test, with every step start and end).
- **Left / needs a decision:** nothing.
- **Lessons:** when a packet can rest between hops, any "which hop am I on" lookup must handle gaps; the old fallback returned the last hop and would have teleported the packet at the end of the first rest.
