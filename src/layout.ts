import type { Scene } from "./types.generated.ts";

export const CELL_W = 240;
export const CELL_H = 200;
export const MARGIN = 60;
export const ICON_SIZE = 96;
export const GROUP_PAD = 36;
const LABEL_EXTRA = 24;

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Layout {
  width: number;
  height: number;
  nodes: Record<string, { x: number; y: number }>;
  groups: Record<string, Rect>;
}

type Cell = { col: number; row: number };

const GROW = ICON_SIZE / 2 + GROUP_PAD;
const cellX = (col: number) => MARGIN + col * CELL_W + CELL_W / 2;
const cellY = (row: number) => MARGIN + row * CELL_H + CELL_H / 2;

function groupRect(cells: Cell[]): Rect {
  const xs = cells.map((c) => cellX(c.col));
  const ys = cells.map((c) => cellY(c.row));
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  return {
    x: minX - GROW,
    y: minY - GROW - LABEL_EXTRA,
    width: Math.max(...xs) - minX + 2 * GROW,
    height: Math.max(...ys) - minY + 2 * GROW + LABEL_EXTRA,
  };
}

const inside = (r: Rect, c: Cell) => {
  const x = cellX(c.col);
  const y = cellY(c.row);
  return x >= r.x && x <= r.x + r.width && y >= r.y && y <= r.y + r.height;
};

/** Pure, deterministic grid layout. Assumes the scene passed validateScene. */
export function layoutScene(scene: Scene): Layout {
  const ids = Object.keys(scene.nodes);
  const nodes = scene.nodes as Record<string, { at?: [number, number]; group?: string }>;
  const cells: Record<string, Cell> = {};
  const cellOf = (id: string): Cell => {
    const c = cells[id];
    if (!c) throw new Error(`layout: node "${id}" has no cell`);
    return c;
  };
  const at = (id: string) => nodes[id]?.at;
  const groupOf = (id: string) => nodes[id]?.group;
  const auto = new Set<string>();

  for (const id of ids) {
    const pin = at(id);
    if (pin) cells[id] = { col: pin[0], row: pin[1] };
    else auto.add(id);
  }

  const adj: Record<string, string[]> = Object.fromEntries(ids.map((id) => [id, []]));
  for (const [a, b] of scene.links as [string, string][]) {
    adj[a]?.push(b);
    adj[b]?.push(a);
  }

  const taken = new Set<string>();
  for (const id of ids) if (!auto.has(id)) taken.add(`${cellOf(id).col},${cellOf(id).row}`);

  const placed = new Set<string>(ids.filter((id) => !auto.has(id)));

  // Would putting `id` at `cell` break the "only members inside a group" rule?
  const violates = (id: string, cell: Cell) => {
    const groups = new Set(ids.map(groupOf).filter((g): g is string => !!g));
    for (const g of groups) {
      const members = ids.filter((m) => groupOf(m) === g && placed.has(m)).map((m) => cellOf(m));
      if (groupOf(id) === g) {
        const rect = groupRect([...members, cell]);
        for (const o of ids) if (o !== id && placed.has(o) && groupOf(o) !== g && inside(rect, cellOf(o))) return true;
      } else if (members.length > 0 && inside(groupRect(members), cell)) {
        return true;
      }
    }
    return false;
  };

  const pick = (id: string, col: number, preferred: number): number => {
    for (let d = 0; d <= ids.length * 2 + 2; d++) {
      for (const row of d === 0 ? [preferred] : [preferred + d, preferred - d]) {
        if (taken.has(`${col},${row}`)) continue;
        if (violates(id, { col, row })) continue;
        return row;
      }
    }
    for (let row = preferred; ; row++) if (!taken.has(`${col},${row}`)) return row;
  };

  const place = (id: string, col: number, preferred: number) => {
    const row = pick(id, col, preferred);
    cells[id] = { col, row };
    taken.add(`${col},${row}`);
    placed.add(id);
  };

  let nextCol = 0;
  for (const start of ids) {
    if (!auto.has(start) || start in cells) continue;
    const parent: Record<string, string | null> = { [start]: null };
    const depth: Record<string, number> = { [start]: 0 };
    const queue = [start];
    let maxDepth = 0;
    for (let i = 0; i < queue.length; i++) {
      const cur = queue[i] as string;
      const col = nextCol + (depth[cur] ?? 0);
      let preferred = 0;
      const p = parent[cur];
      if (p) preferred = cellOf(p).row;
      else {
        // group members share the row of an already placed groupmate, if any
        const mate = ids.find((m) => placed.has(m) && auto.has(m) && groupOf(m) && groupOf(m) === groupOf(cur));
        if (mate) preferred = cellOf(mate).row;
      }
      place(cur, col, preferred);
      for (const n of adj[cur] ?? []) {
        if (!auto.has(n) || n in depth) continue;
        depth[n] = (depth[cur] ?? 0) + 1;
        parent[n] = cur;
        maxDepth = Math.max(maxDepth, depth[n] ?? 0);
        queue.push(n);
      }
    }
    nextCol += maxDepth + 1;
  }

  // Normalise auto rows so the smallest is 0.
  const autoRows = [...auto].map((id) => cellOf(id).row);
  if (autoRows.length) {
    const shift = Math.min(...autoRows);
    for (const id of auto) cellOf(id).row -= shift;
  }

  const outNodes: Layout["nodes"] = {};
  for (const id of ids) outNodes[id] = { x: cellX(cellOf(id).col), y: cellY(cellOf(id).row) };

  const groups: Layout["groups"] = {};
  for (const g of Object.keys(scene.groups ?? {})) {
    const members = ids.filter((id) => groupOf(id) === g).map((id) => cellOf(id));
    if (members.length) groups[g] = groupRect(members);
  }

  const maxCol = ids.length ? Math.max(...ids.map((id) => Math.ceil(cellOf(id).col))) : 0;
  const maxRow = ids.length ? Math.max(...ids.map((id) => Math.ceil(cellOf(id).row))) : 0;
  return {
    width: 2 * MARGIN + (maxCol + 1) * CELL_W,
    height: 2 * MARGIN + (maxRow + 1) * CELL_H,
    nodes: outNodes,
    groups,
  };
}
