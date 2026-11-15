import { describe, expect, test } from "bun:test";
import {
  LABEL_MARGIN,
  balloonRect,
  labelRect,
  placeBalloon,
  rectsOverlap,
  textFactor,
} from "../src/player-core.ts";

describe("labelRect", () => {
  test("width is characters times 0.6 times the font size, centred on x", () => {
    const r = labelRect("abcde", 100, 50, 14);
    expect(r.w).toBeCloseTo(5 * 0.6 * 14);
    expect(r.x + r.w / 2).toBeCloseTo(100);
  });
  test("the box reaches one font size above the baseline and a little below", () => {
    const r = labelRect("x", 0, 50, 14);
    expect(r.y).toBe(36);
    expect(r.y + r.h).toBeGreaterThan(50);
  });
});

describe("rectsOverlap", () => {
  const a = { x: 0, y: 0, w: 10, h: 10 };
  test("overlapping rectangles", () => expect(rectsOverlap(a, { x: 5, y: 5, w: 10, h: 10 })).toBe(true));
  test("separate rectangles", () => expect(rectsOverlap(a, { x: 20, y: 0, w: 5, h: 5 })).toBe(false));
  test("touching edges do not overlap", () => expect(rectsOverlap(a, { x: 10, y: 0, w: 5, h: 5 })).toBe(false));
});

describe("placeBalloon", () => {
  const W = 1000;
  test("no labels: same as balloonRect", () => {
    const p = placeBalloon(500, 300, 100, 50, 1, [], W);
    const b = balloonRect(500, 300, 100, 50, 1);
    expect(p).toMatchObject(b);
    expect(p.tetherX).toBe(500);
  });
  test("a label elsewhere changes nothing", () => {
    const far = { x: 0, y: 0, w: 50, h: 10 };
    expect(placeBalloon(500, 300, 100, 50, 1, [far], W)).toMatchObject(balloonRect(500, 300, 100, 50, 1));
  });
  test("a label on the preferred side moves the balloon to the opposite side", () => {
    const above = balloonRect(500, 300, 100, 50, 1);
    const label = { x: above.x, y: above.y + 10, w: 100, h: 17 };
    const p = placeBalloon(500, 300, 100, 50, 1, [label], W);
    expect(p).toMatchObject(balloonRect(500, 300, 100, 50, -1));
  });
  test("labels on both sides shift the balloon sideways, clear of them", () => {
    const up = balloonRect(500, 300, 100, 50, 1);
    const down = balloonRect(500, 300, 100, 50, -1);
    const labels = [
      { x: 450, y: up.y + 10, w: 100, h: 17 },
      { x: 450, y: down.y + 10, w: 100, h: 17 },
    ];
    const p = placeBalloon(500, 300, 100, 50, 1, labels, W);
    const box = { x: p.x, y: p.y, w: 100, h: 50 };
    for (const l of labels) expect(rectsOverlap(box, l)).toBe(false);
    expect(p.x).toBeGreaterThanOrEqual(0);
    expect(p.x + 100).toBeLessThanOrEqual(W);
    expect(p.tetherX).toBeGreaterThanOrEqual(p.x);
    expect(p.tetherX).toBeLessThanOrEqual(p.x + 100);
    // the shortest move is taken
    expect(Math.abs(p.x - up.x)).toBeLessThanOrEqual(100 + LABEL_MARGIN + 100);
  });
  test("a shift never leaves the scene", () => {
    const up = balloonRect(60, 300, 100, 50, 1);
    const down = balloonRect(60, 300, 100, 50, -1);
    const labels = [
      { x: 20, y: up.y + 10, w: 90, h: 17 },
      { x: 20, y: down.y + 10, w: 90, h: 17 },
    ];
    const p = placeBalloon(60, 300, 100, 50, 1, labels, W);
    expect(p.x).toBeGreaterThanOrEqual(0);
    expect(rectsOverlap({ x: p.x, y: p.y, w: 100, h: 50 }, labels[0]!)).toBe(false);
    expect(rectsOverlap({ x: p.x, y: p.y, w: 100, h: 50 }, labels[1]!)).toBe(false);
  });
  test("direction -1 prefers below", () => {
    expect(placeBalloon(500, 300, 100, 50, -1, [], W)).toMatchObject(balloonRect(500, 300, 100, 50, -1));
  });
});

describe("textFactor", () => {
  test("is 1 at 100% and above", () => {
    expect(textFactor(14, 1, 10)).toBe(1);
    expect(textFactor(12, 1.6, 10)).toBe(1);
  });
  test("grows as the page zooms out", () => {
    expect(textFactor(12, 0.53, 10)).toBeCloseTo(10 / (12 * 0.53));
    expect(textFactor(14, 0.53, 10) * 14 * 0.53).toBeGreaterThanOrEqual(10 - 1e-9);
  });
  test("is capped at 2", () => {
    expect(textFactor(12, 0.2, 10)).toBe(2);
  });
  test("node labels use their own minimum", () => {
    expect(textFactor(15, 0.5, 9)).toBe(1.2);
  });
});
