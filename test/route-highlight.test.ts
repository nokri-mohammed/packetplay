import { describe, expect, test } from "bun:test";
import { revealOpacity, routeHighlight } from "../src/player-core.ts";
import type { HopTL, StepTL } from "../src/timeline.ts";

const hop = (from: string, to: string): HopTL => ({
  from,
  to,
  link: `${from}--${to}`,
  x1: 0,
  y1: 0,
  x2: 10,
  y2: 0,
  back: { link: `${to}--${from}`, x1: 10, y1: 8, x2: 0, y2: 8 },
  startMs: 0,
  endMs: 0,
  data: {},
});
// A step from 1000 ms to 7150 ms (no typing).
const step = { startMs: 1000, endMs: 7150, typingMs: 0, hops: [hop("a", "b"), hop("b", "c"), hop("c", "d")] } as unknown as StepTL;

describe("routeHighlight", () => {
  test("null outside the step", () => {
    expect(routeHighlight(999, step)).toBeNull();
    expect(routeHighlight(7151, step)).toBeNull();
  });

  test("fades in over the first 300 ms", () => {
    expect(routeHighlight(1000, step)!.opacity).toBe(0);
    expect(routeHighlight(1150, step)!.opacity).toBe(0.5);
    expect(routeHighlight(1300, step)!.opacity).toBe(1);
  });

  test("full opacity in the middle", () => {
    expect(routeHighlight(4000, step)!.opacity).toBe(1);
  });

  test("fades out over the last 300 ms", () => {
    expect(routeHighlight(6850, step)!.opacity).toBe(1);
    expect(routeHighlight(7000, step)!.opacity).toBe(0.5);
    expect(routeHighlight(7150, step)!.opacity).toBe(0);
  });

  test("returns every hop of the step", () => {
    expect(routeHighlight(4000, step)!.hops).toBe(step.hops);
  });

  test("offset is minus t over 25, so it is a pure function of the clock", () => {
    expect(routeHighlight(1000, step)!.offset).toBe(-40);
    expect(routeHighlight(4000, step)!.offset).toBe(-160);
    expect(routeHighlight(4000, step)!.offset).toBe(routeHighlight(4000, step)!.offset);
  });
});

describe("revealOpacity", () => {
  test("0 before the reveal, ramps over 600 ms, then 1", () => {
    expect(revealOpacity(14599, 14600)).toBe(0);
    expect(revealOpacity(14600, 14600)).toBe(0);
    expect(revealOpacity(14900, 14600)).toBe(0.5);
    expect(revealOpacity(15200, 14600)).toBe(1);
    expect(revealOpacity(20000, 14600)).toBe(1);
  });
});
