import { describe, expect, test } from "bun:test";
import type { Scene } from "../src/index.ts";
import { lane } from "../src/lanes.ts";
import { layoutScene } from "../src/layout.ts";
import { loadScene } from "../src/load.ts";
import { frameAt } from "../src/player-core.ts";
import { HOP_MS, compileTimeline } from "../src/timeline.ts";

const root = new URL("../", import.meta.url).pathname;

const scene = {
  title: "T",
  nodes: {
    a: { label: "A", icon: "server" },
    b: { label: "B", icon: "server" },
    c: { label: "C", icon: "server" },
  },
  links: [["a", "b"], ["b", "c"]],
  chapters: [
    {
      title: "one",
      steps: [
        { from: "a", to: "c", both: true },
        { from: "c", to: "a" },
        { from: "a", to: "c", mode: "flow", both: true },
      ],
    },
  ],
} as unknown as Scene;

describe("timeline uses lanes", () => {
  const layout = layoutScene(scene);
  const tl = compileTimeline(scene, layout);
  const [s1, s2, s3] = tl.steps;

  test("hop link is the lane id of its direction and the coordinates are the lane motion line", () => {
    expect(s1!.hops.map((h) => h.link)).toEqual(["a--b", "b--c"]);
    const l = lane(layout, "a", "b");
    expect([s1!.hops[0]!.x1, s1!.hops[0]!.y1, s1!.hops[0]!.x2, s1!.hops[0]!.y2]).toEqual([l.x1, l.y1, l.x2, l.y2]);
  });

  test("back is the other lane of the same link", () => {
    const h = s1!.hops[0]!;
    const r = lane(layout, "b", "a");
    expect(h.back).toEqual({ link: "b--a", x1: r.x1, y1: r.y1, x2: r.x2, y2: r.y2 });
  });

  test("a reply step uses the reverse lanes automatically", () => {
    expect(s2!.hops.map((h) => h.link)).toEqual(["c--b", "b--a"]);
    expect(s2!.hops.map((h) => h.back.link)).toEqual(["b--c", "a--b"]);
  });

  test("a flow step carries lane data for every hop too", () => {
    expect(s3!.hops.map((h) => [h.link, h.back.link])).toEqual([["a--b", "b--a"], ["b--c", "c--b"]]);
  });

  test("with both, the second packet moves along back of the mirrored hop, with the same timing", () => {
    const f = frameAt(tl, HOP_MS / 2);
    expect(f.packets.map((p) => p.direction)).toEqual([1, -1]);
    const fwd = s1!.hops[0]!;
    const rev = s1!.hops[1]!;
    const [p, q] = f.packets;
    expect(p!.x).toBeCloseTo((fwd.x1 + fwd.x2) / 2, 9);
    expect(p!.y).toBeCloseTo((fwd.y1 + fwd.y2) / 2, 9);
    expect(q!.x).toBeCloseTo((rev.back.x1 + rev.back.x2) / 2, 9);
    expect(q!.y).toBeCloseTo((rev.back.y1 + rev.back.y2) / 2, 9);
    // the return packet is on the c-to-b lane, not on the forward b-to-c lane
    expect(rev.back.link).toBe("c--b");
    expect(q!.y).not.toBeCloseTo((rev.y1 + rev.y2) / 2, 3);
  });

  test("at the start of a hop the packet is at the lane start, at the end at the lane end", () => {
    const h = s1!.hops[0]!;
    const start = frameAt(tl, h.startMs).packets[0]!;
    expect([start.x, start.y]).toEqual([h.x1, h.y1]);
    const end = frameAt(tl, h.endMs - 1e-6).packets[0]!;
    expect(end.x).toBeCloseTo(h.x2, 3);
    expect(end.y).toBeCloseTo(h.y2, 3);
  });
});

describe("webrtc example lanes", () => {
  test("the reply of chapter 1 runs on the sig-to-client lanes", async () => {
    const s = await loadScene(root + "examples/webrtc.scene.yaml");
    const tl = compileTimeline(s, layoutScene(s));
    expect(tl.steps[0]!.hops.map((h) => h.link)).toEqual(["client--r1", "r1--net", "net--sig"]);
    expect(tl.steps[1]!.hops.map((h) => h.link)).toEqual(["sig--net", "net--r1", "r1--client"]);
  });
});

describe("timing with node dwell", () => {
  test("the webrtc example totals 69600 ms, by hand", async () => {
    // hop step: n * (1600 + 900) = n * 2500; flow step: 6000; gap after each step: 600
    // 3 hops = 7500 (x4 steps), 6 hops = 15000 (x2 steps), flow = 6000
    // 4 * 7500 + 2 * 15000 + 6000 + 6 gaps * 600 = 30000 + 30000 + 6000 + 3600 = 69600
    const s = await loadScene(root + "examples/webrtc.scene.yaml");
    const tl = compileTimeline(s, layoutScene(s));
    expect(tl.steps.map((st) => [st.startMs, st.endMs])).toEqual([
      [0, 7500],
      [8100, 15600],
      [16200, 23700],
      [24300, 31800],
      [32400, 47400],
      [48000, 63000],
      [63600, 69600],
    ]);
    expect(tl.totalMs).toBe(69600);
  });

  test("hops start every 2500 ms, travel 1600 ms, and the packet rests on the arrived node", async () => {
    const s = await loadScene(root + "examples/webrtc.scene.yaml");
    const tl = compileTimeline(s, layoutScene(s));
    const st = tl.steps[0]!;
    expect(st.hops.map((h) => [h.startMs, h.endMs])).toEqual([
      [0, 1600],
      [2500, 4100],
      [5000, 6600],
    ]);
    const h0 = st.hops[0]!;
    const rest = frameAt(tl, 2000).packets[0]!;
    expect([rest.x, rest.y]).toEqual([h0.x2, h0.y2]);
    const last = st.hops[2]!;
    const final = frameAt(tl, 7000);
    expect(final.stepId).toBe(st.id);
    expect([final.packets[0]!.x, final.packets[0]!.y]).toEqual([last.x2, last.y2]);
    expect(final.card).not.toBeNull();
  });
});
