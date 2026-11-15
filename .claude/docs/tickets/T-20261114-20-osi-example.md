# T-20261114-20: Example: the OSI model, how a file becomes bits

- **Owner:** general-purpose agent (implementer)
- **Project:** projects/packetplay
- **Opened by:** packetplay-manager, 2026-11-14
- **Model:** sonnet (two data files in an existing format, a few small tests)
- **Status:** done, awaiting CEO commit approval

## Goal

A fourth example, `examples/osi.scene.yaml` and `examples/osi.scene.json` (same model), showing the
OSI model as a stack of 7 layers and how a file travels down it, layer by layer, until it is bits.

## Context

- CEO request, 2026-11-14: "can you represent like OSI model and how a file goes from file to bits".
- Copy the style of `examples/website.scene.yaml` and `examples/udp.scene.yaml`. The player shows each
  `data` key as a row on the packet (header = step label, max 4 rows, keep to 4 keys at most). Steps
  need `from != to` (the router rejects equal nodes), so every step is one hop between neighbours.
- Read `.claude/docs/LESSONS.md`. CEO rules: no tester, reviewer or browser automation (he tests by hand).
  PUBLIC repo: documentation addresses only (`192.0.2.x`, `198.51.100.x`), no absolute local paths or
  usernames. No em dashes. No new dependencies. No schema, engine, layout, timing or player change.

## Spec

Title `The OSI model: from a file to bits`. First line `# yaml-language-server: $schema=../schema/scene.schema.json`.
No explicit `at` unless the auto layout of a 7-node chain looks bad (a chain is expected to run
diagonally; check the layout numbers from `layoutScene` and say what you saw).

Nodes (a chain, links top to bottom: app-pres, pres-sess, trans-sess, net-trans, link-net, phys-link):
`app` (icon document, "7 Application", sub "your file"), `pres` (icon lock, "6 Presentation", sub
"format, compress, encrypt"), `sess` (icon speech, "5 Session", sub "open and keep a dialogue"),
`trans` (icon package-module, "4 Transport", sub "TCP or UDP, ports"), `net` (icon router, "3
Network", sub "IP addresses"), `link` (icon switch-module, "2 Data link", sub "MAC addresses, frames"),
`phys` (icon tower, "1 Physical", sub "bits on the wire").

Tracks: `down` (blue, "Sending: add a header"), `up` (green, "Receiving: remove a header").

Chapter 1 "1. Sender: from file to bits", six steps going down (`app -> pres -> sess -> trans -> net ->
link -> phys`, track `down`). Each step label names what that layer adds, and `data` shows the packet
growing (max 4 keys, short values, use documentation addresses and ports):
- `app -> pres`: label `File to send`, data `file: report.pdf`, `size: 2 MB`, `protocol: HTTP upload`.
- `pres -> sess`: label `Format and encrypt`, data `compressed: yes`, `encrypted: TLS`, `size: 1.4 MB`.
  (quote the strings; `yes` must stay a string, see LESSONS about YAML.)
- `sess -> trans`: label `Open a session`, data `session: 42`, `state: open`, `data: 1.4 MB`.
- `trans -> net`: label `Cut into segments`, data `segment: 1 of 1000`, `src port: 50000`, `dst port: 443`,
  `header: TCP`.
- `net -> link`: label `Add IP addresses`, data `src: 192.0.2.20`, `dst: 198.51.100.80`, `header: IP`,
  `unit: packet`.
- `link -> phys`: label `Frame and bits`, data `dst MAC: next hop`, `unit: frame`, `trailer: checksum`,
  `then: bits`.
Chapter 2 "2. Receiver: from bits to file", six steps going up (`phys -> link -> net -> trans -> sess ->
pres -> app`, track `up`), each step removes the header the matching layer added; data shows the packet
shrinking, ending with `file: report.pdf`. The first step's desc says the bits crossed the cable.
Every step has a short plain English `desc` (one or two sentences, no jargon left unexplained). The
chapter 1 steps end up 6 and the chapter 2 steps 6, so 12 steps, 2 chapters.
- Mention in the first desc that this is a teaching model (real stacks use TCP/IP's four layers).

### Scripts, docs, tests

- `package.json`: extend `build:examples` to also write `dist/osi.html` (keep the others).
- README: add the example to the list with one sentence.
- `test/build.test.ts`: small exact tests: loads from YAML and JSON to the same model (ignoring
  `$schema`), passes `validateScene`, `buildHtml` succeeds, 2 chapters, 12 steps, the exact `totalMs`
  from your hand calculation (each step is 1 hop = `HOP_MS + NODE_DWELL_MS` = 2050 ms; gap
  `STEP_GAP_MS` = 500 ms between steps; see `src/timeline.ts`), and only the SVG namespace URI as
  `http` string.

## Scope

- Do: the two example files (JSON from `bun run src/cli.ts convert <yaml> --to json -o <json>`), script,
  README, tests, then `bun run build:examples`.
- Do not: change engine, schema, layout, timing or player. No commit, no push.

## Approvals

CEO asked for this on 2026-11-14 and said earlier "go until everything is done".

## Rules

- Follow `CLAUDE.md`. Run `./scripts/check-public.sh --all` before finishing; it must exit 0.
- Never put the literal heading text of the Report section anywhere else in this file.

## Validation

- Real output in the Report section: `bun test` (count), `bun run typecheck`, `bun run build:examples`
  (sizes), `./scripts/check-public.sh --all`, the hand calculation of `totalMs`, and what the layout
  of the 7-node chain looks like (node positions).
- A short numbered browser checklist for the CEO.

## Done when

- `dist/osi.html` builds, plays 2 chapters and 12 steps, tests are green.

## Report

**Done.** Not committed, not pushed.

**What changed**
- `examples/osi.scene.yaml` and `examples/osi.scene.json` (JSON made with `convert ... --to json -o`).
- `package.json`: `build:examples` now also writes `dist/osi.html`.
- `README.md`: "Three examples" became "Four", new list entry, build comment updated.
- `test/build.test.ts`: new `osi example` describe (2 tests).
- Ticket fixes made with sense: the link list is the chain app-pres-sess-trans-net-link-phys; chapter 1 has 6 down steps ending at phys, chapter 2 has 6 up steps ending at app (12 steps). Chapter 2 data and labels were not specified, so I wrote them (frame, packet, segment, joined data, decrypted, file). YAML-looking values (`yes`, `no`, `42`, ports) are quoted strings.

**Verified (real output)**
- `bun test`: 179 pass, 0 fail, 15 files.
- `bun run typecheck`: clean (`tsc --noEmit`, no errors).
- `bun run build:examples`: webrtc.html 78725 bytes, udp.html 65463, website.html 111140, osi.html 92593.
- `./scripts/check-public.sh --all`: exit 0. No em dashes in the changed files.

**Hand calculation of totalMs**
One hop = HOP_MS 1300 + NODE_DWELL_MS 750 = 2050 ms. Each step is one hop, so 12 x 2050 = 24600. 11 gaps between steps (STEP_GAP_MS 500, none after the last, and the gap between chapters is the same 500) = 5500. Total 30100 ms, which the test asserts and passes.

**Node layout seen (`layoutScene`, no `at` needed)**
A clean diagonal, i = 0,2,4,...,12 and j = 0 for all: app (128, 128), pres (269.5, 209.9), sess (411, 291.8), trans (552.5, 373.7), net (694, 455.6), link (835.5, 537.5), phys (977, 619.4). Canvas 1105 x 787.4. Evenly spaced, nothing overlaps, so no `at` was added.

**Browser checklist for the CEO**
1. Open `dist/osi.html`: title "The OSI model: from a file to bits", 7 nodes in a diagonal, top (7 Application) to bottom right (1 Physical).
2. Press play: chapter 1 runs blue down the stack, one hop per step, 6 steps, ending at Physical.
3. Check the packet info box grows row by row (max 4 rows) and shows the right headers per layer.
4. Chapter 2 runs green back up, 6 steps, and ends at Application with `file: report.pdf`.
5. Total length is about 30 s; chapter list shows 2 chapters.
6. First description mentions the teaching model and TCP/IP's four layers.

**Left:** nothing. Awaiting CEO approval to commit.

**Lessons**
- The ticket's link list order and step counts had small slips; check them against the chain before writing (links are one chain, steps 6 + 6).
- Quote every YAML scalar that could parse as a boolean or number (`"yes"`, `"no"`, `"42"`, `"443"`), or the model and schema check differ between YAML and JSON.
- A straight 7-node chain lays out as an even diagonal on its own (i steps of 2, j = 0), so `at` pins are not needed for chains.
- The totalMs formula for single-hop steps is n x 2050 + (n - 1) x 500, with no trailing gap.

