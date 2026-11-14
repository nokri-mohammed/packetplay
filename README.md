# packetplay

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

Five examples ship, each as YAML and as JSON:

- [examples/webrtc.scene.yaml](examples/webrtc.scene.yaml): how a WebRTC call connects.
- [examples/udp.scene.yaml](examples/udp.scene.yaml): how a UDP message travels (NAT rewriting the
  address, then a stream of datagrams).
- [examples/website.scene.yaml](examples/website.scene.yaml): how a browser loads a website (type the address, then DNS
  lookup, TCP handshake, TLS handshake, then the HTTPS request).
- [examples/osi.scene.yaml](examples/osi.scene.yaml): the OSI layers as a real computer uses them (browser, kernel, network card),
  and how a 4000-byte file travels down to bits and back up to a file.
- [examples/homenet.scene.yaml](examples/homenet.scene.yaml): a home network with two switches and one router
  (14 nodes, two LAN groups), with web, printing and same-switch traffic.

## CLI

```
bun install
bun run build:example          # writes dist/webrtc.html, open it in a browser
bun run build:examples         # writes dist/webrtc.html, dist/udp.html, dist/website.html, dist/osi.html and dist/homenet.html
bun run src/cli.ts build <file> -o <out.html>
bun run src/cli.ts validate <file> [--json]   # check a scene, write no HTML
bun run src/cli.ts convert <file> --to json|yaml
bun run src/cli.ts icons                       # list the icon names, one per line
```

`validate` prints `ok: <title> (N nodes, M steps)` and exits 0, or prints each problem and exits 1.
With `--json` (on `validate` and `build`) the result is one JSON object:
`{ "ok": true, "title": "...", "nodes": 4, "steps": 3 }` or `{ "ok": false, "issues": [ { "message": "...", "path": "..." } ] }`.

## Use as a Claude skill

The folder `skills/packetplay/` is a Claude Code skill: the instructions (`SKILL.md`), the example
scenes and the whole tool as one file, `packetplay.js`. It needs only [Bun](https://bun.sh), with no
clone, no `bun install` and no internet.

### Install as a plugin (recommended)

The repo is its own Claude Code plugin marketplace. In any project:

```
/plugin marketplace add nokri-mohammed/packetplay
/plugin install packetplay@packetplay
```

Then ask in plain words, for example "Make an animated diagram of how DNS resolves a name". Later
changes arrive with `/plugin update`.

### Install by hand

1. Build the single file: `bun run build:skill` (the built file is committed, so a plain clone already has it).
2. Link the folder into your skills: `ln -s <path to this repo>/skills/packetplay ~/.claude/skills/packetplay`.
   Or copy the folder into one project's `.claude/skills/`.
3. To update after changing the tool, run `bun run build:skill` again. The symlink follows.

Built with Bun and TypeScript on top of [anime.js](https://animejs.com). See the
[design plan](docs/plans/2026-11-14-packetplay.md).

## Releasing

Releases are automatic from [Conventional Commits](https://www.conventionalcommits.org). A GitHub
Action (release-please) keeps one release pull request open on `main`. It holds the next version and
the generated `CHANGELOG.md`. Merging that pull request is the release: it creates the git tag and the
GitHub release. Before 1.0, `feat` bumps the minor number, `fix` the patch number, and a breaking
change (`feat!:` or a `BREAKING CHANGE:` footer) also bumps the minor number. To force a version, add a
`Release-As: x.y.z` footer to a commit message. The package is marked private, so nothing is published
to npm. The version lives in `package.json` and `.claude-plugin/plugin.json`; the scene schema version
(see below) is separate and only changes for a breaking change to the scene format.

## Versioning

A scene can say which schema version it is written for with an optional top-level `version` (an
integer, 1 or higher). A missing `version` means 1. Additions that are optional (a new optional
field) do not bump the version. A breaking change bumps it and adds a new schema folder
(`schema/v2/`), while `schema/scene.schema.json` stays as version 1.

A scene with a newer version than the tool understands fails to load with:

```
scene version 2 is not supported: this packetplay understands version 1 and older (update packetplay)
```

## License

[MIT](LICENSE).

## Credits

- [anime.js](https://github.com/juliangarnier/anime) v4, MIT, the animation engine.
- Icons in `icons/isoflow/`: the isoflow collection from
  [markmanx/isopacks](https://github.com/markmanx/isopacks) at commit
  `ab717516031a384d478f456e2a95fd276aa56353`, MIT, Copyright 2023 Mark Mankarious.
