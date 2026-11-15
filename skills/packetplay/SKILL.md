---
name: packetplay
description: Turn a plain-words description of how something works into one animated, isometric HTML diagram (packets hopping across a network, a DNS lookup, an OSI walk-through, a WebRTC call). Use when the user asks for a diagram, an animated explanation, a packet or network flow, "how X works", or mentions a scene file, OSI or DNS.
---

# packetplay

packetplay builds one self-contained animated HTML page from a small YAML scene file. It needs only
Bun. The skill directory is the folder that holds this `SKILL.md`; the tool is the single file
`packetplay.js` next to it. Below, `<skill dir>` means that folder.

## Workflow

1. Write `<name>.scene.yaml` in the folder the user is working in. Start from the closest file in
   `<skill dir>/examples/`.
2. Check it: `bun <skill dir>/packetplay.js validate <name>.scene.yaml --json`
3. If `ok` is false, fix every entry in `issues` (each has a `message` and a `path`), then run step 2
   again until `ok` is true.
4. Build it: `bun <skill dir>/packetplay.js build <name>.scene.yaml -o <name>.html`
5. Tell the user where `<name>.html` is and what the story of the animation is.

Other commands: `packetplay.js icons` lists the allowed icon names, one per line.

Optional: `bun <skill dir>/packetplay.js export <name>.scene.yaml -o <name>.mp4` (or `.gif`) renders
a video. It needs Chrome (lightest: chrome-headless-shell; no npm browser package) and ffmpeg installed; it can take a minute or two. Options:
`--fps`, `--speed`, `--width`, `--from`, `--to` (seconds), `--scale`.

## Scene format

```yaml
version: 1                      # optional, 1 is the only version
title: How a UDP message travels
grid: iso                       # optional: iso (default) or none
nodes:
  pc:   { label: Your PC, icon: laptop, sub: 192.0.2.20, group: lan, at: [0, 0] }
  net:  { label: Internet, icon: cloud }
  srv:  { label: Server, icon: server, hidden: true }   # hidden until a step reveals it
groups:
  lan: { label: Home network }
links:                          # pairs of node ids; every step must follow links
  - [pc, net]
  - [net, srv]
tracks:
  udp: { label: UDP, color: blue }   # named colour or hex such as "#3b82f6"
chapters:
  - title: 1. Send it
    desc: Optional text shown when the chapter starts.
    steps:
      - from: pc
        to: net
        track: udp
        label: hello
        desc: "Plain explanation shown in the caption."
        data: { src: 192.0.2.20, dst: 198.51.100.7 }    # at most 4 keys
      - { from: net, to: srv, track: udp, label: hello, reveal: [srv] }
```

- Nodes: `icon` and `label` are required. `sub`, `group`, `at` ([i, j] tile position, fractions
  allowed) and `hidden` are optional. Without `at` the layout is automatic.
- Steps: `from` and `to` are required and must differ. Optional: `via` (node ids the route passes),
  `track`, `label`, `desc`, `data`, `at`, `mode`, `both`, `pause`, `reveal`, `typing`.
- `at` on a step changes things per node as the packet passes, for example NAT:
  `at: { router: { set: { src: 203.0.113.5 }, desc: "The router rewrites the source address." } }`
- `mode: flow` shows a stream of tiny packets; `both: true` shows both directions.
- `parallel: [ step, step ]` runs several steps together (a step entry that holds only `parallel`).
- `typing: "text"` types text at the source node before the packet leaves.
- `reveal: [ids]` makes hidden nodes appear when the packet arrives.
- A same-node action cannot be its own step. Describe it in the next step's `desc`, or send the
  packet from a neighbour node.

## Rules the AI gets wrong

- Quote YAML values that look like booleans or numbers (`"yes"`, `"no"`, `"on"`, `"443"`, `"1.0"`)
  when they must stay text, for example in `data`.
- Never put `: ` (colon and space) inside an unquoted `desc` or `label`. Quote the whole value or
  reword.
- Use documentation addresses only: `192.0.2.x`, `198.51.100.x`, `203.0.113.x`, and names under
  `example.com`. Never real addresses, hostnames or private ranges.
- Use only the icons that `icons` prints. Do not invent icon names.
- A hidden node must be revealed (`reveal`) in an earlier step before any step uses it.
- Every step route must follow `links`. If the validator says there is no route, add the link.

## Examples

Copy the closest one from `<skill dir>/examples/` and edit it:

- `udp.scene.yaml`: small and simple; NAT rewriting an address, then a stream of datagrams.
- `website.scene.yaml`: hidden nodes, typing and NAT; DNS, TCP and TLS before an HTTPS request.
- `osi.scene.yaml`: groups; the OSI layers inside one computer and across the network.
- `homenet.scene.yaml`: explicit `at` positions and parallel steps; a home network with switches and a router.
- `webrtc.scene.yaml`: flow steps (streams of packets); how a call connects.

## How to see it

Open the HTML file in a browser. Controls: Play or Pause, Restart, speeds 0.5x to 2x, a clickable
timeline, and zoom (mouse wheel or pinch) and pan (drag). Keys: Space play or pause, Left and Right
hop, N and P message, [ and ] chapter, + and - speed, Home restart.
