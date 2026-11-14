import { describe, expect, test } from "bun:test";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadScene } from "../src/load.ts";
import { buildHtml } from "../src/page.ts";

const root = new URL("../", import.meta.url).pathname;
const yamlPath = root + "examples/webrtc.scene.yaml";
const jsonPath = root + "examples/webrtc.scene.json";

describe("buildHtml", () => {
  test("builds one self-contained page from the example", async () => {
    const html = await buildHtml(await loadScene(yamlPath));
    expect(html).toContain("<title>How a WebRTC call connects</title>");
    expect(html.match(/data-node=/g)?.length).toBe(7);

    const m = html.match(/<script type="application\/json" id="timeline-data">([\s\S]*?)<\/script>/);
    expect(m).not.toBeNull();
    const timeline = JSON.parse(m?.[1] ?? "{}");
    expect(timeline.chapters.length).toBe(4);

    expect(html).not.toContain("src=");
    expect(html).not.toContain("@import");
    expect(html).not.toContain('href="http');
    expect(html).not.toContain("fetch(");

    const urls = html.match(/https?:\/\/[^"'\s)<>]+/g) ?? [];
    expect([...new Set(urls)]).toEqual(["http://www.w3.org/2000/svg"]);
  });
});

describe("buildHtml grid and zoom", () => {
  test("iso grid is the default: grid div, two tile data URIs, zoom controls, 12 lanes", async () => {
    const html = await buildHtml(await loadScene(yamlPath));
    expect(html).toContain('<div class="grid" id="grid"></div>');
    expect(html.match(/data:image\/svg\+xml,/g)?.length).toBe(2);
    expect(html).toContain("points='70.75,0 141.5,40.95 70.75,81.9 0,40.95'");
    for (const id of ["zoom-in", "zoom-out", "zoom-fit", "zoom-label"]) expect(html).toContain(`id="${id}"`);
    expect(html).toMatch(/<div class="stage" id="stage" data-w="1057" data-h="657.5" data-ox="269.5" data-oy="80">/);
    expect(html.match(/data-link=/g)?.length).toBe(12);
    expect(html.match(/data-group=/g)?.length).toBe(1);
  });

  test("grid none leaves out the grid div but keeps zoom controls", async () => {
    const scene = { ...(await loadScene(yamlPath)), grid: "none" } as Awaited<ReturnType<typeof loadScene>>;
    const html = await buildHtml(scene);
    expect(html).not.toContain('<div class="grid"');
    expect(html).toContain('id="zoom-fit"');
  });
});

describe("cli convert", () => {
  const run = async (args: string[]) => {
    const p = Bun.spawn(["bun", "run", root + "src/cli.ts", ...args], { stdout: "pipe", stderr: "pipe" });
    const [out, code] = await Promise.all([new Response(p.stdout).text(), p.exited]);
    return { out, code };
  };

  test("YAML to JSON gives the same model as the JSON example", async () => {
    const { out, code } = await run(["convert", yamlPath, "--to", "json"]);
    expect(code).toBe(0);
    expect(JSON.parse(out)).toEqual(JSON.parse(readFileSync(jsonPath, "utf8")));
  });

  test("JSON to YAML to JSON round trips", async () => {
    const dir = mkdtempSync(join(tmpdir(), "svg-scenes-"));
    try {
      const y = join(dir, "a.yaml");
      expect((await run(["convert", jsonPath, "--to", "yaml", "-o", y])).code).toBe(0);
      const { out, code } = await run(["convert", y, "--to", "json"]);
      expect(code).toBe(0);
      expect(JSON.parse(out)).toEqual(JSON.parse(readFileSync(jsonPath, "utf8")));
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  test("unknown command exits 2", async () => {
    expect((await run(["nope"])).code).toBe(2);
  });
});
