# T-20261114-14: Playable page and CLI (M3 and M4 together)

- **Owner:** general-purpose agent (implementer)
- **Project:** projects/svg-scenes
- **Opened by:** svg-scenes-manager, 2026-11-14
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
- Plan: `docs/plans/2026-11-14-svg-scenes.md` ("Player", "CLI").
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
6. `src/cli.ts` and `package.json` (`"bin": { "svg-scenes": "src/cli.ts" }`, shebang
   `#!/usr/bin/env bun`, scripts `build:example` and `cli`):
   - `svg-scenes build <file> -o <out.html>`: load, validate (print every issue as
     `file: message`, exit 1 if any), build, write. Default output `<file basename>.html` next to the
     input. Print the output path and size.
   - `svg-scenes convert <file> --to json|yaml [-o <out>]`: load, validate, write the converted
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

<The agent fills this in when finished. Add the line `Status: done` (or `blocked`) at the top of
this section, then:>

- **Did:**
- **Verified (real output):**
- **Left / needs a decision:**
- **Lessons:**
