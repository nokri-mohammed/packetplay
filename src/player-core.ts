import { HOP_MS, type HopTL, type StepTL, type Timeline } from "./timeline.ts";

export const SPEEDS: readonly number[] = [0.5, 1, 1.5, 2];
export const PULSE_MS = 750;

export interface Caption {
  chapterTitle: string;
  chapterDesc: string;
  stepLabel: string;
  stepDesc: string;
  note: string;
}
export interface PacketPos {
  stepId: string;
  x: number;
  y: number;
  color: string;
  direction: 1 | -1;
  label: string;
  /** What the packet carries at this hop. Empty for the reply packet of a `both` step. */
  data: Record<string, unknown>;
}
export interface FlowState {
  stepId: string;
  path: string[];
  color: string;
  both: boolean;
  progress: number;
}
export interface Pulse {
  node: string;
  color: string;
  ageMs: number;
}
export interface Frame {
  chapter: number;
  stepId: string | null;
  caption: Caption;
  packets: PacketPos[];
  flows: FlowState[];
  pulses: Pulse[];
}

const lerp = (a: number, b: number, f: number): number => a + (b - a) * f;

function currentStep(tl: Timeline, t: number): StepTL | null {
  let active: StepTL | null = null;
  let done: StepTL | null = null;
  for (const s of tl.steps) {
    if (s.startMs <= t && t < s.endMs) active = s;
    else if (s.endMs <= t) done = s;
  }
  return active ?? done;
}

/** The hop a packet is on at time t, and how far along it is (0..1). While it rests at a node, f is 1. */
function hopAt(step: StepTL, t: number): { index: number; hop: HopTL; f: number } | null {
  let found = -1;
  for (let i = 0; i < step.hops.length; i++) {
    if ((step.hops[i] as HopTL).startMs <= t) found = i;
  }
  if (found < 0) found = 0;
  const hop = step.hops[found];
  if (!hop) return null;
  const f = Math.min(1, Math.max(0, (t - hop.startMs) / HOP_MS));
  return { index: found, hop, f };
}

const clip = (text: string, max: number): string => (text.length > max ? text.slice(0, max - 1) + "\u2026" : text);

/** Header text of a packet: the step label, cut to 22 characters. */
export const packetTitle = (label: string): string => clip(label, 22);

/**
 * Body rows of a packet: one `key: value` row per key in insertion order, each cut to `maxChars`.
 * With more than `maxRows` keys the first `maxRows` are shown and a last row says `+N more`.
 */
export function packetRows(data: Record<string, unknown>, maxRows = 4, maxChars = 26): string[] {
  const entries = Object.entries(data);
  const rows = entries.slice(0, maxRows).map(([k, v]) => {
    const text = typeof v === "object" && v !== null ? JSON.stringify(v) : String(v);
    return clip(`${k}: ${text}`, maxChars);
  });
  if (entries.length > maxRows) rows.push(`+${entries.length - maxRows} more`);
  return rows;
}

/** Distance from the lane dot to the near edge of its info box. Icons reach 48 px from a node centre. */
export const BALLOON_GAP = 60;

/**
 * Position of a packet's info box. The box is centred on `x`. Direction 1 puts it above the dot
 * (bottom edge at `y - BALLOON_GAP`), direction -1 below it (top edge at `y + BALLOON_GAP`).
 * Returns the top edge `y` and `tetherY`, the box edge the tether line joins.
 */
export function balloonRect(
  x: number,
  y: number,
  width: number,
  height: number,
  direction: 1 | -1,
): { x: number; y: number; tetherY: number } {
  const left = x - width / 2;
  if (direction === 1) return { x: left, y: y - BALLOON_GAP - height, tetherY: y - BALLOON_GAP };
  return { x: left, y: y + BALLOON_GAP, tetherY: y + BALLOON_GAP };
}

/** Length of the fade in and fade out of a step's dotted route. */
export const ROUTE_FADE_MS = 300;
/** The dashes of the route move one pixel per this many milliseconds. */
export const ROUTE_DASH_MS = 25;

/**
 * The dotted route of a step at time t: every hop of the step, an opacity that ramps 0 to 1 over the
 * first 300 ms and 1 to 0 over the last 300 ms, and the dash offset (a pure function of t).
 * Null when t is outside [startMs, endMs].
 */
export function routeHighlight(
  t: number,
  step: StepTL,
): { hops: HopTL[]; opacity: number; offset: number } | null {
  if (t < step.startMs || t > step.endMs) return null;
  const fadeIn = (t - step.startMs) / ROUTE_FADE_MS;
  const fadeOut = (step.endMs - t) / ROUTE_FADE_MS;
  const opacity = Math.min(1, Math.max(0, Math.min(fadeIn, fadeOut)));
  return { hops: step.hops, opacity, offset: -t / ROUTE_DASH_MS };
}

/** Fade-in time of a node that a step reveals. */
export const REVEAL_FADE_MS = 600;

/** Opacity of a revealed node at time t: 0 before `atMs`, ramping to 1 over 600 ms. */
export function revealOpacity(t: number, atMs: number): number {
  return Math.min(1, Math.max(0, (t - atMs) / REVEAL_FADE_MS));
}

/** Everything that is visible at time t. */
export function frameAt(tl: Timeline, tMs: number): Frame {
  const t = tMs;
  const cur = currentStep(tl, t);
  const chapterIndex = cur ? cur.chapter : 0;
  const chapter = tl.chapters[chapterIndex];

  let note = "";
  if (cur) {
    for (const h of cur.hops) if (h.endMs <= t && h.note !== undefined) note = h.note;
  }
  const caption: Caption = {
    chapterTitle: chapter?.title ?? "",
    chapterDesc: chapter?.desc ?? "",
    stepLabel: cur?.label ?? "",
    stepDesc: cur?.desc ?? "",
    note,
  };

  const packets: PacketPos[] = [];
  const flows: FlowState[] = [];

  for (const s of tl.steps) {
    if (!(s.startMs <= t && t < s.endMs)) continue;
    if (s.mode === "flow") {
      flows.push({
        stepId: s.id,
        path: s.path,
        color: s.color,
        both: s.both,
        progress: (t - s.startMs) / (s.endMs - s.startMs),
      });
      continue;
    }
    const at = hopAt(s, t);
    if (!at) continue;
    const { index, hop, f } = at;
    const x = lerp(hop.x1, hop.x2, f);
    const y = lerp(hop.y1, hop.y2, f);
    packets.push({ stepId: s.id, x, y, color: s.color, direction: 1, label: s.label, data: hop.data });
    if (s.both) {
      const rev = s.hops[s.hops.length - 1 - index] as HopTL;
      packets.push({
        stepId: s.id,
        x: lerp(rev.back.x1, rev.back.x2, f),
        y: lerp(rev.back.y1, rev.back.y2, f),
        color: s.color,
        direction: -1,
        label: s.label,
        data: {},
      });
    }
  }

  const pulses: Pulse[] = [];
  for (const s of tl.steps) {
    for (const h of s.hops) {
      if (h.endMs <= t && t < h.endMs + PULSE_MS) {
        pulses.push({ node: h.to, color: s.color, ageMs: t - h.endMs });
      }
    }
  }

  return { chapter: chapterIndex, stepId: cur ? cur.id : null, caption, packets, flows, pulses };
}

export type Jump = "hop" | "message" | "chapter";

function boundaries(tl: Timeline, kind: Jump): number[] {
  const set = new Set<number>();
  if (kind === "hop") for (const s of tl.steps) for (const h of s.hops) set.add(h.startMs);
  else if (kind === "message") for (const s of tl.steps) set.add(s.startMs);
  else for (const c of tl.chapters) set.add(c.startMs);
  return [...set].sort((a, b) => a - b);
}

export function nextTime(tl: Timeline, tMs: number, kind: Jump): number {
  for (const b of boundaries(tl, kind)) if (b > tMs) return b;
  return tl.totalMs;
}

export function prevTime(tl: Timeline, tMs: number, kind: Jump): number {
  let best = 0;
  for (const b of boundaries(tl, kind)) if (b < tMs - 300) best = b;
  return best;
}

export function clampTime(tl: Timeline, tMs: number): number {
  return Math.min(Math.max(tMs, 0), tl.totalMs);
}

export function stepSpeed(current: number, dir: 1 | -1): number {
  let i = SPEEDS.indexOf(current);
  if (i < 0) {
    i = 0;
    SPEEDS.forEach((s, k) => {
      if (Math.abs(s - current) < Math.abs((SPEEDS[i] as number) - current)) i = k;
    });
  }
  return SPEEDS[Math.min(SPEEDS.length - 1, Math.max(0, i + dir))] as number;
}

export type Action =
  | "toggle"
  | "nextHop"
  | "prevHop"
  | "nextMessage"
  | "prevMessage"
  | "nextChapter"
  | "prevChapter"
  | "faster"
  | "slower"
  | "restart";

const KEYS: Record<string, Action> = {
  " ": "toggle",
  ArrowRight: "nextHop",
  ArrowLeft: "prevHop",
  n: "nextMessage",
  p: "prevMessage",
  "]": "nextChapter",
  "[": "prevChapter",
  "+": "faster",
  "=": "faster",
  "-": "slower",
  Home: "restart",
};

export function keyAction(key: string): Action | null {
  return Object.hasOwn(KEYS, key) ? (KEYS[key] as Action) : null;
}

export interface Marks {
  chapters: { index: number; title: string; startPct: number; endPct: number }[];
  dots: { stepId: string; pct: number; color: string; chapter: number }[];
}

export function timelineMarks(tl: Timeline): Marks {
  const pct = (ms: number) => (tl.totalMs > 0 ? (ms / tl.totalMs) * 100 : 0);
  return {
    chapters: tl.chapters.map((c) => ({
      index: c.index,
      title: c.title,
      startPct: pct(c.startMs),
      endPct: pct(c.endMs),
    })),
    dots: tl.steps.map((s) => ({ stepId: s.id, pct: pct(s.startMs), color: s.color, chapter: s.chapter })),
  };
}

export function timeFromFraction(tl: Timeline, fraction: number): number {
  return Math.min(Math.max(fraction, 0), 1) * tl.totalMs;
}

export function stepTimes(tl: Timeline): { stepId: string; startMs: number }[] {
  return tl.steps.map((s) => ({ stepId: s.id, startMs: s.startMs }));
}
