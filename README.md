# svg-scenes

Animate packets and messages across SVG diagrams from a YAML or JSON scene file.

**Status: early, in development.** The build works (scene file to one animated HTML page). The player has been checked by tests and smoke builds only, not yet by hand in a browser.

You describe nodes, links, tracks and chapters of steps in a structured file. A build turns it into
one self-contained HTML page where messages travel hop by hop along the links, with captions, data
packets, pause, step, speed and a clickable timeline.

The diagram sits on an isometric 3D grid that zooms with the mouse wheel (or pinch) and pans with a
drag. Node `at: [i, j]` positions are isometric tile coordinates, and every link is drawn as two
arrows side by side, one per direction, so a reply travels on the other arrow.

Each moving message is a small packet: a header in the track colour with the step label, and rows
below it with the data it carries (`key: value`, at most four rows, then `+N more`). When a node
rewrites the data (for example NAT changing the source address), the rows on the packet change at
the next hop. Flow steps show streams of tiny packets, in both directions with `both: true`.

## Example

```yaml
# yaml-language-server: $schema=../schema/scene.schema.json
title: How a WebRTC call connects
grid: iso            # or none; optional, iso is the default
nodes:
  client: { label: Your laptop, icon: laptop, at: [0, 0] }   # isometric tile [i, j]
  net:    { label: Internet,    icon: cloud }
  sig:    { label: call.example.com, icon: server, sub: signaling }
links:
  - [client, net]
  - [net, sig]
tracks:
  signal: { label: Signaling, color: blue }
chapters:
  - title: 1. Join the room
    steps:
      - { from: client, to: sig, track: signal, label: join room 42 }
```

Four examples ship, each as YAML and as JSON:

- [examples/webrtc.scene.yaml](examples/webrtc.scene.yaml): how a WebRTC call connects.
- [examples/udp.scene.yaml](examples/udp.scene.yaml): how a UDP message travels (NAT rewriting the
  address, then a stream of datagrams).
- [examples/website.scene.yaml](examples/website.scene.yaml): how a browser loads a website (type the address, then DNS
  lookup, TCP handshake, TLS handshake, then the HTTPS request).
- [examples/osi.scene.yaml](examples/osi.scene.yaml): the OSI layers as a real computer uses them (browser, kernel, network card),
  and how a 4000-byte file travels down to bits and back up to a file.

## CLI

```
bun install
bun run build:example          # writes dist/webrtc.html, open it in a browser
bun run build:examples         # writes dist/webrtc.html, dist/udp.html, dist/website.html and dist/osi.html
bun run src/cli.ts build <file> -o <out.html>
bun run src/cli.ts convert <file> --to json|yaml
```

Built with Bun and TypeScript on top of [anime.js](https://animejs.com). See the
[design plan](docs/plans/2026-11-14-svg-scenes.md).

## License

[MIT](LICENSE).

## Credits

- [anime.js](https://github.com/juliangarnier/anime) v4, MIT, the animation engine.
- Icons in `icons/isoflow/`: the isoflow collection from
  [markmanx/isopacks](https://github.com/markmanx/isopacks) at commit
  `ab717516031a384d478f456e2a95fd276aa56353`, MIT, Copyright 2023 Mark Mankarious.
