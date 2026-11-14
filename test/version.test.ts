import { describe, expect, test } from "bun:test";
import Ajv2020 from "ajv/dist/2020";
import { parse } from "yaml";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadScene, parseScene } from "../src/load.ts";
import { SCHEMA_VERSION } from "../src/index.ts";

const root = new URL("../", import.meta.url).pathname;
const read = (p: string) => readFileSync(root + p, "utf8");
const schema = JSON.parse(read("schema/scene.schema.json"));
const validate = new Ajv2020({ allErrors: true, strict: false }).compile(schema);
const base = parse(read("examples/webrtc.scene.yaml"));
const withVersion = (v: unknown) => ({ ...structuredClone(base), version: v });
const MSG2 =
  "scene version 2 is not supported: this packetplay understands version 1 and older (update packetplay)";

describe("schema version", () => {
  test("SCHEMA_VERSION is 1", () => {
    expect(SCHEMA_VERSION).toBe(1);
  });
  test("$id is the public raw URL", () => {
    expect(schema.$id).toBe(
      "https://raw.githubusercontent.com/nokri-mohammed/packetplay/main/schema/scene.schema.json",
    );
  });
  test("schema accepts version 1 and 2", () => {
    expect(validate(withVersion(1))).toBe(true);
    expect(validate(withVersion(2))).toBe(true);
  });
  test("schema rejects 0, 1.5 and a string", () => {
    expect(validate(withVersion(0))).toBe(false);
    expect(validate(withVersion(1.5))).toBe(false);
    expect(validate(withVersion("1"))).toBe(false);
  });
  test("every example carries version 1 in yaml and json", () => {
    for (const n of ["webrtc", "udp", "website", "osi", "homenet"]) {
      expect(parse(read(`examples/${n}.scene.yaml`)).version).toBe(1);
      expect(JSON.parse(read(`examples/${n}.scene.json`)).version).toBe(1);
    }
  });
});

describe("loader version check", () => {
  test("parseScene throws the exact message for yaml and json text", () => {
    expect(() => parseScene("version: 2\ntitle: x\n", "yaml")).toThrow(MSG2);
    expect(() => parseScene('{"version":2,"title":"x"}', "json")).toThrow(MSG2);
  });
  test("message carries the number found", () => {
    expect(() => parseScene("version: 7\n", "yaml")).toThrow(/^scene version 7 is not supported/);
  });
  test("loadScene names the file", async () => {
    const dir = mkdtempSync(join(tmpdir(), "svgs-"));
    const y = join(dir, "future.scene.yaml");
    const j = join(dir, "future.scene.json");
    writeFileSync(y, "version: 2\ntitle: x\n");
    writeFileSync(j, '{"version":2,"title":"x"}');
    await expect(loadScene(y)).rejects.toThrow("future.scene.yaml: " + MSG2);
    await expect(loadScene(j)).rejects.toThrow("future.scene.json: " + MSG2);
  });
  test("a scene without version loads and gets no version key", () => {
    const s = parseScene("title: x\n", "yaml");
    expect("version" in s).toBe(false);
  });
  test("version 1 loads", () => {
    expect(parseScene("version: 1\ntitle: x\n", "yaml").version).toBe(1);
  });
});
