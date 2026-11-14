# T-20261114-24: Slightly faster 1x, a noticeable reveal, and a typing animation before sending

- **Owner:** general-purpose agent (implementer)
- **Project:** projects/svg-scenes
- **Opened by:** svg-scenes-manager, 2026-11-14
- **Model:** sonnet (clear spec; constants, one optional schema field, player drawing, one example edit)
- **Status:** done

## Goal

(1) 1x is slightly faster again. (2) When a hidden node appears (T-20261114-22) it is much easier to
notice. (3) A step can show text being typed at its source node, character by character, and then the
message is sent. The website example starts like that: the user types the address, then the request goes.

## Context

- CEO feedback, 2026-11-14: "slightly faster; the appearance of a new item should be more noticeable;
  also is it possible to start the initial like show a sort of typing animation then send".
- Typing needs one optional, backwards-compatible schema field (below). Everything else is player or
  constants.
- Read `docs/LESSONS.md`, `src/timeline.ts`, `src/player-core.ts` (`frameAt`, `routeHighlight`,
  `revealOpacity`, `balloonRect`, `BALLOON_GAP`), `src/player.ts`, `src/validate.ts`,
  `schema/scene.schema.json`, `examples/website.scene.yaml`. CEO rules: no tester or browser automation
  (he tests by hand). PUBLIC repo: no absolute local paths or usernames. No em dashes. No new
  dependencies. Scenes that use no `typing` keep exactly their current timing (apart from the faster
  constants).

## Spec

### 1. Faster 1x (about 15 percent)

- `src/timeline.ts`: `HOP_MS` 1100, `NODE_DWELL_MS` 650 (a hop period of 1750 ms), `FLOW_MS` 4300,
  `STEP_GAP_MS` 450. `src/player-core.ts`: `PULSE_MS` 650. Do not touch anything else in timing. The
  speed list and keys stay.
- Update every test and comment that encodes the old numbers, with exact values recomputed by hand
  (webrtc, udp, website and osi totals; state each hand calculation in the Report).

### 2. A noticeable reveal

- When a hidden node is revealed, keep the existing fade (`REVEAL_FADE_MS`, may stay 600) and add, all
  as pure functions of the clock time (nothing runs on its own, seeking works):
  - a pop: the node group scales from 0.6 to 1.15 and back to 1 over 700 ms from `atMs` (ease it with a
    simple piecewise or sine curve; scale about the node centre via a `transform` on the node group;
    remove the transform when done);
  - two expanding rings at the node centre (accent colour: the colour of the revealing step's track),
    radius 48 to 150 over 900 ms, second ring delayed 250 ms, opacity fading 0.8 to 0;
  - a short text tag "NEW" is NOT needed.
- Export a pure helper in `src/player-core.ts`, for example `revealPop(t: number, atMs: number): {
  scale: number; rings: { r: number; opacity: number }[] }`, with exact unit tests (before `atMs`,
  at start, at the peak, at the end of 700 ms, ring radii and opacities at chosen times). State the
  formula in the Report. Reduced motion: no pop and no rings (the node simply shows).

### 3. Typing before sending

- Schema (`schema/scene.schema.json`, then `bun run gen:types`): optional `typing: string` on a step
  (`minLength` 1, `maxLength` 80; description: "Text typed at the source node before the message is
  sent"). Validator: nothing extra beyond the schema (add a `validateScene` test that an empty string and
  a non-string are rejected through the schema).
- Constants in `src/timeline.ts`: `TYPE_CHAR_MS = 80`, `TYPE_HOLD_MS = 500` (a pause after the last
  character, with the "Enter" flash). For a step with `typing`, `typingMs = typing.length *
  TYPE_CHAR_MS + TYPE_HOLD_MS`. The step's hops shift later by `typingMs` (hop `i` starts at
  `startMs + typingMs + i * (HOP_MS + NODE_DWELL_MS)`), and the step `endMs` grows by `typingMs`.
  `StepTL` gets `typingMs` (0 when none) and `typing` (the text, or empty). `routeHighlight` must start at
  `startMs + typingMs` (the arrow lights up when the message leaves), and the caption and desc of the
  step show from `startMs` as today. Navigation boundaries and `frameAt` stay consistent: a packet is not
  drawn before its first hop starts.
- Drawing (`src/player.ts`, inside `g.scene`): while `t` is in `[startMs, startMs + typingMs)` draw a
  small input box above the source node (same balloon distance as packets, `BALLOON_GAP`, an address-bar
  look: rounded rectangle, light page fill, thin border in the track colour, text in the packet font)
  showing the typed text so far and a blinking caret (blinks every 400 ms from the time). Text types one
  character per `TYPE_CHAR_MS`. During the hold, after the last character, the caret stops and the box
  border and a small "Enter" tag in the track colour flash once. At `startMs + typingMs` the box
  disappears and the packet leaves. Pure helper in `src/player-core.ts`, exported and covered by exact
  tests: `typingState(t: number, step: StepTL): { text: string; caret: boolean; sent: boolean } | null`
  (null outside `[startMs, startMs + typingMs)`; `sent` true during the hold).
- Reduced motion: the finished text with the Enter tag is shown at the source node for the step, no
  animation, and the packet shown as before.
- Website example: the first step (`you -> laptop`, label "Visit shop.example.com") gets
  `typing: "shop.example.com"`. Regenerate the JSON with `bun run src/cli.ts convert <yaml> --to json -o
  <json>`. No other example changes.

### 4. Tests (small and exact)

- Timeline: a step with `typing` has hops shifted by `typingMs`, the exact `endMs`, and `totalMs` of the
  website example recomputed by hand (state it); a step without `typing` is unchanged.
- `typingState`, `revealPop`, `routeHighlight` start for a typing step, schema accepts and rejects
  `typing`, `build.test.ts` totals for all four examples.

## Scope

- Do: constants, tests, the reveal effect, the typing field and drawing, the website example, then
  `bun run build:examples`.
- Do not: change layout maths, lane geometry, zoom, pan, other examples, or the packet and arrow
  behaviour from T-20261114-23. No commit, no push.

## Approvals

CEO asked for this on 2026-11-14 and said earlier "go until everything is done". It adds one optional
schema field; backwards compatible.

## Rules

- Follow `CLAUDE.md`. Run `./scripts/check-public.sh --all` before finishing; it must exit 0.
- Never put the literal heading text of the Report section anywhere else in this file.

## Validation

- Real output in the Report section: `bun test` (count), `bun run typecheck`, `bun run build:examples`
  (all sizes), `./scripts/check-public.sh --all`, the hand calculations, the reveal formula.
- A short numbered browser checklist for the CEO (typing box above "You" with the address typed one
  letter at a time and a blinking caret, Enter flash, then the packet leaves; the server pops in with
  rings when the DNS answer arrives; everything a little faster; reduced motion; other examples).

## Done when

- Tests are green, all four pages build, 1x is faster, the reveal pops with rings, and the website page
  starts with the typing animation.

## Report

Done in the order of the ticket: faster timing, reveal pop, typing, tests. No commit, no push.

**Real output**

- `bun test`: `221 pass`, `0 fail`, `1211 expect() calls`, `Ran 221 tests across 17 files`. New file `test/typing-reveal.test.ts`.
- `bun run typecheck`: `tsc --noEmit`, no errors.
- `bun run build:examples`: webrtc.html 84062 bytes, udp.html 70638 bytes, website.html 116877 bytes, osi.html 75136 bytes.
- `./scripts/check-public.sh --all`: exit 0, no output.

**Changes**

- `src/timeline.ts`: `HOP_MS` 1100, `NODE_DWELL_MS` 650, `FLOW_MS` 4300, `STEP_GAP_MS` 450, new `TYPE_CHAR_MS` 80 and `TYPE_HOLD_MS` 500; `StepTL` gets `typingMs` and `typing`; hops and `endMs` shift by `typingMs`. `src/player-core.ts`: `PULSE_MS` 650.
- `schema/scene.schema.json`: optional step field `typing` (string, minLength 1, maxLength 80); `bun run gen:types` run.
- `src/player-core.ts`: new `revealPop`, `typingState`; `routeHighlight` starts at `startMs + typingMs`; `frameAt` draws no packet or flow while typing, and flow progress counts from the departure.
- `src/player.ts`: node group pop (transform `translate(...) scale(s)`, restored to the original when the scale is 1), two rings in the revealing track colour, the typing box above the source node (rounded box, track-colour border, text so far, blinking caret, "Enter" tag and thicker border for the first 250 ms of the hold). Reduced motion: no pop or rings; the finished text and Enter tag show for the step.
- `examples/website.scene.yaml` first step has `typing: shop.example.com`; JSON regenerated with `convert`. Other examples unchanged.
- Existing tests updated with recomputed numbers (`build.test.ts`, `timeline-lanes.test.ts`); `route-highlight.test.ts` step fixture gets `typingMs: 0`.

**Hand calculations** (period = 1100 + 650 = 1750 ms)

- webrtc: 4 steps of 3 hops = 4 * 5250 = 21000; 2 steps of 6 hops = 2 * 10500 = 21000; flow 4300; 6 gaps * 450 = 2700. Total 21000 + 21000 + 4300 + 2700 = 49000. Step windows: [0,5250], [5700,10950], [11400,16650], [17100,22350], [22800,33300], [33750,44250], [44700,49000].
- udp: chapters [0,5250], [5700,10950], [11400,15700]; total 15700 (flow starts at 10950 + 450 = 11400, plus 4300).
- osi: 8 * 1750 + 7 * 450 = 14000 + 3150 = 17150.
- website: "shop.example.com" has 16 characters, so `typingMs` = 16 * 80 + 500 = 1780; step 1 = 1780 + 1750 = 3530; the other 10 steps = 5250 each. Total 3530 + 52500 + 10 * 450 = 60530. DNS query starts 3530 + 450 = 3980, ends 9230; DNS answer starts 9680, hops at 9680, 11430, 13180; the last hop arrives 1100 ms later, so the server reveal is at 14280.
- Typing step test scene ("abc"): typingMs = 3 * 80 + 500 = 740; two hops start 740 and 2490; endMs = 740 + 3500 = 4240; next step starts 4240 + 450 = 4690.

**Formulas**

- Reveal pop, with u = (t - atMs) / 700: scale = 0.6 + 0.55 * sin(u / 0.6 * pi/2) for 0 <= u < 0.6 (peak 1.15 at 420 ms); 1.15 - 0.15 * sin((u - 0.6) / 0.4 * pi/2) for 0.6 <= u < 1 (back to 1 at 700 ms); 1 otherwise (also before atMs).
- Rings: for delay d in {0, 250}, v = (t - atMs - d) / 900; the ring exists for 0 <= v < 1 with r = 48 + 102 * v (48 to 150) and opacity 0.8 * (1 - v). Before atMs there are no rings. The second ring ends at 1150 ms.
- `typingState`: null unless startMs <= t < startMs + typingMs; el = t - startMs; characters = min(len, floor(el / 80)); `sent` = el >= len * 80; caret = not sent and floor(el / 400) is even.
- `routeHighlight`: fade-in and null check use `from = startMs + typingMs`; fade-out still ends at `endMs`.

**Left for the CEO (browser checklist)**

1. Open dist/website.html and press play: a rounded input box above "You" types the address one letter at a time with a blinking caret.
2. After the last letter the caret stops, the border thickens once and an "Enter" tag shows, then the box disappears and the packet leaves toward the laptop (the blue arrow lights up at that moment).
3. When the DNS answer reaches the last hop, the shop.example.com server pops in (small, grows past full size, settles) with two expanding rings in the purple DNS colour.
4. Everything is a little faster at 1x; check 0.5x, 1.5x, 2x.
5. Seek by dragging the bar across the typing and across the reveal: the box, text, pop and rings follow the clock.
6. Turn on reduced motion: the server just shows with no pop or rings; the first step shows the full address with the Enter tag.
7. Open webrtc, udp and osi: unchanged apart from speed.

**Lessons**

- The build test counts `data-node=` in the whole page, and bundled player code is in the page. A selector written as `g[data-node="x"]` in `player.ts` raised the count from 7 to 8. Write such selectors without the literal `data-node=` (loop over `g[data-node]` and compare `getAttribute`).
- Adding a field to `StepTL` means every hand-built step fixture in tests (such as `route-highlight.test.ts`) needs it too, or the maths gives NaN.
- A caret blink test needs a text long enough: with 3 characters the typing window (240 ms) is shorter than one 400 ms blink phase, so use 10 characters to test the second phase.
- A typing step shifts its own hops, so "a packet is not drawn before its first hop" must be explicit in `frameAt`; `hopAt` falls back to hop 0 otherwise.
