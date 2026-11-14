# svg-scenes

Animate packets and messages across SVG diagrams from a YAML or JSON scene file.

**Status: early, in development.** There is a design plan and an example scene, but no engine yet.

You describe nodes, links, tracks and chapters of steps in a structured file. A build turns it into
one self-contained HTML page where messages travel hop by hop along the links, with captions, data
cards, pause, step, speed and a clickable timeline.

## Example

```yaml
# yaml-language-server: $schema=../schema/scene.schema.json
title: How a WebRTC call connects
nodes:
  client: { label: Your laptop, icon: laptop }
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

The full scene is in [examples/webrtc.scene.yaml](examples/webrtc.scene.yaml) (and as JSON).

## Planned CLI

```
svg-scenes build <file> -o <out.html>
svg-scenes convert <file> --to json|yaml
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
