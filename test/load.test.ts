import { describe, expect, test } from "bun:test";
import { loadScene, parseScene } from "../src/load.ts";

const root = new URL("../", import.meta.url).pathname;
const ex = (name: string) => root + "examples/" + name;
const fx = (name: string) => root + "test/fixtures/" + name;

describe("loadScene", () => {
  test("yaml and json examples produce deeply equal models", async () => {
    const y = await loadScene(ex("webrtc.scene.yaml"));
    const j = await loadScene(ex("webrtc.scene.json"));
    // the optional $schema reference is not part of the model
    delete (y as any).$schema;
    delete (j as any).$schema;
    expect(y).toEqual(j);
  });

  test("loads title, nodes and four chapters from the yaml example", async () => {
    const s = await loadScene(ex("webrtc.scene.yaml"));
    expect(s.title).toBe("How a WebRTC call connects");
    expect(Object.keys(s.nodes)).toHaveLength(7);
    expect(s.chapters).toHaveLength(4);
  });

  test("rejects an unsupported extension with a clear error", async () => {
    await expect(loadScene(fx("scene.txt"))).rejects.toThrow(/\.txt/);
    await expect(loadScene(fx("scene.txt"))).rejects.toThrow(/\.yaml/);
  });

  test("malformed yaml error names the file and the line", async () => {
    await expect(loadScene(fx("malformed.scene.yaml"))).rejects.toThrow(/malformed\.scene\.yaml/);
    await expect(loadScene(fx("malformed.scene.yaml"))).rejects.toThrow(/line \d+/);
  });

  test("malformed json error names the file", async () => {
    await expect(loadScene(fx("malformed.scene.json"))).rejects.toThrow(/malformed\.scene\.json/);
  });

  test("an empty yaml file rejects with the file name", async () => {
    await expect(loadScene(fx("empty.scene.yaml"))).rejects.toThrow(
      "empty.scene.yaml: file is empty or not a scene",
    );
  });

  test("a json null file rejects with the file name", async () => {
    await expect(loadScene(fx("null.scene.json"))).rejects.toThrow(
      "null.scene.json: file is empty or not a scene",
    );
  });

  test(".yml and upper-case .YAML extensions are accepted", async () => {
    const y = await loadScene(ex("webrtc.scene.yaml"));
    expect(await loadScene(fx("lower.scene.yml"))).toEqual(y);
    expect(await loadScene(fx("upper.SCENE.YAML"))).toEqual(y);
  });

  test("a missing file rejects with an error naming the file", async () => {
    await expect(loadScene(fx("nope.scene.yaml"))).rejects.toThrow(/nope\.scene\.yaml/);
  });
});

describe("parseScene", () => {
  test("parses yaml text", () => {
    const s = parseScene("title: T\nnodes: {}\nlinks: []\nchapters: []\n", "yaml");
    expect(s.title).toBe("T");
    expect(s.links).toEqual([]);
  });

  test("parses json text", () => {
    const s = parseScene('{"title":"T","nodes":{},"links":[],"chapters":[]}', "json");
    expect(s.title).toBe("T");
  });

  test("throws on malformed yaml", () => {
    expect(() => parseScene("a: [1, 2\n", "yaml")).toThrow(/Flow sequence/);
  });

  test("throws on malformed json", () => {
    expect(() => parseScene("{nope", "json")).toThrow(/JSON Parse error/);
  });

  test("throws on empty yaml, json null and non-object json", () => {
    expect(() => parseScene("", "yaml")).toThrow("file is empty or not a scene");
    expect(() => parseScene("# just a comment\n", "yaml")).toThrow("file is empty or not a scene");
    expect(() => parseScene("null", "json")).toThrow("file is empty or not a scene");
    expect(() => parseScene("[]", "json")).toThrow("file is empty or not a scene");
  });
});
