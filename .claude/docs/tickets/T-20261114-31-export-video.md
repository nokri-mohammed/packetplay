# T-20261114-31: export command (MP4 and GIF)

- **Owner:** general-purpose agent (implements); chief of staff verifies and commits
- **Project:** projects/packetplay
- **Opened by:** packetplay-manager, 2026-11-15
- **Model:** sonnet (one command, follows a written design; no new dependency)
- **Status:** done

## Goal

`packetplay export <scene> -o out.mp4|out.gif` renders the animation to a video or GIF, frame by
frame and deterministically, with no controls visible.

## Context

- The page's animation is a pure function of the clock. `src/player.ts` has `seekClock(c)`,
  `clockFromReal`, `realFromClock`, `clockTotal` (read them first). So a driver can seek to time t,
  screenshot, and repeat.
- No new npm dependency (CLAUDE.md rule). Design that needs none:
  1. The page always exposes `window.__packetplay = { durationMs, seek(ms) }` (real milliseconds at
     1x speed, paused state after seek). Tiny, harmless.
  2. A page flag `#export` (URL hash) hides the controls, zoom pills and caption chrome that are not
     part of the diagram, and fits the diagram to the viewport. Caption and timeline: keep the
     caption (it teaches), hide the buttons, hint and zoom pills. Decide and document.
  3. The CLI launches a locally installed Chrome or Chromium headless with
     `--remote-debugging-port=<free port>` (localhost only) and talks Chrome DevTools Protocol over
     Bun's built-in `WebSocket`. Per frame: `Runtime.evaluate` seek, then `Page.captureScreenshot`
     (png or jpeg), and pipe the bytes to `ffmpeg` (`-f image2pipe`).
  4. Chrome discovery order: env `CHROME_PATH`, then `google-chrome`, `chromium`,
     `chromium-browser` on PATH, then `~/.cache/ms-playwright/chromium-*/chrome-linux/chrome`.
     Clear error with install hint if Chrome or ffmpeg is missing. Always kill Chrome on exit, error
     or Ctrl+C, and use a temp profile dir that is deleted.
  5. Options: `--format mp4|gif` (inferred from the extension), `--fps` (default 30; gif default 15),
     `--speed` (playback speed, default 1), `--width` (default 1280, height from aspect), `--from` and
     `--to` in seconds, `--scale` for device pixel ratio (default 1). MP4: H.264, `yuv420p`,
     `+faststart`, even dimensions, `-crf 20`. GIF: two-pass `palettegen`/`paletteuse`, `-loop 0`.
     Print progress to stderr (frame N of M) and a final line with output path and size.
  6. Also add `export` to the CLI usage text, the README command-line section and
     `skills/packetplay/SKILL.md` (one short paragraph: needs Chrome and ffmpeg, optional).
  7. Rebuild the one-file skill (`bun run build:skill`) so `packetplay.js` has the command.
- Local facts: ffmpeg is at `/usr/bin/ffmpeg`; Playwright Chromium exists under
  `~/.cache/ms-playwright/`. Never put absolute home paths or usernames in committed files; use `~`.
- Existing files: `src/cli.ts`, `src/player.ts`, `src/build.ts` (or wherever the page is assembled),
  `scripts/build-skill.ts`, `src/embedded.ts`.

## Scope

- Do: the page hook and flag, `src/export.ts` (driver), CLI wiring, unit tests for the pure parts
  (option parsing, format inference, Chrome discovery order with injected lookups, ffmpeg argument
  building, frame count math), docs, skill rebuild.
- Do not: add dependencies; bundle a browser; change animation timing or look; commit or push;
  touch examples; run browser automation beyond the export command itself for your own smoke test.

## Approvals

CEO, 2026-11-15: "ok go" to the export command (MP4 and GIF), after the design above was explained.
No approval to commit, publish or post; the manager commits.

## Rules

- Follow the project's CLAUDE.md. Public repo: no private values, no absolute home paths. No em
  dashes. Never write the literal Report-section heading text in the ticket body.
- Stay inside the scope.

## Validation

- `bun test` all green, `bun run typecheck` clean.
- Smoke test: `bun run src/cli.ts export examples/udp.scene.yaml -o <scratch>/udp.mp4` and `.gif`;
  check with `ffprobe` that duration is within 0.2 s of expected, dimensions are even, codec h264 and
  pix_fmt yuv420p. Extract one mid frame with ffmpeg and view it to confirm no controls are shown.
- Same command with the one-file `skills/packetplay/packetplay.js`.
- `./scripts/check-public.sh --all` exit 0 (run it, do not commit).

## Done when

- Both formats render from the dev CLI and the one-file tool.
- Missing Chrome or ffmpeg gives a clear message and exit 1, no hang, no orphan process
  (verify with `pgrep` afterwards).
- Tests, typecheck and the public check pass. Docs and skill updated.

## Report

Status: done

- **Did:** Page hook `window.__packetplay = { durationMs, seek(ms) }` in `src/player.ts`; `#export` flag in `src/page.ts` (inline script adds class `export`; CSS hides the playback controls and zoom pills, keeps title, caption and legend, stage fills the viewport, then `fit()` runs). New `src/export.ts` (option parsing, format inference, frame math, ffmpeg args, Chrome discovery, CDP driver over Bun WebSocket on localhost, cleanup on exit, error and SIGINT/SIGTERM, temp dir deleted). CLI wiring and usage text in `src/cli.ts`. `test/export.test.ts` (15 tests: parsing, frame math, ffmpeg args, discovery order). README command-line section and `skills/packetplay/SKILL.md` updated; `bun run build:skill` rerun. Coordinator's late change applied: discovery is CHROME_PATH, chrome-headless-shell (PATH, then Playwright `chromium_headless_shell-*` newest first), google-chrome, chromium, chromium-browser, Playwright `chromium-*`; headless shell gets no `--headless` flag, full Chrome gets `--headless=new`; error text and docs say chrome-headless-shell is the lightest install and no npm browser package is needed. Design decisions: viewport is 16:9; Chrome started with port 0 and the port is read from DevToolsActivePort; MP4 frames are piped as PNG, GIF frames go to temp PNG files for the two-pass palette; MP4 uses a scale filter to force even dimensions.
- **Verified (real output):** `bun test`: 292 pass, 0 fail. `bun run typecheck`: clean. `./scripts/check-public.sh --all`: exit 0. Dev CLI and one-file `skills/packetplay/packetplay.js` both wrote MP4 and GIF of `examples/udp.scene.yaml`: `Wrote .../s.mp4 (512278 bytes, 467 frames)`, `Wrote .../s.gif (1124873 bytes, 234 frames)`. ffprobe: mp4 codec h264, pix_fmt yuv420p, 1280x720, duration 15.566667 s (467 frames at 30 fps); gif 1280x720, duration 15.6 s; `--speed 4` mp4 3.9 s. A mid frame extracted from the first (pre-change) mp4 showed title, diagram, caption and legend, with no buttons, timeline or zoom pills. Missing Chrome (`CHROME_PATH`, PATH and HOME blanked): message with install hint, exit 1. Missing ffmpeg (ffmpeg off PATH): message, exit 1. After all runs `pgrep -a chrom | wc -l` gave 0 and no `packetplay-export-*` temp dirs remained in /tmp.
- **Left / needs a decision:** Rendering is slow (about 1 to 2 minutes for a 15 s MP4 at 1280x720 with software rendering; GIF at 15 fps is about 25 s). Possible later speedup: jpeg frames for MP4. I did not re-view a frame from the post-change runs. `--height` is not offered (16:9 only). Nothing committed.
- **Lessons:**
  - [project] Headless Chrome in this WSL setup renders in software, so frame capture costs 100 to 250 ms per frame; budget for it in docs and examples.
  - [agent] Do not `rm -f $VAR/*.ext` in a Bash call: the safety check blocks variable-expanded rm. Write to a fresh output directory instead.
