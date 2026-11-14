import { describe, expect, test } from "bun:test";
import type { Scene } from "../src/index.ts";
import type { Icon } from "../src/icons.ts";
import { layoutScene, type Layout } from "../src/layout.ts";
import { loadScene } from "../src/load.ts";
import { renderSvg } from "../src/render.ts";

const root = new URL("../", import.meta.url).pathname;

const fakeIcon = (name: string): Icon => ({
  name,
  width: 10,
  height: 10,
  viewBox: "0 0 10 10",
  body: '<rect width="10" height="10"/>',
});

type Tag = { name: string; attrs: Record<string, string>; index: number };
const tags = (svg: string): Tag[] =>
  [...svg.matchAll(/<([A-Za-z][\w-]*)((?:\s+[\w:-]+="[^"]*")*)\s*\/?>/g)].map((m) => ({
    name: m[1]!,
    attrs: Object.fromEntries([...m[2]!.matchAll(/([\w:-]+)="([^"]*)"/g)].map((a) => [a[1]!, a[2]!])),
    index: m.index!,
  }));
const find = (svg: string, name: string, attr?: [string, string]) =>
  tags(svg).filter((t) => t.name === name && (!attr || t.attrs[attr[0]] === attr[1]));

const scene = (over: Partial<Record<string, unknown>> = {}): Scene =>
  ({
    title: "Two nodes",
    nodes: {
      a: { label: "Alpha", icon: "laptop" },
      b: { label: "Beta", icon: "server", sub: "second" },
    },
    links: [["a", "b"]],
    chapters: [],
    ...over,
  }) as unknown as Scene;

const layout2: Layout = {
  width: 600,
  height: 320,
  nodes: { a: { x: 180, y: 160, i: 0, j: 0 }, b: { x: 420, y: 160, i: 2, j: 0 } },
  groups: {},
  origin: { x: 180, y: 160 },
};

const render = (s: Scene = scene(), l: Layout = layout2) => renderSvg(s, l, { icons: fakeIcon });

describe("root and title", () => {
  test("root svg attributes", () => {
    const svg = render();
    const root = tags(svg)[0]!;
    expect(root.name).toBe("svg");
    expect(root.attrs).toEqual({
      xmlns: "http://www.w3.org/2000/svg",
      width: "100%",
      height: "100%",
      viewBox: "0 0 600 320",
      preserveAspectRatio: "xMidYMid meet",
      role: "img",
      "aria-label": "Two nodes",
    });
    expect(svg.trimEnd().endsWith("</svg>")).toBe(true);
  });

  test("title element comes first inside the svg", () => {
    const svg = render();
    expect(svg).toContain("<title>Two nodes</title>");
    expect(tags(svg)[1]!.name).toBe("title");
  });

  test("no animation, no script, no xml prolog", () => {
    const svg = render();
    expect(svg).not.toContain("<?xml");
    expect(svg).not.toMatch(/<(animate|animateTransform|script|style)\b/);
  });
});

describe("defs", () => {
  test("one symbol per used icon, sorted by name", () => {
    const svg = render();
    const syms = find(svg, "symbol");
    expect(syms.map((s) => s.attrs.id)).toEqual(["icon-laptop", "icon-server"]);
    expect(syms.map((s) => s.attrs.viewBox)).toEqual(["0 0 10 10", "0 0 10 10"]);
    expect(svg).toContain('<symbol id="icon-laptop" viewBox="0 0 10 10"><rect width="10" height="10"/></symbol>');
  });

  test("symbols sort by name even when declared in another order", () => {
    const s = scene({ nodes: { z: { label: "Z", icon: "server" }, y: { label: "Y", icon: "cloud" } }, links: [] });
    const l: Layout = { ...layout2, nodes: { z: { x: 180, y: 160, i: 0, j: 0 }, y: { x: 420, y: 160, i: 2, j: 0 } } };
    expect(find(render(s, l), "symbol").map((t) => t.attrs.id)).toEqual(["icon-cloud", "icon-server"]);
  });

  test("an icon used by two nodes appears once", () => {
    const s = scene({ nodes: { a: { label: "A", icon: "server" }, b: { label: "B", icon: "server" } } });
    const svg = render(s);
    expect(find(svg, "symbol").length).toBe(1);
    expect(find(svg, "use").length).toBe(2);
  });

  test("unused icons are not emitted", () => {
    expect(render()).not.toContain("icon-cloud");
  });

  test("symbols live inside defs", () => {
    const svg = render();
    const d = svg.indexOf("<defs>");
    expect(d).toBeGreaterThan(-1);
    expect(svg.indexOf("<symbol")).toBeGreaterThan(d);
    expect(svg.indexOf("</defs>")).toBeGreaterThan(svg.lastIndexOf("</symbol>"));
  });

  test("default icons function is loadIcon (real viewBox appears)", () => {
    const svg = renderSvg(scene(), layout2);
    expect(find(svg, "symbol", ["id", "icon-laptop"])[0]!.attrs.viewBox).toBe("0 0 541.1 513.1");
  });
});

describe("nodes and links", () => {
  test("node group transform, use box and labels", () => {
    const svg = render();
    const a = find(svg, "g", ["data-node", "a"])[0]!;
    expect(a.attrs.transform).toBe("translate(180,160)");
    expect(find(svg, "g", ["data-node", "b"])[0]!.attrs.transform).toBe("translate(420,160)");
    const uses = find(svg, "use");
    expect(uses[0]!.attrs).toEqual({ href: "#icon-laptop", x: "-48", y: "-48", width: "96", height: "96" });
    expect(uses[1]!.attrs).toEqual({ href: "#icon-server", x: "-48", y: "-48", width: "96", height: "96" });
    expect(svg).toMatch(/<text class="label"[^>]*>Alpha<\/text>/);
    expect(svg).toMatch(/<text class="label"[^>]*>Beta<\/text>/);
  });

  test("sub text only when sub is set", () => {
    const svg = render();
    expect(find(svg, "text", ["class", "sub"]).length).toBe(1);
    expect(svg).toMatch(/<text class="sub"[^>]*>second<\/text>/);
  });

  test("every link is two lines, one per direction, drawn on the lane geometry with an arrowhead", () => {
    const lines = find(render(), "line");
    expect(lines.length).toBe(2);
    expect(lines.map((l) => l.attrs["data-link"])).toEqual(["a--b", "b--a"]);
    const xy = (l: Tag) => [l.attrs.x1, l.attrs.y1, l.attrs.x2, l.attrs.y2];
    expect(xy(lines[0]!)).toEqual(["224", "168", "376", "168"]);
    expect(xy(lines[1]!)).toEqual(["376", "152", "224", "152"]);
    for (const l of lines) {
      expect(l.attrs["marker-end"]).toBe("url(#arrow)");
      expect(l.attrs.stroke).toBe("currentColor");
    }
  });

  test("one shared arrow marker is defined once inside defs", () => {
    const svg = render();
    const markers = find(svg, "marker");
    expect(markers.length).toBe(1);
    expect(markers[0]!.attrs.id).toBe("arrow");
    expect(markers[0]!.index).toBeGreaterThan(svg.indexOf("<defs>"));
    expect(markers[0]!.index).toBeLessThan(svg.indexOf("</defs>"));
    expect(svg).toContain('fill="currentColor"/></marker>');
  });

  test("everything drawn lives in one g.scene", () => {
    const svg = render();
    expect(find(svg, "g", ["class", "scene"]).length).toBe(1);
    const open = svg.indexOf('<g class="scene">');
    const close = svg.lastIndexOf("</g>\n</svg>");
    expect(open).toBeGreaterThan(svg.indexOf("</defs>"));
    for (const cls of ["groups", "links", "nodes"]) {
      const at = svg.indexOf(`class="${cls}"`);
      expect(at).toBeGreaterThan(open);
      expect(at).toBeLessThan(close);
    }
  });

  test("nodes keep declaration order", () => {
    const svg = render();
    expect(find(svg, "g").filter((g) => g.attrs["data-node"]).map((g) => g.attrs["data-node"])).toEqual(["a", "b"]);
  });
});

describe("groups", () => {
  const gs = scene({
    nodes: {
      a: { label: "A", icon: "laptop" },
      b: { label: "B", icon: "server", group: "h" },
      c: { label: "C", icon: "server", group: "g" },
    },
    groups: { h: { label: "Home" }, g: { label: "Gee" } },
    links: [["a", "b"]],
  });
  const gl: Layout = {
    ...layout2,
    width: 900,
    height: 400,
    nodes: { a: { x: 180, y: 160, i: 0, j: 0 }, b: { x: 420, y: 160, i: 2, j: 0 }, c: { x: 660, y: 160, i: 4, j: 0 } },
    groups: {
      h: { i0: 1, j0: -1, i1: 3, j1: 1, points: [[420, 80], [490.75, 120.95], [420, 161.9], [349.25, 120.95]] },
      g: { i0: 3, j0: -1, i1: 5, j1: 1, points: [[660, 80], [730.75, 120.95], [660, 161.9], [589.25, 120.95]] },
    },
  };

  test("polygon and label per group in declaration order", () => {
    const svg = render(gs, gl);
    expect(find(svg, "polygon").map((g) => g.attrs["data-group"])).toEqual(["h", "g"]);
    const polys = find(svg, "polygon");
    expect(polys[0]!.attrs.points).toBe("420,80 490.75,120.95 420,161.9 349.25,120.95");
    expect(polys[1]!.attrs.points).toBe("660,80 730.75,120.95 660,161.9 589.25,120.95");
    expect(find(svg, "rect").filter((r) => r.attrs.width !== "10").length).toBe(0);
    expect(svg).toMatch(/<text class="group-label" x="420" y="102"[^>]*>Home<\/text>/);
    expect(svg).toMatch(/<text class="group-label" x="660" y="102"[^>]*>Gee<\/text>/);
  });

  test("document order is groups, links, nodes", () => {
    const svg = render(gs, gl);
    const g = svg.indexOf('class="groups"');
    const l = svg.indexOf('class="links"');
    const n = svg.indexOf('class="nodes"');
    expect(g).toBeGreaterThan(-1);
    expect(l).toBeGreaterThan(g);
    expect(n).toBeGreaterThan(l);
    expect(svg.indexOf("<defs>")).toBeLessThan(g);
  });

  test("no groups still emits empty containers in order", () => {
    const svg = render();
    expect(svg).toMatch(/<g class="groups"\s*(\/>|><\/g>)/);
    expect(svg.indexOf('class="groups"')).toBeLessThan(svg.indexOf('class="links"'));
    expect(svg.indexOf('class="links"')).toBeLessThan(svg.indexOf('class="nodes"'));
  });
});

describe("escaping", () => {
  const esc = scene({
    title: 'Tom & "Jerry" <1>',
    nodes: {
      a: { label: "Sam's laptop", icon: "laptop", sub: "a<b & c>d" },
      b: { label: 'Say "hi"', icon: "server" },
    },
  });

  test("title, aria-label, labels and subs are escaped", () => {
    const svg = render(esc);
    expect(svg).toContain("<title>Tom &amp; &quot;Jerry&quot; &lt;1&gt;</title>");
    expect(tags(svg)[0]!.attrs["aria-label"]).toBe("Tom &amp; &quot;Jerry&quot; &lt;1&gt;");
    expect(svg).toMatch(/<text class="label"[^>]*>Sam(&#39;|&apos;)s laptop<\/text>/);
    expect(svg).toMatch(/<text class="sub"[^>]*>a&lt;b &amp; c&gt;d<\/text>/);
    expect(svg).toMatch(/<text class="label"[^>]*>Say &quot;hi&quot;<\/text>/);
    expect(svg).not.toContain("Sam's");
    expect(svg).not.toContain("Tom & ");
  });

  test("group labels are escaped", () => {
    const s = scene({
      nodes: { a: { label: "A", icon: "laptop", group: "g" }, b: { label: "B", icon: "server" } },
      groups: { g: { label: "R&D <lab>" } },
    });
    const l: Layout = { ...layout2, groups: { g: { i0: 0, j0: 0, i1: 1, j1: 1, points: [[0, 0], [10, 5], [0, 10], [-10, 5]] } } };
    expect(render(s, l)).toMatch(/<text class="group-label"[^>]*>R&amp;D &lt;lab&gt;<\/text>/);
  });

  test("the output is well formed enough: every & starts an entity", () => {
    expect(render(esc)).not.toMatch(/&(?!(amp|lt|gt|quot|#39|apos);)/);
  });
});

describe("webrtc example", () => {
  const build = async () => {
    const s = await loadScene(root + "examples/webrtc.scene.yaml");
    return { s, l: layoutScene(s) };
  };

  test("snapshot with fake icons", async () => {
    const { s, l } = await build();
    expect(renderSvg(s, l, { icons: fakeIcon })).toMatchSnapshot();
  });

  test("structure: 7 nodes, 12 lanes (6 links x 2), 1 group, 4 symbols", async () => {
    const { s, l } = await build();
    const svg = renderSvg(s, l, { icons: fakeIcon });
    expect(find(svg, "g").filter((g) => g.attrs["data-node"]).map((g) => g.attrs["data-node"])).toEqual([
      "client", "r1", "net", "stun", "sig", "r2", "sam",
    ]);
    expect(find(svg, "line").map((x) => x.attrs["data-link"])).toEqual([
      "client--r1", "r1--client", "r1--net", "net--r1", "net--stun", "stun--net",
      "net--sig", "sig--net", "net--r2", "r2--net", "r2--sam", "sam--r2",
    ]);
    expect(svg.match(/data-link=/g)!.length).toBe(12);
    expect(svg.match(/data-group=/g)!.length).toBe(1);
    expect(find(svg, "polygon").map((g) => g.attrs["data-group"])).toEqual(["sams-home"]);
    expect(find(svg, "symbol").map((t) => t.attrs.id)).toEqual(["icon-cloud", "icon-laptop", "icon-router", "icon-server"]);
    expect(tags(svg)[0]!.attrs.viewBox).toBe("0 0 1057 657.5");
    expect(svg).toMatch(/Sam(&#39;|&apos;)s laptop/);
  });

  test("real icons: unique ids, no xml prolog, viewBox on every symbol", async () => {
    const { s, l } = await build();
    const svg = renderSvg(s, l);
    expect(svg).not.toContain("<?xml");
    const all = [...svg.matchAll(/\sid="([^"]*)"/g)].map((m) => m[1]);
    expect(all.length).toBeGreaterThan(4);
    expect(new Set(all).size).toBe(all.length);
    const syms = find(svg, "symbol");
    expect(syms.length).toBe(4);
    for (const sym of syms) expect(sym.attrs.viewBox).toMatch(/^0 0 \d+(\.\d+)? \d+(\.\d+)?$/);
    expect(svg.match(/<svg[\s>]/g)!.length).toBe(1);
  });
});
