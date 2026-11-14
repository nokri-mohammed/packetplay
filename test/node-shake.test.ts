import { describe, expect, test } from "bun:test";
import type { Scene } from "../src/index.ts";
import { layoutScene, type Layout } from "../src/layout.ts";
import { loadScene } from "../src/load.ts";
import { SHAKE_AMP, SHAKE_MS, frameAt, nodeShake, shakeEvents, shakeOffset } from "../src/player-core.ts";
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
    expect([SHAKE_MS, SHAKE_AMP]).toEqual([650, 6]);
  });
  test("zero before, at start, at the end and after", () => {
    expect(nodeShake(999, 1000)).toEqual({ dx: 0, dy: 0 });
    expect(nodeShake(1000, 1000)).toEqual({ dx: 0, dy: 0 });
    expect(nodeShake(1000 + 650, 1000).dy).toBeCloseTo(0, 9);
    expect(nodeShake(1651, 1000)).toEqual({ dx: 0, dy: 0 });
  });
  test("one sixth: u = 1/6, sin(pi/6) = 0.5, dy = -6 * 0.5 = -3", () => {
    const s = nodeShake(1000 + 650 / 6, 1000);
    expect(s.dy).toBeCloseTo(-3, 9);
    expect(s.dx).toBe(0);
  });
  test("middle: u = 0.5, sin(pi/2) = 1, dy = -6 (the top of the bump)", () => {
    expect(nodeShake(1000 + 325, 1000).dy).toBeCloseTo(-6, 9);
  });
});

describe("shakeOffset", () => {
  test("the latest event at or before t wins", () => {
    expect(shakeOffset(undefined, 100)).toEqual({ dx: 0, dy: 0 });
    expect(shakeOffset([500, 1000], 400)).toEqual({ dx: 0, dy: 0 });
    expect(shakeOffset([500, 1000], 1000 + 650 / 6).dy).toBeCloseTo(-3, 9);
    expect(shakeOffset([500, 600], 600 + 650 / 6).dy).toBeCloseTo(-3, 9);
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
  // Rest after hop 0: hop ends 1840, next starts 2490 (650 ms rest). The bump lasts the whole 650 ms rest,
  // so the dot is hidden from 1840 to 2489 (inside the icon) and leaves the far edge (244) at 2490, no pause.
  test("hidden inside the icon during the bump", () => {
    for (const t of [1840, 2000, 2489]) expect(frameAt(tl, t).packets).toEqual([]);
    const before = frameAt(tl, 1839).packets[0]!;
    expect(before.x).toBeCloseTo(156, 0); // 1 ms before arrival it is still travelling
    expect(before.y).toBe(8);
  });
  test("the dot leaves the far edge the moment the bump ends, with no pause", () => {
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
