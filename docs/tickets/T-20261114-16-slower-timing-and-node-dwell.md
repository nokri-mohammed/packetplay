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

<The agent fills this in when finished. Start with `Status: done` (or `blocked`), then:>

- **Did:**
- **Verified (real output):**
- **Left / needs a decision:**
- **Lessons:**
