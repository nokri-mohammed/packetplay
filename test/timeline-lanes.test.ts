import { describe, expect, test } from "bun:test";
import type { Scene } from "../src/index.ts";
import { lane } from "../src/lanes.ts";
import { layoutScene, type Layout } from "../src/layout.ts";
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

  test("hop link is the lane id of its direction and the coordinates are the trimmed arrow ends", () => {
    expect(s1!.hops.map((h) => h.link)).toEqual(["a--b", "b--c"]);
    const l = lane(layout, "a", "b");
    expect([s1!.hops[0]!.x1, s1!.hops[0]!.y1, s1!.hops[0]!.x2, s1!.hops[0]!.y2]).toEqual([l.ax1, l.ay1, l.ax2, l.ay2]);
  });

  test("back is the other lane of the same link", () => {
    const h = s1!.hops[0]!;
    const r = lane(layout, "b", "a");
    expect(h.back).toEqual({ link: "b--a", x1: r.ax1, y1: r.ay1, x2: r.ax2, y2: r.ay2 });
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
  test("the webrtc example totals 57200 ms, by hand", async () => {
    // hop step: n * (1300 + 750) = n * 2050; flow step: 5000; gap after each step: 500
    // 3 hops = 6150 (x4 steps), 6 hops = 12300 (x2 steps), flow = 5000
    // 4 * 6150 + 2 * 12300 + 5000 + 6 gaps * 500 = 24600 + 24600 + 5000 + 3000 = 57200
    const s = await loadScene(root + "examples/webrtc.scene.yaml");
    const tl = compileTimeline(s, layoutScene(s));
    expect(tl.steps.map((st) => [st.startMs, st.endMs])).toEqual([
      [0, 6150],
      [6650, 12800],
      [13300, 19450],
      [19950, 26100],
      [26600, 38900],
      [39400, 51700],
      [52200, 57200],
    ]);
    expect(tl.totalMs).toBe(57200);
  });

  test("hops start every 2050 ms, travel 1300 ms, and the packet rests on the arrived node", async () => {
    const s = await loadScene(root + "examples/webrtc.scene.yaml");
    const tl = compileTimeline(s, layoutScene(s));
    const st = tl.steps[0]!;
    expect(st.hops.map((h) => [h.startMs, h.endMs])).toEqual([
      [0, 1300],
      [2050, 3350],
      [4100, 5400],
    ]);
    const h0 = st.hops[0]!;
    const rest = frameAt(tl, 2000).packets[0]!;
    expect([rest.x, rest.y]).toEqual([h0.x2, h0.y2]);
    const last = st.hops[2]!;
    const final = frameAt(tl, 6000);
    expect(final.stepId).toBe(st.id);
    expect([final.packets[0]!.x, final.packets[0]!.y]).toEqual([last.x2, last.y2]);
    expect(final.packets[0]!.label).toBe(st.label);
    expect(final.packets[0]!.data).toEqual(last.data);
  });
});

describe("pass-through hop endpoints", () => {
  // Hand calculations, LANE_OFFSET = 8, LANE_TRIM = 44.
  const mk = (nodes: Record<string, [number, number]>, from: string, to: string) => {
    const sc = {
      title: "T",
      nodes: Object.fromEntries(Object.keys(nodes).map((k) => [k, { label: k, icon: "server" }])),
      links: [[from, to]],
      chapters: [{ title: "c", steps: [{ from, to }] }],
    } as unknown as Scene;
    const layout = {
      width: 0,
      height: 0,
      origin: { x: 0, y: 0 },
      groups: {},
      nodes: Object.fromEntries(Object.entries(nodes).map(([k, [x, y]]) => [k, { x, y, i: 0, j: 0 }])),
    } as Layout;
    return compileTimeline(sc, layout).steps[0]!.hops[0]!;
  };

  test("horizontal hop (0,0) to (200,0): lane is 8 px down, ends 44 px in from each centre", () => {
    // u = (1,0), offset = (0,8): x1 = 0 + 44 = 44, x2 = 200 - 44 = 156, y = 8
    const h = mk({ a: [0, 0], b: [200, 0] }, "a", "b");
    expect([h.x1, h.y1, h.x2, h.y2]).toEqual([44, 8, 156, 8]);
    // reverse lane runs 8 px up: x from 156 to 44 at y = -8
    expect([h.back.x1, h.back.y1, h.back.x2, h.back.y2]).toEqual([156, -8, 44, -8]);
  });

  test("diagonal hop (0,0) to (60,80): length 100, u = (0.6,0.8), offset = (-6.4,4.8)", () => {
    // x1 = -6.4 + 0.6*44 = 20, y1 = 4.8 + 0.8*44 = 40, x2 = 53.6 - 26.4 = 27.2, y2 = 84.8 - 35.2 = 49.6
    const h = mk({ a: [0, 0], d: [60, 80] }, "a", "d");
    expect(h.x1).toBeCloseTo(20, 9);
    expect(h.y1).toBeCloseTo(40, 9);
    expect(h.x2).toBeCloseTo(27.2, 9);
    expect(h.y2).toBeCloseTo(49.6, 9);
  });

  test("short hop (0,0) to (60,0): 60 < 2 * 44, so both ends clamp to the lane midpoint, never reversing", () => {
    // midpoint of the lane (0,8) to (60,8) is (30,8); the reverse lane midpoint is (30,-8)
    const h = mk({ a: [0, 0], e: [60, 0] }, "a", "e");
    expect([h.x1, h.y1, h.x2, h.y2]).toEqual([30, 8, 30, 8]);
    expect([h.back.x1, h.back.y1, h.back.x2, h.back.y2]).toEqual([30, -8, 30, -8]);
  });

  test("a hop of exactly 2 * 44 = 88 px keeps full trim and has zero length", () => {
    const h = mk({ a: [0, 0], f: [88, 0] }, "a", "f");
    expect([h.x1, h.x2]).toEqual([44, 44]);
  });

  test("the packet rests at the near edge, then the next hop starts at its own far edge", () => {
    const sc = {
      title: "T",
      nodes: { a: { label: "a", icon: "server" }, b: { label: "b", icon: "server" }, c: { label: "c", icon: "server" } },
      links: [["a", "b"], ["b", "c"]],
      chapters: [{ title: "c", steps: [{ from: "a", to: "c" }] }],
    } as unknown as Scene;
    const layout = {
      width: 0,
      height: 0,
      origin: { x: 0, y: 0 },
      groups: {},
      nodes: { a: { x: 0, y: 0, i: 0, j: 0 }, b: { x: 200, y: 0, i: 0, j: 0 }, c: { x: 400, y: 0, i: 0, j: 0 } },
    } as Layout;
    const tl = compileTimeline(sc, layout);
    const [h0, h1] = tl.steps[0]!.hops;
    expect([h0!.x2, h1!.x1]).toEqual([156, 244]);
    const rest = frameAt(tl, 2000).packets[0]!;
    expect([rest.x, rest.y]).toEqual([156, 8]);
    const next = frameAt(tl, h1!.startMs).packets[0]!;
    expect([next.x, next.y]).toEqual([244, 8]);
  });
});
