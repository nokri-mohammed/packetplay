import { describe, expect, test } from "bun:test";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadScene } from "../src/load.ts";
import { buildHtml } from "../src/page.ts";
import { validateScene } from "../src/validate.ts";

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

describe("udp example", () => {
  const udpYaml = root + "examples/udp.scene.yaml";
  const udpJson = root + "examples/udp.scene.json";

  test("YAML and JSON give the same model and it validates", async () => {
    const y = (await loadScene(udpYaml)) as unknown as Record<string, unknown>;
    const j = (await loadScene(udpJson)) as unknown as Record<string, unknown>;
    delete y.$schema;
    delete j.$schema;
    expect(y).toEqual(j);
    expect(validateScene(y)).toEqual([]);
  });

  test("builds a page with 3 chapters and the hand-calculated totalMs", async () => {
    const scene = await loadScene(udpYaml);
    const html = await buildHtml(scene);
    expect(html).toContain("<title>How a UDP message travels</title>");
    const m = html.match(/<script type="application\/json" id="timeline-data">([\s\S]*?)<\/script>/);
    const timeline = JSON.parse(m?.[1] ?? "{}");
    expect(timeline.chapters.length).toBe(3);
    // Chapter 1: 3 hops * (1300 + 750) = 6150, gap 500. Chapter 2 starts at 6650, ends 12800, gap 500.
    // Chapter 3 (flow) starts at 13300 and lasts 5000, so the end is 18300.
    expect(timeline.chapters.map((c: { startMs: number; endMs: number }) => [c.startMs, c.endMs])).toEqual([
      [0, 6150],
      [6650, 12800],
      [13300, 18300],
    ]);
    expect(timeline.totalMs).toBe(18300);
    const urls = html.match(/https?:\/\/[^"'\s)<>]+/g) ?? [];
    expect([...new Set(urls)]).toEqual(["http://www.w3.org/2000/svg"]);
  });

  test("the NAT step changes the data on the packet at the router hop", async () => {
    const scene = await loadScene(udpYaml);
    const { compileTimeline } = await import("../src/timeline.ts");
    const { layoutScene } = await import("../src/layout.ts");
    const tl = compileTimeline(scene, layoutScene(scene));
    const hops = tl.steps[0]!.hops;
    expect(hops.map((h) => (h.data as Record<string, string>).src)).toEqual([
      "192.0.2.20:49152",
      "203.0.113.7:61000",
      "203.0.113.7:61000",
    ]);
  });
});

describe("website example", () => {
  const webYaml = root + "examples/website.scene.yaml";
  const webJson = root + "examples/website.scene.json";

  test("YAML and JSON give the same model and it validates", async () => {
    const y = (await loadScene(webYaml)) as unknown as Record<string, unknown>;
    const j = (await loadScene(webJson)) as unknown as Record<string, unknown>;
    delete y.$schema;
    delete j.$schema;
    expect(y).toEqual(j);
    expect(validateScene(y)).toEqual([]);
  });

  test("builds a page with 5 chapters, 11 steps and the hand-calculated totalMs", async () => {
    const html = await buildHtml(await loadScene(webYaml));
    expect(html).toContain("<title>How a browser loads a website</title>");
    const m = html.match(/<script type="application\/json" id="timeline-data">([\s\S]*?)<\/script>/);
    const timeline = JSON.parse(m?.[1] ?? "{}");
    expect(timeline.chapters.length).toBe(5);
    expect(timeline.steps.length).toBe(11);
    // Step 1 (you to laptop) is 1 hop: 2050 ms. The other 10 steps are 3 hops * 2050 = 6150 ms each.
    // 2050 + 10 * 6150 + 10 gaps * 500 = 68550.
    expect(timeline.totalMs).toBe(68550);
    const urls = html.match(/https?:\/\/[^"'\s)<>]+/g) ?? [];
    expect([...new Set(urls)]).toEqual(["http://www.w3.org/2000/svg"]);
  });
});

describe("osi example", () => {
  const osiYaml = root + "examples/osi.scene.yaml";
  const osiJson = root + "examples/osi.scene.json";

  test("YAML and JSON give the same model and it validates", async () => {
    const y = (await loadScene(osiYaml)) as unknown as Record<string, unknown>;
    const j = (await loadScene(osiJson)) as unknown as Record<string, unknown>;
    delete y.$schema;
    delete j.$schema;
    expect(y).toEqual(j);
    expect(validateScene(y)).toEqual([]);
  });

  test("builds a page with 2 chapters, 12 steps and the hand-calculated totalMs", async () => {
    const html = await buildHtml(await loadScene(osiYaml));
    expect(html).toContain("<title>The OSI model: from a file to bits</title>");
    const m = html.match(/<script type="application\/json" id="timeline-data">([\s\S]*?)<\/script>/);
    const timeline = JSON.parse(m?.[1] ?? "{}");
    expect(timeline.chapters.length).toBe(2);
    expect(timeline.steps.length).toBe(12);
    // Each step is 1 hop: 1300 + 750 = 2050 ms. 12 * 2050 + 11 gaps * 500 = 24600 + 5500 = 30100.
    expect(timeline.totalMs).toBe(30100);
    const urls = html.match(/https?:\/\/[^"'\s)<>]+/g) ?? [];
    expect([...new Set(urls)]).toEqual(["http://www.w3.org/2000/svg"]);
  });
});
