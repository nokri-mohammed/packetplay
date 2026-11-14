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

describe("scene schema: hidden and reveal", () => {
  const withBits = (): any => {
    const s = clone(yamlScene);
    const first = Object.keys(s.nodes)[0] as string;
    s.nodes[first].hidden = true;
    const step = s.chapters[0].steps.find((x: any) => x.from) ?? s.chapters[0].steps[0];
    step.reveal = [first];
    return s;
  };
  test("hidden: boolean and reveal: string[] are accepted", () => {
    expect(validate(withBits())).toBe(true);
  });
  test("hidden must be a boolean", () => {
    const s = withBits();
    s.nodes[Object.keys(s.nodes)[0] as string].hidden = "yes";
    expect(validate(s)).toBe(false);
  });
  test("reveal must be an array of strings", () => {
    const s = withBits();
    const step = s.chapters[0].steps.find((x: any) => x.reveal);
    step.reveal = "a";
    expect(validate(s)).toBe(false);
    step.reveal = [1];
    expect(validate(s)).toBe(false);
  });
});

