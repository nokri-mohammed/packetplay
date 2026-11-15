import { describe, expect, test } from "bun:test";
import type { Scene } from "../src/index.ts";
import { cameraTarget, focusAt, SMOOTH_MS } from "../src/camera.ts";
import { layoutScene } from "../src/layout.ts";
import { NODE_DWELL_MS, STEP_GAP_MS, compileTimeline } from "../src/timeline.ts";
import { keyAction } from "../src/player-core.ts";

const mk = (chapters: unknown): Scene =>
  ({
    title: "T",
    nodes: { a: { label: "A", icon: "server" }, b: { label: "B", icon: "server" }, c: { label: "C", icon: "server" }, d: { label: "D", icon: "server" } },
    links: [["a", "b"], ["b", "c"], ["c", "d"]],
    chapters,
  }) as unknown as Scene;

const build = (scene: Scene) => {
  const layout = layoutScene(scene);
  return { tl: compileTimeline(scene, layout), nodes: new Map(Object.entries(layout.nodes).map(([k, v]) => [k, { x: v.x, y: v.y }])) };
};
const close = (p: { x: number; y: number }, x: number, y: number) => {
  expect(p.x).toBeCloseTo(x, 2);
  expect(p.y).toBeCloseTo(y, 2);
};

const seq = build(mk([{ title: "one", steps: [{ from: "a", to: "c" }, { from: "c", to: "d" }] }]));
const [s1, s2] = seq.tl.steps as [(typeof seq.tl.steps)[0], (typeof seq.tl.steps)[0]];

describe("focusAt", () => {
  test("before the first step it is the first node, after the last it is the last node", () => {
    const a = seq.nodes.get("a") as { x: number; y: number };
    const d = seq.nodes.get("d") as { x: number; y: number };
    close(focusAt(seq.tl, seq.nodes, -500), a.x, a.y);
    close(focusAt(seq.tl, seq.nodes, seq.tl.totalMs), d.x, d.y);
    close(focusAt(seq.tl, seq.nodes, seq.tl.totalMs + 9999), d.x, d.y);
  });
  test("while the packet moves it is the dot position", () => {
    const h = s1.hops[0] as (typeof s1.hops)[0];
    const mid = h.startMs + h.durMs / 2;
    close(focusAt(seq.tl, seq.nodes, mid), (h.x1 + h.x2) / 2, (h.y1 + h.y2) / 2);
    close(focusAt(seq.tl, seq.nodes, h.startMs), h.x1, h.y1);
  });
  test("while the packet rests at a node it is that node", () => {
    const h = s1.hops[0] as (typeof s1.hops)[0];
    const b = seq.nodes.get("b") as { x: number; y: number };
    close(focusAt(seq.tl, seq.nodes, h.endMs + NODE_DWELL_MS / 2), b.x, b.y);
  });
  test("in the gap between steps it moves in a straight line to the first node of the next step", () => {
    const c = seq.nodes.get("c") as { x: number; y: number };
    expect(s2.startMs - s1.endMs).toBe(STEP_GAP_MS);
    const mid = focusAt(seq.tl, seq.nodes, s1.endMs + STEP_GAP_MS / 2);
    close(mid, c.x, c.y); // step 1 ends at c and step 2 starts at c
    const gapScene = build(mk([{ title: "one", steps: [{ from: "a", to: "b" }, { from: "c", to: "d" }] }]));
    const [g1, g2] = gapScene.tl.steps as [(typeof s1), (typeof s1)];
    const b = gapScene.nodes.get("b") as { x: number; y: number };
    const c2 = gapScene.nodes.get("c") as { x: number; y: number };
    close(focusAt(gapScene.tl, gapScene.nodes, g1.endMs + (g2.startMs - g1.endMs) / 2), (b.x + c2.x) / 2, (b.y + c2.y) / 2);
    close(focusAt(gapScene.tl, gapScene.nodes, g1.endMs), b.x, b.y);
    close(focusAt(gapScene.tl, gapScene.nodes, g2.startMs - 0.001), c2.x, c2.y);
  });
  test("typing holds the camera on the source node", () => {
    const t = build(mk([{ title: "one", steps: [{ from: "a", to: "b", typing: "abc" }] }]));
    const a = t.nodes.get("a") as { x: number; y: number };
    close(focusAt(t.tl, t.nodes, 300), a.x, a.y);
  });
  test("parallel packets: the centroid of the dots", () => {
    const p = build(mk([{ title: "one", steps: [{ parallel: [{ from: "a", to: "b" }, { from: "c", to: "d" }] }] }]));
    const [x, y] = p.tl.steps as [(typeof s1), (typeof s1)];
    const hx = x.hops[0] as (typeof s1.hops)[0];
    const hy = y.hops[0] as (typeof s1.hops)[0];
    const t = Math.min(hx.endMs, hy.endMs) / 2;
    const fx = (t - hx.startMs) / hx.durMs;
    const fy = (t - hy.startMs) / hy.durMs;
    const ax = hx.x1 + (hx.x2 - hx.x1) * fx;
    const ay = hx.y1 + (hx.y2 - hx.y1) * fx;
    const bx = hy.x1 + (hy.x2 - hy.x1) * fy;
    const by = hy.y1 + (hy.y2 - hy.y1) * fy;
    close(focusAt(p.tl, p.nodes, t), (ax + bx) / 2, (ay + by) / 2);
  });
  test("is pure: the same clock gives the same answer after seeking back and forth", () => {
    const times = [0, 500, 1500, 3000, 700, 2500, 0, 3000, 1500];
    const first = new Map<number, { x: number; y: number }>();
    for (const t of times) {
      const p = cameraTarget(seq.tl, seq.nodes, t);
      const q = first.get(t);
      if (q) expect(p).toEqual(q);
      else first.set(t, p);
    }
  });
});

describe("cameraTarget", () => {
  test("averages 9 samples over 800 ms, so a straight constant-speed move gives the dot position", () => {
    const h = s1.hops[0] as (typeof s1.hops)[0];
    const t = h.startMs + h.durMs / 2;
    expect(h.durMs).toBeGreaterThan(SMOOTH_MS);
    close(cameraTarget(seq.tl, seq.nodes, t), (h.x1 + h.x2) / 2, (h.y1 + h.y2) / 2);
  });
  test("clamps the window to the timeline", () => {
    const a = seq.nodes.get("a") as { x: number; y: number };
    expect(Number.isFinite(cameraTarget(seq.tl, seq.nodes, -1000).x)).toBe(true);
    expect(Math.hypot(cameraTarget(seq.tl, seq.nodes, 0).x - a.x, cameraTarget(seq.tl, seq.nodes, 0).y - a.y)).toBeLessThan(60);
  });
});

test("F toggles the follow camera", () => {
  expect(keyAction("f")).toBe("follow");
  expect(keyAction("F")).toBe("follow");
});
