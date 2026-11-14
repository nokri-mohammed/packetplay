import { describe, expect, test } from "bun:test";
import Ajv2020 from "ajv/dist/2020";
import { parse } from "yaml";
import { readdirSync, readFileSync } from "node:fs";

const root = new URL("../", import.meta.url).pathname;
const read = (p: string) => readFileSync(root + p, "utf8");
const ajv = new Ajv2020({ allErrors: true, strict: false });
const validate = ajv.compile(JSON.parse(read("schema/scene.schema.json")));

const yamlScene = parse(read("examples/webrtc.scene.yaml"));
const jsonScene = JSON.parse(read("examples/webrtc.scene.json"));
const clone = <T>(x: T): any => structuredClone(x);

describe("scene schema", () => {
  test("yaml example validates", () => {
    expect(validate(yamlScene)).toBe(true);
  });
  test("json example validates", () => {
    expect(validate(jsonScene)).toBe(true);
  });
  test("unknown top-level key fails", () => {
    const s = clone(yamlScene);
    s.bogus = 1;
    expect(validate(s)).toBe(false);
  });
  test("step without from/to fails", () => {
    const s = clone(yamlScene);
    s.chapters[0].steps[0] = { label: "no route" };
    expect(validate(s)).toBe(false);
  });
  test("link with three ids fails", () => {
    const s = clone(yamlScene);
    s.links[0] = ["client", "r1", "net"];
    expect(validate(s)).toBe(false);
  });
  test("icon enum matches icons/isoflow", () => {
    const icons = readdirSync(root + "icons/isoflow")
      .filter((f) => f.endsWith(".svg"))
      .map((f) => f.replace(/\.svg$/, ""))
      .sort();
    const schema = JSON.parse(read("schema/scene.schema.json"));
    expect([...schema.$defs.node.properties.icon.enum].sort()).toEqual(icons);
  });
});
