import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { parse } from "yaml";
import { validateScene } from "../src/validate.ts";

const root = new URL("../", import.meta.url).pathname;
const example = () => parse(readFileSync(root + "examples/webrtc.scene.yaml", "utf8"));
const messages = (s: unknown) => validateScene(s).map((i) => i.message);

/** Small valid scene: a - b - c, plus an unlinked node d. */
const base = (): any => ({
  title: "T",
  nodes: {
    a: { label: "A", icon: "server" },
    b: { label: "B", icon: "server" },
    c: { label: "C", icon: "server" },
    d: { label: "D", icon: "server" },
  },
  groups: { g: { label: "G" } },
  tracks: { t: { label: "T", color: "blue" } },
  links: [["a", "b"], ["b", "c"]],
  chapters: [
    { title: "one", steps: [{ from: "a", to: "c" }] },
    { title: "two", steps: [{ from: "a", to: "b" }, { from: "a", to: "c" }] },
  ],
});

describe("validateScene: valid input", () => {
  test("the webrtc example has no issues", () => {
    expect(validateScene(example())).toEqual([]);
  });

  test("the small base scene has no issues", () => {
    expect(validateScene(base())).toEqual([]);
  });
});

describe("validateScene: schema errors", () => {
  test("unknown top-level key gives an issue with a path and message", () => {
    const s = base();
    s.bogus = 1;
    const issues = validateScene(s);
    expect(issues.length).toBeGreaterThan(0);
    for (const i of issues) {
      expect(typeof i.path).toBe("string");
      expect(typeof i.message).toBe("string");
      expect(i.message.length).toBeGreaterThan(0);
    }
  });

  test("never throws on bad input", () => {
    for (const bad of [null, undefined, 42, "text", [], {}, { title: 1 }]) {
      expect(() => validateScene(bad)).not.toThrow();
      expect(validateScene(bad).length).toBeGreaterThan(0);
    }
  });

  test("schema errors come before semantic errors", () => {
    const s = base();
    s.chapters[0].steps[0].to = "ghost"; // semantic
    s.bogus = 1; // schema
    const issues = validateScene(s);
    const semantic = issues.findIndex((i) => i.message.includes('node "ghost" does not exist'));
    const schema = issues.findIndex((i) => !/^chapter \d+/.test(i.message));
    expect(semantic).toBeGreaterThan(-1);
    expect(schema).toBeGreaterThan(-1);
    expect(schema).toBeLessThan(semantic);
  });
});

describe("validateScene: semantic errors", () => {
  test("unknown node in a step names chapter, step and node (1-based)", () => {
    const s = base();
    s.chapters[1].steps[0].from = "stn";
    expect(messages(s)).toContain('chapter 2, step 1: node "stn" does not exist');
  });

  test("unknown `to` node is reported the same way", () => {
    const s = base();
    s.chapters[0].steps[0].to = "ghost";
    expect(messages(s)).toContain('chapter 1, step 1: node "ghost" does not exist');
  });

  test("unknown track", () => {
    const s = base();
    s.chapters[0].steps[0].track = "nope";
    expect(messages(s)).toContain('chapter 1, step 1: track "nope" does not exist');
  });

  test("a known track is accepted", () => {
    const s = base();
    s.chapters[0].steps[0].track = "t";
    expect(validateScene(s)).toEqual([]);
  });

  test("unknown group on a node", () => {
    const s = base();
    s.nodes.a.group = "nope";
    expect(messages(s)).toContain('node "a": group "nope" does not exist');
  });

  test("link naming an unknown node", () => {
    const s = base();
    s.links.push(["c", "ghost"]);
    expect(messages(s)).toContain('link 3: node "ghost" does not exist');
  });

  test("self-link", () => {
    const s = base();
    s.links.push(["a", "a"]);
    expect(messages(s)).toContain('link 3: node "a" is linked to itself');
  });

  test("via node that does not exist", () => {
    const s = base();
    s.chapters[0].steps[0].via = ["ghost"];
    expect(messages(s)).toContain('chapter 1, step 1: via node "ghost" does not exist');
  });

  test("parallel step with no children", () => {
    const s = base();
    s.chapters[0].steps = [{ parallel: [] }];
    expect(messages(s).some((m) => /parallel/.test(m))).toBe(true);
  });

  test("step with no route between disconnected nodes", () => {
    const s = base();
    s.chapters[1].steps[1] = { from: "a", to: "d" };
    expect(messages(s)).toContain('chapter 2, step 2: no route from "a" to "d"');
  });

  test("steps inside a parallel block are checked, numbered by the block position", () => {
    const s = base();
    s.chapters[0].steps = [{ from: "a", to: "b" }, { parallel: [{ from: "a", to: "b" }, { from: "a", to: "ghost" }] }];
    expect(messages(s)).toContain('chapter 1, step 2: node "ghost" does not exist');
  });

  test("a step with from equal to to is reported", () => {
    const s = base();
    s.chapters[0].steps[0] = { from: "a", to: "a" };
    expect(messages(s)).toContain('chapter 1, step 1: from and to are the same node "a"');
  });

  test("issues carry a path that points at the problem", () => {
    const s = base();
    s.chapters[1].steps[0].from = "stn";
    const issue = validateScene(s).find((i) => i.message.includes('"stn"'));
    expect(issue?.path).toContain("chapters");
  });
});
