import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { parse } from "yaml";
import type { Scene, Step } from "../src/index.ts";
import { routeStep } from "../src/route.ts";

const root = new URL("../", import.meta.url).pathname;
const example = (): Scene => parse(readFileSync(root + "examples/webrtc.scene.yaml", "utf8"));

const mk = (links: [string, string][], ids = ["a", "b", "c", "d", "e"]): Scene => ({
  title: "T",
  nodes: Object.fromEntries(ids.map((id) => [id, { label: id, icon: "server" }])) as Scene["nodes"],
  links,
  chapters: [],
});

describe("routeStep on the webrtc example", () => {
  test("client -> sig is the shortest path", () => {
    expect(routeStep(example(), { from: "client", to: "sig" } as Step)).toEqual(["client", "r1", "net", "sig"]);
  });

  test("client -> sam via sig passes through sig and doubles back", () => {
    expect(routeStep(example(), { from: "client", to: "sam", via: ["sig"] } as Step)).toEqual([
      "client", "r1", "net", "sig", "net", "r2", "sam",
    ]);
  });

  test("client -> sam without via is the direct shortest path", () => {
    expect(routeStep(example(), { from: "client", to: "sam" } as Step)).toEqual([
      "client", "r1", "net", "r2", "sam",
    ]);
  });
});

describe("routeStep: shortest path", () => {
  test("links are undirected", () => {
    const s = mk([["a", "b"], ["b", "c"]]);
    expect(routeStep(s, { from: "c", to: "a" } as Step)).toEqual(["c", "b", "a"]);
  });

  test("picks fewer hops over more hops", () => {
    const s = mk([["a", "b"], ["b", "c"], ["c", "d"], ["a", "d"]]);
    expect(routeStep(s, { from: "a", to: "d" } as Step)).toEqual(["a", "d"]);
  });

  test("adjacent nodes give a two node path", () => {
    const s = mk([["a", "b"]]);
    expect(routeStep(s, { from: "a", to: "b" } as Step)).toEqual(["a", "b"]);
  });

  test("ties are broken by the first declared link", () => {
    // two equal paths a-b-d and a-c-d; a-b is declared first
    const first = mk([["a", "b"], ["a", "c"], ["b", "d"], ["c", "d"]]);
    expect(routeStep(first, { from: "a", to: "d" } as Step)).toEqual(["a", "b", "d"]);
    // same graph, a-c declared first
    const second = mk([["a", "c"], ["a", "b"], ["c", "d"], ["b", "d"]]);
    expect(routeStep(second, { from: "a", to: "d" } as Step)).toEqual(["a", "c", "d"]);
  });

  test("is deterministic across repeated calls", () => {
    const s = mk([["a", "b"], ["a", "c"], ["b", "d"], ["c", "d"]]);
    const first = routeStep(s, { from: "a", to: "d" } as Step);
    for (let i = 0; i < 5; i++) expect(routeStep(s, { from: "a", to: "d" } as Step)).toEqual(first);
  });
});

describe("routeStep: via", () => {
  test("via forces the path through each node in order", () => {
    const s = mk([["a", "b"], ["b", "c"], ["c", "d"], ["a", "d"]]);
    expect(routeStep(s, { from: "a", to: "d", via: ["b", "c"] } as Step)).toEqual(["a", "b", "c", "d"]);
  });

  test("via order matters", () => {
    const s = mk([["a", "b"], ["b", "c"], ["c", "d"], ["d", "e"]]);
    expect(routeStep(s, { from: "a", to: "e", via: ["d", "b"] } as Step)).toEqual([
      "a", "b", "c", "d", "c", "b", "c", "d", "e",
    ]);
  });

  test("each sub-path between via nodes is the shortest one", () => {
    const s = mk([["a", "b"], ["b", "c"], ["a", "c"], ["c", "d"]]);
    expect(routeStep(s, { from: "a", to: "d", via: ["b"] } as Step)).toEqual(["a", "b", "c", "d"]);
  });
});

describe("routeStep: errors", () => {
  test("from equal to to is an error", () => {
    const s = mk([["a", "b"]]);
    expect(() => routeStep(s, { from: "a", to: "a" } as Step)).toThrow('from and to are the same node "a"');
  });

  test("no route names both nodes", () => {
    const s = mk([["a", "b"]]);
    expect(() => routeStep(s, { from: "a", to: "d" } as Step)).toThrow('no route from "a" to "d"');
  });

  test("no route between via nodes names the pair that cannot be joined", () => {
    const s = mk([["a", "b"], ["c", "d"]]);
    expect(() => routeStep(s, { from: "a", to: "d", via: ["b"] } as Step)).toThrow('no route from "b" to "d"');
  });
});
