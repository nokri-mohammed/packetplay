import { ICON_SIZE, type Layout } from "./layout.ts";
import { loadIcon, type Icon } from "./icons.ts";
import type { Scene } from "./types.generated.ts";

export interface RenderOptions {
  icons?: (name: string) => Icon;
}

const escapeXml = (s: string): string =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const num = (n: number): string => String(Math.round(n * 100) / 100);

// M2 look: plain and neutral. Styling uses presentation attributes (no <style> element), with
// currentColor so the picture follows the page's light or dark text colour.
const FONT = 'font-family="system-ui, sans-serif"';

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
    if (!r) throw new Error(`Layout has no rectangle for group "${id}"`);
    return (
      `<g data-group="${escapeXml(id)}">` +
      `<rect x="${num(r.x)}" y="${num(r.y)}" width="${num(r.width)}" height="${num(r.height)}" rx="12" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-opacity="0.35" stroke-dasharray="6 4"/>` +
      `<text class="group-label" x="${num(r.x + 12)}" y="${num(r.y + 20)}" ${FONT} font-size="14" fill="currentColor" fill-opacity="0.8">${escapeXml(g.label)}</text>` +
      `</g>`
    );
  });

  const links = (scene.links as [string, string][]).map(([a, b]) => {
    const pa = layout.nodes[a];
    const pb = layout.nodes[b];
    if (!pa || !pb) throw new Error(`Layout has no position for link "${a}--${b}"`);
    return `<line data-link="${escapeXml(a)}--${escapeXml(b)}" x1="${num(pa.x)}" y1="${num(pa.y)}" x2="${num(pb.x)}" y2="${num(pb.y)}" stroke="currentColor" stroke-opacity="0.5" stroke-width="2"/>`;
  });

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
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${num(layout.width)} ${num(layout.height)}" role="img" aria-label="${title}">`,
    `<title>${title}</title>`,
    `<defs>${symbols.join("")}</defs>`,
    `<g class="groups">${groups.join("")}</g>`,
    `<g class="links">${links.join("")}</g>`,
    `<g class="nodes">${nodeEls.join("")}</g>`,
    `</svg>`,
    "",
  ].join("\n");
}
