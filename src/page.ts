import { HALF_H, HALF_W, TILE_H, TILE_W, layoutScene } from "./layout.ts";
import { compileTimeline } from "./timeline.ts";
import { renderSvg } from "./render.ts";
import type { Scene } from "./types.generated.ts";

const escHtml = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Isometric tile: a diamond outline. Only < > are escaped so the namespace stays readable.
const gridUri = (color: string): string => {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${TILE_W}' height='${TILE_H}' viewBox='0 0 ${TILE_W} ${TILE_H}'>` +
    `<polygon points='${HALF_W},0 ${TILE_W},${HALF_H} ${HALF_W},${TILE_H} 0,${HALF_H}' fill='none' stroke='${color}' stroke-opacity='0.15' stroke-width='1'/></svg>`;
  return "data:image/svg+xml," + svg.replace(/</g, "%3C").replace(/>/g, "%3E");
};

// Styling inspired by Plush UI (MIT), ported to plain CSS.
const CSS = `
:root{--grid-img:url("${gridUri("black")}")}
@media (prefers-color-scheme: dark){:root{--grid-img:url("${gridUri("white")}")}}
:root{--bg:#f6f6f4;--fg:#141414;--muted:#6e6e72;--panel:#ffffff;--line:#e4e4e1;--accent:#161616;--on-accent:#ffffff;--fill:#f0f0ee;--fill-strong:#e8e8e5;--note:#2563eb;--focus:#161616;--shadow:0 1px 2px rgba(20,20,20,.04),0 8px 24px rgba(20,20,20,.04);--knob:0 1px 3px rgba(20,20,20,.16),0 2px 8px rgba(20,20,20,.06);--card-bg:#ffffff;--r-card:20px;--r-row:16px;--r-full:999px;--t:160ms}
@media (prefers-color-scheme: dark){:root{--bg:#0e0e10;--fg:#f2f2f0;--muted:#a0a0a6;--panel:#1a1a1d;--line:#2c2c30;--accent:#f2f2f0;--on-accent:#141414;--fill:#242427;--fill-strong:#2e2e32;--note:#60a5fa;--focus:#f2f2f0;--shadow:0 1px 2px rgba(0,0,0,.3),0 8px 24px rgba(0,0,0,.25);--knob:0 1px 3px rgba(0,0,0,.5),0 2px 8px rgba(0,0,0,.3);--card-bg:#1a1a1d}}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--fg);font:500 16px/1.45 ui-rounded,"SF Pro Rounded",system-ui,-apple-system,"Segoe UI",sans-serif}
main{max-width:1100px;margin:0 auto;padding:10px 12px}
h1{font-size:1.25rem;font-weight:600;margin:0 0 8px}
.stage{position:relative;height:min(70vh,640px);min-height:320px;overflow:hidden;background:var(--panel);border:1px solid var(--line);border-radius:var(--r-card);box-shadow:var(--shadow);color:var(--fg);touch-action:none;cursor:grab;user-select:none}
.stage.drag{cursor:grabbing}
.stage .grid{position:absolute;inset:0;pointer-events:none;background-repeat:repeat;background-image:var(--grid-img)}
.stage svg{position:absolute;inset:0;display:block;width:100%;height:100%}
.zoombar{position:absolute;left:10px;top:10px;display:flex;gap:2px;align-items:center;padding:2px;background:var(--panel);border-radius:var(--r-full);box-shadow:var(--knob);cursor:default}
.zoombar button{min-height:32px;min-width:32px;padding:0 10px;background:transparent;border-radius:var(--r-full);font-size:.85rem}
.zoombar button:hover{background:var(--fill)}
#zoom-label{min-width:3.2em;text-align:center;font-size:.8rem;color:var(--muted)}
.pk-bg{fill:var(--card-bg);stroke-width:1.5}
.pk-tx{font-family:ui-monospace,SFMono-Regular,Menlo,monospace}.pk-row{fill:var(--fg)}
.caption{margin:8px 0;padding:8px 14px;background:var(--panel);border:1px solid var(--line);border-radius:var(--r-card);box-shadow:var(--shadow);min-height:7em}
.caption h2{font-size:.85rem;margin:0;color:var(--muted);font-weight:600}
.caption .step{font-size:1.05rem;font-weight:600;margin:2px 0 0}
.caption p{margin:2px 0 0;font-size:.95rem;line-height:1.4}
.caption .note{color:var(--note)}
.legend{list-style:none;display:flex;flex-wrap:wrap;gap:2px 12px;margin:0 0 8px;padding:0;color:var(--muted);font-size:.82rem}
.legend .dot{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:5px;vertical-align:-1px}
.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:8px;background:var(--panel);border:1px solid var(--line);border-radius:var(--r-card);box-shadow:var(--shadow)}
.bar{position:relative;flex:1 1 200px;order:3;height:28px;min-width:0;background:var(--fill);border-radius:var(--r-full);cursor:pointer;touch-action:none;user-select:none}
.bar .seg{position:absolute;top:0;bottom:0;border-right:2px solid var(--panel);background:color-mix(in srgb,var(--accent) 8%,transparent)}
.bar .mark{position:absolute;top:50%;width:10px;height:10px;margin:-5px 0 0 -5px;border-radius:50%;border:2px solid var(--panel)}
.bar .playhead{position:absolute;top:-3px;bottom:-3px;width:4px;margin-left:-2px;background:var(--accent);border-radius:var(--r-full);box-shadow:var(--knob)}
#btn-play{order:1}
#btn-restart{order:2}
.speeds{order:4;display:flex;gap:2px;padding:3px;background:var(--fill-strong);border-radius:var(--r-full)}
button{font:inherit;color:var(--fg);background:transparent;border:0;cursor:pointer;transition:transform var(--t) ease,background-color var(--t) ease,box-shadow var(--t) ease}
.icon{display:inline-flex;align-items:center;justify-content:center;border-radius:50%;padding:0}
.icon svg{width:18px;height:18px;display:block}
#btn-play{width:40px;height:40px;background:var(--accent);color:var(--on-accent);box-shadow:var(--knob)}
#btn-restart{width:40px;height:40px;background:var(--fill)}
#btn-restart:hover{background:var(--fill-strong)}
.icon:hover{transform:scale(1.06)}
.icon:active{transform:scale(.86)}
#btn-play .i-pause,#btn-play[data-state="playing"] .i-play{display:none}
#btn-play[data-state="playing"] .i-pause{display:block}
.speeds button{height:32px;min-width:44px;padding:0 12px;border-radius:var(--r-full);font-size:.85rem;color:var(--muted)}
.speeds button:hover{color:var(--fg)}
.speeds button:active{transform:scale(.95)}
.speeds button[aria-pressed="true"]{background:var(--accent);color:var(--on-accent);box-shadow:var(--knob)}
button:focus-visible{outline:2px solid var(--focus);outline-offset:2px}
.bar:focus-visible{outline:2px solid var(--focus);outline-offset:2px}
@media (max-width:640px){.bar{flex-basis:100%;order:5}.speeds{margin-left:auto}}
@media (prefers-reduced-motion: reduce){button{transition:none}.icon:hover,.icon:active,.speeds button:active{transform:none}}
`;

const ICON = (cls: string, d: string): string =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">${d}</svg>`;
const PLAY_ICON = ICON("i-play", '<path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/>');
const PAUSE_ICON = ICON("i-pause", '<rect x="6" y="5" width="4.2" height="14" rx="1.4"/><rect x="13.8" y="5" width="4.2" height="14" rx="1.4"/>');
const RESTART_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 12a8 8 0 1 0 2.6-5.9"/><path d="M4 4.5v4.6h4.6"/></svg>';
const KEYS_HINT =
  "Shortcuts: Space play or pause, Left and Right hop, N and P message, [ and ] chapter, + and - speed, Home restart";

/** Build one self-contained HTML page (inline CSS, SVG, timeline JSON and player bundle). */
export async function buildHtml(scene: Scene): Promise<string> {
  const layout = layoutScene(scene);
  const svg = renderSvg(scene, layout);
  const timeline = compileTimeline(scene, layout);

  const built = await Bun.build({
    entrypoints: [new URL("./player.ts", import.meta.url).pathname],
    target: "browser",
    minify: true,
  });
  if (!built.success || !built.outputs[0]) {
    throw new Error("Player bundle failed: " + built.logs.map((l) => l.message).join("; "));
  }
  const bundle = (await built.outputs[0].text()).replace(/<\/script/gi, "<\\/script");

  // Keep the JSON safe inside a script element: no literal "<" (covers "</script" and "<!--").
  const json = JSON.stringify(timeline).replace(/</g, "\\u003c");
  const title = escHtml(scene.title);

  const speeds = [0.5, 1, 1.5, 2]
    .map((s) => `<button type="button" data-speed="${s}" aria-pressed="${s === 1}" aria-label="Speed ${s} times">${s}x</button>`)
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>${title}</title>
<style>${CSS}</style>
</head>
<body>
<main>
<h1>${title}</h1>
<div class="stage" id="stage" data-w="${layout.width}" data-h="${layout.height}" data-ox="${layout.origin.x}" data-oy="${layout.origin.y}">
${scene.grid === "none" ? "" : '<div class="grid" id="grid"></div>'}
${svg}<div class="zoombar" role="group" aria-label="Zoom">
<button type="button" id="zoom-out" aria-label="Zoom out">-</button>
<span id="zoom-label" aria-live="off">100%</span>
<button type="button" id="zoom-in" aria-label="Zoom in">+</button>
<button type="button" id="zoom-fit">Fit</button>
</div>
</div>
<section class="caption" aria-live="polite" aria-label="Caption">
<h2 id="cap-chapter"></h2>
<p id="cap-chapter-desc"></p>
<p class="step" id="cap-step"></p>
<p id="cap-step-desc"></p>
<p class="note" id="cap-note"></p>
</section>
<ul class="legend" id="legend" aria-label="Legend"></ul>
<div class="controls" role="group" aria-label="Playback controls">
<button type="button" class="icon" id="btn-play" data-state="paused" aria-label="Play" aria-keyshortcuts="Space ArrowLeft ArrowRight N P [ ] + - Home" title="${KEYS_HINT}">${PLAY_ICON}${PAUSE_ICON}</button>
<button type="button" class="icon" id="btn-restart" aria-label="Restart" title="Restart (Home)">${RESTART_ICON}</button>
<div class="bar" id="bar" role="slider" tabindex="0" aria-label="Timeline"></div>
<span class="speeds" role="group" aria-label="Speed">${speeds}</span>
</div>
</main>
<script type="application/json" id="timeline-data">${json}</script>
<script>${bundle}</script>
</body>
</html>
`;
}
