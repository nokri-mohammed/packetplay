// Runs in the browser (bundled into the page by src/page.ts). Reads the timeline JSON and the
// inlined SVG, and drives them with an anime.js v4 timer as the clock.
import { createTimer } from "animejs";
import {
  SPEEDS,
  balloonRect,
  PULSE_MS,
  clampTime,
  frameAt,
  packetRows,
  packetTitle,
  keyAction,
  nextTime,
  prevTime,
  revealOpacity,
  routeHighlight,
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
const svg = document.querySelector("#stage svg") as SVGSVGElement;
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const nSteps = tl.steps.length;
const clockTotal = Math.max(1, reduced ? nSteps * DWELL_MS : tl.totalMs);

const esc = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// ---------------------------------------------------------------- view (zoom and pan)

const TILE_W = 141.5;
const TILE_H = 81.9;
const MIN_ZOOM = 0.2;
const MAX_ZOOM = 1.6;

const stage = $<HTMLElement>("stage");
const grid = document.getElementById("grid");
const zoomLabel = $<HTMLElement>("zoom-label");
const num = (name: string): number => Number(stage.dataset[name] ?? 0);
const W = num("w");
const H = num("h");
const ORIGIN = { x: num("ox"), y: num("oy") };

// Canvas point (X, Y) is at stage pixel (tx + zoom * X, ty + zoom * Y). The SVG viewBox is set to
// the stage size in pixels, so user units are CSS pixels and nothing else rescales the scene.
let zoom = 1;
let tx = 0;
let ty = 0;
let sw = 0;
let sh = 0;
const clampZoom = (z: number): number => Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, z));

function applyView(): void {
  scene.setAttribute("transform", `translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${zoom.toFixed(4)})`);
  zoomLabel.textContent = `${Math.round(zoom * 100)}%`;
  if (grid) {
    grid.style.backgroundSize = `${TILE_W * zoom}px ${TILE_H * zoom}px`;
    // Tile (0,0) centre stays under the scene origin.
    grid.style.backgroundPosition = `${tx + ORIGIN.x * zoom - (TILE_W * zoom) / 2}px ${ty + ORIGIN.y * zoom - (TILE_H * zoom) / 2}px`;
  }
}

function measure(): boolean {
  const r = stage.getBoundingClientRect();
  if (r.width <= 0 || r.height <= 0) return false;
  sw = r.width;
  sh = r.height;
  svg.setAttribute("viewBox", `0 0 ${sw} ${sh}`);
  return true;
}

function fit(): void {
  if (!measure()) return;
  zoom = clampZoom(Math.min(sw / W, sh / H) * 0.92);
  tx = (sw - W * zoom) / 2;
  ty = (sh - H * zoom) / 2;
  applyView();
}

function zoomBy(px: number, py: number, factor: number): void {
  const nz = clampZoom(zoom * factor);
  const wx = (px - tx) / zoom;
  const wy = (py - ty) / zoom;
  tx = px - wx * nz;
  ty = py - wy * nz;
  zoom = nz;
}

// ---------------------------------------------------------------- overlay

const SVGNS = "http://www.w3.org/2000/svg";
const scene = svg.querySelector("g.scene") as SVGGElement;
const overlay = document.createElementNS(SVGNS, "g");
overlay.setAttribute("pointer-events", "none");
scene.appendChild(overlay);
// The dotted routes sit above the static links and below the nodes and packets.
const routeLayer = document.createElementNS(SVGNS, "g");
routeLayer.setAttribute("pointer-events", "none");
scene.insertBefore(routeLayer, svg.querySelector("g.nodes"));

// Node centres come from the rendered SVG (the timeline only knows lane coordinates).
const nodePos = new Map<string, { x: number; y: number }>();
for (const g of svg.querySelectorAll("g[data-node]")) {
  const m = /translate\(([-\d.]+),([-\d.]+)\)/.exec(g.getAttribute("transform") ?? "");
  const id = g.getAttribute("data-node");
  if (m && id) nodePos.set(id, { x: Number(m[1]), y: Number(m[2]) });
}
const stepById = new Map<string, StepTL>(tl.steps.map((s) => [s.id, s]));

type Seg = { x1: number; y1: number; x2: number; y2: number };

function pointOnSegs(segs: Seg[], cum: number[], s: number) {
  for (let i = 0; i < segs.length; i++) {
    const end = cum[i + 1] as number;
    if (s <= end) {
      const start = cum[i] as number;
      const f = end === start ? 0 : (s - start) / (end - start);
      const g = segs[i] as Seg;
      return { x: g.x1 + (g.x2 - g.x1) * f, y: g.y1 + (g.y2 - g.y1) * f };
    }
  }
  const g = segs[segs.length - 1] as Seg;
  return { x: g.x2, y: g.y2 };
}

function cumulative(segs: Seg[]): number[] {
  const cum = [0];
  for (const g of segs) cum.push((cum[cum.length - 1] as number) + Math.hypot(g.x2 - g.x1, g.y2 - g.y1));
  return cum;
}

// Flow tokens (tiny packets) ride the lanes: the forward lanes of every hop, and with `both` the back lanes in
// reverse hop order.
function flowDots(stepId: string, color: string, both: boolean, progress: number): string {
  const step = stepById.get(stepId);
  if (!step || step.hops.length === 0) return "";
  const fwd: Seg[] = step.hops.map((h) => ({ x1: h.x1, y1: h.y1, x2: h.x2, y2: h.y2 }));
  const back: Seg[] = [...step.hops].reverse().map((h) => ({ x1: h.back.x1, y1: h.back.y1, x2: h.back.x2, y2: h.back.y2 }));
  const cf = cumulative(fwd);
  const cb = cumulative(back);
  const total = cf[cf.length - 1] as number;
  const offset = ((progress * FLOW_MS) / 1000) * FLOW_SPEED;
  const start = offset % FLOW_SPACING;
  const dot = (p: { x: number; y: number }) =>
    `<rect x="${(p.x - 7).toFixed(1)}" y="${(p.y - 4.5).toFixed(1)}" width="14" height="9" rx="2" fill="${color}" fill-opacity="0.9"/>`;
  let out = "";
  for (let d = start; d <= total; d += FLOW_SPACING) {
    out += dot(pointOnSegs(fwd, cf, d));
    if (both) out += dot(pointOnSegs(back, cb, d));
  }
  return out;
}

const PK_FONT = 12; // world px
const PK_CHAR = 7.3; // monospace glyph width at PK_FONT
const PK_HEAD = 20;
const PK_ROW = 16;

/** White or near-black, whichever reads better on the track colour. */
function onColor(hex: string): string {
  const h = hex.length === 4 ? "#" + [...hex.slice(1)].map((c) => c + c).join("") : hex;
  const n = parseInt(h.slice(1), 16);
  const lum = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return lum > 0.6 ? "#0f172a" : "#ffffff";
}

// A packet is a dot on its lane point plus a balloon: an info box floating above the dot (below for a
// reply packet) on a thin tether. The box has a header strip with the step label in the track colour,
// and below it one row per piece of data it carries.
function packetMarkup(
  x: number,
  y: number,
  color: string,
  label: string,
  data: Record<string, unknown>,
  direction: 1 | -1,
): string {
  const title = packetTitle(label);
  const rows = packetRows(data);
  const longest = Math.max(title.length, ...rows.map((r) => r.length), 8);
  const w = Math.round(longest * PK_CHAR + 16);
  const h = PK_HEAD + (rows.length > 0 ? rows.length * PK_ROW + 8 : 0);
  const box = balloonRect(x, y, w, h, direction);
  const x0 = box.x.toFixed(1);
  const y0 = box.y.toFixed(1);
  const id = `pk${nextClip++}`;
  let out = `<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${x.toFixed(1)}" y2="${box.tetherY.toFixed(1)}" stroke="${color}" stroke-opacity="0.5" stroke-width="1.5"/>`;
  out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="${color}"/>`;
  out += `<clipPath id="${id}"><rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="6"/></clipPath>`;
  out += `<rect class="pk-bg" x="${x0}" y="${y0}" width="${w}" height="${h}" rx="6" stroke="${color}"/>`;
  out += `<g clip-path="url(#${id})"><rect x="${x0}" y="${y0}" width="${w}" height="${PK_HEAD}" fill="${color}"/></g>`;
  out += `<text class="pk-tx" font-size="${PK_FONT}" font-weight="700" fill="${onColor(color)}" x="${(box.x + 8).toFixed(1)}" y="${(box.y + 14).toFixed(1)}">${esc(title)}</text>`;
  rows.forEach((r, i) => {
    out += `<text class="pk-tx pk-row" font-size="${PK_FONT}" x="${(box.x + 8).toFixed(1)}" y="${(box.y + PK_HEAD + 6 + PK_ROW * (i + 0.75)).toFixed(1)}">${esc(r)}</text>`;
  });
  return out;
}
let nextClip = 0;

const ROUTE_OPACITY = 0.85;

// Dotted route of every active packet-mode or flow step, on the same lanes the packets travel. Each lane
// is drawn in its own travel direction, so one negative dash offset moves the dashes along it.
function drawRoutes(t: number, reducedStep: StepTL | null): void {
  let out = "";
  const steps = reducedStep ? [reducedStep] : tl.steps;
  for (const s of steps) {
    const r = reducedStep ? { hops: s.hops, opacity: 1, offset: 0 } : routeHighlight(t, s);
    if (!r || r.opacity <= 0) continue;
    const attrs = `fill="none" stroke="${s.color}" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 9" stroke-dashoffset="${r.offset.toFixed(1)}" stroke-opacity="${(ROUTE_OPACITY * r.opacity).toFixed(3)}"`;
    for (const h of r.hops) {
      out += `<line x1="${h.x1.toFixed(1)}" y1="${h.y1.toFixed(1)}" x2="${h.x2.toFixed(1)}" y2="${h.y2.toFixed(1)}" ${attrs}/>`;
      if (s.both) out += `<line x1="${h.back.x1.toFixed(1)}" y1="${h.back.y1.toFixed(1)}" x2="${h.back.x2.toFixed(1)}" y2="${h.back.y2.toFixed(1)}" ${attrs}/>`;
    }
  }
  routeLayer.innerHTML = out;
}

// Hidden nodes: the node group and every lane touching it share one opacity, from the reveal time.
const hiddenIds = new Set(tl.hidden ?? []);
const revealAt = new Map<string, { atMs: number; stepId: string }>(
  (tl.reveals ?? []).map((r) => [r.node, { atMs: r.atMs, stepId: r.stepId }]),
);
const hiddenEls = new Map<string, Element[]>();
for (const id of hiddenIds) {
  const els: Element[] = [];
  for (const el of svg.querySelectorAll("[data-node],[data-link]")) {
    if (el.getAttribute("data-node") === id) els.push(el);
    const link = el.getAttribute("data-link");
    if (link !== null && link.split("--").includes(id)) els.push(el);
  }
  hiddenEls.set(id, els);
}
// Opacity of a lane or node that touches several hidden nodes is the smallest of them.
function drawHidden(opacityOf: (id: string) => number): void {
  const per = new Map<Element, number>();
  for (const [id, els] of hiddenEls) {
    const o = opacityOf(id);
    for (const el of els) per.set(el, Math.min(per.get(el) ?? 1, o));
  }
  for (const [el, o] of per) el.setAttribute("opacity", o.toFixed(3));
}

function drawOverlay(f: Frame): void {
  let out = "";
  for (const p of f.pulses) {
    const pos = nodePos.get(p.node);
    if (!pos) continue;
    const k = Math.min(1, p.ageMs / PULSE_MS);
    out += `<circle cx="${pos.x}" cy="${pos.y}" r="${(48 + 40 * k).toFixed(1)}" fill="none" stroke="${p.color}" stroke-width="4" stroke-opacity="${(1 - k).toFixed(2)}"/>`;
  }
  for (const fl of f.flows) out += flowDots(fl.stepId, fl.color, fl.both, fl.progress);
  for (const p of f.packets) {
    out += packetMarkup(p.x, p.y, p.color, p.label, p.data, p.direction);
  }
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
    packets:
      s && last
        ? [{ stepId: s.id, x: last.x2, y: last.y2, color: s.color, direction: 1, label: s.label, data: last.data }]
        : [],
    flows: [],
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
  if (reduced) {
    const i = Math.max(0, Math.min(nSteps - 1, Math.floor(c / DWELL_MS)));
    drawRoutes(0, tl.steps[i] ?? null);
    // Shown from the step that reveals it, no fade.
    drawHidden((id) => {
      const r = revealAt.get(id);
      const rs = r ? stepById.get(r.stepId) : undefined;
      return rs && tl.steps.indexOf(rs) <= i ? 1 : 0;
    });
  } else {
    drawRoutes(c, null);
    drawHidden((id) => {
      const r = revealAt.get(id);
      return r ? revealOpacity(c, r.atMs) : 0;
    });
  }
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

// ---------------------------------------------------------------- stage: wheel, drag, pinch

const rel = (e: PointerEvent | WheelEvent) => {
  const r = stage.getBoundingClientRect();
  return { x: e.clientX - r.left, y: e.clientY - r.top };
};

stage.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    const p = rel(e);
    zoomBy(p.x, p.y, e.deltaY < 0 ? 1.1 : 1 / 1.1);
    applyView();
  },
  { passive: false },
);

const pointers = new Map<number, { x: number; y: number }>();
stage.addEventListener("pointerdown", (e) => {
  if ((e.target as Element).closest(".zoombar")) return;
  pointers.set(e.pointerId, rel(e));
  stage.setPointerCapture(e.pointerId);
  stage.classList.add("drag");
});
stage.addEventListener("pointermove", (e) => {
  const prev = pointers.get(e.pointerId);
  if (!prev) return;
  const before = [...pointers.values()];
  const cur = rel(e);
  pointers.set(e.pointerId, cur);
  if (pointers.size === 1) {
    tx += cur.x - prev.x;
    ty += cur.y - prev.y;
  } else if (pointers.size === 2) {
    const after = [...pointers.values()];
    const [a0, b0] = before as [{ x: number; y: number }, { x: number; y: number }];
    const [a1, b1] = after as [{ x: number; y: number }, { x: number; y: number }];
    const d0 = Math.hypot(b0.x - a0.x, b0.y - a0.y);
    const d1 = Math.hypot(b1.x - a1.x, b1.y - a1.y);
    const m0 = { x: (a0.x + b0.x) / 2, y: (a0.y + b0.y) / 2 };
    const m1 = { x: (a1.x + b1.x) / 2, y: (a1.y + b1.y) / 2 };
    if (d0 > 0) zoomBy(m0.x, m0.y, d1 / d0);
    tx += m1.x - m0.x;
    ty += m1.y - m0.y;
  }
  applyView();
});
const endPointer = (e: PointerEvent) => {
  pointers.delete(e.pointerId);
  if (pointers.size === 0) stage.classList.remove("drag");
};
stage.addEventListener("pointerup", endPointer);
stage.addEventListener("pointercancel", endPointer);

$<HTMLButtonElement>("zoom-in").addEventListener("click", () => {
  zoomBy(sw / 2, sh / 2, 1.25);
  applyView();
});
$<HTMLButtonElement>("zoom-out").addEventListener("click", () => {
  zoomBy(sw / 2, sh / 2, 0.8);
  applyView();
});
$<HTMLButtonElement>("zoom-fit").addEventListener("click", fit);
new ResizeObserver(() => {
  if (measure()) applyView();
}).observe(stage);

// ---------------------------------------------------------------- start

fit();
render(0);
syncButtons();
