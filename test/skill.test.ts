import { describe, expect, test } from "bun:test";
import { readdirSync, readFileSync } from "node:fs";
import { loadScene } from "../src/load.ts";
import { validateScene } from "../src/validate.ts";

const dir = new URL("../skills/packetplay/", import.meta.url).pathname;
const skill = readFileSync(dir + "SKILL.md", "utf8");

describe("skill folder", () => {
  test("SKILL.md has frontmatter name packetplay and a non-empty description", () => {
    const m = skill.match(/^---\n([\s\S]*?)\n---\n/);
    expect(m).not.toBeNull();
    const front = m?.[1] ?? "";
    expect(front).toMatch(/^name: packetplay$/m);
    expect(front).toMatch(/^description: \S.+$/m);
  });

  test("SKILL.md is at most 120 lines, with no em dash and no local path", () => {
    expect(skill.split("\n").length).toBeLessThanOrEqual(120);
    expect(skill).not.toContain(String.fromCharCode(0x2014));
    expect(skill).not.toContain("/home/");
  });

  test("the five example scenes validate", async () => {
    const files = readdirSync(dir + "examples").sort();
    expect(files).toEqual(["homenet", "osi", "udp", "webrtc", "website"].map((n) => `${n}.scene.yaml`));
    for (const f of files) {
      expect(validateScene(await loadScene(dir + "examples/" + f))).toEqual([]);
    }
  });

  test("the skill examples equal the repo examples", () => {
    for (const f of readdirSync(dir + "examples")) {
      expect(readFileSync(dir + "examples/" + f, "utf8")).toBe(readFileSync(dir + "../../examples/" + f, "utf8"));
    }
  });
});

describe("packetplay.js", () => {
  test("exists and starts with the shebang", () => {
    expect(readFileSync(dir + "packetplay.js", "utf8").startsWith("#!/usr/bin/env bun\n")).toBe(true);
  });

  test("--help exits 0", async () => {
    const p = Bun.spawn(["bun", dir + "packetplay.js", "--help"], { stdout: "pipe", stderr: "pipe" });
    const [out, code] = await Promise.all([new Response(p.stdout).text(), p.exited]);
    expect(code).toBe(0);
    expect(out).toContain("packetplay validate");
  });
});
