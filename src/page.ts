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

const CSS = `
:root{--grid-img:url("${gridUri("black")}")}
@media (prefers-color-scheme: dark){:root{--grid-img:url("${gridUri("white")}")}}
:root{--bg:#f8fafc;--fg:#0f172a;--muted:#475569;--panel:#ffffff;--line:#cbd5e1;--accent:#2563eb;--card-bg:#ffffff}
@media (prefers-color-scheme: dark){:root{--bg:#0b1120;--fg:#e2e8f0;--muted:#94a3b8;--panel:#111a2e;--line:#334155;--accent:#60a5fa;--card-bg:#111a2e}}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif}
main{max-width:1100px;margin:0 auto;padding:16px}
h1{font-size:1.4rem;margin:0 0 12px}
.stage{position:relative;height:min(70vh,640px);min-height:320px;overflow:hidden;background:var(--panel);border:1px solid var(--line);border-radius:12px;color:var(--fg);touch-action:none;cursor:grab;user-select:none}
.stage.drag{cursor:grabbing}
.stage .grid{position:absolute;inset:0;pointer-events:none;background-repeat:repeat;background-image:var(--grid-img)}
.stage svg{position:absolute;inset:0;display:block;width:100%;height:100%}
.zoombar{position:absolute;left:10px;top:10px;display:flex;gap:6px;align-items:center;padding:4px;background:var(--panel);border:1px solid var(--line);border-radius:10px;cursor:default}
.zoombar button{min-height:36px;min-width:36px;padding:0 10px}
#zoom-label{min-width:3.2em;text-align:center;font-size:.9rem;color:var(--muted)}
.card-bg{fill:var(--card-bg);stroke-width:2}
.card-tx{fill:var(--fg);font:13px ui-monospace,SFMono-Regular,Menlo,monospace}
.caption{margin:12px 0;padding:12px 16px;background:var(--panel);border:1px solid var(--line);border-radius:12px;min-height:7.5em}
.caption h2{font-size:1rem;margin:0;color:var(--muted);font-weight:600}
.caption .step{font-size:1.15rem;font-weight:700;margin:4px 0 0}
.caption p{margin:4px 0 0}
.caption .note{color:var(--accent)}
.legend{list-style:none;display:flex;flex-wrap:wrap;gap:4px 16px;margin:0 0 12px;padding:0;color:var(--muted);font-size:.9rem}
.legend .dot{display:inline-block;width:12px;height:12px;border-radius:50%;margin-right:6px;vertical-align:-1px}
.bar{position:relative;height:32px;margin:0 0 12px;background:var(--panel);border:1px solid var(--line);border-radius:8px;cursor:pointer;touch-action:none;user-select:none}
.bar .seg{position:absolute;top:0;bottom:0;border-right:2px solid var(--line);background:color-mix(in srgb,var(--accent) 10%,transparent)}
.bar .mark{position:absolute;top:50%;width:10px;height:10px;margin:-5px 0 0 -5px;border-radius:50%;border:2px solid var(--panel)}
.bar .playhead{position:absolute;top:-3px;bottom:-3px;width:3px;margin-left:-1.5px;background:var(--fg);border-radius:2px}
.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.controls .group{display:flex;flex-wrap:wrap;gap:8px}
button{font:inherit;min-height:44px;padding:0 14px;color:var(--fg);background:var(--panel);border:1px solid var(--line);border-radius:8px;cursor:pointer}
button:hover{border-color:var(--accent)}
button[aria-pressed="true"]{background:var(--accent);border-color:var(--accent);color:#fff}
#btn-play{min-width:84px;font-weight:700}
:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
.hint{margin:12px 0 0;color:var(--muted);font-size:.85rem}
@media (max-width:520px){button{padding:0 10px}}
`;

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
<div class="bar" id="bar" role="slider" tabindex="0" aria-label="Timeline"></div>
<div class="controls" role="group" aria-label="Playback controls">
<button type="button" id="btn-play">Play</button>
<button type="button" id="btn-restart" aria-label="Restart">Restart</button>
<span class="group">
<button type="button" id="btn-prev-chapter" aria-label="Previous chapter">&lt; Chapter</button>
<button type="button" id="btn-prev-message" aria-label="Previous message">&lt; Message</button>
<button type="button" id="btn-prev-hop" aria-label="Previous hop">&lt; Hop</button>
<button type="button" id="btn-next-hop" aria-label="Next hop">Hop &gt;</button>
<button type="button" id="btn-next-message" aria-label="Next message">Message &gt;</button>
<button type="button" id="btn-next-chapter" aria-label="Next chapter">Chapter &gt;</button>
</span>
<span class="group" role="group" aria-label="Speed">${speeds}</span>
</div>
<p class="hint">Keys: Space play or pause, Left and Right hop, N and P message, [ and ] chapter, + and - speed, Home restart. Mouse wheel zooms, drag pans, two fingers pinch.</p>
</main>
<script type="application/json" id="timeline-data">${json}</script>
<script>${bundle}</script>
</body>
</html>
`;
}
