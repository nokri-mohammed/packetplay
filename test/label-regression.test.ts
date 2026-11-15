import { expect, test } from "bun:test";
import { loadScene } from "../src/load.ts";
import { layoutScene } from "../src/layout.ts";
import { BALLOON_GAP, labelRect, placeBalloon, rectsOverlap, balloonRect } from "../src/player-core.ts";
import { packetRows, packetTitle } from "../src/player-core.ts";

// The SYN card at the client kernel node used to hide most of the group label "Client laptop: kernel".
const PK_CHAR = 7.3;
test("the SYN card at the client kernel node does not cover a group label", async () => {
  const scene = await loadScene(new URL("./fixtures/file-journey.scene.yaml", import.meta.url).pathname);
  const layout = layoutScene(scene);
  const node = layout.nodes["ctcp"]!;
  const labels = Object.entries(scene.groups ?? {}).map(([id, g]) => {
    const top = layout.groups[id]!.points[0] as [number, number];
    return labelRect(g.label, top[0], top[1] + 22, 14);
  });
  const data = { flags: "SYN", src: "192.0.2.20:50000", dst: "198.51.100.80:80", seq: 1000 };
  const longest = Math.max(packetTitle("SYN").length, ...packetRows(data).map((r) => r.length), 8);
  const w = Math.round(longest * PK_CHAR + 16);
  const h = 20 + packetRows(data).length * 16 + 8;

  const naive = balloonRect(node.x, node.y, w, h, 1);
  const naiveHits = labels.filter((l) => rectsOverlap({ x: naive.x, y: naive.y, w, h }, l));
  expect(naiveHits.length).toBeGreaterThan(0); // the bug is real on this scene

  const placed = placeBalloon(node.x, node.y, w, h, 1, labels, layout.width);
  for (const l of labels) expect(rectsOverlap({ x: placed.x, y: placed.y, w, h }, l)).toBe(false);
  expect(BALLOON_GAP).toBe(60);
});
