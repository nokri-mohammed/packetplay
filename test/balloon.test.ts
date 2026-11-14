import { describe, expect, test } from "bun:test";
import { BALLOON_GAP, balloonRect } from "../src/player-core.ts";

describe("balloonRect", () => {
  test("gap is 60", () => {
    expect(BALLOON_GAP).toBe(60);
  });

  test("direction 1 puts the box above the dot, centred on x", () => {
    expect(balloonRect(200, 300, 100, 50, 1)).toEqual({ x: 150, y: 190, tetherY: 240 });
  });

  test("direction -1 puts the box below the dot, centred on x", () => {
    expect(balloonRect(200, 300, 100, 50, -1)).toEqual({ x: 150, y: 360, tetherY: 360 });
  });

  test("odd sizes keep half pixels", () => {
    expect(balloonRect(10, 100, 51, 33, 1)).toEqual({ x: -15.5, y: 7, tetherY: 40 });
    expect(balloonRect(10, 100, 51, 33, -1)).toEqual({ x: -15.5, y: 160, tetherY: 160 });
  });

  test("the box never reaches the icon zone of 48 px around the dot", () => {
    const up = balloonRect(0, 0, 80, 70, 1);
    expect(up.y + 70).toBeLessThanOrEqual(-48);
    const down = balloonRect(0, 0, 80, 70, -1);
    expect(down.y).toBeGreaterThanOrEqual(48);
  });
});
