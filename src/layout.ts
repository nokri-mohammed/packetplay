import type { Scene } from "./types.generated.ts";

export const TILE_W = 141.5;
export const TILE_H = 81.9;
export const HALF_W = TILE_W / 2;
export const HALF_H = TILE_H / 2;
export const NODE_STEP = 2;
export const ICON_SIZE = 96;
export const MARGIN = 80;
export const GROUP_PAD = 1;
const LABEL_BELOW = 40;

export interface Layout {
  width: number;
  height: number;
  nodes: Record<string, { x: number; y: number; i: number; j: number }>;
  groups: Record<string, { i0: number; j0: number; i1: number; j1: number; points: [number, number][] }>;
  origin: { x: number; y: number };
}

type Tile = { i: number; j: number };
type TileRect = { i0: number; j0: number; i1: number; j1: number };

const worldX = (i: number, j: number) => (i - j) * HALF_W;
const worldY = (i: number, j: number) => (i + j) * HALF_H;

function tileRect(tiles: Tile[]): TileRect {
  const is = tiles.map((t) => t.i);
  const js = tiles.map((t) => t.j);
  return {
    i0: Math.min(...is) - GROUP_PAD,
    j0: Math.min(...js) - GROUP_PAD,
    i1: Math.max(...is) + GROUP_PAD,
    j1: Math.max(...js) + GROUP_PAD,
  };
}

const inside = (r: TileRect, t: Tile) => t.i >= r.i0 && t.i <= r.i1 && t.j >= r.j0 && t.j <= r.j1;

/** Pure, deterministic isometric layout. Assumes the scene passed validateScene. */
export function layoutScene(scene: Scene): Layout {
  const ids = Object.keys(scene.nodes);
  const nodes = scene.nodes as Record<string, { at?: [number, number]; group?: string }>;
  const tiles: Record<string, Tile> = {};
  const tileOf = (id: string): Tile => {
    const t = tiles[id];
    if (!t) throw new Error(`layout: node "${id}" has no tile`);
    return t;
  };
  const at = (id: string) => nodes[id]?.at;
  const groupOf = (id: string) => nodes[id]?.group;
  const auto = new Set<string>();

  for (const id of ids) {
    const pin = at(id);
    if (pin) tiles[id] = { i: pin[0], j: pin[1] };
    else auto.add(id);
  }

  const adj: Record<string, string[]> = Object.fromEntries(ids.map((id) => [id, []]));
  for (const [a, b] of scene.links as [string, string][]) {
    adj[a]?.push(b);
    adj[b]?.push(a);
  }

  const taken = new Set<string>();
  for (const id of ids) if (!auto.has(id)) taken.add(`${tileOf(id).i},${tileOf(id).j}`);

  const placed = new Set<string>(ids.filter((id) => !auto.has(id)));

  // Would putting `id` on `tile` break the "only members inside a group" rule?
  const violates = (id: string, tile: Tile) => {
    const groups = new Set(ids.map(groupOf).filter((g): g is string => !!g));
    for (const g of groups) {
      const members = ids.filter((m) => groupOf(m) === g && placed.has(m)).map((m) => tileOf(m));
      if (groupOf(id) === g) {
        const rect = tileRect([...members, tile]);
        for (const o of ids) if (o !== id && placed.has(o) && groupOf(o) !== g && inside(rect, tileOf(o))) return true;
      } else if (members.length > 0 && inside(tileRect(members), tile)) {
        return true;
      }
    }
    return false;
  };

  const pick = (id: string, i: number, preferred: number): number => {
    for (let d = 0; d <= ids.length * 2 + 2; d++) {
      const off = d * NODE_STEP;
      for (const j of d === 0 ? [preferred] : [preferred + off, preferred - off]) {
        if (taken.has(`${i},${j}`)) continue;
        if (violates(id, { i, j })) continue;
        return j;
      }
    }
    for (let j = preferred; ; j += NODE_STEP) if (!taken.has(`${i},${j}`)) return j;
  };

  const place = (id: string, i: number, preferred: number) => {
    const j = pick(id, i, preferred);
    tiles[id] = { i, j };
    taken.add(`${i},${j}`);
    placed.add(id);
  };

  let nextI = 0;
  for (const start of ids) {
    if (!auto.has(start) || start in tiles) continue;
    const parent: Record<string, string | null> = { [start]: null };
    const depth: Record<string, number> = { [start]: 0 };
    const queue = [start];
    let maxDepth = 0;
    for (let q = 0; q < queue.length; q++) {
      const cur = queue[q] as string;
      const i = nextI + NODE_STEP * (depth[cur] ?? 0);
      let preferred = 0;
      const p = parent[cur];
      if (p) preferred = tileOf(p).j;
      else {
        // group members share the j of an already placed groupmate, if any
        const mate = ids.find((m) => placed.has(m) && auto.has(m) && groupOf(m) && groupOf(m) === groupOf(cur));
        if (mate) preferred = tileOf(mate).j;
      }
      place(cur, i, preferred);
      for (const n of adj[cur] ?? []) {
        if (!auto.has(n) || n in depth) continue;
        depth[n] = (depth[cur] ?? 0) + 1;
        parent[n] = cur;
        maxDepth = Math.max(maxDepth, depth[n] ?? 0);
        queue.push(n);
      }
    }
    nextI += NODE_STEP * (maxDepth + 1);
  }

  // Normalise auto j so the smallest is 0.
  const autoJs = [...auto].map((id) => tileOf(id).j);
  if (autoJs.length) {
    const shift = Math.min(...autoJs);
    for (const id of auto) tileOf(id).j -= shift;
  }

  const groupRects: Record<string, TileRect> = {};
  for (const g of Object.keys(scene.groups ?? {})) {
    const members = ids.filter((id) => groupOf(id) === g).map((id) => tileOf(id));
    if (members.length) groupRects[g] = tileRect(members);
  }
  const worldPoints = (r: TileRect): [number, number][] => [
    [worldX(r.i0, r.j0), worldY(r.i0, r.j0)],
    [worldX(r.i1, r.j0), worldY(r.i1, r.j0)],
    [worldX(r.i1, r.j1), worldY(r.i1, r.j1)],
    [worldX(r.i0, r.j1), worldY(r.i0, r.j1)],
  ];

  // Bounding box in world px of icons, labels and group points.
  const half = ICON_SIZE / 2;
  const xs: number[] = [0];
  const ys: number[] = [0];
  for (const id of ids) {
    const t = tileOf(id);
    const wx = worldX(t.i, t.j);
    const wy = worldY(t.i, t.j);
    xs.push(wx - half, wx + half);
    ys.push(wy - half, wy + half + LABEL_BELOW);
  }
  for (const r of Object.values(groupRects)) {
    for (const [x, y] of worldPoints(r)) {
      xs.push(x);
      ys.push(y);
    }
  }
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const ox = MARGIN - minX;
  const oy = MARGIN - minY;

  const outNodes: Layout["nodes"] = {};
  for (const id of ids) {
    const t = tileOf(id);
    outNodes[id] = { x: worldX(t.i, t.j) + ox, y: worldY(t.i, t.j) + oy, i: t.i, j: t.j };
  }
  const groups: Layout["groups"] = {};
  for (const [g, r] of Object.entries(groupRects)) {
    groups[g] = { ...r, points: worldPoints(r).map(([x, y]) => [x + ox, y + oy] as [number, number]) };
  }

  return {
    width: maxX - minX + 2 * MARGIN,
    height: maxY - minY + 2 * MARGIN,
    nodes: outNodes,
    groups,
    origin: { x: ox, y: oy },
  };
}
