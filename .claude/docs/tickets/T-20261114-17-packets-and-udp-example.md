# T-20261114-17: Little packets that show what they carry, and a UDP example

- **Owner:** general-purpose agent (implementer)
- **Project:** projects/packetplay
- **Opened by:** packetplay-manager, 2026-11-14
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
- Read `.claude/docs/LESSONS.md`. CEO rules: no tester, reviewer or browser automation (he tests by hand). This
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

Status: done

- **Did:**
  - `src/player-core.ts`: new exported `packetRows(data, maxRows = 4, maxChars = 26)` and `packetTitle(label)` (22 chars). `PacketPos` now carries `label` and `data`; the `Card` type and `Frame.card` are gone. The reply packet of a `both` step has `data: {}` (header only).
  - `src/player.ts`: packets are upright rounded rectangles drawn inside `g.scene`, centred on the lane point. Header strip in the track colour with the label (white or near-black text by luminance), body rows `key: value`, thin border in the track colour. Flow tokens are 14 x 9 world px rounded rectangles, no text, both lanes with `both`. Reduced motion shows one static packet with data at the step's destination. The floating card code is removed (pulses, lanes, caption note, zoom and pan unchanged).
  - `src/page.ts`: page CSS `.card-bg` and `.card-tx` replaced by `.pk-bg`, `.pk-tx`, `.pk-row` (CSS stays in the HTML page, none inside the SVG).
  - `examples/udp.scene.yaml` and `examples/udp.scene.json` (JSON made with the CLI `convert`, same model).
  - `package.json`: `build:examples` builds `dist/webrtc.html` and `dist/udp.html`; `build:example` kept. README: packet paragraph, both examples, commands.
  - Tests: new `test/packet-rows.test.ts` (9 tests: empty, 2 rows, exactly 4, 6 keys giving `+2 more`, truncation to 26, exact 26 kept, objects, custom limits, title cut). `test/build.test.ts`: 3 UDP tests (same model YAML vs JSON, validates; 3 chapters and exact totalMs; NAT rewrites `src` on hop 2). Changed `test/timeline-lanes.test.ts`: the `expect(final.card).not.toBeNull()` line now asserts the packet's `label` and `data` (the card no longer exists). No snapshot needed changes.
  - Font size: world font 12 px (spec said about 11), glyph width 7.3 px, chosen up front for readability at Fit; not checked in a browser.
- **UDP totalMs by hand (rules in `src/timeline.ts`):** hop time = HOP_MS 1600 + NODE_DWELL_MS 900 = 2500. Chapter 1: 3 hops (laptop, router, net, dns) = 7500, so 0 to 7500; then STEP_GAP 600, cursor 8100. Chapter 2: 3 hops = 7500, 8100 to 15600; gap 600, cursor 16200. Chapter 3: flow lasts FLOW_MS 6000, 16200 to 22200. totalMs = max endMs = 22200. The test asserts exactly this.
- **Verified (real output):**
  - `bun test`: 170 pass, 0 fail (158 before), 1078 expect() calls.
  - `bun run typecheck`: `tsc --noEmit` clean.
  - `bun run build:examples`: `Wrote dist/webrtc.html (78361 bytes)`, `Wrote dist/udp.html (65099 bytes)`.
  - `./scripts/check-public.sh --all`: exit 0.
  - `http` strings in both built pages: only `http://www.w3.org/2000/svg`.
  - No em dashes in changed files; no absolute local paths written.
- **Left / needs a decision:** Nothing visual was checked in a browser (CEO tests by hand). Schema description text still says "data card" (schema untouched per scope). Nothing committed.
- **Lessons:** Write test expectations for truncation by counting characters in code, not by eye (two of my own expectations were off by one). Ticket row rule is ambiguous: I read "6 keys giving `+2 more`" as 4 key rows plus a `+2 more` row (5 lines).

### Browser checklist for the CEO

1. Open `dist/webrtc.html` and press Play: the moving dot is now a small packet with a coloured header showing the step label.
2. Check the rows under the header (for example `room: 42`) are readable at the Fit zoom; if too small, tell the manager to raise the font size.
3. In the UDP page, chapter 1: the packet shows proto, src, dst, payload; after it passes the router the `src` row changes to `203.0.113.7:61000`.
4. UDP chapter 2: the reply packet shows `dst: 203.0.113.7:61000` and after the router it becomes `192.0.2.20:49152`.
5. The rows stay on the packet while it rests at each node (the data of the hop it just finished).
6. UDP chapter 3: tiny orange packets stream along both lanes (laptop to dns and back).
7. Any step with `both: true` in packet mode: the return packet has a header only.
8. Zoom and pan: packets scale and move with the scene; no floating card remains; captions and pulses behave as before.
9. Both examples in light and dark mode: text and borders stay readable.
10. Reduced motion (OS setting or devtools emulation): each step shows a static packet with its data at the destination, nothing travels.
