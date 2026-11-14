import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const read = (p: string): string => readFileSync(new URL(p, root), "utf8");

describe("Claude Code plugin manifests", () => {
  const plugin = JSON.parse(read(".claude-plugin/plugin.json"));
  const market = JSON.parse(read(".claude-plugin/marketplace.json"));

  test("plugin.json names the plugin and its licence", () => {
    expect(plugin.name).toBe("packetplay");
    expect(plugin.license).toBe("MIT");
    expect(plugin.repository).toBe("https://github.com/nokri-mohammed/packetplay");
    expect(typeof plugin.description).toBe("string");
  });

  test("marketplace.json lists exactly this plugin from the repo root", () => {
    expect(market.name).toBe("packetplay");
    expect(market.plugins).toHaveLength(1);
    expect(market.plugins[0].name).toBe("packetplay");
    expect(market.plugins[0].source).toBe("./");
  });

  test("the skill and the single-file tool the plugin ships exist", () => {
    expect(existsSync(new URL("skills/packetplay/SKILL.md", root))).toBe(true);
    expect(existsSync(new URL("skills/packetplay/packetplay.js", root))).toBe(true);
  });

  test("manifests hold no absolute local path and no em dash", () => {
    for (const f of [".claude-plugin/plugin.json", ".claude-plugin/marketplace.json"]) {
      const text = read(f);
      expect(text.includes("/home/")).toBe(false);
      expect(text.includes("—")).toBe(false);
    }
  });
});

describe("release automation", () => {
  const config = JSON.parse(read("release-please-config.json"));
  const manifest = JSON.parse(read(".release-please-manifest.json"));
  const workflow = read(".github/workflows/release-please.yml");
  const plugin = JSON.parse(read(".claude-plugin/plugin.json"));
  const pkg = JSON.parse(read("package.json"));

  test("config bumps minor before 1.0 and updates plugin.json", () => {
    expect(config["release-type"]).toBe("node");
    expect(config["bump-minor-pre-major"]).toBe(true);
    expect(config.packages["."]["changelog-path"]).toBe("CHANGELOG.md");
    expect(config.packages["."]["extra-files"]).toEqual([
      { type: "json", path: ".claude-plugin/plugin.json", jsonpath: "$.version" },
    ]);
  });

  test("manifest, package.json and plugin.json start from the same version", () => {
    expect(manifest["."]).toBe(pkg.version);
    expect(plugin.version).toBe(pkg.version);
  });

  test("the package stays private, so nothing can be published to npm by accident", () => {
    expect(pkg.private).toBe(true);
  });

  test("the workflow pins the action to a commit and has narrow permissions", () => {
    expect(workflow).toMatch(/googleapis\/release-please-action@[0-9a-f]{40}/);
    expect(workflow).toContain("contents: write");
    expect(workflow).toContain("pull-requests: write");
    expect(workflow.includes("—")).toBe(false);
  });
});
