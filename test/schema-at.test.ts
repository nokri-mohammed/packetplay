import { describe, expect, test } from "bun:test";
import Ajv2020 from "ajv/dist/2020";
import { readFileSync } from "node:fs";
import { validateScene } from "../src/validate.ts";

const root = new URL("../", import.meta.url).pathname;
const ajv = new Ajv2020({ allErrors: true, strict: false });
const validate = ajv.compile(JSON.parse(readFileSync(root + "schema/scene.schema.json", "utf8")));

const scene = (at: number[]): any => ({
  title: "T",
  nodes: {
    a: { label: "A", icon: "server", at },
    b: { label: "B", icon: "server" },
  },
  links: [["a", "b"]],
  chapters: [{ title: "one", steps: [{ from: "a", to: "b" }] }],
});

describe("schema: node at has a lower bound", () => {
  test("rejects a negative x", () => {
    expect(validate(scene([-1, 0]))).toBe(false);
  });
  test("rejects a negative y", () => {
    expect(validate(scene([0, -0.5]))).toBe(false);
  });
  test("accepts [0, 0]", () => {
    expect(validate(scene([0, 0]))).toBe(true);
  });
  test("accepts fractional [0.5, 1.5]", () => {
    expect(validate(scene([0.5, 1.5]))).toBe(true);
  });
});

describe("validateScene: node at", () => {
  test("reports an issue for at [-1, 0]", () => {
    const issues = validateScene(scene([-1, 0]));
    expect(issues.length).toBeGreaterThan(0);
    expect(issues.some((i) => i.path.includes("at"))).toBe(true);
  });
  test("reports no issue for at [0.5, 1.5]", () => {
    expect(validateScene(scene([0.5, 1.5]))).toEqual([]);
  });
});
