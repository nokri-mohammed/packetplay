import { describe, expect, test } from "bun:test";
import type { Scene } from "../src/index.ts";
import { CELL_H, CELL_W, GROUP_PAD, ICON_SIZE, MARGIN, layoutScene } from "../src/layout.ts";
import { loadScene } from "../src/load.ts";

const root = new URL("../", import.meta.url).pathname;

type NodeSpec = { at?: [number, number]; group?: string };
const mk = (nodes: Record<string, NodeSpec>, links: [string, string][] = [], groups?: Record<string, { label: string }>): Scene =>
  ({
    title: "T",
    nodes: Object.fromEntries(Object.entries(nodes).map(([id, n]) => [id, { label: id, icon: "server", ...n }])),
    ...(groups ? { groups } : {}),
    links,
    chapters: [],
  }) as unknown as Scene;

const cx = (col: number) => MARGIN + col * CELL_W + CELL_W / 2;
const cy = (row: number) => MARGIN + row * CELL_H + CELL_H / 2;
const rowOf = (y: number) => (y - MARGIN - CELL_H / 2) / CELL_H;
const colOf = (x: number) => (x - MARGIN - CELL_W / 2) / CELL_W;

describe("constants", () => {
  test("agreed values", () => {
    expect([CELL_W, CELL_H, MARGIN, ICON_SIZE, GROUP_PAD]).toEqual([240, 200, 60, 96, 36]);
  });
});

describe("explicit at", () => {
  test("a node with at is placed at the cell centre", () => {
    const l = layoutScene(mk({ a: { at: [0, 0] }, b: { at: [2, 1] } }));
    expect(l.nodes.a).toEqual({ x: 180, y: 160 });
    expect(l.nodes.b).toEqual({ x: 660, y: 360 });
  });

  test("fractional at is used as given", () => {
    const l = layoutScene(mk({ a: { at: [0.5, 1.5] } }));
    expect(l.nodes.a).toEqual({ x: 300, y: 460 });
  });

  test("canvas size follows the largest col and row", () => {
    const l = layoutScene(mk({ a: { at: [0, 0] }, b: { at: [2, 1] } }));
    expect(l.width).toBe(2 * 60 + 3 * 240);
    expect(l.height).toBe(2 * 60 + 2 * 200);
    expect(l.width).toBe(840);
    expect(l.height).toBe(520);
  });

  test("fractions round up for the canvas", () => {
    const l = layoutScene(mk({ a: { at: [0.5, 1.5] } }));
    expect(l.width).toBe(120 + 2 * 240);
    expect(l.height).toBe(120 + 3 * 200);
  });

  test("an auto-placed node does not move a pinned node", () => {
    const l = layoutScene(mk({ a: {}, b: { at: [4, 2] } }, [["a", "b"]]));
    expect(l.nodes.b).toEqual({ x: 1140, y: 560 });
    expect(l.nodes.a).toEqual({ x: 180, y: 160 });
  });
});

describe("automatic placement", () => {
  test("a single node sits in cell 0,0", () => {
    const l = layoutScene(mk({ a: {} }));
    expect(l.nodes.a).toEqual({ x: 180, y: 160 });
    expect(l.width).toBe(360);
    expect(l.height).toBe(320);
  });

  test("a chain gets one column per hop, all in row 0", () => {
    const l = layoutScene(mk({ a: {}, b: {}, c: {} }, [["a", "b"], ["b", "c"]]));
    expect(l.nodes).toEqual({ a: { x: 180, y: 160 }, b: { x: 420, y: 160 }, c: { x: 660, y: 160 } });
    expect(l.width).toBe(120 + 3 * 240);
    expect(l.height).toBe(320);
  });

  test("links are undirected: the column is breadth-first depth from the first declared node", () => {
    const l = layoutScene(mk({ a: {}, b: {}, c: {} }, [["c", "b"], ["b", "a"]]));
    expect(l.nodes.a!.x).toBe(cx(0));
    expect(l.nodes.b!.x).toBe(cx(1));
    expect(l.nodes.c!.x).toBe(cx(2));
  });

  test("siblings share a column and get different integer rows, smallest row is 0", () => {
    const l = layoutScene(mk({ a: {}, b: {}, c: {}, d: {} }, [["a", "b"], ["a", "c"], ["a", "d"]]));
    for (const id of ["b", "c", "d"]) expect(l.nodes[id]!.x).toBe(cx(1));
    const rows = ["a", "b", "c", "d"].map((id) => rowOf(l.nodes[id]!.y));
    for (const r of rows) expect(Number.isInteger(r)).toBe(true);
    expect(Math.min(...rows)).toBe(0);
    const sib = ["b", "c", "d"].map((id) => rowOf(l.nodes[id]!.y));
    expect(new Set(sib).size).toBe(3);
    expect(l.height).toBe(120 + (Math.max(...rows) + 1) * 200);
    expect(Math.max(...rows)).toBeGreaterThanOrEqual(2);
  });

  test("a disconnected component starts after the last used column", () => {
    const l = layoutScene(mk({ a: {}, b: {}, c: {}, d: {} }, [["a", "b"], ["c", "d"]]));
    expect(l.nodes.a!.x).toBe(cx(0));
    expect(l.nodes.b!.x).toBe(cx(1));
    expect(l.nodes.c!.x).toBe(cx(2));
    expect(l.nodes.d!.x).toBe(cx(3));
    expect(l.width).toBe(120 + 4 * 240);
  });

  test("an isolated node (no links) goes after the connected component", () => {
    const l = layoutScene(mk({ a: {}, b: {}, z: {} }, [["a", "b"]]));
    expect(l.nodes.z!.x).toBe(cx(2));
  });

  test("no two auto-placed nodes share a cell", () => {
    const l = layoutScene(
      mk({ a: {}, b: {}, c: {}, d: {}, e: {}, f: {} }, [["a", "b"], ["a", "c"], ["b", "d"], ["c", "e"], ["a", "f"]]),
    );
    const cells = Object.values(l.nodes).map((p) => `${p.x},${p.y}`);
    expect(new Set(cells).size).toBe(6);
  });

  test("is deterministic", () => {
    const s = mk({ a: {}, b: {}, c: {}, d: {} }, [["a", "b"], ["a", "c"], ["c", "d"]]);
    expect(layoutScene(s)).toEqual(layoutScene(s));
  });
});

describe("groups", () => {
  const grow = ICON_SIZE / 2 + GROUP_PAD;

  test("rectangle is the member bounding box grown by 84 px, plus 24 px on top", () => {
    const l = layoutScene(
      mk({ a: { at: [0, 0] }, b: { at: [1, 0], group: "g" }, c: { at: [2, 1], group: "g" } }, [], { g: { label: "G" } }),
    );
    expect(grow).toBe(84);
    expect(l.groups.g).toEqual({
      x: cx(1) - 84,
      y: cy(0) - 84 - 24,
      width: cx(2) - cx(1) + 168,
      height: cy(1) - cy(0) + 168 + 24,
    });
    expect(l.groups.g).toEqual({ x: 336, y: 52, width: 408, height: 392 });
  });

  test("a single-member group is the icon box plus padding", () => {
    const l = layoutScene(mk({ a: { at: [0, 0], group: "g" } }, [], { g: { label: "G" } }));
    expect(l.groups.g).toEqual({ x: 180 - 84, y: 160 - 108, width: 168, height: 192 });
  });

  test("no groups gives an empty record", () => {
    expect(layoutScene(mk({ a: {} })).groups).toEqual({});
  });

  test("canvas contains every group rectangle", () => {
    const l = layoutScene(mk({ a: { at: [0, 0], group: "g" } }, [], { g: { label: "G" } }));
    const g = l.groups.g!;
    expect(g.x + g.width).toBeLessThanOrEqual(l.width);
    expect(g.y + g.height).toBeLessThanOrEqual(l.height);
  });
});

describe("webrtc example", () => {
  const load = async () => {
    const scene = await loadScene(root + "examples/webrtc.scene.yaml");
    return { scene, layout: layoutScene(scene) };
  };

  test("column order and exact x values", async () => {
    const { layout: l } = await load();
    expect(colOf(l.nodes.client!.x)).toBe(0);
    expect(l.nodes.client!.x).toBe(180);
    expect(l.nodes.r1!.x).toBe(420);
    expect(l.nodes.net!.x).toBe(660);
    for (const id of ["stun", "sig", "r2"]) expect(l.nodes[id]!.x).toBe(900);
    expect(l.nodes.sam!.x).toBe(1140);
    expect(l.nodes.sam!.x).toBeGreaterThan(l.nodes.r2!.x);
    expect(l.width).toBe(1320);
  });

  test("rows are integers, smallest is 0, and no two nodes share a cell", async () => {
    const { layout: l } = await load();
    const ids = Object.keys(l.nodes);
    expect(ids).toEqual(["client", "r1", "net", "stun", "sig", "r2", "sam"]);
    const rows = ids.map((id) => rowOf(l.nodes[id]!.y));
    for (const r of rows) expect(Number.isInteger(r)).toBe(true);
    expect(Math.min(...rows)).toBe(0);
    expect(new Set(ids.map((id) => `${l.nodes[id]!.x},${l.nodes[id]!.y}`)).size).toBe(7);
    expect(l.height).toBe(120 + (Math.max(...rows) + 1) * 200);
  });

  test("group sams-home wraps r2 and sam and no other node", async () => {
    const { layout: l } = await load();
    const g = l.groups["sams-home"]!;
    const inside = (id: string) => {
      const p = l.nodes[id]!;
      return p.x >= g.x && p.x <= g.x + g.width && p.y >= g.y && p.y <= g.y + g.height;
    };
    expect(inside("r2")).toBe(true);
    expect(inside("sam")).toBe(true);
    for (const id of ["client", "r1", "net", "stun", "sig"]) expect(inside(id)).toBe(false);
    const ys = [l.nodes.r2!.y, l.nodes.sam!.y];
    expect(g).toEqual({
      x: 900 - 84,
      y: Math.min(...ys) - 84 - 24,
      width: 1140 - 900 + 168,
      height: Math.max(...ys) - Math.min(...ys) + 168 + 24,
    });
  });

  test("canvas contains every node centre and group rectangle", async () => {
    const { layout: l } = await load();
    for (const p of Object.values(l.nodes)) {
      expect(p.x).toBeGreaterThanOrEqual(0);
      expect(p.x).toBeLessThanOrEqual(l.width);
      expect(p.y).toBeGreaterThanOrEqual(0);
      expect(p.y).toBeLessThanOrEqual(l.height);
    }
    const g = l.groups["sams-home"]!;
    expect(g.x).toBeGreaterThanOrEqual(0);
    expect(g.y).toBeGreaterThanOrEqual(0);
    expect(g.x + g.width).toBeLessThanOrEqual(l.width);
    expect(g.y + g.height).toBeLessThanOrEqual(l.height);
  });

  test("same input gives the same output", async () => {
    const { scene } = await load();
    expect(layoutScene(scene)).toEqual(layoutScene(scene));
  });
});
