import { describe, expect, test } from "bun:test";
import type { Scene } from "../src/index.ts";
import { layoutScene, type Layout } from "../src/layout.ts";
import { loadScene } from "../src/load.ts";
import { SHAKE_AMP, SHAKE_CYCLES, SHAKE_MS, frameAt, nodeShake, shakeEvents, shakeOffset } from "../src/player-core.ts";
import { compileTimeline } from "../src/timeline.ts";

const root = new URL("../", import.meta.url).pathname;

const sc = {
  title: "T",
  nodes: { a: { label: "a", icon: "server" }, b: { label: "b", icon: "server" }, c: { label: "c", icon: "server" } },
  links: [["a", "b"], ["b", "c"]],
  chapters: [{ title: "c", steps: [{ from: "a", to: "c", typing: "abc" }] }],
} as unknown as Scene;
const layout = {
  width: 0,
  height: 0,
  origin: { x: 0, y: 0 },
  groups: {},
  nodes: { a: { x: 0, y: 0, i: 0, j: 0 }, b: { x: 200, y: 0, i: 0, j: 0 }, c: { x: 400, y: 0, i: 0, j: 0 } },
} as Layout;
const tl = compileTimeline(sc, layout);

describe("nodeShake", () => {
  test("constants", () => {
    expect([SHAKE_MS, SHAKE_AMP, SHAKE_CYCLES]).toEqual([450, 5, 4]);
  });
  test("zero before, at start, at the end and after", () => {
    expect(nodeShake(999, 1000)).toEqual({ dx: 0, dy: 0 });
    expect(nodeShake(1000, 1000)).toEqual({ dx: 0, dy: 0 });
    expect(nodeShake(1000 + 450, 1000).dx).toBeCloseTo(0, 9);
    expect(nodeShake(1451, 1000)).toEqual({ dx: 0, dy: 0 });
  });
  test("a quarter of a cycle: u = 1/16, sin(pi/2) = 1, dx = 5 * 15/16 = 4.6875", () => {
    const s = nodeShake(1000 + 450 / 16, 1000);
    expect(s.dx).toBeCloseTo(4.6875, 9);
    expect(s.dy).toBe(0);
  });
  test("three quarters of a cycle: u = 3/16, sin(3pi/2) = -1, dx = -5 * 13/16 = -4.0625", () => {
    expect(nodeShake(1000 + (3 * 450) / 16, 1000).dx).toBeCloseTo(-4.0625, 9);
  });
  test("middle: u = 0.5, sin(4 pi) = 0", () => {
    expect(nodeShake(1225, 1000).dx).toBeCloseTo(0, 9);
  });
});

describe("shakeOffset", () => {
  test("the latest event at or before t wins", () => {
    expect(shakeOffset(undefined, 100)).toEqual({ dx: 0, dy: 0 });
    expect(shakeOffset([500, 1000], 400)).toEqual({ dx: 0, dy: 0 });
    expect(shakeOffset([500, 1000], 1000 + 450 / 16).dx).toBeCloseTo(4.6875, 9);
    expect(shakeOffset([500, 600], 600 + 450 / 16).dx).toBeCloseTo(4.6875, 9);
  });
});

describe("shakeEvents", () => {
  test("fixture: source at the Enter flash (3 * 80), arrivals at every hop end", () => {
    // typing "abc": 3 * 80 = 240 flash; typingMs = 740; hops end at 740 + 1100 and 740 + 1750 + 1100.
    const ev = shakeEvents(tl);
    expect(ev.get("a")).toEqual([240]);
    expect(ev.get("b")).toEqual([1840]);
    expect(ev.get("c")).toEqual([3590]);
  });
  test("flow steps have no shake", () => {
    const flow = {
      ...sc,
      chapters: [{ title: "c", steps: [{ from: "a", to: "c", mode: "flow" }] }],
    } as unknown as Scene;
    expect(shakeEvents(compileTimeline(flow, layout)).size).toBe(0);
  });
  test("website example: client has the Enter event, every route node an arrival", async () => {
    const s = await loadScene(root + "examples/website.scene.yaml");
    const t = compileTimeline(s, layoutScene(s));
    const ev = shakeEvents(t);
    const first = t.steps[0]!;
    expect(first.typing.length).toBeGreaterThan(0);
    expect(ev.get("client")).toContain(first.startMs + first.typing.length * 80);
    for (const st of t.steps) {
      for (const h of st.hops) expect(ev.get(h.to)).toContain(h.endMs);
    }
    for (const list of ev.values()) expect([...list].sort((a, b) => a - b)).toEqual(list);
  });
});

describe("the dot after the shake", () => {
  const [h0, h1] = tl.steps[0]!.hops;
  test("hop edges", () => {
    expect([h0!.x2, h1!.x1, h1!.x2]).toEqual([156, 244, 356]);
  });
  // Rest after hop 0: hop ends 1840, next starts 2490 (650 ms rest). Shake ends 1840 + 450 = 2290,
  // so the dot is at the near edge (156) until 2290 and at the far edge (244) for 2290..2490 (200 ms).
  test("near edge during the shake", () => {
    for (const t of [1840, 2000, 2289]) {
      const p = frameAt(tl, t).packets[0]!;
      expect([p.x, p.y]).toEqual([156, 8]);
    }
  });
  test("far edge from the end of the shake until the next hop", () => {
    for (const t of [2290, 2400, 2489]) {
      const p = frameAt(tl, t).packets[0]!;
      expect([p.x, p.y]).toEqual([244, 8]);
    }
    const next = frameAt(tl, 2490).packets[0]!;
    expect([next.x, next.y]).toEqual([244, 8]);
  });
  test("after the last hop the dot stays at the near edge for the whole rest", () => {
    for (const t of [3590, 3900, 4200, 4239]) {
      const p = frameAt(tl, t).packets[0]!;
      expect([p.x, p.y]).toEqual([356, 8]);
    }
  });
});
