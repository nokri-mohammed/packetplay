import { describe, expect, test } from "bun:test";
import { prefixIds } from "../src/icons.ts";

describe("prefixIds", () => {
  test("prefixes id attributes", () => {
    expect(prefixIds('<g id="a"/><g id="b_1"/>', "x")).toBe('<g id="x__a"/><g id="x__b_1"/>');
  });

  test("rewrites url(#...) references", () => {
    expect(prefixIds('<path clip-path="url(#c1)" fill="url(#g)"/>', "x")).toBe(
      '<path clip-path="url(#x__c1)" fill="url(#x__g)"/>',
    );
  });

  test("rewrites href and xlink:href fragment references", () => {
    expect(prefixIds('<use href="#a"/><use xlink:href="#b"/>', "x")).toBe(
      '<use href="#x__a"/><use xlink:href="#x__b"/>',
    );
  });

  test("leaves external hrefs alone", () => {
    const s = '<a href="https://example.com/#top"/><a xlink:href="https://example.com/a"/>';
    expect(prefixIds(s, "x")).toBe(s);
  });

  test("a full round trip keeps ids and references matching", () => {
    const out = prefixIds(
      '<defs><clipPath id="c"/><g id="s"/></defs><use href="#s" clip-path="url(#c)"/>',
      "icon",
    );
    expect(out).toBe(
      '<defs><clipPath id="icon__c"/><g id="icon__s"/></defs><use href="#icon__s" clip-path="url(#icon__c)"/>',
    );
  });

  test("does not touch data-id style attributes", () => {
    expect(prefixIds('<g data-id="a" xid="b"/>', "x")).toBe('<g data-id="a" xid="b"/>');
  });

  test("input without ids is unchanged", () => {
    expect(prefixIds('<path d="M0 0"/>', "x")).toBe('<path d="M0 0"/>');
  });
});
