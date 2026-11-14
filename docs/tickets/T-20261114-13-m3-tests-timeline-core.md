# T-20261114-13: M3 tests first: timeline compiler and player core

- **Owner:** tdd-guide (not installed in this session, so a sonnet general-purpose agent acts as it)
- **Project:** projects/svg-scenes
- **Opened by:** svg-scenes-manager, 2026-11-14
- **Model:** sonnet (writing tests from a written spec)
- **Status:** cancelled on 2026-11-14 (CEO: "I want to test it, do not spend tokens on a tester").
  The API and rules below are kept as the design spec for T-20261114-14.

## Goal

Failing, exact tests for the two pure M3 modules: `src/timeline.ts` (compiles a scene into a timed
description of everything that moves) and `src/player-core.ts` (what the player shows at time `t`,
how navigation, speed and keys behave). No browser is needed for these.

## Context

- Plan: `docs/plans/2026-11-14-svg-scenes.md` ("Pipeline" step 5, "Player", "Validation" M3). M1
  and M2 are done (`loadScene`, `validateScene`, `routeStep`, `layoutScene`, `renderSvg`).
- Read `docs/LESSONS.md` first. Three rules from it: assert exact values; run `bun run typecheck`
  on your tests before handing over (strict index access: use a `need()` helper or `!`); check any
  arithmetic against the spec formulas by hand.
- Use `examples/webrtc.scene.yaml` (`loadScene`) plus small inline scenes. Layout comes from
  `layoutScene` (centres in px).

### Agreed API

`src/timeline.ts`
```ts
export const HOP_MS = 800;        // one hop of a packet
export const FLOW_MS = 3000;      // a whole `mode: flow` step
export const STEP_GAP_MS = 400;   // gap after every step (and between chapters)
export const NEUTRAL_COLOR = "#6b7280";
export const TRACK_COLORS: Record<string, string>;
   // blue #3b82f6, orange #f97316, green #22c55e, red #ef4444, purple #a855f7,
   // yellow #eab308, pink #ec4899, teal #14b8a6, gray #6b7280
export function resolveColor(color: string): string;
   // named colour -> hex; "#rgb" or "#rrggbb" returned lower-cased as given; anything else throws
   // Error('unknown colour "x"')

export interface HopTL {
  from: string; to: string;
  link: string;                 // "a--b" exactly as the matching entry of scene.links is declared
  x1: number; y1: number; x2: number; y2: number;   // node centres from the layout
  startMs: number; endMs: number;                   // absolute scene time
  data: Record<string, unknown>;  // card contents while on this hop (see rules)
  note?: string;                  // `at[to].desc` of the node this hop arrives at, if set
}
export interface StepTL {
  id: string;            // "c1s2" = chapter 1, step 2 (1-based); parallel children "c1s2p1", "c1s2p2"
  chapter: number;       // 0-based
  step: number;          // 0-based index inside the chapter; parallel children share their block's
  label: string;         // "" when absent
  desc: string;          // "" when absent
  track: string | null;
  color: string;         // resolved hex, NEUTRAL_COLOR when the step has no track
  mode: "packet" | "flow";
  both: boolean;
  pause: boolean;        // the player pauses at endMs
  path: string[];        // node ids from routeStep
  hops: HopTL[];
  startMs: number; endMs: number;
}
export interface ChapterTL { index: number; title: string; desc: string; startMs: number; endMs: number; steps: StepTL[] }
export interface TrackTL { id: string; label: string; color: string }   // declaration order
export interface Timeline { title: string; totalMs: number; tracks: TrackTL[]; chapters: ChapterTL[]; steps: StepTL[] }
export function compileTimeline(scene: Scene, layout: Layout): Timeline;
```
Rules for `compileTimeline`:
- Steps run in order. The first step starts at 0. Each next step (also across chapters) starts at the
  previous step's `endMs + STEP_GAP_MS`. `totalMs` is the last `endMs` (no trailing gap).
- `mode` defaults to `"packet"`, `both` and `pause` default to `false`.
- Packet mode: one hop per path segment, hop `i` starts at `step.startMs + i * HOP_MS`, lasts `HOP_MS`;
  `step.endMs` = start + hops * HOP_MS.
- Flow mode: every hop has the same `startMs` = step start and `endMs` = start + `FLOW_MS`
  (all segments at once); `step.endMs` = start + `FLOW_MS`.
- A `parallel` block: its children all start at the block start; the block ends at the latest child
  end. The next step after the block starts at that end + `STEP_GAP_MS`. Children appear in
  `steps` in order with ids `c<n>s<m>p<k>`.
- `hop.data` = the step's `data` overlaid with every `at[node].set` of the nodes `path[0..i]` (in path
  order) for hop `i`. Example: NAT on `r1`: the hop `client -> r1` keeps `from: "192.0.2.20:5000"`,
  the hop `r1 -> net` and later hops show `from: "203.0.113.7:54321"`. No `data` gives `{}`.
- `hop.note` = `at[hop.to].desc` when present, else the property is absent.
- `chapters[i].startMs/endMs` = first step start / last step end of that chapter; `steps` flat list is
  all steps in order.
- Pure and deterministic. A scene with no steps gives `totalMs: 0`.

`src/player-core.ts`
```ts
export const SPEEDS: readonly number[];                  // [0.5, 1, 1.5, 2]
export const PULSE_MS = 500;
export interface Caption { chapterTitle: string; chapterDesc: string; stepLabel: string; stepDesc: string; note: string }
export interface PacketPos { stepId: string; x: number; y: number; color: string; direction: 1 | -1 }
export interface FlowState { stepId: string; path: string[]; color: string; both: boolean; progress: number } // 0..1
export interface Card { stepId: string; x: number; y: number; color: string; data: Record<string, unknown> }
export interface Pulse { node: string; color: string; ageMs: number }
export interface Frame {
  chapter: number;               // index of the current chapter
  stepId: string | null;         // current step, see rules
  caption: Caption;
  packets: PacketPos[];          // packet-mode steps active at t (both:true adds a second packet, direction -1)
  flows: FlowState[];            // flow-mode steps active at t
  card: Card | null;
  pulses: Pulse[];
}
export function frameAt(tl: Timeline, tMs: number): Frame;
export type Jump = "hop" | "message" | "chapter";
export function nextTime(tl: Timeline, tMs: number, kind: Jump): number;
export function prevTime(tl: Timeline, tMs: number, kind: Jump): number;
export function clampTime(tl: Timeline, tMs: number): number;          // 0..totalMs
export function stepSpeed(current: number, dir: 1 | -1): number;       // moves along SPEEDS, clamped
export type Action = "toggle" | "nextHop" | "prevHop" | "nextMessage" | "prevMessage"
  | "nextChapter" | "prevChapter" | "faster" | "slower" | "restart";
export function keyAction(key: string): Action | null;
export interface Marks {
  chapters: { index: number; title: string; startPct: number; endPct: number }[];
  dots: { stepId: string; pct: number; color: string; chapter: number }[];
}
export function timelineMarks(tl: Timeline): Marks;                      // pct of totalMs, 0..100
export function timeFromFraction(tl: Timeline, fraction: number): number; // clicks and drags on the bar
export function stepTimes(tl: Timeline): { stepId: string; startMs: number }[]; // for click-on-dot jumps
```
Rules for the player core:
- Active step = `startMs <= t < endMs`. Current step = the active step with the highest index in
  `tl.steps`; if none is active, the latest step with `endMs <= t` (the caption stays); before the
  first step it is `null`, `chapter` is 0 and the caption is empty strings except `chapterTitle`
  and `chapterDesc` of chapter 0.
- `caption.note` = the `note` of the most recently arrived hop of the current step (`hop.endMs <= t`),
  empty string when none. `stepLabel`/`stepDesc` come from the current step.
- Packet position: on the hop with `startMs <= t < endMs`, linear interpolation between its
  `(x1,y1)` and `(x2,y2)` by `(t - startMs) / HOP_MS`. Between hops it sits on the last arrived
  hop end. `direction: 1`. With `both`, a second packet moves the same hops in reverse with
  `direction: -1` (the last hop first, from `(x2,y2)` to `(x1,y1)`), same timing as the first.
- Flow: `progress = (t - startMs) / (endMs - startMs)`.
- `card`: only for the current step when it is packet mode and active: position = packet position,
  `data` = the `data` of the hop the packet is on.
- `pulses`: one per hop whose `endMs <= t < endMs + PULSE_MS`, `ageMs = t - endMs`, colour of its step.
- `nextTime`: boundaries are the sorted unique `startMs` of all hops (`hop`), of all steps (`message`),
  of all chapters (`chapter`). `nextTime` = smallest boundary strictly greater than `t`, else
  `totalMs`. `prevTime` = largest boundary strictly less than `t - 300`, else 0.
- `stepSpeed`: 1 up gives 1.5, 2 up stays 2, 0.5 down stays 0.5.
- `keyAction`: `" "` toggle, `ArrowRight` nextHop, `ArrowLeft` prevHop, `n` nextMessage,
  `p` prevMessage, `]` nextChapter, `[` prevChapter, `+` and `=` faster, `-` slower, `Home` restart,
  anything else `null`.
- `timelineMarks`: percentages are `ms / totalMs * 100` (all 0 when `totalMs` is 0); one dot per
  step at its `startMs`.
- `timeFromFraction`: clamps the fraction to 0..1 and multiplies by `totalMs`.

Also write `test/validate-colors.test.ts`: `validateScene` must report
`track "x": colour "y" is not a named colour or a hex value` for a track with colour `"banana"`
(path `tracks.x.color`) and accept `blue`, `#abc`, `#A1B2C3`. (Implementation lands in ticket 14.)

## Scope

- Do: `test/timeline.test.ts`, `test/player-core.test.ts`, `test/validate-colors.test.ts`. Hand-calc
  every expected number from the rules (for the example: first step `c1s1` starts at 0, ends at
  `3 * HOP_MS`...). Run `bun run typecheck` on the tests.
- Do not: write implementation code, touch existing tests, schema, examples, or commit. No new
  dependencies.

## Approvals

CEO said "go until everything is done" on 2026-11-14.

## Rules

- Follow `CLAUDE.md`. No private values, no em dashes.

## Validation

- `bun test` red output with only the new files failing (missing modules, and the colour validation
  test), `bun run typecheck` clean except the missing-module imports, and `./scripts/check-public.sh
  --all` exit 0. Manager reads the tests before tickets 14 and 15 start.

## Done when

- Every rule above has at least one test with exact expected values, including the NAT data example,
  a parallel block, flow mode, `both`, `pause`, the navigation boundaries, each key, and the marks.

## Report

<The agent fills this in when finished. Add the line `Status: done` (or `blocked`) at the top of
this section, then:>

- **Did:**
- **Verified (real output):**
- **Left / needs a decision:**
- **Lessons:**
