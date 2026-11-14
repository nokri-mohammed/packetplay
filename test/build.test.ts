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
    // Chapter 1: 3 hops * (1100 + 650) = 5250, gap 450. Chapter 2 starts at 5700, ends 10950, gap 450.
    // Chapter 3 (flow) starts at 11400 and lasts 4300, so the end is 15700.
    expect(timeline.chapters.map((c: { startMs: number; endMs: number }) => [c.startMs, c.endMs])).toEqual([
      [0, 5250],
      [5700, 10950],
      [11400, 15700],
    ]);
    expect(timeline.totalMs).toBe(15700);
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
    // Step 1 (you to laptop) types "shop.example.com" (16 characters): 16 * 80 + 500 = 1780 ms, then
    // 1 hop of 1750 ms, so 3530 ms. The other 10 steps are 3 hops * 1750 = 5250 ms each.
    // 3530 + 10 * 5250 + 10 gaps * 450 = 3530 + 52500 + 4500 = 60530.
    expect(timeline.totalMs).toBe(60530);
    expect(timeline.hidden).toEqual(["web"]);
    const urls = html.match(/https?:\/\/[^"'\s)<>]+/g) ?? [];
    expect([...new Set(urls)]).toEqual(["http://www.w3.org/2000/svg"]);
  });
});

describe("website example: hidden server", () => {
  test("shop.example.com is revealed when the last hop of the DNS answer arrives", async () => {
    const { compileTimeline } = await import("../src/timeline.ts");
    const { layoutScene } = await import("../src/layout.ts");
    const scene = await loadScene(root + "examples/website.scene.yaml");
    const tl = compileTimeline(scene, layoutScene(scene));
    // Step 1: 1780 ms typing + 1750 ms hop = 3530, gap 450, so the DNS query starts at 3980.
    // The query is 3 hops: 3980 + 5250 = 9230, gap 450, so the DNS answer starts at 9680.
    // Its hops start at 9680, 11430 and 13180. The last one arrives 1100 ms later: 14280.
    const answer = tl.steps.find((s) => s.label === "DNS answer")!;
    expect(answer.startMs).toBe(9680);
    expect(answer.hops.map((h) => h.startMs)).toEqual([9680, 11430, 13180]);
    expect(tl.reveals).toEqual([{ node: "web", atMs: 14280, stepId: answer.id }]);
    expect(tl.reveals[0]!.atMs).toBe(answer.hops[2]!.endMs);
  });

  test("the static SVG still shows the node and has no style element", async () => {
    const html = await buildHtml(await loadScene(root + "examples/website.scene.yaml"));
    expect(html).toContain('data-node="web"');
    const svg = html.match(/<svg[\s\S]*?<\/svg>/)?.[0] ?? "";
    expect(svg).not.toContain("<style");
    expect(svg).not.toContain('opacity="0"');
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

  test("builds a page with 2 chapters, 8 steps and the hand-calculated totalMs", async () => {
    const html = await buildHtml(await loadScene(osiYaml));
    expect(html).toContain("<title>The OSI model: from a file to bits</title>");
    const m = html.match(/<script type="application\/json" id="timeline-data">([\s\S]*?)<\/script>/);
    const timeline = JSON.parse(m?.[1] ?? "{}");
    expect(timeline.chapters.length).toBe(2);
    expect(timeline.steps.length).toBe(8);
    // Each step is 1 hop: 1100 + 650 = 1750 ms. 8 * 1750 + 7 gaps * 450 = 14000 + 3150 = 17150.
    expect(timeline.totalMs).toBe(17150);
    const urls = html.match(/https?:\/\/[^"'\s)<>]+/g) ?? [];
    expect([...new Set(urls)]).toEqual(["http://www.w3.org/2000/svg"]);
  });
});
