// Runs in the browser (bundled into the page by src/page.ts). Reads the timeline JSON and the
// inlined SVG, and drives them with an anime.js v4 timer as the clock.
import { createTimer } from "animejs";
import {
  SPEEDS,
  PULSE_MS,
  clampTime,
  frameAt,
  keyAction,
  nextTime,
  prevTime,
  stepSpeed,
  timeFromFraction,
  timelineMarks,
  type Action,
  type Caption,
  type Frame,
  type Jump,
} from "./player-core.ts";
import { FLOW_MS, type StepTL, type Timeline } from "./timeline.ts";

const DWELL_MS = 2000; // reduced motion: time spent on each step
const FLOW_SPACING = 36;
const FLOW_SPEED = 140; // px per second

const $ = <T extends Element>(id: string): T => {
  const el = document.getElementById(id);
  if (!el) throw new Error(`missing element #${id}`);
  return el as unknown as T;
};

const tl = JSON.parse($("timeline-data").textContent ?? "{}") as Timeline;
const svg = document.querySelector("svg") as SVGSVGElement;
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const nSteps = tl.steps.length;
const clockTotal = Math.max(1, reduced ? nSteps * DWELL_MS : tl.totalMs);

const esc = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// ---------------------------------------------------------------- overlay

const SVGNS = "http://www.w3.org/2000/svg";
const overlay = document.createElementNS(SVGNS, "g");
overlay.setAttribute("pointer-events", "none");
svg.appendChild(overlay);
const vb = svg.viewBox.baseVal;

const nodePos = new Map<string, { x: number; y: number }>();
for (const s of tl.steps) {
  for (const h of s.hops) {
    nodePos.set(h.from, { x: h.x1, y: h.y1 });
    nodePos.set(h.to, { x: h.x2, y: h.y2 });
  }
}

function pointAt(pts: { x: number; y: number }[], cum: number[], s: number) {
  for (let i = 1; i < pts.length; i++) {
    const end = cum[i] as number;
    if (s <= end) {
      const start = cum[i - 1] as number;
      const f = end === start ? 0 : (s - start) / (end - start);
      const a = pts[i - 1] as { x: number; y: number };
      const b = pts[i] as { x: number; y: number };
      return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
    }
  }
  return pts[pts.length - 1] as { x: number; y: number };
}

function flowDots(path: string[], color: string, both: boolean, progress: number): string {
  const pts = path.map((id) => nodePos.get(id)).filter((p): p is { x: number; y: number } => !!p);
  if (pts.length < 2) return "";
  const cum = [0];
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1] as { x: number; y: number };
    const b = pts[i] as { x: number; y: number };
    cum.push((cum[i - 1] as number) + Math.hypot(b.x - a.x, b.y - a.y));
  }
  const total = cum[cum.length - 1] as number;
  const offset = ((progress * FLOW_MS) / 1000) * FLOW_SPEED;
  const start = offset % FLOW_SPACING;
  let out = "";
  for (let s = start; s <= total; s += FLOW_SPACING) {
    const p = pointAt(pts, cum, s);
    out += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="5" fill="${color}" fill-opacity="0.9"/>`;
    if (both) {
      const q = pointAt(pts, cum, total - s);
      out += `<circle cx="${q.x.toFixed(1)}" cy="${q.y.toFixed(1)}" r="5" fill="${color}" fill-opacity="0.9"/>`;
    }
  }
  return out;
}

function cardMarkup(x: number, y: number, color: string, data: Record<string, unknown>): string {
  const lines = Object.entries(data).map(([k, v]) => {
    const text = typeof v === "string" ? v : JSON.stringify(v);
    const line = `${k}: ${text}`;
    return line.length > 44 ? line.slice(0, 43) + "..." : line;
  });
  if (lines.length === 0) return "";
  const w = Math.max(...lines.map((l) => l.length)) * 7.4 + 18;
  const h = lines.length * 18 + 12;
  let cx = x + 16;
  let cy = y - h - 12;
  if (cx + w > vb.width - 4) cx = x - w - 16;
  cx = Math.max(4, Math.min(cx, vb.width - w - 4));
  cy = Math.max(4, Math.min(cy, vb.height - h - 4));
  const text = lines
    .map((l, i) => `<text class="card-tx" x="${(cx + 9).toFixed(1)}" y="${(cy + 22 + i * 18).toFixed(1)}">${esc(l)}</text>`)
    .join("");
  return (
    `<rect class="card-bg" x="${cx.toFixed(1)}" y="${cy.toFixed(1)}" width="${w.toFixed(1)}" height="${h}" rx="8" stroke="${color}"/>` +
    text
  );
}

function drawOverlay(f: Frame): void {
  let out = "";
  for (const p of f.pulses) {
    const pos = nodePos.get(p.node);
    if (!pos) continue;
    const k = Math.min(1, p.ageMs / PULSE_MS);
    out += `<circle cx="${pos.x}" cy="${pos.y}" r="${(48 + 40 * k).toFixed(1)}" fill="none" stroke="${p.color}" stroke-width="4" stroke-opacity="${(1 - k).toFixed(2)}"/>`;
  }
  for (const fl of f.flows) out += flowDots(fl.path, fl.color, fl.both, fl.progress);
  for (const p of f.packets) {
    out += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="9" fill="${p.color}" stroke="#fff" stroke-width="2"/>`;
  }
  if (f.card) out += cardMarkup(f.card.x, f.card.y, f.card.color, f.card.data);
  overlay.innerHTML = out;
}

// ---------------------------------------------------------------- caption

const capEl = {
  chapter: $<HTMLElement>("cap-chapter"),
  chapterDesc: $<HTMLElement>("cap-chapter-desc"),
  step: $<HTMLElement>("cap-step"),
  stepDesc: $<HTMLElement>("cap-step-desc"),
  note: $<HTMLElement>("cap-note"),
};
let lastCaption = "";
function drawCaption(c: Caption): void {
  const key = JSON.stringify(c);
  if (key === lastCaption) return;
  lastCaption = key;
  capEl.chapter.textContent = c.chapterTitle;
  capEl.chapterDesc.textContent = c.chapterDesc;
  capEl.step.textContent = c.stepLabel;
  capEl.stepDesc.textContent = c.stepDesc;
  capEl.note.textContent = c.note;
}

// ---------------------------------------------------------------- legend

const legend = $<HTMLElement>("legend");
for (const t of tl.tracks) {
  const li = document.createElement("li");
  const dot = document.createElement("span");
  dot.className = "dot";
  dot.style.background = t.color;
  li.append(dot, document.createTextNode(t.label));
  legend.appendChild(li);
}

// ---------------------------------------------------------------- bar

const bar = $<HTMLElement>("bar");
const marks = timelineMarks(tl);
const playhead = document.createElement("div");
playhead.className = "playhead";
for (const c of marks.chapters) {
  const seg = document.createElement("div");
  seg.className = "seg";
  seg.style.left = `${c.startPct}%`;
  seg.style.width = `${Math.max(0, c.endPct - c.startPct)}%`;
  seg.title = c.title;
  bar.appendChild(seg);
}
for (const d of marks.dots) {
  const dot = document.createElement("div");
  dot.className = "mark";
  dot.style.left = `${d.pct}%`;
  dot.style.background = d.color;
  bar.appendChild(dot);
}
bar.appendChild(playhead);
bar.setAttribute("aria-valuemin", "0");
bar.setAttribute("aria-valuemax", String(Math.round(tl.totalMs)));

// ---------------------------------------------------------------- clock

// Normal mode: the clock is scene time in ms. Reduced motion: the clock is step index * DWELL_MS.
function realFromClock(c: number): number {
  if (!reduced) return c;
  const i = Math.min(nSteps - 1, Math.floor(c / DWELL_MS));
  return (tl.steps[i] as StepTL | undefined)?.startMs ?? 0;
}
function clockFromReal(t: number): number {
  if (!reduced) return clampTime(tl, t);
  if (nSteps === 0) return 0;
  if (t >= tl.totalMs) return clockTotal;
  let v = 0;
  for (const s of tl.steps) if (s.startMs <= t + 0.5 && s.startMs > v) v = s.startMs;
  return Math.max(0, tl.steps.findIndex((s) => s.startMs === v)) * DWELL_MS;
}
const pausePoints: number[] = reduced
  ? tl.steps.flatMap((s, i) => (s.pause ? [(i + 1) * DWELL_MS - 1] : []))
  : tl.steps.filter((s) => s.pause).map((s) => s.endMs);

function reducedFrame(c: number): Frame {
  const i = Math.max(0, Math.min(nSteps - 1, Math.floor(c / DWELL_MS)));
  const s = tl.steps[i];
  const chapter = tl.chapters[s ? s.chapter : 0];
  const last = s?.hops[s.hops.length - 1];
  return {
    chapter: s ? s.chapter : 0,
    stepId: s ? s.id : null,
    caption: {
      chapterTitle: chapter?.title ?? "",
      chapterDesc: chapter?.desc ?? "",
      stepLabel: s?.label ?? "",
      stepDesc: s?.desc ?? "",
      note: last?.note ?? "",
    },
    packets: [],
    flows: [],
    card: s && last ? { stepId: s.id, x: last.x2, y: last.y2, color: s.color, data: last.data } : null,
    pulses: s && last ? [{ node: last.to, color: s.color, ageMs: 0 }] : [],
  };
}

const timer = createTimer({
  duration: clockTotal,
  autoplay: false,
  onUpdate: () => tick(),
  onComplete: () => {
    timer.pause();
    syncButtons();
  },
});

let lastClock = 0;
let ticking = false;

function render(c: number): void {
  const f = reduced ? reducedFrame(c) : frameAt(tl, c);
  drawOverlay(f);
  drawCaption(f.caption);
  const real = realFromClock(c);
  const pct = tl.totalMs > 0 ? (real / tl.totalMs) * 100 : 0;
  playhead.style.left = `${pct}%`;
  bar.setAttribute("aria-valuenow", String(Math.round(real)));
  bar.setAttribute("aria-valuetext", [f.caption.chapterTitle, f.caption.stepLabel].filter(Boolean).join(": "));
}

function tick(): void {
  if (ticking) return;
  ticking = true;
  let c = timer.currentTime;
  if (!timer.paused) {
    for (const p of pausePoints) {
      if (lastClock < p && p <= c) {
        timer.pause();
        timer.seek(p);
        c = p;
        break;
      }
    }
  }
  lastClock = c;
  render(c);
  syncButtons();
  ticking = false;
}

function seekClock(c: number): void {
  const t = Math.max(0, Math.min(clockTotal, c));
  lastClock = t;
  timer.seek(t);
  render(t);
  syncButtons();
}

function togglePlay(): void {
  if (!timer.paused) {
    timer.pause();
  } else {
    if (timer.currentTime >= clockTotal - 1) seekClock(0);
    timer.play();
  }
  syncButtons();
}

function jump(kind: Jump, dir: 1 | -1): void {
  const real = realFromClock(timer.currentTime);
  const k: Jump = reduced && kind === "hop" ? "message" : kind;
  const target = dir === 1 ? nextTime(tl, real, k) : prevTime(tl, real, k);
  seekClock(clockFromReal(target));
}

function act(a: Action): void {
  switch (a) {
    case "toggle": return togglePlay();
    case "nextHop": return jump("hop", 1);
    case "prevHop": return jump("hop", -1);
    case "nextMessage": return jump("message", 1);
    case "prevMessage": return jump("message", -1);
    case "nextChapter": return jump("chapter", 1);
    case "prevChapter": return jump("chapter", -1);
    case "faster": return setSpeed(stepSpeed(speed, 1));
    case "slower": return setSpeed(stepSpeed(speed, -1));
    case "restart": return seekClock(0);
  }
}

// ---------------------------------------------------------------- controls

let speed = 1;
const playBtn = $<HTMLButtonElement>("btn-play");
const speedBtns = [...document.querySelectorAll<HTMLButtonElement>("[data-speed]")];

function setSpeed(s: number): void {
  speed = s;
  timer.speed = s;
  syncButtons();
}

function syncButtons(): void {
  const playing = !timer.paused;
  playBtn.textContent = playing ? "Pause" : "Play";
  playBtn.setAttribute("aria-label", playing ? "Pause" : "Play");
  for (const b of speedBtns) b.setAttribute("aria-pressed", String(Number(b.dataset.speed) === speed));
}

const buttonActions: Record<string, Action> = {
  "btn-play": "toggle",
  "btn-restart": "restart",
  "btn-prev-chapter": "prevChapter",
  "btn-prev-message": "prevMessage",
  "btn-prev-hop": "prevHop",
  "btn-next-hop": "nextHop",
  "btn-next-message": "nextMessage",
  "btn-next-chapter": "nextChapter",
};
for (const [id, action] of Object.entries(buttonActions)) {
  $<HTMLButtonElement>(id).addEventListener("click", () => act(action));
}
for (const b of speedBtns) {
  b.addEventListener("click", () => {
    const s = Number(b.dataset.speed);
    if (SPEEDS.includes(s)) setSpeed(s);
  });
}

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const target = e.target as HTMLElement | null;
  if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
  // A focused button already reacts to Space and Enter itself.
  if (e.key === " " && target && target.tagName === "BUTTON") return;
  const a = keyAction(e.key);
  if (!a) return;
  e.preventDefault();
  act(a);
});

// Scrubbing: click to jump (a click near a dot jumps to that step), drag to scrub.
let dragging = false;
function scrubTo(clientX: number, snap: boolean): void {
  const r = bar.getBoundingClientRect();
  if (r.width <= 0) return;
  const frac = (clientX - r.left) / r.width;
  let real = timeFromFraction(tl, frac);
  if (snap) {
    let best = Infinity;
    for (const d of marks.dots) {
      const dist = Math.abs((d.pct / 100) * r.width - (clientX - r.left));
      if (dist < 10 && dist < best) {
        best = dist;
        real = (tl.steps.find((s) => s.id === d.stepId) as StepTL).startMs;
      }
    }
  }
  seekClock(clockFromReal(real));
}
bar.addEventListener("pointerdown", (e) => {
  dragging = true;
  bar.setPointerCapture(e.pointerId);
  scrubTo(e.clientX, true);
});
bar.addEventListener("pointermove", (e) => {
  if (dragging) scrubTo(e.clientX, false);
});
const endDrag = () => {
  dragging = false;
};
bar.addEventListener("pointerup", endDrag);
bar.addEventListener("pointercancel", endDrag);

// ---------------------------------------------------------------- start

render(0);
syncButtons();
