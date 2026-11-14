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
