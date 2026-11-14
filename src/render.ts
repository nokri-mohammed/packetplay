import { ICON_SIZE, type Layout } from "./layout.ts";
import { lane } from "./lanes.ts";
import { loadIcon, type Icon } from "./icons.ts";
import type { Scene } from "./types.generated.ts";

export interface RenderOptions {
  icons?: (name: string) => Icon;
}

const escapeXml = (s: string): string =>
  s
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const num = (n: number): string => String(Math.round(n * 100) / 100);

// M2 look: plain and neutral. Styling uses presentation attributes (no <style> element), with
// currentColor so the picture follows the page's light or dark text colour.
const FONT = 'font-family="system-ui, sans-serif"';

const ARROW =
  '<marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" markerUnits="userSpaceOnUse" orient="auto"><path d="M0,1 L10,5 L0,9 Z" fill="currentColor"/></marker>';

/** Turn a scene and its layout into one static SVG string. */
export function renderSvg(scene: Scene, layout: Layout, opts: RenderOptions = {}): string {
  const icons = opts.icons ?? loadIcon;
  const title = escapeXml(scene.title);
  const nodes = Object.entries(scene.nodes);
  const half = ICON_SIZE / 2;

  const used = [...new Set(nodes.map(([, n]) => n.icon as string))].sort();
  const symbols = used.map((name) => {
    const icon = icons(name);
    return `<symbol id="icon-${escapeXml(name)}" viewBox="${escapeXml(icon.viewBox)}">${icon.body}</symbol>`;
  });

  const groups = Object.entries(scene.groups ?? {}).map(([id, g]) => {
    const r = layout.groups[id];
    if (!r) throw new Error(`Layout has no region for group "${id}"`);
    const pts = r.points.map(([x, y]) => `${num(x)},${num(y)}`).join(" ");
    const top = r.points[0] as [number, number];
    return (
      `<polygon data-group="${escapeXml(id)}" points="${pts}" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-opacity="0.35" stroke-dasharray="6 4"/>` +
      `<text class="group-label" x="${num(top[0])}" y="${num(top[1] + 22)}" text-anchor="middle" ${FONT} font-size="14" fill="currentColor" fill-opacity="0.8">${escapeXml(g.label)}</text>`
    );
  });

  // Every link is two arrows, one per direction. Geometry comes from lane() only.
  const laneEl = (from: string, to: string): string => {
    const l = lane(layout, from, to);
    return `<line data-link="${escapeXml(l.id)}" x1="${num(l.ax1)}" y1="${num(l.ay1)}" x2="${num(l.ax2)}" y2="${num(l.ay2)}" stroke="currentColor" stroke-opacity="0.45" stroke-width="2" marker-end="url(#arrow)"/>`;
  };
  const links = (scene.links as [string, string][]).flatMap(([a, b]) => [laneEl(a, b), laneEl(b, a)]);

  const nodeEls = nodes.map(([id, n]) => {
    const p = layout.nodes[id];
    if (!p) throw new Error(`Layout has no position for node "${id}"`);
    const sub = n.sub
      ? `<text class="sub" y="${half + 38}" text-anchor="middle" ${FONT} font-size="12" fill="currentColor" fill-opacity="0.7">${escapeXml(n.sub)}</text>`
      : "";
    return (
      `<g data-node="${escapeXml(id)}" transform="translate(${num(p.x)},${num(p.y)})">` +
      `<use href="#icon-${escapeXml(n.icon as string)}" x="${-half}" y="${-half}" width="${ICON_SIZE}" height="${ICON_SIZE}"/>` +
      `<text class="label" y="${half + 20}" text-anchor="middle" ${FONT} font-size="15" fill="currentColor">${escapeXml(n.label)}</text>` +
      sub +
      `</g>`
    );
  });

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 ${num(layout.width)} ${num(layout.height)}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${title}">`,
    `<title>${title}</title>`,
    `<defs>${symbols.join("")}${ARROW}</defs>`,
    `<g class="scene">`,
    `<g class="groups">${groups.join("")}</g>`,
    `<g class="links">${links.join("")}</g>`,
    `<g class="nodes">${nodeEls.join("")}</g>`,
    `</g>`,
    `</svg>`,
    "",
  ].join("\n");
}
