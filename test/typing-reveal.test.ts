import { describe, expect, test } from "bun:test";
import type { Scene } from "../src/index.ts";
import { layoutScene } from "../src/layout.ts";
import { frameAt, revealPop, routeHighlight, typingState } from "../src/player-core.ts";
import { compileTimeline } from "../src/timeline.ts";
import { validateScene } from "../src/validate.ts";

const scene = {
  title: "T",
  nodes: {
    a: { label: "A", icon: "server" },
    b: { label: "B", icon: "server" },
    c: { label: "C", icon: "server" },
  },
  links: [["a", "b"], ["b", "c"]],
  chapters: [
    {
      title: "one",
      steps: [
        { from: "a", to: "c", typing: "abc" },
        { from: "a", to: "c" },
      ],
    },
  ],
} as unknown as Scene;
const tl = compileTimeline(scene, layoutScene(scene));
const [typed, plain] = tl.steps;

describe("timeline with typing", () => {
  // "abc": 3 * 80 + 500 = 740 ms of typing. 2 hops of 1750 ms: 3500. endMs = 740 + 3500 = 4240.
  test("typingMs and the shifted hops", () => {
    expect(typed!.typing).toBe("abc");
    expect(typed!.typingMs).toBe(740);
    expect(typed!.hops.map((h) => [h.startMs, h.endMs])).toEqual([
      [740, 1840],
      [2490, 3590],
    ]);
    expect(typed!.endMs).toBe(4240);
  });
  // The next step starts after a 450 ms gap at 4690 and has no typing, so nothing shifts.
  test("a step without typing is unchanged", () => {
    expect(plain!.typingMs).toBe(0);
    expect(plain!.typing).toBe("");
    expect(plain!.startMs).toBe(4690);
    expect(plain!.hops.map((h) => [h.startMs, h.endMs])).toEqual([
      [4690, 5790],
      [6440, 7540],
    ]);
    expect(plain!.endMs).toBe(8190);
  });
  test("no packet is drawn while typing, then it leaves at the first hop", () => {
    expect(frameAt(tl, 739).packets).toEqual([]);
    expect(frameAt(tl, 740).packets.length).toBe(1);
  });
  test("the caption shows from startMs", () => {
    expect(frameAt(tl, 0).stepId).toBe(typed!.id);
  });
});

describe("typingState", () => {
  test("null outside the typing window", () => {
    expect(typingState(-1, typed!)).toBeNull();
    expect(typingState(740, typed!)).toBeNull();
    expect(typingState(0, plain!)).toBeNull();
    expect(typingState(5000, plain!)).toBeNull();
  });
  test("one character per 80 ms", () => {
    expect(typingState(0, typed!)!.text).toBe("");
    expect(typingState(79, typed!)!.text).toBe("");
    expect(typingState(80, typed!)!.text).toBe("a");
    expect(typingState(239, typed!)!.text).toBe("ab");
    expect(typingState(240, typed!)!.text).toBe("abc");
  });
  test("the caret blinks every 400 ms", () => {
    // 10 characters: typing runs for 800 ms, then the hold of 500 ms.
    const long = compileTimeline(
      { ...scene, chapters: [{ title: "one", steps: [{ from: "a", to: "b", typing: "abcdefghij" }] }] } as unknown as Scene,
      layoutScene(scene),
    ).steps[0]!;
    expect(typingState(0, long)!.caret).toBe(true);
    expect(typingState(399, long)!.caret).toBe(true);
    expect(typingState(400, long)!.caret).toBe(false);
    expect(typingState(799, long)!.caret).toBe(false);
    expect(typingState(800, long)).toEqual({ text: "abcdefghij", caret: false, sent: true });
  });
  test("sent is true during the hold and the caret is off", () => {
    expect(typingState(239, typed!)).toEqual({ text: "ab", caret: true, sent: false });
    expect(typingState(240, typed!)).toEqual({ text: "abc", caret: false, sent: true });
    expect(typingState(739, typed!)).toEqual({ text: "abc", caret: false, sent: true });
  });
});

describe("routeHighlight for a typing step", () => {
  test("starts at startMs + typingMs and fades in over 300 ms", () => {
    expect(routeHighlight(739, typed!)).toBeNull();
    expect(routeHighlight(740, typed!)!.opacity).toBe(0);
    expect(routeHighlight(890, typed!)!.opacity).toBe(0.5);
    expect(routeHighlight(1040, typed!)!.opacity).toBe(1);
  });
});

describe("revealPop", () => {
  const at = 10000;
  test("before atMs: scale 1 and no rings", () => {
    expect(revealPop(9999, at)).toEqual({ scale: 1, rings: [] });
  });
  test("at the start: scale 0.6, one ring at radius 48 and opacity 0.8", () => {
    const p = revealPop(at, at);
    expect(p.scale).toBeCloseTo(0.6, 12);
    expect(p.rings).toEqual([{ r: 48, opacity: 0.8 }]);
  });
  test("peak 1.15 at 420 ms, back to 1 at 700 ms", () => {
    expect(revealPop(at + 420, at).scale).toBeCloseTo(1.15, 12);
    expect(revealPop(at + 700, at).scale).toBe(1);
    expect(revealPop(at + 5000, at).scale).toBe(1);
    // 210 ms: u = 0.3, 0.6 + 0.55 * sin(pi / 4)
    expect(revealPop(at + 210, at).scale).toBeCloseTo(0.6 + 0.55 * Math.SQRT1_2, 12);
    // 560 ms: u = 0.8, 1.15 - 0.15 * sin(pi / 4)
    expect(revealPop(at + 560, at).scale).toBeCloseTo(1.15 - 0.15 * Math.SQRT1_2, 12);
  });
  test("rings at 450 ms: first at v = 0.5, second at v = 200 / 900", () => {
    const [r1, r2] = revealPop(at + 450, at).rings;
    expect(r1!.r).toBeCloseTo(99, 9);
    expect(r1!.opacity).toBeCloseTo(0.4, 9);
    expect(r2!.r).toBeCloseTo(48 + (102 * 200) / 900, 9);
    expect(r2!.opacity).toBeCloseTo(0.8 * (1 - 200 / 900), 9);
  });
  test("second ring starts 250 ms late; the rings end at 900 and 1150 ms", () => {
    expect(revealPop(at + 249, at).rings.length).toBe(1);
    expect(revealPop(at + 250, at).rings.length).toBe(2);
    expect(revealPop(at + 899, at).rings.length).toBe(2);
    expect(revealPop(at + 900, at).rings.length).toBe(1);
    expect(revealPop(at + 1149, at).rings.length).toBe(1);
    expect(revealPop(at + 1150, at).rings).toEqual([]);
  });
});

describe("schema: typing", () => {
  const withTyping = (v: unknown): unknown => ({
    title: "T",
    nodes: { a: { label: "A", icon: "server" }, b: { label: "B", icon: "server" } },
    links: [["a", "b"]],
    chapters: [{ title: "one", steps: [{ from: "a", to: "b", typing: v }] }],
  });
  test("a text is accepted", () => {
    expect(validateScene(withTyping("hello"))).toEqual([]);
    expect(validateScene(withTyping("x".repeat(80)))).toEqual([]);
  });
  test("an empty string, a non-string and a long text are rejected through the schema", () => {
    for (const v of ["", 5, true, "x".repeat(81)]) {
      const issues = validateScene(withTyping(v));
      expect(issues.length).toBeGreaterThan(0);
      expect(issues.some((i) => i.path.includes("typing"))).toBe(true);
    }
  });
});
