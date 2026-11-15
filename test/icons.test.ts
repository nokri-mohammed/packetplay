import { describe, expect, test } from "bun:test";
import { readdirSync } from "node:fs";
import { iconNames, loadIcon } from "../src/icons.ts";

const root = new URL("../", import.meta.url).pathname;
const files = readdirSync(root + "icons/isoflow")
  .filter((f) => f.endsWith(".svg"))
  .map((f) => f.slice(0, -4))
  .sort();

const ids = (s: string) => [...s.matchAll(/\sid="([^"]*)"/g)].map((m) => m[1]!);
const refs = (s: string) => [
  ...[...s.matchAll(/url\(#([^)]*)\)/g)].map((m) => m[1]!),
  ...[...s.matchAll(/href="#([^"]*)"/g)].map((m) => m[1]!),
];
const errorOf = (fn: () => unknown): Error => {
  try {
    fn();
  } catch (e) {
    return e as Error;
  }
  throw new Error("expected a throw");
};

describe("iconNames", () => {
  test("is the sorted list of icons/isoflow/*.svg stems", () => {
    expect(iconNames()).toEqual(files);
    expect(iconNames().length).toBe(38);
    expect(iconNames()).toContain("laptop");
    expect(iconNames()).toContain("truck-2");
  });
});

describe("loadIcon", () => {
  test("laptop: name, size and viewBox come from the viewBox", () => {
    const i = loadIcon("laptop");
    expect(i.name).toBe("laptop");
    expect(i.viewBox).toBe("0 0 541.1 513.1");
    expect(i.width).toBe(541.1);
    expect(i.height).toBe(513.1);
  });

  test("router: integer viewBox", () => {
    const i = loadIcon("router");
    expect(i.viewBox).toBe("0 0 518 477");
    expect([i.width, i.height]).toEqual([518, 477]);
  });

  test("body is inner markup only", () => {
    for (const n of iconNames()) {
      const b = loadIcon(n).body;
      expect(b).not.toContain("<?xml");
      expect(b).not.toContain("<!--");
      expect(b).not.toMatch(/<svg[\s>]/);
      expect(b).not.toContain("</svg>");
      expect(b.trim().length).toBeGreaterThan(0);
    }
  });

  test("body keeps the drawing", () => {
    expect(loadIcon("laptop").body).toContain('fill="#CDD9EE"');
  });

  test("ids are prefixed with the icon name and references follow", () => {
    const b = loadIcon("truck-2").body;
    expect(b).toContain('id="truck-2__clippath"');
    expect(b).toContain("url(#truck-2__clippath)");
    expect(b).not.toContain("url(#clippath)");
    expect(b).not.toContain('id="clippath"');
  });

  test("ids with underscores are prefixed too", () => {
    const b = loadIcon("cloud").body;
    expect(ids(b)).toEqual(["cloud__Layer_1_1_", "cloud__Layer_2_1_"]);
  });

  test("plane: all four clip paths are rewritten", () => {
    const b = loadIcon("plane").body;
    for (const c of ["clippath", "clippath-1", "clippath-2", "clippath-3"]) {
      expect(b).toContain(`id="plane__${c}"`);
      expect(b).toContain(`url(#plane__${c})`);
    }
  });

  test("every id of every icon has the icon prefix and every reference resolves", () => {
    for (const n of iconNames()) {
      const b = loadIcon(n).body;
      const own = ids(b);
      for (const id of own) expect(id.startsWith(`${n}__`)).toBe(true);
      for (const r of refs(b)) expect(own).toContain(r);
      expect(b).not.toMatch(/xlink:href="#(?!\w[\w-]*__)/);
    }
  });

  test("two icons never share an id", () => {
    const seen = new Map<string, string>();
    for (const n of iconNames()) {
      for (const id of ids(loadIcon(n).body)) {
        expect(seen.has(id)).toBe(false);
        seen.set(id, n);
      }
    }
  });

  test("is repeatable", () => {
    expect(loadIcon("server")).toEqual(loadIcon("server"));
  });
});

describe("loadIcon errors", () => {
  test.each(["../x", "a/b", "", "Laptop", "nope", "laptop.svg", "..\\x"])("rejects %p", (name) => {
    const e = errorOf(() => loadIcon(name));
    expect(e).toBeInstanceOf(Error);
    expect(e.message).toContain(name);
    expect(e.message).not.toContain("/home");
    expect(e.message).not.toContain("icons/isoflow");
    expect(e.message).not.toContain(root);
  });
});
