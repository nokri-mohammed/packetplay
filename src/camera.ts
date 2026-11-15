// Follow camera: where the view should look at a given clock. Pure functions of the timeline, the node
// centres and the clock, with no state, so seeking, scrubbing and the export tool all get the same camera.
import { type StepTL, type Timeline } from "./timeline.ts";

export interface Point {
  x: number;
  y: number;
}
export type NodePositions = ReadonlyMap<string, Point>;

/** Zoom the camera switches to the first time Follow is turned on, unless the view is already at least this close. */
export const FOLLOW_ZOOM = 1.0;
/** The camera target averages the focus over this window, centred on the clock. */
export const SMOOTH_MS = 800;
/** Number of evenly spaced samples in that window (ends included). */
export const SMOOTH_SAMPLES = 9;

const lerp = (a: number, b: number, f: number): number => a + (b - a) * f;
const mix = (a: Point, b: Point, f: number): Point => ({ x: lerp(a.x, b.x, f), y: lerp(a.y, b.y, f) });
const centroid = (pts: Point[]): Point => ({
  x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
  y: pts.reduce((s, p) => s + p.y, 0) / pts.length,
});

function node(nodes: NodePositions, id: string): Point {
  return nodes.get(id) ?? { x: 0, y: 0 };
}

/** Where the packet(s) of one step are at time t. Before the step: its first node. After it: its last node. */
function stepFocus(step: StepTL, nodes: NodePositions, t: number): Point {
  const first = node(nodes, step.path[0] as string);
  const last = node(nodes, step.path[step.path.length - 1] as string);
  if (t < step.startMs + step.typingMs) return first; // typing at the source node
  if (t >= step.endMs) return last;
  if (step.hops.length === 0) return first;
  if (step.mode === "flow") {
    // Tokens ride the whole route: the camera travels along it over the flow time.
    const f = (t - step.startMs - step.typingMs) / (step.endMs - step.startMs - step.typingMs);
    return mix(first, last, Math.min(1, Math.max(0, f)));
  }
  let i = 0;
  for (let k = 0; k < step.hops.length; k++) if ((step.hops[k] as { startMs: number }).startMs <= t) i = k;
  const hop = step.hops[i] as StepTL["hops"][number];
  const rev = step.hops[step.hops.length - 1 - i] as StepTL["hops"][number];
  if (t >= hop.endMs) {
    // Resting at the node the hop reached (for NODE_DWELL_MS, up to the next hop's start).
    const p = node(nodes, hop.to);
    return step.both ? centroid([p, node(nodes, rev.from)]) : p;
  }
  const f = Math.min(1, Math.max(0, (t - hop.startMs) / hop.durMs));
  const dot = { x: lerp(hop.x1, hop.x2, f), y: lerp(hop.y1, hop.y2, f) };
  if (!step.both) return dot;
  return centroid([dot, { x: lerp(rev.back.x1, rev.back.x2, f), y: lerp(rev.back.y1, rev.back.y2, f) }]);
}

interface Group {
  start: number;
  end: number;
  steps: StepTL[];
}

/** Steps that start together (a `parallel` block) form one group; a group runs until its longest step ends. */
function groupsOf(tl: Timeline): Group[] {
  const out: Group[] = [];
  for (const s of tl.steps) {
    const g = out.find((x) => x.start === s.startMs);
    if (g) {
      g.steps.push(s);
      g.end = Math.max(g.end, s.endMs);
    } else out.push({ start: s.startMs, end: s.endMs, steps: [s] });
  }
  return out.sort((a, b) => a.start - b.start);
}

const groupFocus = (g: Group, nodes: NodePositions, t: number): Point => centroid(g.steps.map((s) => stepFocus(s, nodes, t)));

/**
 * The point (canvas coordinates) the camera is interested in at clock `t` (ms of scene time).
 * While a step's packet moves: the dot. While it rests: that node. While a step types: its source node.
 * Several packets (a parallel block, or a `both` step): their centroid. Between steps: a straight line from
 * where the previous step ended to the first node of the next. Before the first step: its first node.
 * After the last: its last node. Pure: the same clock always gives the same answer.
 */
export function focusAt(tl: Timeline, nodes: NodePositions, t: number): Point {
  const groups = groupsOf(tl);
  const firstG = groups[0];
  if (!firstG) return { x: 0, y: 0 };
  if (t < firstG.start) return centroid(firstG.steps.map((s) => node(nodes, s.path[0] as string)));
  for (let k = 0; k < groups.length; k++) {
    const g = groups[k] as Group;
    if (t < g.end) return groupFocus(g, nodes, t);
    const next = groups[k + 1];
    if (!next) return groupFocus(g, nodes, g.end);
    if (t < next.start) {
      const f = (t - g.end) / (next.start - g.end);
      return mix(groupFocus(g, nodes, g.end), centroid(next.steps.map((s) => node(nodes, s.path[0] as string))), f);
    }
  }
  return { x: 0, y: 0 };
}

/**
 * The camera target at clock `t`: the average of focusAt over SMOOTH_MS around t (SMOOTH_SAMPLES evenly
 * spaced samples from t - 400 to t + 400, each clamped to the timeline). Pure.
 */
export function cameraTarget(tl: Timeline, nodes: NodePositions, t: number): Point {
  const half = SMOOTH_MS / 2;
  const pts: Point[] = [];
  for (let k = 0; k < SMOOTH_SAMPLES; k++) {
    const s = t - half + (k * SMOOTH_MS) / (SMOOTH_SAMPLES - 1);
    pts.push(focusAt(tl, nodes, Math.min(tl.totalMs, Math.max(0, s))));
  }
  return centroid(pts);
}
