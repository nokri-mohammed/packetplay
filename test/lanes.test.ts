import { describe, expect, test } from "bun:test";
import { LANE_OFFSET, LANE_TRIM, lane, laneId } from "../src/lanes.ts";
import type { Layout } from "../src/layout.ts";

const layout = {
  width: 0,
  height: 0,
  origin: { x: 0, y: 0 },
  groups: {},
  nodes: {
    a: { x: 100, y: 100, i: 0, j: 0 },
    b: { x: 300, y: 100, i: 0, j: 0 },
    c: { x: 100, y: 300, i: 0, j: 0 },
  },
} as Layout;

describe("lanes", () => {
  test("constants", () => {
    expect([LANE_OFFSET, LANE_TRIM]).toEqual([8, 44]);
  });

  test("laneId joins from and to", () => {
    expect(laneId("a", "b")).toBe("a--b");
    expect(laneId("b", "a")).toBe("b--a");
  });

  test("left to right travels 8 px below (right-hand side), trimmed by 44 at both ends", () => {
    expect(lane(layout, "a", "b")).toEqual({
      id: "a--b",
      x1: 100,
      y1: 108,
      x2: 300,
      y2: 108,
      ax1: 144,
      ay1: 108,
      ax2: 256,
      ay2: 108,
    });
  });

  test("right to left uses the other side, so the two lanes are 16 px apart", () => {
    const back = lane(layout, "b", "a");
    expect(back).toEqual({
      id: "b--a",
      x1: 300,
      y1: 92,
      x2: 100,
      y2: 92,
      ax1: 256,
      ay1: 92,
      ax2: 144,
      ay2: 92,
    });
    expect(lane(layout, "a", "b").y1 - back.y1).toBe(16);
  });

  test("downward travel has its right-hand side on the left of the screen", () => {
    expect(lane(layout, "a", "c")).toEqual({
      id: "a--c",
      x1: 92,
      y1: 100,
      x2: 92,
      y2: 300,
      ax1: 92,
      ay1: 144,
      ax2: 92,
      ay2: 256,
    });
  });

  test("an unknown node throws", () => {
    expect(() => lane(layout, "a", "zz")).toThrow('Layout has no position for lane "a--zz"');
  });
});
