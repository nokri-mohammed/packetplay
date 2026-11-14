import { describe, expect, test } from "bun:test";
import { packetRows, packetTitle } from "../src/player-core.ts";

describe("packetRows", () => {
  test("no data gives no rows", () => {
    expect(packetRows({})).toEqual([]);
  });

  test("two keys give two rows in insertion order, values through String()", () => {
    expect(packetRows({ room: 42, ok: true })).toEqual(["room: 42", "ok: true"]);
  });

  test("exactly 4 keys give 4 rows and no more-row", () => {
    expect(packetRows({ a: 1, b: 2, c: 3, d: 4 })).toEqual(["a: 1", "b: 2", "c: 3", "d: 4"]);
  });

  test("6 keys give 4 rows then +2 more", () => {
    expect(packetRows({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 })).toEqual(["a: 1", "b: 2", "c: 3", "d: 4", "+2 more"]);
  });

  test("a row longer than 26 characters is cut to 26 with an ellipsis", () => {
    const row = packetRows({ payload: "abcdefghijklmnopqrstuvwxyz" })[0] as string;
    expect(row).toBe("payload: abcdefghijklmnop…");
    expect(row.length).toBe(26);
  });

  test("a row of exactly 26 characters is kept", () => {
    expect(packetRows({ k: "a".repeat(23) })).toEqual(["k: " + "a".repeat(23)]);
  });

  test("objects are written with JSON.stringify", () => {
    expect(packetRows({ ice: { a: 1 } })).toEqual(['ice: {"a":1}']);
  });

  test("maxRows and maxChars can be changed", () => {
    expect(packetRows({ a: 1, b: 2, c: 3 }, 2, 4)).toEqual(["a: 1", "b: 2", "+1 more"]);
    expect(packetRows({ abc: "defgh" }, 4, 6)).toEqual(["abc: …"]);
  });
});

describe("packetTitle", () => {
  test("keeps 22 characters, cuts longer labels with an ellipsis", () => {
    expect(packetTitle("a".repeat(22))).toBe("a".repeat(22));
    expect(packetTitle("a".repeat(23))).toBe("a".repeat(21) + "…");
  });
});
