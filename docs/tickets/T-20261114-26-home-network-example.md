# T-20261114-26: Example: a home network with two switches (schema stress test)

- **Owner:** general-purpose agent (implementer)
- **Project:** projects/svg-scenes
- **Opened by:** svg-scenes-manager, 2026-11-14
- **Model:** sonnet (data files in an existing format; the value is the list of schema gaps it finds)
- **Status:** done

## Goal

Recreate, with the current schema only, a bigger diagram the CEO sent as a picture, as a fifth example
`examples/homenet.scene.yaml` and `examples/homenet.scene.json` (same model), with animated flows on
top. Report honestly what the schema and player could not express.

## Context

- CEO request, 2026-11-14: "try using the schema to recreate something complex like this" plus a
  picture of a home network. The picture (described here, you cannot open it):
  - A cloud "Internet" at the top, joined to a "Home router" below it (a zigzag line).
  - From the router, two lines go down: left to a "Switch", right to a second "Switch".
  - Left switch is a star hub with 5 devices around it: Printer, Desktop, Laptop, Cell Phone, Gaming
    Console. The right switch is a star hub with the same 5 devices: Gaming Console, Printer, Laptop,
    Desktop, Cell Phone. So 2 LANs (stars) hang off one router that connects them to the Internet.
- Read `docs/LESSONS.md`, `examples/osi.scene.yaml` (groups, explicit layout), `examples/website.scene.yaml`
  (hidden, reveal, typing, NAT `at`), `src/layout.ts` (isometric tile space: `at: [i, j]`, `NODE_STEP`),
  `schema/scene.schema.json`, and the icon list in `icons/isoflow/`.
- CEO rules: no tester or browser automation (he tests by hand). PUBLIC repo: documentation addresses
  only (`192.0.2.x`, `198.51.100.x`, `203.0.113.x`), no absolute local paths or usernames. No em dashes.
  No new dependencies. No schema, engine, layout, timing or player change in this ticket.

## Spec

- Title `A home network: two switches, one router`. First line
  `# yaml-language-server: $schema=../schema/scene.schema.json`.
- 13 nodes: `internet` (cloud, "Internet"), `router` (router, "Home router", sub "NAT"), `swl` and `swr`
  (switch-module, "Switch", sub "left LAN" and "right LAN"), and for each side 5 devices with unique ids
  (`l-printer`, `l-desktop`, `l-laptop`, `l-phone`, `l-console`, and `r-...`): printer (icon printer),
  desktop (icon desktop), laptop (icon laptop), cell phone (icon mobiledevice), gaming console (pick the
  closest isoflow icon, say which). Labels "Printer", "Desktop", "Laptop", "Cell Phone", "Gaming Console";
  give each device a private address in `sub` (`192.0.2.11` to `192.0.2.15` left, `192.0.2.21` to
  `192.0.2.25` right).
- Links: internet-router, router-swl, router-swr, and every device to its switch (a star on each side).
- Groups: `lan-left` and `lan-right` (labels "Left LAN" and "Right LAN") around each star including its
  switch. The router and the Internet are outside the groups.
- Layout: use explicit `at: [i, j]` for every node so the picture reads like the original: Internet on
  top, router below it, the two stars below left and right, devices around their switch. Compute the
  tile coordinates yourself from `NODE_STEP`, check with `layoutScene` that no two nodes overlap, group
  rectangles of the two LANs do not overlap, and say what the canvas size is. If an even star is
  impossible in tile space, say how you compromised.
- Tracks: `web` (blue, "Web traffic"), `print` (green, "Printing"), `local` (orange, "Same switch").
- Chapters and steps (short plain-English `desc`, `data` max 4 keys per step):
  1. "1. A laptop opens a web page": `l-laptop -> internet` (route is laptop, left switch, router,
     Internet), track `web`, label `HTTP request`, data `src`, `dst`, `proto: TCP`; router `at` with `set`
     for NAT (public `203.0.113.7`) as in the website example; then `internet -> l-laptop`, label `Web
     page`, with the NAT rewrite back.
  2. "2. Printing across the router": `l-desktop -> r-printer` (route is desktop, left switch, router,
     right switch, printer: 4 hops), track `print`, label `Print job`, data `file: report.pdf`, `pages:
     "3"`, `proto: IPP`. desc explains that traffic between two switches goes through the router.
  3. "3. Two devices on the same switch": `l-phone -> l-console` (2 hops through the left switch), track
     `local`, label `Game invite`, desc says the switch forwards it without the router.
  4. "4. Everyone online at once": a `parallel` block (check the schema and `src/validate.ts` for how it
     is declared) of one flow step on each LAN (`r-laptop -> internet` and `r-phone -> internet`, mode
     `flow` if allowed in a `parallel` block, else sequence them), track `web`. Keep whatever the
     schema allows and report what it rejects.
- Optionally hide nothing. Do not use typing.

### Scripts, docs, tests

- `package.json`: extend `build:examples` to also write `dist/homenet.html` (keep the others).
- README: add the example to the list with one sentence, and update "ship" counts if it says them.
- `test/build.test.ts`: small exact tests: YAML and JSON give the same model (ignoring `$schema`),
  `validateScene` passes, `buildHtml` succeeds, chapter and step counts, the exact `totalMs` from your
  hand calculation (see `src/timeline.ts`: `HOP_MS` 1100, `NODE_DWELL_MS` 650, `FLOW_MS` 4300,
  `STEP_GAP_MS` 450; state the calculation), and only the SVG namespace URI as `http` string.

## Scope

- Do: the two example files (JSON via `bun run src/cli.ts convert <yaml> --to json -o <json>`), script,
  README, tests, `bun run build:examples`.
- Do not: change engine, schema, layout, timing or player. No commit, no push.

## Approvals

CEO asked for this on 2026-11-14 and said earlier "go until everything is done".

## Rules

- Follow `CLAUDE.md`. Run `./scripts/check-public.sh --all` before finishing; it must exit 0.
- Never put the literal heading text of the Report section anywhere else in this file.

## Validation

- Real output in the Report section: `bun test` (count), `bun run typecheck`, `bun run build:examples`
  (sizes), `./scripts/check-public.sh --all`, the hand calculation, the node coordinates and canvas size,
  and a section "Schema and player gaps": every thing in the picture you could not express (for example
  the zigzag Internet link, links drawn as a star without crowding, labels that collide, more than 4
  data rows, the icon for the gaming console) with a one-line suggestion each.
- A short numbered browser checklist for the CEO.

## Done when

- `dist/homenet.html` builds, plays 4 chapters, tests are green, and the gaps list is written.

## Report

**What was done.** Added `examples/homenet.scene.yaml` and `examples/homenet.scene.json` (JSON made with
`bun run src/cli.ts convert ... --to json`), extended `build:examples` in `package.json` with
`dist/homenet.html`, added the example to the README (now "Five examples ship", build line lists
`dist/homenet.html`), and added a `homenet example` block (2 tests) to `test/build.test.ts`. No engine,
schema, layout, timing or player change. No commit, no push.

**Spec error found.** The ticket says 13 nodes, but 4 (internet, router, 2 switches) + 2 x 5 devices = 14.
The example has 14 nodes and the test and README say 14.

**Real output.**

```
bun test            -> 235 pass, 0 fail (1286 expect() calls, 18 files; was 233 before, +2 new)
bun run typecheck   -> tsc --noEmit, no errors
bun run build:examples:
  Wrote dist/webrtc.html (84951 bytes)
  Wrote dist/udp.html (71527 bytes)
  Wrote dist/website.html (92724 bytes)
  Wrote dist/osi.html (76025 bytes)
  Wrote dist/homenet.html (108306 bytes)
./scripts/check-public.sh --all  -> exit=0
validateScene(homenet) -> []   (no issues)
```

**Hand calculation of totalMs (27100).** One hop = HOP_MS 1100 + NODE_DWELL_MS 650 = 1750 ms. Gap 450 ms.
- Ch 1 step 1 (laptop, left switch, router, Internet: 3 hops) 3 x 1750 = 5250, runs 0 to 5250. Gap, step 2 (3 hops) runs 5700 to 10950.
- Gap to 11400. Ch 2 (desktop, left switch, router, right switch, printer: 4 hops) 4 x 1750 = 7000, runs 11400 to 18400.
- Gap to 18850. Ch 3 (phone, left switch, console: 2 hops) 3500, runs 18850 to 22350.
- Gap to 22800. Ch 4: parallel block of two `flow` steps, 4300 each at once, ends at 22800 + 4300 = 27100.
- totalMs = 27100 (the last gap is not counted). Matches `compileTimeline`: 4 chapters, 6 steps
  (c4 has c4s1p1 and c4s1p2).

**Node coordinates (tile `at: [i, j]`, NODE_STEP 2, world px after margin).**
Rule used: mirror the left star (centre 3,10) into the right star (centre 10,3) by swapping i and j.
Ring offsets of 2 tiles (163 px apart, the smallest allowed step). The ring leaves out the tile on the
line to the router, so no device sits on the router link.

| node | at [i, j] | x, y (px) |
|---|---|---|
| internet | 0, 0 | 1000, 128 |
| router | 3, 3 | 1000, 374 |
| swl | 3, 10 | 505, 660 |
| l-printer | 1, 8 | 505, 497 |
| l-desktop | 1, 10 | 363, 578 |
| l-laptop | 5, 10 | 646, 742 |
| l-phone | 3, 12 | 363, 742 |
| l-console | 5, 12 | 505, 824 |
| swr | 10, 3 | 1495, 660 |
| r-console | 8, 1 | 1495, 497 |
| r-printer | 10, 1 | 1637, 578 |
| r-laptop | 12, 3 | 1637, 742 |
| r-desktop | 10, 5 | 1354, 742 |
| r-phone | 12, 5 | 1495, 824 |

Groups (from `layoutScene`, tile rects with the 1-tile pad): `lan-left` i 0..6, j 7..13; `lan-right`
i 7..13, j 0..6. Disjoint in i, so they do not overlap. The router (3,3) and Internet (0,0) are inside
neither. Smallest distance between any two node centres: 163.5 px (no overlap). Canvas: 1999.5 x 992.15 px.
Compromise: an even star of 5 devices is not possible in tile space (NODE_STEP 2 allows 4 diagonals, 2
straight lines up and down). I used 3 of the 4 diagonal spots plus straight down and straight up (5 of 6 spots), leaving out the one toward the router. The star is therefore not a regular pentagon, and the
left and right stars show the device order mirrored, not as in the picture.
Gaming console icon: `cube` (closest of the 37 isoflow icons; `tower` reads as a PC and `desktop` is
already used).

**Schema and player gaps (what the picture needs that we could not express).**
1. Zigzag Internet-router link: links are straight lines only. Suggest a link `style: zigzag` (or `kind: wan`) drawn by the lane helper.
2. No more than one free direction: a star around a hub has to fit isometric tile directions, so 5 devices are not evenly spread and the canvas is 2000 px wide because two 7x7-tile group rects must not touch. Suggest a radial helper (`layout: star` with a centre and a radius) and allow groups that are not square tile rects.
3. Group rectangles are padded 1 tile, so the router link crosses the LAN border and 14 nodes need a very wide canvas. Suggest a smaller group pad (a `pad` field) or a way to say a link ends on the group edge.
4. Device order and star orientation from the picture are not kept (left and right stars differ in the picture); `at` can do it, but only by hand-computing tiles. Suggest `at` offsets relative to another node (`at: {of: swl, di: -2, dj: 0}`).
5. Packets for a same-node action (a switch only forwards) have no visible pause or highlight at the switch; the dwell is the same 650 ms at every node. Suggest a per-node `dwell` in `at`.
6. `flow` steps in a parallel block are accepted, but both flows share the router link with no visible merge: they overlap on the same lane and colour, so two streams look like one. Suggest an offset or a thickness per overlapping flow.
7. Data card is at most 4 rows, fine here (max 3 used); the NAT rewrite is shown but the router has no sub update in the picture of the node itself. Suggest a node `set` display (small tag on the node).
8. No icon for a gaming console, printer-as-network-device label, or a generic "phone" apart from `mobiledevice`. Suggest adding a vendored MIT `console` icon only if the CEO allows another icon.
9. Labels may collide: the sub line (`192.0.2.x`) sits 86 px below each icon centre and the label 68 px, and the next icon down the star (163 px away on the diagonal, 164 px straight down) is close, for example `l-console` sits straight under `swl`. Not checked in a browser (CEO tests by hand). Suggest `labelPosition: above|right` per node.
10. The scene cannot show the public Internet as many servers, or a "Home" outline around the router: groups cannot contain groups. Suggest nested groups.

Nothing was rejected by the schema or validator: `parallel` with `mode: flow` children passes
`validateScene`.

**Browser checklist for the CEO** (open `dist/homenet.html`).
1. The Internet is at the top, the router below it, and the two LAN stars lower left and lower right, each in a labelled band.
2. Chapter 1: a blue packet goes laptop, left switch, router, Internet, and the router shows the NAT address change; the reply returns the same way.
3. Chapter 2: a green print job goes from the left desktop through the router to the printer on the right.
4. Chapter 3: an orange game invite stays inside the left LAN (phone, switch, console) and does not touch the router.
5. Chapter 4: two blue streams from the right laptop and right phone run at once to the Internet. Check whether any label or sub line collides with a neighbour icon.
6. Compare with the picture and tell us which gaps above matter most.

**Lessons.**
- A ticket's node count should be checked by arithmetic first: 4 + 2 x 5 is 14, not 13. (T-20261114-26)
- When a node-count test fails, count the ids by hand before blaming the regex: the 14 hits were real nodes, the ticket's 13 was the error. (T-20261114-26)
- In a star of 5 around a hub, leave out the ring tile that lies on the link to the parent, or the link runs through a device. Two LAN rects need centres at least 7 tiles apart (ring 2 plus pad 1 on both sides), which sets a canvas about 2000 px wide for two stars. (T-20261114-26)
- Bun has no `DOMParser` in tests; use a regex over the static SVG. (T-20261114-26)
