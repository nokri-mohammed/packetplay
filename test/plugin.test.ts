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
