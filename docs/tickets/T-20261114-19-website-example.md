# T-20261114-19: Example: how a browser loads a website (DNS, handshake, request)

- **Owner:** general-purpose agent (implementer)
- **Project:** projects/svg-scenes
- **Opened by:** svg-scenes-manager, 2026-11-14
- **Model:** sonnet (two data files in an existing format, plus a few small tests)
- **Status:** open (starts after T-20261114-18 is done: both touch `package.json`, the README and `test/build.test.ts`)

## Goal

A third example, `examples/website.scene.yaml` and `examples/website.scene.json` (same model), that
shows the full trip of requesting a website: the DNS lookup first, then the TCP handshake with the
server, then the TLS handshake, then the HTTP request and response.

## Context

- CEO request, 2026-11-14: "show requesting website, need to go through dns then request, so server
  include handshake part too".
- Existing examples to copy the style from: `examples/webrtc.scene.yaml`, `examples/udp.scene.yaml`
  (same fields, packet info rows come from `data`, NAT rewrites come from `at: { router: { set,
  desc } }`). The player shows each `data` key as a row on the packet (header = step label, up to 4
  rows, then `+N more`), so keep each step to 4 keys at most.
- Read `docs/LESSONS.md`. CEO rules: no tester, reviewer or browser automation (he tests by hand).
  This repo is PUBLIC: documentation addresses only (`192.0.2.x`, `198.51.100.x`, `203.0.113.x`,
  `example.com`), no absolute local paths or usernames in any file. No em dashes. No new
  dependencies. No schema change.

## Spec

Title `How a browser loads a website`. Nodes: `laptop` (icon laptop, "Your laptop"), `router` (icon
router, sub NAT, "Your router"), `net` (icon cloud, "Internet"), `dns` (icon server, "DNS resolver",
sub `198.51.100.53`), `web` (icon server, "shop.example.com", sub `198.51.100.80`). Links:
laptop-router, router-net, net-dns, net-web. Tracks: `dns` (purple, "DNS lookup (UDP)"), `tcp`
(orange, "TCP handshake"), `tls` (teal, "TLS handshake"), `http` (green, "HTTPS request"). Include the
`# yaml-language-server: $schema=../schema/scene.schema.json` first line in the YAML. No explicit `at`
positions (auto layout).

Chapters and steps (each step `from`, `to`, `track`, `label`, `desc`, `data`, and the NAT `at` where
it applies; short plain English in `desc`):

1. "1. Find the server's address (DNS)"
   - `laptop -> dns`, label `DNS query`, data `proto: UDP`, `src: "192.0.2.20:49152"`,
     `dst: "198.51.100.53:53"`, `question: "A shop.example.com?"`; router `set src:
     "203.0.113.7:61000"`, desc that NAT swaps the private address.
   - `dns -> laptop`, label `DNS answer`, data `proto: UDP`, `src: "198.51.100.53:53"`,
     `dst: "203.0.113.7:61000"`, `answer: "198.51.100.80"`; router `set dst: "192.0.2.20:49152"`.
     desc: now the browser knows where to connect.
2. "2. Open a connection (TCP handshake)", three steps `laptop -> web`, `web -> laptop`,
   `laptop -> web`:
   - `SYN`: `flags: SYN`, `src: "192.0.2.20:50000"`, `dst: "198.51.100.80:443"`, `seq: 1000`; router
     `set src: "203.0.113.7:61001"`.
   - `SYN-ACK`: `flags: SYN-ACK`, `src: "198.51.100.80:443"`, `dst: "203.0.113.7:61001"`,
     `seq: 5000, ack: 1001` (as one string value `"seq 5000, ack 1001"`); router `set dst:
     "192.0.2.20:50000"`.
   - `ACK`: `flags: ACK`, same src and dst as the SYN, `seq: "seq 1001, ack 5001"`; router `set src`
     as for the SYN. desc: the connection is open, both sides agree on the numbers.
3. "3. Agree on encryption (TLS handshake)", three steps (`laptop -> web`, `web -> laptop`,
   `laptop -> web`): `ClientHello` (data `proto: TLS 1.3`, `offers: "cipher suites"`, `sni:
   "shop.example.com"`), `ServerHello + certificate` (data `proto: TLS 1.3`, `chose: "one cipher
   suite"`, `certificate: "shop.example.com"`), `Key exchange + Finished` (data `proto: TLS 1.3`,
   `result: "shared secret"`). Use `via` nowhere; the router handles NAT silently, so no `at` needed
   here. desc: after this, everything is encrypted.
4. "4. Ask for the page (HTTPS)", two steps: `HTTP request` `laptop -> web` (data `request: "GET /"`,
   `host: "shop.example.com"`, `encrypted: yes`) and `HTTP response` `web -> laptop` (data `status:
   "200 OK"`, `body: "the web page (HTML)"`, `encrypted: yes`). The last step's desc says the browser
   now draws the page.

- Total 10 steps. State your hand calculation of `totalMs` in the Report (hops are 3 per step, each
  hop `HOP_MS + NODE_DWELL_MS`; see `src/timeline.ts` for the constants; gaps `STEP_GAP_MS` between
  steps).

### Build scripts, docs, tests

- `package.json`: extend `build:examples` so it also writes `dist/website.html` (keep the others).
- README: add the third example to the list of examples with one sentence.
- `test/build.test.ts` (small, exact): the website example loads from YAML and JSON to the same model
  (ignoring `$schema`), passes `validateScene`, `buildHtml` succeeds, the timeline has 4 chapters and
  10 steps, and the exact `totalMs` from the hand calculation.

## Scope

- Do: the two example files, the script and README edits, the tests, then `bun run build:examples`.
  Use the CLI `convert` to produce the JSON from the YAML, as was done for the UDP example.
- Do not: change the engine, schema, layout, timing or player. No commit, no push.

## Approvals

CEO asked for this on 2026-11-14 and said "go until everything is done".

## Rules

- Follow `CLAUDE.md`. Run `./scripts/check-public.sh --all` before finishing; it must exit 0.
- Never put the literal heading text of the Report section anywhere else in this file.

## Validation

- Real output in the Report: `bun test` (count), `bun run typecheck`, `bun run build:examples` (all
  sizes), `./scripts/check-public.sh --all`, and the `http` strings found in the built website page
  (namespace URIs only).
- A short numbered list for the CEO to check in the browser (order of chapters, handshake packets
  going back and forth, NAT rows changing, the layout of the five nodes, nothing covering anything).

## Done when

- `dist/website.html` builds, plays 4 chapters and 10 steps, tests are green.

## Report

<The agent fills this in when finished. Start with `Status: done` (or `blocked`), then:>

- **Did:**
- **Verified (real output):**
- **Left / needs a decision:**
- **Lessons:**
