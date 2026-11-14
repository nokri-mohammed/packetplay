import { readFile } from "node:fs/promises";
import { basename, extname } from "node:path";
import { parse as parseYaml, YAMLParseError } from "yaml";
import type { Scene } from "./types.generated.ts";

export type SceneFormat = "yaml" | "json";

/** Parse scene text. Throws on malformed input. Does not validate the model. */
export function parseScene(text: string, format: SceneFormat): Scene {
  const value: unknown = format === "json" ? JSON.parse(text) : parseYaml(text);
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error("file is empty or not a scene");
  }
  return value as Scene;
}

/** Read a .yaml, .yml or .json scene file and return its model. */
export async function loadScene(path: string): Promise<Scene> {
  const name = basename(path);
  const ext = extname(path).toLowerCase();
  let format: SceneFormat;
  if (ext === ".yaml" || ext === ".yml") format = "yaml";
  else if (ext === ".json") format = "json";
  else {
    throw new Error(
      `${name}: unsupported file type "${ext || "(none)"}". Use .yaml, .yml or .json.`,
    );
  }

  let text: string;
  try {
    text = await readFile(path, "utf8");
  } catch (e) {
    throw new Error(`${name}: cannot read file (${(e as NodeJS.ErrnoException).code ?? "error"})`);
  }

  try {
    return parseScene(text, format);
  } catch (e) {
    if ((e as Error).message === "file is empty or not a scene") {
      throw new Error(`${name}: file is empty or not a scene`);
    }
    if (e instanceof YAMLParseError) {
      const line = e.linePos?.[0]?.line;
      const where = line ? `line ${line}` : "unknown line";
      throw new Error(`${name}: invalid YAML at ${where}: ${e.message.split("\n")[0]}`);
    }
    throw new Error(`${name}: invalid JSON: ${(e as Error).message}`);
  }
}
