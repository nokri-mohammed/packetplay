import type { Layout } from "./layout.ts";
import { lane, laneId } from "./lanes.ts";
import { routeStep } from "./route.ts";
import type { Scene, Step } from "./types.generated.ts";

export const HOP_MS = 1300;
/** How long a packet rests at the node it has just reached. */
export const NODE_DWELL_MS = 750;
export const FLOW_MS = 5000;
export const STEP_GAP_MS = 500;
export const NEUTRAL_COLOR = "#6b7280";
export const TRACK_COLORS: Record<string, string> = {
  blue: "#3b82f6",
  orange: "#f97316",
  green: "#22c55e",
  red: "#ef4444",
  purple: "#a855f7",
  yellow: "#eab308",
  pink: "#ec4899",
  teal: "#14b8a6",
  gray: "#6b7280",
};

/** Named colour to hex. `#rgb` and `#rrggbb` come back lower-cased. Anything else throws. */
export function resolveColor(color: string): string {
  if (Object.hasOwn(TRACK_COLORS, color)) return TRACK_COLORS[color] as string;
  if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(color)) return color.toLowerCase();
  throw new Error(`unknown colour "${color}"`);
}

export interface HopTL {
  from: string;
  to: string;
  /** Lane id of this hop's direction, `${from}--${to}`. */
  link: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  /** The other lane of the same link (to to from), used by the return packet when `both` is set. */
  back: { link: string; x1: number; y1: number; x2: number; y2: number };
  startMs: number;
  endMs: number;
  data: Record<string, unknown>;
  note?: string;
}
export interface StepTL {
  id: string;
  chapter: number;
  step: number;
  label: string;
  desc: string;
  track: string | null;
  color: string;
  mode: "packet" | "flow";
  both: boolean;
  pause: boolean;
  path: string[];
  hops: HopTL[];
  startMs: number;
  endMs: number;
}
export interface ChapterTL {
  index: number;
  title: string;
  desc: string;
  startMs: number;
  endMs: number;
  steps: StepTL[];
}
export interface TrackTL {
  id: string;
  label: string;
  color: string;
}
export interface Timeline {
  title: string;
  totalMs: number;
  tracks: TrackTL[];
  chapters: ChapterTL[];
  steps: StepTL[];
}

function compileStep(
  scene: Scene,
  layout: Layout,
  step: Step,
  id: string,
  chapter: number,
  index: number,
  startMs: number,
): StepTL {
  const path = routeStep(scene, step);
  const mode = step.mode ?? "packet";
  const track = step.track ?? null;
  const trackDef = track !== null ? scene.tracks?.[track] : undefined;
  const color = trackDef ? resolveColor(trackDef.color) : NEUTRAL_COLOR;
  const hopCount = path.length - 1;
  const endMs = startMs + (mode === "flow" ? FLOW_MS : hopCount * (HOP_MS + NODE_DWELL_MS));

  const hops: HopTL[] = [];
  for (let i = 0; i < hopCount; i++) {
    const from = path[i] as string;
    const to = path[i + 1] as string;
    const fwd = lane(layout, from, to);
    const rev = lane(layout, to, from);
    const data: Record<string, unknown> = { ...(step.data ?? {}) };
    for (let k = 0; k <= i; k++) {
      const set = step.at?.[path[k] as string]?.set;
      if (set) Object.assign(data, set);
    }
    const hop: HopTL = {
      from,
      to,
      link: laneId(from, to),
      x1: fwd.x1,
      y1: fwd.y1,
      x2: fwd.x2,
      y2: fwd.y2,
      back: { link: rev.id, x1: rev.x1, y1: rev.y1, x2: rev.x2, y2: rev.y2 },
      startMs: mode === "flow" ? startMs : startMs + i * (HOP_MS + NODE_DWELL_MS),
      endMs: mode === "flow" ? startMs + FLOW_MS : startMs + i * (HOP_MS + NODE_DWELL_MS) + HOP_MS,
      data,
    };
    const note = step.at?.[to]?.desc;
    if (note !== undefined) hop.note = note;
    hops.push(hop);
  }

  return {
    id,
    chapter,
    step: index,
    label: step.label ?? "",
    desc: step.desc ?? "",
    track,
    color,
    mode,
    both: step.both ?? false,
    pause: step.pause ?? false,
    path,
    hops,
    startMs,
    endMs,
  };
}

/** Turn a validated scene and its layout into a timed description of everything that moves. */
export function compileTimeline(scene: Scene, layout: Layout): Timeline {
  const tracks: TrackTL[] = Object.entries(scene.tracks ?? {}).map(([id, t]) => ({
    id,
    label: t.label,
    color: resolveColor(t.color),
  }));
  const chapters: ChapterTL[] = [];
  const all: StepTL[] = [];
  let cursor = 0;

  scene.chapters.forEach((ch, ci) => {
    const steps: StepTL[] = [];
    ch.steps.forEach((s, si) => {
      const base = `c${ci + 1}s${si + 1}`;
      const start = cursor;
      let end = start;
      if ("parallel" in s) {
        s.parallel.forEach((child, k) => {
          const st = compileStep(scene, layout, child, `${base}p${k + 1}`, ci, si, start);
          steps.push(st);
          end = Math.max(end, st.endMs);
        });
      } else {
        const st = compileStep(scene, layout, s, base, ci, si, start);
        steps.push(st);
        end = st.endMs;
      }
      cursor = end + STEP_GAP_MS;
    });
    all.push(...steps);
    const first = steps[0];
    chapters.push({
      index: ci,
      title: ch.title,
      desc: ch.desc ?? "",
      startMs: first ? first.startMs : cursor,
      endMs: steps.length ? Math.max(...steps.map((s) => s.endMs)) : cursor,
      steps,
    });
  });

  const totalMs = all.length ? Math.max(...all.map((s) => s.endMs)) : 0;
  return { title: scene.title, totalMs, tracks, chapters, steps: all };
}
