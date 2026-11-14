import { readdirSync, readFileSync } from "node:fs";

export interface Icon {
  name: string;
  width: number;
  height: number;
  viewBox: string;
  body: string;
}

const ICON_DIR = new URL("../icons/isoflow/", import.meta.url);

let names: string[] | undefined;
const cache = new Map<string, Icon>();

/** Sorted names of the vendored icons (file stems of icons/isoflow/*.svg). */
export function iconNames(): string[] {
  names ??= readdirSync(ICON_DIR)
    .filter((f) => f.endsWith(".svg"))
    .map((f) => f.slice(0, -4))
    .sort();
  return [...names];
}

/**
 * Prefix every id with `<prefix>__` and rewrite the references to it:
 * `id="X"`, `url(#X)`, `href="#X"` and `xlink:href="#X"`. Other hrefs are left alone.
 */
export function prefixIds(body: string, prefix: string): string {
  const p = `${prefix}__`;
  return body
    .replace(/(\sid=)(["'])([^"']*)\2/g, (_m, a: string, q: string, id: string) => `${a}${q}${p}${id}${q}`)
    .replace(/url\(\s*(["']?)#([^)"']*)\1\s*\)/g, (_m, q: string, id: string) => `url(${q}#${p}${id}${q})`)
    .replace(/([\s:]href=)(["'])#([^"']*)\2/g, (_m, a: string, q: string, id: string) => `${a}${q}#${p}${id}${q}`);
}

export function loadIcon(name: string): Icon {
  if (!iconNames().includes(name)) {
    throw new Error(`Unknown icon "${name}"`);
  }
  const hit = cache.get(name);
  if (hit) return hit;

  const raw = readFileSync(new URL(`${name}.svg`, ICON_DIR), "utf8");
  const open = raw.match(/<svg\b[^>]*>/);
  const close = raw.lastIndexOf("</svg>");
  if (!open || open.index === undefined || close < 0) {
    throw new Error(`Icon "${name}" is not a valid SVG`);
  }
  const viewBox = open[0].match(/\sviewBox="([^"]*)"/)?.[1]?.trim();
  const nums = viewBox?.split(/[\s,]+/).map(Number);
  const [, , width, height] = nums ?? [];
  if (!viewBox || !nums || nums.length !== 4 || nums.some((n) => !Number.isFinite(n))) {
    throw new Error(`Icon "${name}" has no valid viewBox`);
  }
  const inner = raw
    .slice(open.index + open[0].length, close)
    .replace(/<!--[\s\S]*?-->/g, "")
    .trim();

  const icon: Icon = {
    name,
    width: width as number,
    height: height as number,
    viewBox,
    body: prefixIds(inner, name),
  };
  cache.set(name, icon);
  return icon;
}
