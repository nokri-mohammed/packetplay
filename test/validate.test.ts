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
    expect(validateScene(s)).toEqual([{ path: "", message: 'the scene: unknown key "bogus"' }]);
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
    const schema = issues.findIndex((i) => i.message === 'the scene: unknown key "bogus"');
    expect(semantic).toBeGreaterThan(-1);
    expect(schema).toBeGreaterThan(-1);
    expect(schema).toBeLessThan(semantic);
  });
});

describe("validateScene: semantic errors", () => {
  test("no route in a via leg is reported with the failing leg", () => {
    const s = base();
    s.chapters[0].steps[0] = { from: "a", to: "c", via: ["d"] };
    expect(validateScene(s)).toContainEqual({
      path: "chapters[0].steps[0]",
      message: 'chapter 1, step 1: no route from "a" to "d"',
    });
  });

  test("unknown track inside a parallel block", () => {
    const s = base();
    s.chapters[0].steps = [{ parallel: [{ from: "a", to: "b" }, { from: "a", to: "b", track: "nope" }] }];
    expect(validateScene(s)).toContainEqual({
      path: "chapters[0].steps[0].parallel[1].track",
      message: 'chapter 1, step 1: track "nope" does not exist',
    });
  });

  test("unknown via node inside a parallel block", () => {
    const s = base();
    s.chapters[0].steps = [{ parallel: [{ from: "a", to: "b", via: ["ghost"] }] }];
    expect(validateScene(s)).toContainEqual({
      path: "chapters[0].steps[0].parallel[0].via[0]",
      message: 'chapter 1, step 1: via node "ghost" does not exist',
    });
  });

  test("the JSON example has no issues", () => {
    const j = JSON.parse(readFileSync(root + "examples/webrtc.scene.json", "utf8"));
    expect(validateScene(j)).toEqual([]);
  });

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
    expect(messages(s)).toContain('"chapters[0].steps[0].parallel": must have at least 1 item');
    expect(messages(s)).toContain('"chapters[0].steps[0]": is neither a valid step nor a valid parallel block');
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
    expect(issue?.path).toBe("chapters[1].steps[0].from");
  });
});

describe("validateScene: hidden and reveal", () => {
  /** a - b - c with c hidden; step 1 a to b reveals nothing, step 2 a to b reveals c. */
  const hiddenScene = (): any => {
    const s = base();
    s.nodes.c.hidden = true;
    s.chapters = [{ title: "one", steps: [{ from: "a", to: "b" }, { from: "b", to: "a", reveal: ["c"] }, { from: "a", to: "c" }] }];
    return s;
  };

  test("a valid scene that hides a node and reveals it before use has no issues", () => {
    expect(validateScene(hiddenScene())).toEqual([]);
  });

  test("a hidden node that is never revealed and never used is allowed", () => {
    const s = hiddenScene();
    s.chapters = [{ title: "one", steps: [{ from: "a", to: "b" }] }];
    expect(validateScene(s)).toEqual([]);
  });

  test("reveal of a node that does not exist", () => {
    const s = hiddenScene();
    s.chapters[0].steps[1].reveal = ["ghost"];
    expect(validateScene(s)).toContainEqual({
      path: "chapters[0].steps[1].reveal[0]",
      message: 'chapter 1, step 2: reveal node "ghost" does not exist',
    });
  });

  test("reveal of a node that is not hidden", () => {
    const s = hiddenScene();
    s.chapters[0].steps[1].reveal = ["c", "d"];
    expect(validateScene(s)).toEqual([
      { path: "chapters[0].steps[1].reveal[1]", message: 'chapter 1, step 2: reveal node "d" is not hidden' },
    ]);
  });

  test("a node revealed twice", () => {
    const s = hiddenScene();
    s.chapters[0].steps[2] = { from: "a", to: "b", reveal: ["c"] };
    expect(validateScene(s)).toEqual([
      { path: "chapters[0].steps[2].reveal[0]", message: 'chapter 1, step 3: node "c" is already revealed' },
    ]);
  });

  test("a hidden node used as the destination before it is revealed", () => {
    const s = hiddenScene();
    s.chapters[0].steps = [{ from: "a", to: "c" }, { from: "a", to: "b", reveal: ["c"] }];
    expect(validateScene(s)).toEqual([
      { path: "chapters[0].steps[0]", message: 'chapter 1, step 1: node "c" is used before it is revealed' },
    ]);
  });

  test("a hidden node on the routed path is used, even when it is not an endpoint", () => {
    const s = hiddenScene();
    s.nodes.b.hidden = true;
    s.nodes.c.hidden = false;
    s.chapters[0].steps = [{ from: "a", to: "c" }, { from: "a", to: "d", reveal: ["b"] }];
    const issues = validateScene(s);
    expect(issues).toContainEqual({
      path: "chapters[0].steps[0]",
      message: 'chapter 1, step 1: node "b" is used before it is revealed',
    });
  });

  test("the revealing step itself may not use the node it reveals", () => {
    const s = hiddenScene();
    s.chapters[0].steps = [{ from: "a", to: "c", reveal: ["c"] }];
    expect(validateScene(s)).toEqual([
      { path: "chapters[0].steps[0]", message: 'chapter 1, step 1: node "c" is used before it is revealed' },
    ]);
  });

  test("a hidden node used as a via before it is revealed, inside a parallel block", () => {
    const s = hiddenScene();
    s.chapters[0].steps = [{ parallel: [{ from: "a", to: "c", via: ["b"] }, { from: "a", to: "b" }] }];
    s.nodes.b.hidden = true;
    s.nodes.c.hidden = false;
    const msgs = messages(s);
    expect(msgs).toContain('chapter 1, step 1: node "b" is used before it is revealed');
  });
});

