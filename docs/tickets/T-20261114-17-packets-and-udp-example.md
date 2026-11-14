# T-20261114-17: Little packets that show what they carry, and a UDP example

- **Owner:** general-purpose agent (implementer)
- **Project:** projects/svg-scenes
- **Opened by:** svg-scenes-manager, 2026-11-14
- **Model:** sonnet (clear spec, player drawing code plus two example files)
- **Status:** open

## Goal

(1) The moving dots become small packets that show the information they carry, and the data changes
on the packet when a node rewrites it (for example NAT). (2) A second example, a UDP message
travelling, ships next to the WebRTC one, in YAML and JSON.

## Context

- CEO feedback after trying the build, 2026-11-14: "good like it", "the dots should have a little
  packet show what information do travel", "add another example like udp travelling".
- Today a packet is a coloured circle and a separate data card floats next to it
  (`src/player.ts`, `src/player-core.ts` `Card`, `frameAt`). Flow steps draw small dots. The step's
  `data` (key and values, with `at[node].set` overlays) already reaches the player per hop.
- Read `docs/LESSONS.md`. CEO rules: no tester, reviewer or browser automation (he tests by hand). This
  repo is PUBLIC: documentation example addresses only (`192.0.2.x`, `198.51.100.x`, `203.0.113.x`,
  `example.com`), no absolute local paths or usernames in any file. No em dashes. No new dependencies.

## Spec

### 1. Packet look (player, `src/player.ts`, helper in `src/player-core.ts`)

- A travelling packet is a small rounded rectangle drawn inside `g.scene` (so it scales and pans with
  the scene), centred on the lane point, and it keeps rotating nothing (always upright):
  - a header strip filled with the track colour showing the step label (white or dark text for
    contrast, your choice), truncated with an ellipsis if longer than 22 characters;
  - below it a body with up to 4 rows `key: value` taken from the hop's `data`, one row per key in
    insertion order, each row truncated to 26 characters with an ellipsis; if there are more than 4
    keys the last row is `+N more`. No `data` means header only.
  - Text uses `fill="currentColor"`-style attributes (no CSS inside the SVG), small font (about 11
    world px), a thin border in the track colour, a light page-coloured fill so text stays readable in
    light and dark mode.
- New pure helper in `src/player-core.ts`, exported and covered by a few exact unit tests:
  `packetRows(data: Record<string, unknown>, maxRows = 4, maxChars = 26): string[]` returns the body
  rows as described (values converted with `String()`, objects with `JSON.stringify`).
- The separate floating data card is removed (the packet now carries the information). Keep the
  caption note, pulses, lanes, zoom and pan exactly as they are. When data changes at a node (the NAT
  step), the rows on the packet update at the next hop, because `hop.data` already differs. During the
  rest at a node the packet shows the data of the hop it just finished.
- `both: true` in packet mode: the second packet (direction -1) shows the header only (the reply has
  no data of its own).
- Flow steps: the stream tokens become tiny packets too (rounded rectangle about 14 x 9 world px in the
  track colour, no text), not circles, spaced along the lane as now, both lanes when `both`.
- Reduced motion: the packet is shown (static) at the destination of the step with its data, as the
  card was before; nothing travels.
- The packet must stay readable at the zoom of "Fit" on the example. If the text is too small there,
  raise the world font size and say so in the Report.

### 2. UDP example (`examples/udp.scene.yaml` and `examples/udp.scene.json`, same model)

Title `How a UDP message travels`. Nodes: `laptop` (icon laptop, "Your laptop"), `router` (icon router,
sub NAT, "Your router"), `net` (icon cloud, "Internet"), `dns` (icon server, "DNS resolver", sub
`198.51.100.53`). Links: laptop-router, router-net, net-dns. Tracks: `query` (blue, "UDP query"),
`answer` (green, "UDP answer"), `stream` (orange, "UDP stream").

- Chapter 1 "1. Ask a question": `laptop -> dns`, track `query`, label `UDP query`, data
  `proto: UDP`, `src: "192.0.2.20:49152"`, `dst: "198.51.100.53:53"`, `payload: "A example.com?"`,
  desc "One datagram. No handshake, no connection set up first.". `at: router: set { src:
  "203.0.113.7:61000" }, desc: "NAT replaces your private source address and port"`.
- Chapter 2 "2. The answer comes back": `dns -> laptop`, track `answer`, label `UDP answer`, data
  `proto: UDP`, `src: "198.51.100.53:53"`, `dst: "203.0.113.7:61000"`, `payload: "A 192.0.2.10"`,
  `at: router: set { dst: "192.0.2.20:49152" }, desc: "NAT maps the reply back to your laptop"`.
- Chapter 3 "3. A stream of datagrams": `laptop -> dns`, track `stream`, label `video frames`,
  `mode: flow`, `both: true`, desc "UDP just keeps sending. Lost datagrams are not repeated.".
- Include the `# yaml-language-server: $schema=../schema/scene.schema.json` first line in the YAML.
  Keep the JSON identical in model (`$schema` key optional there).
- The scene must pass `validateScene`; no explicit `at` positions needed (auto layout).

### 3. Build scripts and docs

- `package.json`: keep `build:example` (WebRTC); add `build:examples` that builds both into
  `dist/webrtc.html` and `dist/udp.html` (one CLI call each).
- README: one short paragraph on what the packets show, list both examples and the commands.

### 4. Tests (small, exact, no tester agent)

- `packetRows` unit tests (empty, 2 rows, exactly 4, 6 keys giving `+2 more`, truncation, objects).
- UDP example: loads from YAML and JSON to the same model (ignoring `$schema`), passes
  `validateScene`, `buildHtml` succeeds, the timeline has 3 chapters and the exact `totalMs` computed
  by hand from the rules in `src/timeline.ts` (state the hand calculation in the Report).
- Update any existing test or snapshot that encoded the circle, the card or the dots; keep assertions
  exact and list the changes.

## Scope

- Do: steps 1 to 4 in order, `bun test` and `bun run typecheck` after each, then
  `bun run build:examples`.
- Do not: change layout, lanes, timing constants, schema, M1 behaviour, zoom and pan. No commit, no
  push, no publish.

## Approvals

CEO asked for both on 2026-11-14 and said "go until everything is done".

## Rules

- Follow `CLAUDE.md`. Run `./scripts/check-public.sh --all` before finishing; it must exit 0.
- Never put the literal heading text of the Report section anywhere else in this file.

## Validation

- Real output in the Report: `bun test` (count), `bun run typecheck`, `bun run build:examples`
  (both sizes), `./scripts/check-public.sh --all`, and every `http` string found in both built pages
  (namespace URIs only).
- A short numbered list of what the CEO should look at in the browser (packet header and rows, NAT
  rows changing on the packet, both examples, flow tokens, reduced motion).

## Done when

- Both pages build, tests are green, packets show label and data, the UDP example plays 3 chapters.

## Report

<The agent fills this in when finished. Start with `Status: done` (or `blocked`), then:>

- **Did:**
- **Verified (real output):**
- **Left / needs a decision:**
- **Lessons:**
