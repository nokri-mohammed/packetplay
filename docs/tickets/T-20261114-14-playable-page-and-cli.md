# T-20261114-14: Playable page and CLI (M3 and M4 together)

- **Owner:** general-purpose agent (implementer)
- **Project:** projects/packetplay
- **Opened by:** packetplay-manager, 2026-11-14
- **Model:** sonnet (spec is written; the CEO asked to keep token use low)
- **Status:** open

## Goal

`bun run src/cli.ts build examples/webrtc.scene.yaml -o dist/webrtc.html` writes ONE self-contained
HTML file that the CEO opens in a browser to watch and control the animated WebRTC diagram. Also
`convert` between YAML and JSON.

## Context

- CEO decision (2026-11-14): "I want to test it, do not spend tokens on a tester." So: NO tests-first
  stage, NO tester or reviewer agent, NO browser automation. The CEO tests the page by hand.
  Ticket T-20261114-13 (tests for this) is cancelled; its API and rules section is now the DESIGN
  SPEC for `src/timeline.ts` and `src/player-core.ts`. Read it in full and follow it exactly
  (constants, interfaces, timing rules, data overlay rules, navigation rules, keys, marks).
- Already built (M1, M2; do not change behaviour): `loadScene`, `validateScene`, `routeStep`,
  `layoutScene`, `renderSvg` (static SVG with `data-node`, `data-link`, `data-group` attributes; it
  must stay free of `<style>`), `prefixIds`, `bun run render:example`. Read `docs/LESSONS.md`.
- Plan: `docs/plans/2026-11-14-packetplay.md` ("Player", "CLI").
- Dependencies approved by the manager for this ticket: runtime `animejs` 4.5.0 (exact version, MIT).
  Nothing else. No Playwright, no test libraries.

## Scope

Do, in this order, running `bun test` and `bun run typecheck` after each step:

1. `src/timeline.ts`: exactly the API and rules in T-20261114-13 (`compileTimeline`, `resolveColor`,
   `TRACK_COLORS`, constants).
2. `src/validate.ts`: one new semantic issue for a track whose colour is neither a named colour nor
   `#rgb` / `#rrggbb`: message `track "x": colour "y" is not a named colour or a hex value`, path
   `tracks.x.color`. Existing messages stay unchanged.
3. `src/player-core.ts`: exactly the API and rules in T-20261114-13 (`frameAt`, `nextTime`,
   `prevTime`, `clampTime`, `stepSpeed`, `keyAction`, `timelineMarks`, `timeFromFraction`,
   `stepTimes`, `SPEEDS`, `PULSE_MS`).
4. `src/player.ts` (runs in the browser, bundled): reads the timeline JSON and the inlined SVG from the
   page and drives it.
   - The clock is anime.js v4: a paused `createTimeline` (or `animate`) over `0..totalMs`, linear,
     `onUpdate` renders `frameAt(timeline, t)`. Speed uses the anime.js playback rate, seek uses
     anime.js seek. Check the real v4.5.0 API in `node_modules/animejs` (it differs from v3).
   - Rendering from a `Frame`: packets as circles in the track colour moving on the SVG; the data
     card as a small HTML or SVG box next to the packet showing `key: value` lines; node pulse (a
     ring that grows and fades over `PULSE_MS`); flow steps as a stream of dots along the path
     (`both` in both directions); caption panel (chapter title, step label, step desc, note);
     track legend (colour dot and label).
   - Controls: play/pause, previous and next hop, previous and next message, previous and next
     chapter, speed (0.5x, 1x, 1.5x, 2x), restart. Timeline bar: a segment per chapter, a dot per
     step in its track colour, click to jump, drag to scrub (pointer events, works on a phone).
     Keyboard shortcuts from `keyAction`. When a step has `pause: true` the player pauses at its end.
     At the end it stops (play restarts from 0).
   - `prefers-reduced-motion: reduce`: nothing moves. Play advances message by message (about 2 s per
     step) showing the caption, data card at the step's destination and the pulse of the arrival
     node, but no travelling packets or flow dots.
   - Accessible: buttons are real `<button>` elements with labels and `aria-pressed` where fitting,
     captions in an `aria-live="polite"` region, visible focus.
5. `src/page.ts`: `buildHtml(scene: Scene): Promise<string>`. Lay out, `renderSvg`, `compileTimeline`,
   bundle `src/player.ts` with `Bun.build` (minified, browser target, includes anime.js), and
   assemble one HTML document: inline CSS (a `<style>` in the page, never inside the SVG), the SVG,
   the controls, the timeline JSON in `<script type="application/json">` (escape `</script>` and
   `<!--`), and the bundle in one inline `<script>`. Light and dark follow `prefers-color-scheme`.
   Responsive: works at phone width (16 px gutter, no horizontal page scroll; the SVG scales with its
   viewBox). Page title is the scene title. No external requests of any kind.
6. `src/cli.ts` and `package.json` (`"bin": { "packetplay": "src/cli.ts" }`, shebang
   `#!/usr/bin/env bun`, scripts `build:example` and `cli`):
   - `packetplay build <file> -o <out.html>`: load, validate (print every issue as
     `file: message`, exit 1 if any), build, write. Default output `<file basename>.html` next to the
     input. Print the output path and size.
   - `packetplay convert <file> --to json|yaml [-o <out>]`: load, validate, write the converted
     scene (stdout when no `-o`). YAML to JSON to YAML keeps the same model. Keep the yaml-language-
     server schema comment out of JSON; add it back for YAML output only if the source had `$schema`.
   - Unknown command or missing args: a short usage text, exit 2. `--help` works.
7. `test/build.test.ts`: ONE small smoke test file (no browser): `buildHtml` of the example returns
   a string that has `<title>How a WebRTC call connects</title>`, 7 `data-node`, the timeline JSON
   with 4 chapters, and no `src=`, no `@import`, no `href="http`, no `fetch(`, and the only `http`
   strings are SVG/XML namespace URIs (list any others you find in the Report). Plus the CLI
   `convert` round trip on the two example files.

Do not: change M1 or M2 behaviour or tests, add a tester or reviewer step, add dependencies other than
`animejs`, commit or push, publish to npm.

## Approvals

CEO said "go until everything is done" and "I want to test it, do not spend tokens on a tester"
on 2026-11-14. No npm publishing, no release tag (they need the CEO's approval).

## Rules

- Follow `CLAUDE.md`. Public repo: no private values, only documentation examples. No em dashes
  anywhere (code, comments, page text).
- Page text for users is plain, short English.

## Validation

- Real output in the Report: `bun test` (all green), `bun run typecheck`,
  `bun run build:example` (path and size), `./scripts/check-public.sh --all`, plus the list of every
  `http` string found in the built HTML.
- The CEO opens `dist/webrtc.html` and tests by hand. Report anything you could not verify without a
  browser, so the CEO knows what to look at.

## Done when

- All steps 1 to 7 are done and the commands above pass.
- `dist/webrtc.html` exists, is one file, and makes no external requests.

## Report

Status: done

- **Did:** Steps 1 to 7 in order. `animejs` 4.5.0 installed with an exact pin (`"animejs": "4.5.0"`).
  New: `src/timeline.ts`, `src/player-core.ts`, `src/player.ts`, `src/page.ts`, `src/cli.ts`,
  `test/build.test.ts`. Changed: `src/validate.ts` (one new colour issue, existing messages
  untouched), `package.json` (`bin`, scripts `build:example` and `cli`). No M1 or M2 behaviour
  changed. Real anime.js v4.5.0 API used (checked in `node_modules/animejs/dist/modules/timer`):
  `createTimer({ duration, autoplay: false, onUpdate, onComplete })`, `timer.seek(ms)`,
  `timer.play()`, `timer.pause()`, `timer.speed = x`, `timer.currentTime`, `timer.paused`. The clock
  is a paused timer over `0..totalMs`; it is not a timeline because nothing needs a per-property
  tween, `frameAt` renders every frame from the time.
  Choices: `pause: true` is detected in `onUpdate` by crossing the step's `endMs` while playing,
  then `pause()` and `seek(endMs)`. Reduced motion uses the same timer with a synthetic clock of
  2000 ms per step. The data card and overlay are SVG added at runtime to the inlined SVG (the
  static SVG still has no `<style>`). Timeline JSON escapes every `<` as `\u003c`; the bundle
  escapes `</script`.
- **Verified (real output):**
  - `bun test`: `139 pass, 0 fail` (135 old plus 4 new smoke tests), 11 files.
  - `bun run typecheck`: `$ tsc --noEmit` with no errors.
  - `bun run build:example`: `Wrote dist/webrtc.html (63513 bytes)`.
  - `./scripts/check-public.sh --all`: exit 0.
  - Example timeline: `totalMs` 24600, steps `c1s1:0-2400 c1s2:2800-5200 c2s1:5600-8000
    c2s2:8400-10800 c3s1:11200-16000 c3s2:16400-21200 c4s1:21600-24600`; NAT hop data
    `192.0.2.20:5000` then `203.0.113.7:54321` on hops 2 and 3. A track colour `banana` gives
    `track "signal": colour "banana" is not a named colour or a hex value`.
  - Built HTML: no `src=`, no `@import`, no `href="http`, no `fetch(`, no XMLHttpRequest, sendBeacon
    or Worker. Every `http` string found: only `http://www.w3.org/2000/svg` (twice: the SVG
    namespace attribute in the page and the one the player uses to create overlay elements).
    The word `WebSocket` appears twice, both inside scene text in the timeline JSON.
  - CLI: `bogus` command prints usage and exits 2; `--help` works; `convert` YAML to JSON equals the
    JSON example, JSON to YAML to JSON round trips (both in the smoke test).
- **Left / needs a decision:** Nothing blocked. NOT verified (no browser was used, by order): the
  whole player. The CEO should open `dist/webrtc.html` and look at the list below. The timeline JSON
  holds each step twice (in `steps` and in `chapters[].steps`), so the page is larger than needed;
  an optimisation for later, not a bug. Nothing was committed.
- **Lessons:** (1) `Bun.build` with `target: "browser"` tree-shakes `animejs` to about 40 KB when
  only `createTimer` is imported, so one inline script is fine. (2) The anime.js timer `seek` on a
  running timer fires `onUpdate` re-entrantly; the player guards with a `ticking` flag and sets its
  last-clock value before seeking so pause points do not fire by mistake.

### What the CEO should look at in the browser

1. Open `dist/webrtc.html` (double click, no server). Light and dark follow the system theme.
2. Play: the blue packet should travel laptop, router, internet, signaling server with a data card
   (`room: 42`) next to it, and a ring should pulse at each node it reaches.
3. Chapter 2: the card shows `from: 192.0.2.20:5000` before the router and `203.0.113.7:54321`
   after it, and the note "Your router swaps your private address..." appears at the router.
4. Chapter 4 (green, flow, both): streams of dots run both ways along laptop to Sam for about 3 s.
5. Controls: Play/Pause, Restart, Hop, Message and Chapter back and next, speeds 0.5x to 2x.
6. Timeline bar: chapter segments, a coloured dot per step, click to jump (click near a dot snaps to
   that step), drag to scrub with mouse and with a finger on a phone. Nothing should scroll the page
   while dragging the bar.
7. Keys: Space, Left and Right, N and P, `[` and `]`, `+` and `-`, Home. Space on a focused button
   should toggle once only, not twice.
8. At the end it stops; Play then restarts from the beginning. Changing speed while playing should
   not jump the position.
9. Reduced motion (turn on "reduce motion" in the OS or browser dev tools): no travelling packets or
   dots; Play advances one step about every 2 s with caption, card at the destination and a static
   ring at the arrival node.
10. Phone width (about 375 px): no horizontal scroll, buttons wrap, the SVG scales; the card text is
    small there because it scales with the SVG.
11. Check the browser console is empty and the Network tab shows no requests beyond the file itself.
