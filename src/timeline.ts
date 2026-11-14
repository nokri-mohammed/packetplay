import type { Layout } from "./layout.ts";
import { lane, lanePacketEnds, laneId } from "./lanes.ts";
import { routeStep } from "./route.ts";
import type { Scene, Step } from "./types.generated.ts";

/** Packet speed on screen, in px per ms: a longer arrow takes proportionally longer. */
export const HOP_SPEED = 0.07;
/** Shortest time a hop may take, so a very short arrow is not a blink. */
export const HOP_MIN_MS = 350;
/** How long a packet rests at the node it has just reached. */
export const NODE_DWELL_MS = 650;
export const FLOW_MS = 4300;
export const STEP_GAP_MS = 450;
/** Typing animation: time per character, and the pause after the last one (the Enter flash). */
export const TYPE_CHAR_MS = 80;
export const TYPE_HOLD_MS = 500;
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
  /** Trimmed ends: LANE_TRIM short of each node centre (the arrow ends), clamped for short hops. */
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  /** The other lane of the same link (to to from), used by the return packet when `both` is set. */
  back: { link: string; x1: number; y1: number; x2: number; y2: number };
  /** Time the packet takes to cross this hop: length / HOP_SPEED, at least HOP_MIN_MS. */
  durMs: number;
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
  /** Time spent typing at the source node before the message leaves. 0 when the step has no `typing`. */
  typingMs: number;
  /** The text typed at the source node, or an empty string. */
  typing: string;
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
export interface RevealTL {
  node: string;
  /** Arrival time of the revealing step's last hop. The node fades in from here. */
  atMs: number;
  /** Id of the revealing step. */
  stepId: string;
}
export interface Timeline {
  title: string;
  totalMs: number;
  /** Ids of the nodes that start hidden. Those that no step reveals are never shown. */
  hidden: string[];
  reveals: RevealTL[];
  tracks: TrackTL[];
  chapters: ChapterTL[];
  steps: StepTL[];
}

/** Time a packet needs for a hop of `len` px at HOP_SPEED, never below HOP_MIN_MS. */
function hopDuration(len: number): number {
  return Math.max(HOP_MIN_MS, Math.round(len / HOP_SPEED));
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
  const typing = step.typing ?? "";
  const typingMs = typing.length > 0 ? typing.length * TYPE_CHAR_MS + TYPE_HOLD_MS : 0;
  const goMs = startMs + typingMs; // the message leaves here

  const ends = [];
  for (let i = 0; i < hopCount; i++) {
    ends.push(lanePacketEnds(lane(layout, path[i] as string, path[i + 1] as string)));
  }
  const ownMs = ends.map((e) => hopDuration(Math.hypot(e.x2 - e.x1, e.y2 - e.y1)));
  // A `both` step moves the forward hop i and the reverse packet on hop n - 1 - i together,
  // so the two share the longer duration.
  const durs = ownMs.map((d, i) => (step.both ? Math.max(d, ownMs[hopCount - 1 - i] as number) : d));

  const hops: HopTL[] = [];
  let cursorMs = goMs;
  for (let i = 0; i < hopCount; i++) {
    const from = path[i] as string;
    const to = path[i + 1] as string;
    const rev = lane(layout, to, from);
    const fe = ends[i] as ReturnType<typeof lanePacketEnds>;
    const re = lanePacketEnds(rev);
    const data: Record<string, unknown> = { ...(step.data ?? {}) };
    for (let k = 0; k <= i; k++) {
      const set = step.at?.[path[k] as string]?.set;
      if (set) Object.assign(data, set);
    }
    const hop: HopTL = {
      from,
      to,
      link: laneId(from, to),
      x1: fe.x1,
      y1: fe.y1,
      x2: fe.x2,
      y2: fe.y2,
      back: { link: rev.id, x1: re.x1, y1: re.y1, x2: re.x2, y2: re.y2 },
      durMs: durs[i] as number,
      startMs: mode === "flow" ? goMs : cursorMs,
      endMs: mode === "flow" ? goMs + FLOW_MS : cursorMs + (durs[i] as number),
      data,
    };
    const note = step.at?.[to]?.desc;
    if (note !== undefined) hop.note = note;
    hops.push(hop);
    cursorMs = hop.endMs + NODE_DWELL_MS;
  }
  const lastHop = hops[hops.length - 1];
  const endMs = mode === "flow" ? goMs + FLOW_MS : lastHop ? lastHop.endMs + NODE_DWELL_MS : goMs;

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
    typingMs,
    typing,
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
  const reveals: RevealTL[] = [];
  let cursor = 0;
  const noteReveals = (step: Step, st: StepTL): void => {
    const last = st.hops[st.hops.length - 1];
    if (!last) return;
    for (const node of step.reveal ?? []) reveals.push({ node, atMs: last.endMs, stepId: st.id });
  };

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
          noteReveals(child, st);
          end = Math.max(end, st.endMs);
        });
      } else {
        const st = compileStep(scene, layout, s, base, ci, si, start);
        steps.push(st);
        noteReveals(s, st);
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
  const hidden = Object.entries(scene.nodes)
    .filter(([, n]) => n.hidden === true)
    .map(([id]) => id);
  return { title: scene.title, totalMs, hidden, reveals, tracks, chapters, steps: all };
}
