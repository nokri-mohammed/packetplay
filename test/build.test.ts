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
    const dir = mkdtempSync(join(tmpdir(), "packetplay-"));
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
    // Every hop is 75.4927 px: round(75.4927 / 0.07) = 1078 ms, plus 650 rest = 1728 ms.
    // Chapter 1: 3 * 1728 = 5184, gap 450. Chapter 2 starts at 5634, ends 5634 + 5184 = 10818, gap 450.
    // Chapter 3 (flow) starts at 11268 and lasts 4300, so the end is 15568.
    expect(timeline.chapters.map((c: { startMs: number; endMs: number }) => [c.startMs, c.endMs])).toEqual([
      [0, 5184],
      [5634, 10818],
      [11268, 15568],
    ]);
    expect(timeline.totalMs).toBe(15568);
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

  test("builds a page with 4 chapters, 10 steps and the hand-calculated totalMs", async () => {
    const html = await buildHtml(await loadScene(webYaml));
    expect(html).toContain("<title>How a browser loads a website</title>");
    const m = html.match(/<script type="application\/json" id="timeline-data">([\s\S]*?)<\/script>/);
    const timeline = JSON.parse(m?.[1] ?? "{}");
    expect(timeline.chapters.length).toBe(4);
    expect(timeline.steps.length).toBe(10);
    // Step 1 (the DNS query, client to dns) types "shop.example.com" (16 characters): 16 * 80 + 500 = 1780 ms, then
    // Every route is client, router, ISP, Internet, server: 4 hops. A hop is 75.4927 px (1078 ms) or, on the
    // server link, 75.8 px (round(75.8 / 0.07) = 1083 ms); each is followed by 650 ms of rest.
    // Steps with four 1078 hops: 4 * 1728 = 6912 ms (steps 1 and 2: 6912 each, step 1 plus 1780 typing).
    // Steps with one 1083 hop: 3 * 1728 + 1733 = 6917 ms (8 steps).
    // 1780 + 6912 + 6912 + 8 * 6917 + 9 gaps * 450 = 1780 + 13824 + 55336 + 4050 = 74990.
    expect(timeline.totalMs).toBe(74990);
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
    // Step 1 (DNS query): 1780 ms typing + 4 hops * 1728 = 8692, gap 450, so the DNS answer starts at 9142.
    // Its 4 hops (all 1078 ms) start at 9142, 10870, 12598 and 14326. The last one arrives 1078 ms later: 15404.
    const answer = tl.steps.find((s) => s.label === "DNS answer")!;
    expect(answer.startMs).toBe(9142);
    expect(answer.hops.map((h) => h.startMs)).toEqual([9142, 10870, 12598, 14326]);
    expect(tl.reveals).toEqual([{ node: "web", atMs: 15404, stepId: answer.id }]);
    expect(tl.reveals[0]!.atMs).toBe(answer.hops[3]!.endMs);
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
    // Each step is 1 hop of 75.4927 px: 1078 + 650 = 1728 ms. 8 * 1728 + 7 gaps * 450 = 13824 + 3150 = 16974.
    expect(timeline.totalMs).toBe(16974);
    const urls = html.match(/https?:\/\/[^"'\s)<>]+/g) ?? [];
    expect([...new Set(urls)]).toEqual(["http://www.w3.org/2000/svg"]);
  });
});

describe("homenet example", () => {
  const homeYaml = root + "examples/homenet.scene.yaml";
  const homeJson = root + "examples/homenet.scene.json";

  test("YAML and JSON give the same model and it validates", async () => {
    const y = (await loadScene(homeYaml)) as unknown as Record<string, unknown>;
    const j = (await loadScene(homeJson)) as unknown as Record<string, unknown>;
    delete y.$schema;
    delete j.$schema;
    expect(y).toEqual(j);
    expect(validateScene(y)).toEqual([]);
  });

  test("builds a page with 14 nodes, 4 chapters, 6 steps and the hand-calculated totalMs", async () => {
    const html = await buildHtml(await loadScene(homeYaml));
    expect(html).toContain("<title>A home network: two switches, one router</title>");
    const svg = html.match(/<svg[\s\S]*?<\/svg>/)?.[0] ?? "";
    expect(svg.match(/<g data-node="/g)?.length).toBe(14);
    const m = html.match(/<script type="application\/json" id="timeline-data">([\s\S]*?)<\/script>/);
    const timeline = JSON.parse(m?.[1] ?? "{}");
    expect(timeline.chapters.length).toBe(4);
    expect(timeline.steps.length).toBe(6);
    // Hop lengths (px) and times: 75.4927 -> 1078, 75.8 -> 1083, 157.7 -> round(2252.86) = 2253,
    // 484.2244 -> round(6917.49) = 6917. Each hop adds 650 ms of rest.
    // Chapter 1 step 1: 1078, 6917, 2253 = 10248 + 3 * 650 = 12198 (0 to 12198), gap to 12648.
    // Chapter 1 step 2: 2253, 6917, 1078 = 10248 + 1950 = 12198 (12648 to 24846), gap to 25296.
    // Chapter 2: 1078, 6917, 6917, 1078 = 15990 + 4 * 650 = 18590 (25296 to 43886), gap to 44336.
    // Chapter 3: 1078, 1083 = 2161 + 2 * 650 = 3461 (44336 to 47797), gap to 48247.
    // Chapter 4: two parallel flow steps of 4300 ms from 48247: ends at 52547.
    expect(timeline.totalMs).toBe(52547);
    const urls = html.match(/https?:\/\/[^"'\s)<>]+/g) ?? [];
    expect([...new Set(urls)]).toEqual(["http://www.w3.org/2000/svg"]);
  });
});

describe("buildHtml compact controls", () => {
  test("controls are Play, Restart and four speeds; zoom ids stay; no nav buttons or hint", async () => {
    const html = await buildHtml(await loadScene(yamlPath));
    const doc = html.slice(0, html.indexOf('<script type="application/json"'));
    expect(doc).toContain('id="btn-play"');
    expect(doc).toContain('id="btn-restart"');
    const speeds = [...doc.matchAll(/data-speed="([^"]+)" aria-pressed="([^"]+)"/g)].map((m) => [m[1], m[2]]);
    expect(speeds).toEqual([["0.5", "false"], ["1", "true"], ["1.5", "false"], ["2", "false"]]);
    for (const id of ["zoom-in", "zoom-out", "zoom-fit", "zoom-follow"]) expect(doc).toContain(`id="${id}"`);
    expect(doc).toMatch(/id="zoom-follow" aria-pressed="false"/);
    expect(doc).not.toMatch(/id="btn-(prev|next)-/);
    expect(doc).not.toContain("Keys:");
    expect(doc).toContain('aria-keyshortcuts="Space');
  });

  test("player maps the key shortcuts and skips buttons that are not in the page", async () => {
    const src = readFileSync(root + "src/player.ts", "utf8");
    expect(src).toContain("keyAction(e.key)");
    expect(src).toContain("document.getElementById(id)?.addEventListener");
    const core = readFileSync(root + "src/player-core.ts", "utf8");
    for (const a of ["toggle", "nextHop", "prevHop", "nextMessage", "prevMessage", "nextChapter", "prevChapter", "faster", "slower", "restart", "follow"]) {
      expect(core).toContain(`"${a}"`);
    }
  });
});
