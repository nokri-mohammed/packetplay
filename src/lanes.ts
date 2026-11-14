import type { Layout } from "./layout.ts";

export const LANE_OFFSET = 8;
export const LANE_TRIM = 44;

export interface Lane {
  id: string;
  /** Motion line: node centre to node centre, shifted to the right-hand lane. */
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  /** Drawn arrow: the motion line trimmed by LANE_TRIM at both ends. */
  ax1: number;
  ay1: number;
  ax2: number;
  ay2: number;
}

export function laneId(from: string, to: string): string {
  return `${from}--${to}`;
}

/** Single source of truth for lane geometry. Render, timeline and player all call this. */
export function lane(layout: Layout, from: string, to: string): Lane {
  const a = layout.nodes[from];
  const b = layout.nodes[to];
  if (!a || !b) throw new Error(`Layout has no position for lane "${laneId(from, to)}"`);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  // Right-hand side of the direction of travel (screen y points down).
  const ox = -uy * LANE_OFFSET;
  const oy = ux * LANE_OFFSET;
  const x1 = a.x + ox;
  const y1 = a.y + oy;
  const x2 = b.x + ox;
  const y2 = b.y + oy;
  return {
    id: laneId(from, to),
    x1,
    y1,
    x2,
    y2,
    ax1: x1 + ux * LANE_TRIM,
    ay1: y1 + uy * LANE_TRIM,
    ax2: x2 - ux * LANE_TRIM,
    ay2: y2 - uy * LANE_TRIM,
  };
}
