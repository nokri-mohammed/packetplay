import { readdirSync, readFileSync } from "node:fs";
import { embedded } from "./embedded.ts";

export interface Icon {
  name: string;
  width: number;
  height: number;
  viewBox: string;
  body: string;
}

// Vendored isoflow icons (MIT, unmodified) and our own icons, kept in separate folders.
const ICON_DIRS = [
  new URL("../icons/isoflow/", import.meta.url),
  new URL("../icons/custom/", import.meta.url),
];

function dirStems(dir: URL): string[] {
  try {
    return readdirSync(dir).filter((f) => f.endsWith(".svg")).map((f) => f.slice(0, -4));
  } catch {
    return [];
  }
}

let names: string[] | undefined;
const cache = new Map<string, Icon>();

/** Sorted names of all icons (file stems of icons/isoflow/*.svg and icons/custom/*.svg). */
export function iconNames(): string[] {
  names ??= (embedded ? Object.keys(embedded.icons) : ICON_DIRS.flatMap(dirStems)).sort();
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

  const raw = embedded?.icons[name] ??
    readFileSync(new URL(`${name}.svg`, ICON_DIRS.find((d) => dirStems(d).includes(name)) ?? ICON_DIRS[0]!), "utf8");
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
