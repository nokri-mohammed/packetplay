import { describe, expect, test } from "bun:test";
import type { Icon } from "../src/icons.ts";
import { layoutScene } from "../src/layout.ts";
import { renderSvg } from "../src/render.ts";

const fakeIcon = (name: string): Icon => ({
  name,
  width: 10,
  height: 10,
  viewBox: "0 0 10 10",
  body: '<rect width="10" height="10"/>',
});

const scene: any = {
  title: "T\u0000itle",
  nodes: {
    a: { label: "A\u0001\u0008B\u000B\u000C\u000E\u001FC", icon: "server", sub: "s\u0007ub" },
    b: { label: "B", icon: "server" },
  },
  links: [["a", "b"]],
  chapters: [{ title: "one", steps: [{ from: "a", to: "b" }] }],
};

describe("renderSvg: illegal XML 1.0 characters", () => {
  const svg = renderSvg(scene, layoutScene(scene), { icons: fakeIcon });

  test("output has no illegal control characters", () => {
    expect(svg).not.toMatch(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/);
  });
  test("the text around the removed characters is kept", () => {
    expect(svg).toContain("<title>Title</title>");
    expect(svg).toMatch(/<text class="label"[^>]*>ABC<\/text>/);
    expect(svg).toMatch(/<text class="sub"[^>]*>sub<\/text>/);
  });
  test("tab, newline and carriage return are kept", () => {
    const s: any = { ...scene, nodes: { ...scene.nodes, a: { label: "x\ty", icon: "server" } } };
    const out = renderSvg(s, layoutScene(s), { icons: fakeIcon });
    expect(out).toMatch(/<text class="label"[^>]*>x\ty<\/text>/);
  });
});
