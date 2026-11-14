import { HOP_MS, TYPE_CHAR_MS, type HopTL, type StepTL, type Timeline } from "./timeline.ts";

export const SPEEDS: readonly number[] = [0.5, 1, 1.5, 2];
export const PULSE_MS = 650;

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
 * The route starts when the message leaves, at startMs + typingMs. Null when t is outside
 * [startMs + typingMs, endMs].
 */
export function routeHighlight(
  t: number,
  step: StepTL,
): { hops: HopTL[]; opacity: number; offset: number } | null {
  const from = step.startMs + step.typingMs;
  if (t < from || t > step.endMs) return null;
  const fadeIn = (t - from) / ROUTE_FADE_MS;
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

/** Length of the pop of a revealed node. */
export const POP_MS = 700;
/** Rings that expand from a revealed node: radius from 48 to 150 over 900 ms, the second one 250 ms later. */
export const RING_MS = 900;
export const RING_DELAYS: readonly number[] = [0, 250];
const POP_PEAK = 0.6; // fraction of POP_MS at which the scale peaks

/**
 * The reveal effect at time t, a pure function of the clock. Scale: with u = (t - atMs) / 700,
 * 0.6 + 0.55 * sin(u / 0.6 * pi / 2) for u up to 0.6 (0.6 to 1.15), then
 * 1.15 - 0.15 * sin((u - 0.6) / 0.4 * pi / 2) for u up to 1 (1.15 back to 1), and 1 after that.
 * Each ring, with v = (t - atMs - delay) / 900, exists for 0 <= v < 1 with radius 48 + 102 v and
 * opacity 0.8 * (1 - v). Before atMs there is no effect: scale 1 and no rings.
 */
export function revealPop(t: number, atMs: number): { scale: number; rings: { r: number; opacity: number }[] } {
  const u = (t - atMs) / POP_MS;
  let scale = 1;
  if (u >= 0 && u < POP_PEAK) scale = 0.6 + 0.55 * Math.sin(((u / POP_PEAK) * Math.PI) / 2);
  else if (u >= POP_PEAK && u < 1) scale = 1.15 - 0.15 * Math.sin((((u - POP_PEAK) / (1 - POP_PEAK)) * Math.PI) / 2);
  const rings: { r: number; opacity: number }[] = [];
  for (const d of RING_DELAYS) {
    const v = (t - atMs - d) / RING_MS;
    if (v >= 0 && v < 1) rings.push({ r: 48 + 102 * v, opacity: 0.8 * (1 - v) });
  }
  return { scale, rings };
}

/**
 * Length (ms) and height (world px) of the bump a node makes when a packet arrives or Enter is pressed.
 * The length equals NODE_DWELL_MS: the dot is inside the icon for the whole bump and leaves the far side
 * the moment the next hop starts, with no pause in between.
 */
export const SHAKE_MS = 650;
export const SHAKE_AMP = 6;

/**
 * A slight bump of a node that starts at `atMs`: it lifts and settles once. With u = (t - atMs) / 650:
 * dy = -6 * sin(pi * u) inside [atMs, atMs + 650], else 0. dx is always 0.
 */
export function nodeShake(t: number, atMs: number): { dx: number; dy: number } {
  if (t < atMs || t > atMs + SHAKE_MS) return { dx: 0, dy: 0 };
  const u = (t - atMs) / SHAKE_MS;
  return { dx: 0, dy: -SHAKE_AMP * Math.sin(Math.PI * u) + 0 }; // + 0 turns -0 into 0
}

/**
 * Start times of node shakes, per node id, ascending. Every hop of a packet step shakes its arrival
 * node at `hop.endMs`; a step with typing shakes its source node when Enter flashes. Flow steps: none.
 */
export function shakeEvents(tl: Timeline): Map<string, number[]> {
  const out = new Map<string, number[]>();
  const add = (id: string, at: number): void => {
    const list = out.get(id);
    if (list) list.push(at);
    else out.set(id, [at]);
  };
  for (const s of tl.steps) {
    if (s.mode !== "packet") continue;
    if (s.typing.length > 0) add(s.path[0] as string, s.startMs + s.typing.length * TYPE_CHAR_MS);
    for (const h of s.hops) add(h.to, h.endMs);
  }
  for (const list of out.values()) list.sort((a, b) => a - b);
  return out;
}

/** Shake offset at time t from a node's event times: the latest event with atMs <= t wins. */
export function shakeOffset(events: readonly number[] | undefined, t: number): { dx: number; dy: number } {
  let at = -1;
  let found = false;
  for (const e of events ?? []) if (e <= t) { at = e; found = true; }
  return found ? nodeShake(t, at) : { dx: 0, dy: 0 };
}

/** The caret blinks every 400 ms from the start of the step. */
export const CARET_MS = 400;

/**
 * The typing animation of a step at time t, or null outside [startMs, startMs + typingMs).
 * One character per 80 ms. `sent` is true during the hold after the last character (the Enter flash),
 * when the caret has stopped.
 */
export function typingState(t: number, step: StepTL): { text: string; caret: boolean; sent: boolean } | null {
  if (step.typingMs <= 0 || t < step.startMs || t >= step.startMs + step.typingMs) return null;
  const el = t - step.startMs;
  const typed = step.typing.length * TYPE_CHAR_MS;
  const sent = el >= typed;
  const chars = Math.min(step.typing.length, Math.floor(el / TYPE_CHAR_MS));
  return { text: step.typing.slice(0, chars), caret: !sent && Math.floor(el / CARET_MS) % 2 === 0, sent };
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
    if (t < s.startMs + s.typingMs) continue; // still typing: nothing has left yet
    if (s.mode === "flow") {
      flows.push({
        stepId: s.id,
        path: s.path,
        color: s.color,
        both: s.both,
        progress: (t - s.startMs - s.typingMs) / (s.endMs - s.startMs - s.typingMs),
      });
      continue;
    }
    const at = hopAt(s, t);
    if (!at) continue;
    const { index, hop, f } = at;
    let x = lerp(hop.x1, hop.x2, f);
    let y = lerp(hop.y1, hop.y2, f);
    // At a node that has another hop after it, the dot goes into the icon on arrival (hidden while the
    // icon bumps) and comes out on the far side, ready to leave. The last node keeps its dot.
    const next = s.hops[index + 1];
    const inside = next !== undefined && t >= hop.endMs && t < hop.endMs + SHAKE_MS;
    if (inside) continue;
    const out = next !== undefined && t >= hop.endMs + SHAKE_MS;
    packets.push({
      stepId: s.id,
      x: out ? (next as HopTL).x1 : lerp(hop.x1, hop.x2, f),
      y: out ? (next as HopTL).y1 : lerp(hop.y1, hop.y2, f),
      color: s.color,
      direction: 1,
      label: s.label,
      data: hop.data,
    });
    if (s.both) {
      const rev = s.hops[s.hops.length - 1 - index] as HopTL;
      const revNext = out ? (s.hops[s.hops.length - 2 - index] as HopTL | undefined) : undefined;
      packets.push({
        stepId: s.id,
        x: revNext ? revNext.back.x1 : lerp(rev.back.x1, rev.back.x2, f),
        y: revNext ? revNext.back.y1 : lerp(rev.back.y1, rev.back.y2, f),
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
