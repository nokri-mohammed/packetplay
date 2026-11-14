import { describe, expect, test } from "bun:test";
import type { Scene } from "../src/index.ts";
import { lane } from "../src/lanes.ts";
import { layoutScene, type Layout } from "../src/layout.ts";
import { loadScene } from "../src/load.ts";
import { frameAt } from "../src/player-core.ts";
import { HOP_MIN_MS, HOP_SPEED, NODE_DWELL_MS, compileTimeline } from "../src/timeline.ts";

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
    // Both hops are 75.4927 px, round(75.4927 / 0.07) = 1078 ms, so half way is 539 ms.
    expect(s1!.hops.map((h) => h.durMs)).toEqual([1078, 1078]);
    const f = frameAt(tl, 539);
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
  test("the webrtc example totals 51918 ms, by hand", async () => {
    // Hop lengths: 75.4927 px -> round(1078.47) = 1078 ms, 75.8 px -> round(1082.86) = 1083 ms,
    // 195 px -> round(2785.71) = 2786 ms. Each hop is followed by a 650 ms rest.
    // Step 1: 1078 + 1078 + 1083 = 3239, plus 3 * 650 = 1950: 5189 ms. Step 2 is the same hops reversed: 5189 ms.
    // Steps 3 and 4: 3 * 1078 = 3234 + 1950 = 5184 ms each.
    // Step 5: 1078, 1078, 1083, 1083, 2786, 1078 = 8186 + 6 * 650 = 3900: 12086 ms. Step 6 has the same hops: 12086 ms.
    // Step 7 is a flow: 4300 ms. A gap of 450 ms follows each of the first 6 steps.
    // 5189 + 5189 + 5184 + 5184 + 12086 + 12086 + 4300 + 6 * 450 = 49218 + 2700 = 51918.
    const s = await loadScene(root + "examples/webrtc.scene.yaml");
    const tl = compileTimeline(s, layoutScene(s));
    expect(tl.steps.map((st) => [st.startMs, st.endMs])).toEqual([
      [0, 5189],
      [5639, 10828],
      [11278, 16462],
      [16912, 22096],
      [22546, 34632],
      [35082, 47168],
      [47618, 51918],
    ]);
    expect(tl.totalMs).toBe(51918);
  });

  test("hop i + 1 starts 650 ms after hop i ends, and the packet rests on the arrived node", async () => {
    const s = await loadScene(root + "examples/webrtc.scene.yaml");
    const tl = compileTimeline(s, layoutScene(s));
    const st = tl.steps[0]!;
    expect(st.hops.map((h) => [h.startMs, h.endMs])).toEqual([
      [0, 1078],
      [1728, 2806],
      [3456, 4539],
    ]);
    for (let i = 1; i < st.hops.length; i++) {
      expect(st.hops[i]!.startMs).toBe(st.hops[i - 1]!.endMs + NODE_DWELL_MS);
    }
    expect(st.endMs).toBe(st.hops[2]!.endMs + NODE_DWELL_MS);
    // Rest after hop 0 is 1078..1728: hidden while the node bumps (1078..1727), then it leaves the far side at 1728.
    expect(frameAt(tl, 1500).packets).toEqual([]);
    expect(frameAt(tl, 1727).packets).toEqual([]);
    const h1 = st.hops[1]!;
    const rest = frameAt(tl, 1728).packets[0]!;
    expect([rest.x, rest.y]).toEqual([h1.x1, h1.y1]);
    const last = st.hops[2]!;
    const final = frameAt(tl, 5000);
    expect(final.stepId).toBe(st.id);
    expect([final.packets[0]!.x, final.packets[0]!.y]).toEqual([last.x2, last.y2]);
    expect(final.packets[0]!.label).toBe(st.label);
    expect(final.packets[0]!.data).toEqual(last.data);
  });
});

describe("constant packet speed", () => {
  // Nodes on one row: a at 0, b at 200, c at 500, d at 600. Hop lengths are the centre distance minus 2 * 44:
  // a to b 112 px, b to c 212 px, c to d 100 - 88 = 12 px.
  const row = (steps: unknown[]) => {
    const sc = {
      title: "T",
      nodes: Object.fromEntries(["a", "b", "c", "d"].map((k) => [k, { label: k, icon: "server" }])),
      links: [["a", "b"], ["b", "c"], ["c", "d"]],
      chapters: [{ title: "c", steps }],
    } as unknown as Scene;
    const x: Record<string, number> = { a: 0, b: 200, c: 500, d: 600 };
    const layout = {
      width: 0,
      height: 0,
      origin: { x: 0, y: 0 },
      groups: {},
      nodes: Object.fromEntries(Object.entries(x).map(([k, v]) => [k, { x: v, y: 0, i: 0, j: 0 }])),
    } as Layout;
    return compileTimeline(sc, layout);
  };

  test("constants", () => {
    expect([HOP_SPEED, HOP_MIN_MS]).toEqual([0.07, 350]);
  });

  test("a short hop clamps to HOP_MIN_MS", () => {
    // c to d: 12 px, round(12 / 0.07) = 171 ms, below the floor, so 350 ms.
    const h = row([{ from: "c", to: "d" }]).steps[0]!.hops[0]!;
    expect(h.durMs).toBe(350);
    expect([h.startMs, h.endMs]).toEqual([0, 350]);
  });

  test("hops of different length take proportional time", () => {
    // a to b: 112 / 0.07 = 1600 ms. b to c: 212 / 0.07 = 3028.57, rounded 3029 ms.
    const [h0, h1] = row([{ from: "a", to: "c" }]).steps[0]!.hops;
    expect([h0!.durMs, h1!.durMs]).toEqual([1600, 3029]);
    expect(h1!.durMs / h0!.durMs).toBeCloseTo(212 / 112, 3);
    // h1 starts at 1600 + 650 = 2250 and ends at 2250 + 3029 = 5279; the step ends 650 ms later.
    expect([h1!.startMs, h1!.endMs]).toEqual([2250, 5279]);
    expect(row([{ from: "a", to: "c" }]).steps[0]!.endMs).toBe(5929);
  });

  test("a both step gives mirrored hops the same duration, the longer one", () => {
    const st = row([{ from: "a", to: "c", both: true }]).steps[0]!;
    // Hop 0 (112 px, 1600 ms) is mirrored with hop 1 (212 px, 3029 ms): both take 3029.
    expect(st.hops.map((h) => h.durMs)).toEqual([3029, 3029]);
    expect(st.hops.map((h) => [h.startMs, h.endMs])).toEqual([
      [0, 3029],
      [3679, 6708],
    ]);
    expect(st.endMs).toBe(7358);
  });

  test("website example: every hop moves at HOP_SPEED within 2 percent, except clamped ones", async () => {
    const s = await loadScene(root + "examples/website.scene.yaml");
    const tl = compileTimeline(s, layoutScene(s));
    let checked = 0;
    for (const st of tl.steps) {
      if (st.mode !== "packet") continue;
      for (const h of st.hops) {
        if (h.durMs === HOP_MIN_MS) continue;
        const speed = Math.hypot(h.x2 - h.x1, h.y2 - h.y1) / h.durMs;
        expect(Math.abs(speed / HOP_SPEED - 1)).toBeLessThan(0.02);
        checked++;
      }
    }
    expect(checked).toBe(40);
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

  test("the packet is hidden at the node while it bumps, then shows at the far edge and the next hop starts there", () => {
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
    // Each hop is 112 px: round(112 / 0.07) = 1600 ms. Hop 0 ends at 1600 and hop 1 starts at 1600 + 650 = 2250.
    expect([h0!.durMs, h1!.startMs]).toEqual([1600, 2250]);
    expect(frameAt(tl, 1700).packets).toEqual([]); // inside the icon while it bumps
    expect(frameAt(tl, 2249).packets).toEqual([]);
    const next = frameAt(tl, h1!.startMs).packets[0]!;
    expect([next.x, next.y]).toEqual([244, 8]);
  });
});
