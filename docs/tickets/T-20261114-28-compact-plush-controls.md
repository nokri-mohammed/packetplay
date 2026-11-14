# T-20261114-28: Compact playback controls in the Plush UI look

- **Owner:** general-purpose agent (implementer)
- **Project:** projects/packetplay
- **Opened by:** packetplay-manager, 2026-11-14
- **Model:** sonnet (page CSS and markup, small player wiring)
- **Status:** done

## Goal

A more compact page. The controls are reduced to what is needed: Play/Pause, Restart and the speeds
0.5x, 1x, 1.5x, 2x. They are restyled to look like Plush UI components (soft pill buttons, a
toggle-group for the speeds, circular icon buttons).

## Context

- CEO request, 2026-11-14: "I would like to compact a bit the view; only pause, restart needed and 0.5,
  1, 1.5 and 2x; try to use those components to redesign the UI https://plush-ui.pages.dev/".
- What Plush UI is (checked by the manager): React components on shadcn, Radix and Tailwind v4,
  installed through a shadcn registry; MIT licensed (its font Open Runde is OFL, its Hugeicons icons are
  MIT). It cannot be dropped into this project: the repo rule is no new dependencies, and the output is
  ONE self-contained HTML file with no React, no external fonts or requests. So we port the look in
  plain CSS and plain inline SVG. Do not copy source files, do not add the font, do not add npm
  packages. A one-line credit comment in `src/page.ts` ("styling inspired by Plush UI, MIT") is fine.
- Plush tokens to port (light theme; Plush has no dark theme, so derive dark values yourself and keep the
  existing `prefers-color-scheme: dark` mechanism in `src/page.ts`): surface `#ffffff`, fill `#f0f0ee`,
  fill-strong `#e8e8e5`, line `#e4e4e1`, ink `#141414`, ink-2 `#6e6e72`, accent `#161616` with on-accent
  `#ffffff`; radius full `999px`, row `16px`, card `28px` (use smaller: 20px); soft shadow `0 1px 2px
  rgba(20,20,20,.04), 0 8px 24px rgba(20,20,20,.04)`; knob shadow `0 1px 3px rgba(20,20,20,.16), 0 2px
  8px rgba(20,20,20,.06)`; font `ui-rounded, "SF Pro Rounded", system-ui, sans-serif`, weights 500 and
  600; press scale `.95` for pills and `.86` for round icon buttons, hover grow `1.06`; focus ring 2px
  with 2px offset; transitions 120 to 200 ms (zero under `prefers-reduced-motion`).
- Plush component behaviour to copy: `button` is a pill (default black, `secondary` is grey, `outline` is
  white with a soft shadow instead of a border, `ghost` is transparent); `icon` buttons are circles;
  `toggle-group` is a row of pills where the selected item is raised (accent fill, white text) and the
  rest are flat.
- Read `docs/LESSONS.md`, `src/page.ts` (CSS, markup, ids), `src/player.ts` (about lines 585 to 740:
  `playBtn`, `speedBtns`, `data-speed`, the `btn-*` map, zoom buttons, keyboard handling) and the tests
  that look at the page (`grep -ln "btn-play\|data-speed\|zoom-" test/*.ts`). CEO rules: no tester or
  browser automation (he tests by hand). PUBLIC repo: no absolute local paths or usernames. No em
  dashes. No new dependencies, no external requests (the page tests check only the SVG namespace URI
  appears as an `http` string).

## Spec

- Controls row (keep `role="group"` and aria labels), one compact line, wrapping only on very narrow
  screens:
  1. Play/Pause: one round icon button (accent, white icon, about 40 px), id `btn-play`. It shows a play
     triangle when paused and two bars when playing, drawn as small inline SVG with `currentColor`.
     `aria-label` switches between "Play" and "Pause" (update `player.ts` where it sets
     `playBtn.textContent`; set the label and swap the icon instead).
  2. Restart: a round secondary icon button (grey fill), id `btn-restart`, a circular-arrow icon,
     `aria-label="Restart"`.
  3. Speed toggle-group: four pills `0.5x 1x 1.5x 2x` with `data-speed` and `aria-pressed` as today, the
     selected one raised (accent fill), height about 32 px, grouped in one rounded track (fill-strong
     background, 3 px padding, full radius).
- Remove from the markup: the six chapter, message and hop buttons and the long "Keys:" hint paragraph.
  The keyboard shortcuts and the code behind them stay exactly as they are (keys: Space, arrows, N, P,
  brackets, plus and minus, Home). Put the key list in the Play button's `title` and in an
  `aria-keyshortcuts` attribute instead of a paragraph. Make `player.ts` tolerate the missing nav
  buttons (the `btn-*` map must skip ids that are not in the page) and keep the navigation functions
  and their tests.
- Layout, compact: the timeline bar (`.bar`) and the controls share one row when there is room: Play,
  Restart, the bar growing in the middle, the speed group on the right; below 640 px wide they stack.
  Reduce the caption's `min-height` (7.5em today) as far as it can go without the layout jumping for the
  longest step description in the examples (measure by character count; say what you chose and why).
  The title (`h1`), legend, and stage keep their meaning; tighten margins and padding by roughly a third.
- Zoom bar over the canvas: keep `-`, `Fit`, `+` and the percentage, restyled as a small ghost pill group
  (soft shadow, round), same ids (`zoom-in`, `zoom-out`, `zoom-fit`, `zoom-label`), about 32 px high.
- Restyle the rest of the page with the tokens above (panels get the soft shadow and 20 px radius; the
  caption, legend and bar adopt the Plush surface look), in light and dark mode, keeping contrast
  readable. The SVG stage content (nodes, packets, arrows) is NOT restyled.
- Tests: update exact assertions that look at the removed ids or the hint; add exact tests that the page
  has `btn-play`, `btn-restart`, exactly four `data-speed` buttons with values 0.5, 1, 1.5, 2 (1 pressed),
  the three zoom ids, and no `btn-prev-*` or `btn-next-*` ids and no "Keys:" text; and that
  `src/player.ts` still maps the key shortcuts (existing player-core tests must stay green).

## Scope

- Do: `src/page.ts` (CSS and markup), `src/player.ts` (button wiring only), tests, then `bun run
  build:examples`.
- Do not: change the engine, timeline, schema, layout, SVG rendering, the speeds list or the keyboard
  behaviour. No commit, no push.

## Approvals

CEO asked for this on 2026-11-14 and said earlier "go until everything is done".

## Rules

- Follow `CLAUDE.md`. Run `./scripts/check-public.sh --all` before finishing; it must exit 0.
- Never put the literal heading text of the Report section anywhere else in this file.

## Validation

- Real output in the Report section: `bun test` (count), `bun run typecheck`, `bun run build:examples`
  (all sizes), `./scripts/check-public.sh --all`, the `http` strings found in one built page (namespace
  URIs only).
- A short numbered browser checklist for the CEO (compact row, play icon swaps to pause, restart works,
  the speed group highlights the selected speed, zoom pills, keyboard still works, dark mode, a narrow
  window, reduced motion).

## Done when

- Tests are green, all five pages build, the controls row has only Play/Pause, Restart and the four
  speeds, and the page is visibly tighter.

## Report

Implemented in `src/page.ts` (CSS and markup), `src/player.ts` (wiring only) and `test/build.test.ts`. Nothing committed or pushed.

Real output:

- `bun test`: 242 pass, 0 fail (18 files; 2 new tests).
- `bun run typecheck`: clean (`tsc --noEmit`, no output).
- `bun run build:examples`: webrtc 87733 bytes, udp 73815, website 108583, osi 78287, homenet 110844.
- `./scripts/check-public.sh --all`: exit 0.
- `http` strings in `dist/webrtc.html`: only `http://www.w3.org/2000/svg`.

Design choices:

- Plush tokens ported as CSS variables (light values as given; dark values derived: bg `#0e0e10`, panel `#1a1a1d`, fill `#242427`, fill-strong `#2e2e32`, accent flips to near-white with dark on-accent). Font stack `ui-rounded, "SF Pro Rounded", system-ui`, weights 500 and 600, no font added. One credit comment above the CSS.
- Controls: Play is a 40 px accent circle with two inline SVGs (`i-play`, `i-pause`) swapped by `data-state` on the button; `player.ts` now sets `data-state` and the aria-label instead of `textContent`. Restart is a 40 px grey circle with a circular-arrow SVG. Speeds are four 32 px pills in a fill-strong track (3 px padding); the pressed one is raised (accent, knob shadow). Press scale .86 on round buttons, .95 on pills, hover 1.06, focus ring 2 px with 2 px offset, 160 ms transitions, none under reduced motion.
- Layout: `.controls` is one panel row: Play, Restart, the `.bar` (flex-grow, pill track), speed group on the right (CSS `order`; the bar was moved inside `.controls` in the markup). Below 640 px the bar takes its own full-width row under the buttons and the speed group goes right. Margins and padding cut by about a third (main 16 to 10/12, h1 1.4 to 1.25rem, caption padding 12/16 to 8/14, legend smaller).
- Caption `min-height`: 7.5em to 7em. Measured by character count over all five examples: longest step description is 277 chars (osi), then 204 (website), 198 (homenet); no chapter descriptions or notes are used. At 1100 px max width (about 1070 px text, about 7.5 px per char at .95rem) that is about 138 chars per line, so 277 chars is 2 lines. Content height is about padding 16 + heading 19 + step 25 + 2 lines of text 46, near 112 px, which is 7em. I could not measure in a browser (CEO rule), so on a narrow phone longer text will still grow the box; that is unavoidable.
- Zoom bar: ghost pill group (transparent buttons, knob shadow, round), 32 px, same ids.
- Removed the six nav buttons and the hint paragraph. The shortcut list is now the Play button `title` (worded "Shortcuts: ...", because the test forbids the text "Keys:") and `aria-keyshortcuts`. `buttonActions` loop uses `document.getElementById(id)?.addEventListener`, so missing ids are skipped; navigation functions, `keyAction` and the keyboard handler are untouched.
- Stage SVG content is not restyled.

Browser checklist for the CEO:

1. Open `dist/webrtc.html`: Play, Restart, the timeline bar and the speed group sit on one row; the page looks tighter.
2. Press Play: the triangle becomes two bars; press again: back to the triangle.
3. Restart jumps to the start; Home does the same.
4. Click 0.5x, 1x, 1.5x, 2x: only the selected pill is raised; the animation speed changes; the + and - keys move the selection.
5. Zoom pill group: -, Fit, +, and the percentage work; wheel, drag and pinch still work.
6. Keyboard: Space, Left and Right, N and P, [ and ], Home still work. Hover Play to see the shortcut tooltip.
7. Dark mode (OS setting): panels, pills and text stay readable; the selected speed pill is light on dark.
8. Narrow window (under 640 px): the bar drops to its own row; nothing overflows.
9. Reduced motion (OS setting): no press or hover scaling on the buttons.
10. Check the longest example text (`dist/osi.html`, longest step) for a caption that jumps in height on desktop.

Lessons:

- A `title` or any attribute counts as page text for a "no Keys:" assertion, so word the shortcut tooltip differently ("Shortcuts:").
- Moving the `.bar` into `.controls` and ordering with CSS `order` keeps the DOM ids and `player.ts` lookups unchanged; `render` only needs `#bar` by id.
- Caption `min-height` can only be estimated from character counts without a browser: 277 characters is the longest step text across the examples.
