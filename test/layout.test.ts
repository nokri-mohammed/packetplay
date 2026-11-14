import { describe, expect, test } from "bun:test";
import type { Scene } from "../src/index.ts";
import { GROUP_PAD, HALF_H, HALF_W, ICON_SIZE, MARGIN, NODE_STEP, TILE_H, TILE_W, layoutScene } from "../src/layout.ts";
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

const wx = (i: number, j: number) => (i - j) * HALF_W;
const wy = (i: number, j: number) => (i + j) * HALF_H;

describe("constants", () => {
  test("agreed values", () => {
    expect([TILE_W, TILE_H, HALF_W, HALF_H, NODE_STEP, ICON_SIZE, MARGIN, GROUP_PAD]).toEqual([
      141.5, 81.9, 70.75, 40.95, 2, 96, 80, 1,
    ]);
  });
});

describe("explicit at", () => {
  test("a node with at keeps its tile and sits at the iso position relative to the origin", () => {
    const l = layoutScene(mk({ a: { at: [0, 0] }, b: { at: [2, 1] } }));
    expect([l.nodes.a!.i, l.nodes.a!.j, l.nodes.b!.i, l.nodes.b!.j]).toEqual([0, 0, 2, 1]);
    expect(l.nodes.a!.x).toBeCloseTo(l.origin.x + wx(0, 0), 9);
    expect(l.nodes.a!.y).toBeCloseTo(l.origin.y + wy(0, 0), 9);
    expect(l.nodes.b!.x).toBeCloseTo(l.origin.x + 70.75, 9);
    expect(l.nodes.b!.y).toBeCloseTo(l.origin.y + 122.85, 9);
  });

  test("fractional at is used as given", () => {
    const l = layoutScene(mk({ a: { at: [0.5, 1.5] } }));
    expect([l.nodes.a!.i, l.nodes.a!.j]).toEqual([0.5, 1.5]);
    expect(l.nodes.a!.x - l.origin.x).toBeCloseTo(-70.75, 9);
    expect(l.nodes.a!.y - l.origin.y).toBeCloseTo(81.9, 9);
  });

  test("canvas is the bounding box of icons and labels plus the margin", () => {
    const l = layoutScene(mk({ a: { at: [0, 0] }, b: { at: [2, 1] } }));
    // world x spans -48 .. 70.75 + 48, world y spans -48 .. 122.85 + 48 + 40
    expect(l.width).toBeCloseTo(166.75 + 160, 9);
    expect(l.height).toBeCloseTo(258.85 + 160, 9);
    expect(l.origin.x).toBeCloseTo(80 + 48, 9);
    expect(l.origin.y).toBeCloseTo(80 + 48, 9);
  });

  test("an auto-placed node does not move a pinned node", () => {
    const l = layoutScene(mk({ a: {}, b: { at: [4, 2] } }, [["a", "b"]]));
    expect([l.nodes.b!.i, l.nodes.b!.j]).toEqual([4, 2]);
    expect([l.nodes.a!.i, l.nodes.a!.j]).toEqual([0, 0]);
  });
});

describe("automatic placement", () => {
  test("a single node sits on tile 0,0 and the origin is its centre", () => {
    const l = layoutScene(mk({ a: {} }));
    expect([l.nodes.a!.i, l.nodes.a!.j]).toEqual([0, 0]);
    expect(l.nodes.a!.x).toBe(128);
    expect(l.nodes.a!.y).toBe(128);
    expect(l.origin).toEqual({ x: 128, y: 128 });
    expect(l.width).toBe(256);
    expect(l.height).toBe(296);
  });

  test("a chain gets NODE_STEP tiles per hop along i, all on j 0", () => {
    const l = layoutScene(mk({ a: {}, b: {}, c: {} }, [["a", "b"], ["b", "c"]]));
    const tiles = Object.values(l.nodes).map((n) => [n.i, n.j]);
    expect(tiles).toEqual([[0, 0], [2, 0], [4, 0]]);
    expect(l.nodes.b!.x).toBeCloseTo(l.nodes.a!.x + 2 * HALF_W, 9);
    expect(l.nodes.b!.y).toBeCloseTo(l.nodes.a!.y + 2 * HALF_H, 9);
  });

  test("links are undirected: i is breadth-first depth times NODE_STEP from the first declared node", () => {
    const l = layoutScene(mk({ a: {}, b: {}, c: {} }, [["c", "b"], ["b", "a"]]));
    expect(l.nodes.a!.i).toBe(0);
    expect(l.nodes.b!.i).toBe(2);
    expect(l.nodes.c!.i).toBe(4);
  });

  test("siblings share an i and get different j that are multiples of NODE_STEP, smallest j is 0", () => {
    const l = layoutScene(mk({ a: {}, b: {}, c: {}, d: {} }, [["a", "b"], ["a", "c"], ["a", "d"]]));
    for (const id of ["b", "c", "d"]) expect(l.nodes[id]!.i).toBe(2);
    const js = ["a", "b", "c", "d"].map((id) => l.nodes[id]!.j);
    for (const j of js) expect(j % NODE_STEP).toBe(0);
    expect(Math.min(...js)).toBe(0);
    expect(new Set(["b", "c", "d"].map((id) => l.nodes[id]!.j)).size).toBe(3);
    expect(Math.max(...js)).toBeGreaterThanOrEqual(4);
  });

  test("a disconnected component starts after the last used depth", () => {
    const l = layoutScene(mk({ a: {}, b: {}, c: {}, d: {} }, [["a", "b"], ["c", "d"]]));
    expect([l.nodes.a!.i, l.nodes.b!.i, l.nodes.c!.i, l.nodes.d!.i]).toEqual([0, 2, 4, 6]);
  });

  test("an isolated node (no links) goes after the connected component", () => {
    const l = layoutScene(mk({ a: {}, b: {}, z: {} }, [["a", "b"]]));
    expect(l.nodes.z!.i).toBe(4);
  });

  test("no two auto-placed nodes share a tile", () => {
    const l = layoutScene(
      mk({ a: {}, b: {}, c: {}, d: {}, e: {}, f: {} }, [["a", "b"], ["a", "c"], ["b", "d"], ["c", "e"], ["a", "f"]]),
    );
    const tiles = Object.values(l.nodes).map((p) => `${p.i},${p.j}`);
    expect(new Set(tiles).size).toBe(6);
  });

  test("is deterministic", () => {
    const s = mk({ a: {}, b: {}, c: {}, d: {} }, [["a", "b"], ["a", "c"], ["c", "d"]]);
    expect(layoutScene(s)).toEqual(layoutScene(s));
  });
});

describe("groups", () => {
  test("region is the member tile rectangle grown by GROUP_PAD, as four iso points in order top, right, bottom, left", () => {
    const l = layoutScene(
      mk({ a: { at: [0, 0] }, b: { at: [1, 0], group: "g" }, c: { at: [2, 1], group: "g" } }, [], { g: { label: "G" } }),
    );
    const g = l.groups.g!;
    expect([g.i0, g.j0, g.i1, g.j1]).toEqual([0, -1, 3, 2]);
    const world = [
      [wx(0, -1), wy(0, -1)],
      [wx(3, -1), wy(3, -1)],
      [wx(3, 2), wy(3, 2)],
      [wx(0, 2), wy(0, 2)],
    ];
    expect(g.points).toHaveLength(4);
    g.points.forEach(([x, y], k) => {
      expect(x).toBeCloseTo(l.origin.x + world[k]![0]!, 9);
      expect(y).toBeCloseTo(l.origin.y + world[k]![1]!, 9);
    });
  });

  test("a single-member group is the tile grown by one on every side", () => {
    const l = layoutScene(mk({ a: { at: [3, 3], group: "g" } }, [], { g: { label: "G" } }));
    const g = l.groups.g!;
    expect([g.i0, g.j0, g.i1, g.j1]).toEqual([2, 2, 4, 4]);
  });

  test("no groups gives an empty record", () => {
    expect(layoutScene(mk({ a: {} })).groups).toEqual({});
  });

  test("canvas contains every group point", () => {
    const l = layoutScene(mk({ a: { at: [0, 0], group: "g" } }, [], { g: { label: "G" } }));
    for (const [x, y] of l.groups.g!.points) {
      expect(x).toBeGreaterThanOrEqual(MARGIN - 1e-9);
      expect(y).toBeGreaterThanOrEqual(MARGIN - 1e-9);
      expect(x).toBeLessThanOrEqual(l.width - MARGIN + 1e-9);
      expect(y).toBeLessThanOrEqual(l.height - MARGIN + 1e-9);
    }
  });
});

describe("webrtc example", () => {
  const load = async () => {
    const scene = await loadScene(root + "examples/webrtc.scene.yaml");
    return { scene, layout: layoutScene(scene) };
  };

  test("exact tiles for every node", async () => {
    const { layout: l } = await load();
    expect(Object.keys(l.nodes)).toEqual(["client", "r1", "net", "stun", "sig", "r2", "sam"]);
    const tiles = Object.fromEntries(Object.entries(l.nodes).map(([id, n]) => [id, [n.i, n.j]]));
    expect(tiles).toEqual({
      client: [0, 2],
      r1: [2, 2],
      net: [4, 2],
      stun: [6, 2],
      sig: [6, 4],
      r2: [6, 0],
      sam: [8, 0],
    });
  });

  test("j is a multiple of NODE_STEP, smallest is 0, and no two nodes share a tile", async () => {
    const { layout: l } = await load();
    const js = Object.values(l.nodes).map((n) => n.j);
    for (const j of js) expect(j % NODE_STEP).toBe(0);
    expect(Math.min(...js)).toBe(0);
    expect(new Set(Object.values(l.nodes).map((n) => `${n.i},${n.j}`)).size).toBe(7);
  });

  test("canvas position follows the iso formula and the origin", async () => {
    const { layout: l } = await load();
    expect(l.origin.x).toBeCloseTo(269.5, 9);
    expect(l.origin.y).toBeCloseTo(80, 9);
    for (const n of Object.values(l.nodes)) {
      expect(n.x).toBeCloseTo(l.origin.x + wx(n.i, n.j), 9);
      expect(n.y).toBeCloseTo(l.origin.y + wy(n.i, n.j), 9);
    }
    expect(l.width).toBeCloseTo(1057, 9);
    expect(l.height).toBeCloseTo(657.5, 9);
  });

  test("group sams-home wraps r2 and sam and no other node (point in rectangle, tile space)", async () => {
    const { layout: l } = await load();
    const g = l.groups["sams-home"]!;
    expect([g.i0, g.j0, g.i1, g.j1]).toEqual([5, -1, 9, 1]);
    const inside = (id: string) => {
      const n = l.nodes[id]!;
      return n.i >= g.i0 && n.i <= g.i1 && n.j >= g.j0 && n.j <= g.j1;
    };
    expect(inside("r2")).toBe(true);
    expect(inside("sam")).toBe(true);
    for (const id of ["client", "r1", "net", "stun", "sig"]) expect(inside(id)).toBe(false);
  });

  test("canvas contains every node centre and group point", async () => {
    const { layout: l } = await load();
    for (const p of Object.values(l.nodes)) {
      expect(p.x).toBeGreaterThanOrEqual(0);
      expect(p.x).toBeLessThanOrEqual(l.width);
      expect(p.y).toBeGreaterThanOrEqual(0);
      expect(p.y).toBeLessThanOrEqual(l.height);
    }
    for (const [x, y] of l.groups["sams-home"]!.points) {
      expect(x).toBeGreaterThanOrEqual(0);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(l.width);
      expect(y).toBeLessThanOrEqual(l.height);
    }
  });

  test("same input gives the same output", async () => {
    const { scene } = await load();
    expect(layoutScene(scene)).toEqual(layoutScene(scene));
  });
});
