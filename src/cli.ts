#!/usr/bin/env bun
import { writeFile } from "node:fs/promises";
import { basename, dirname, extname, join } from "node:path";
import { stringify as toYaml } from "yaml";
import { iconNames } from "./icons.ts";
import { loadScene } from "./load.ts";
import { buildHtml } from "./page.ts";
import { validateScene } from "./validate.ts";
import type { Scene } from "./types.generated.ts";

const USAGE = `Usage:
  packetplay build <file> [-o <out.html>] [--json]
  packetplay validate <file> [--json]
  packetplay convert <file> --to json|yaml [-o <out>]
  packetplay icons
  packetplay --help

build     Turn a scene file (.yaml, .yml or .json) into one self-contained HTML page.
validate  Check a scene file and write no HTML.
convert   Write the same scene as JSON or YAML (stdout when no -o is given).
icons     List the icon names a scene can use, one per line.
--json    With build or validate, print one JSON object instead of text.
`;

class UsageError extends Error {}

interface Parsed {
  positional: string[];
  out?: string;
  to?: string;
  json?: boolean;
}

function parseArgs(args: string[]): Parsed {
  const p: Parsed = { positional: [] };
  for (let i = 0; i < args.length; i++) {
    const a = args[i] as string;
    if (a === "-o" || a === "--out") {
      const v = args[++i];
      if (v === undefined) throw new UsageError(`${a} needs a file name`);
      p.out = v;
    } else if (a === "--to") {
      const v = args[++i];
      if (v === undefined) throw new UsageError("--to needs json or yaml");
      p.to = v;
    } else if (a === "--json") {
      p.json = true;
    } else if (a.startsWith("-")) {
      throw new UsageError(`unknown option ${a}`);
    } else {
      p.positional.push(a);
    }
  }
  return p;
}

/** A failed load or validation: the lines to show, in the same wording for text and JSON. */
class SceneProblems extends Error {
  constructor(readonly issues: { message: string; path?: string }[]) {
    super(issues.map((i) => i.message).join("\n"));
  }
}

async function loadValid(file: string): Promise<Scene> {
  const scene = await loadScene(file);
  const issues = validateScene(scene);
  if (issues.length > 0) {
    throw new SceneProblems(issues.map((i) => ({ message: `${file}: ${i.message}`, path: i.path })));
  }
  return scene;
}

/** Count steps, with each child of a parallel block counted as one step. */
function countSteps(scene: Scene): number {
  let n = 0;
  for (const c of scene.chapters) {
    for (const s of c.steps as unknown as { parallel?: unknown[] }[]) {
      n += Array.isArray(s.parallel) ? s.parallel.length : 1;
    }
  }
  return n;
}

function serialize(scene: Scene, to: "json" | "yaml"): string {
  if (to === "json") return JSON.stringify(scene, null, 2) + "\n";
  const { $schema, ...rest } = scene as Scene & { $schema?: unknown };
  const head = typeof $schema === "string" ? `# yaml-language-server: $schema=${$schema}\n` : "";
  return head + toYaml(rest);
}

async function main(argv: string[]): Promise<number> {
  const [cmd, ...rest] = argv;
  if (cmd === "--help" || cmd === "-h") {
    console.log(USAGE);
    return 0;
  }
  let jsonMode = false;
  try {
    if (cmd === "build") {
      const a = parseArgs(rest);
      const file = a.positional[0];
      if (!file || a.positional.length > 1) throw new UsageError("build needs one scene file");
      jsonMode = a.json === true;
      const out = a.out ?? join(dirname(file), basename(file, extname(file)) + ".html");
      const scene = await loadValid(file);
      const html = await buildHtml(scene);
      await writeFile(out, html);
      if (a.json) console.log(JSON.stringify({ ok: true, title: scene.title, nodes: Object.keys(scene.nodes).length, steps: countSteps(scene), out }));
      else console.log(`Wrote ${out} (${Buffer.byteLength(html)} bytes)`);
      return 0;
    }
    if (cmd === "validate") {
      const a = parseArgs(rest);
      const file = a.positional[0];
      if (!file || a.positional.length > 1) throw new UsageError("validate needs one scene file");
      if (a.out || a.to) throw new UsageError("validate takes only a scene file and --json");
      jsonMode = a.json === true;
      const scene = await loadValid(file);
      const nodes = Object.keys(scene.nodes).length;
      const steps = countSteps(scene);
      if (a.json) console.log(JSON.stringify({ ok: true, title: scene.title, nodes, steps }));
      else console.log(`ok: ${scene.title} (${nodes} nodes, ${steps} steps)`);
      return 0;
    }
    if (cmd === "icons") {
      if (rest.length > 0) throw new UsageError("icons takes no arguments");
      for (const n of iconNames()) console.log(n);
      return 0;
    }
    if (cmd === "convert") {
      const a = parseArgs(rest);
      const file = a.positional[0];
      if (!file || a.positional.length > 1) throw new UsageError("convert needs one scene file");
      if (a.json) throw new UsageError("--json works only with build and validate");
      if (a.to !== "json" && a.to !== "yaml") throw new UsageError("convert needs --to json or --to yaml");
      const text = serialize(await loadValid(file), a.to);
      if (a.out) {
        await writeFile(a.out, text);
        console.log(`Wrote ${a.out}`);
      } else {
        process.stdout.write(text);
      }
      return 0;
    }
    throw new UsageError(cmd ? `unknown command "${cmd}"` : "missing command");
  } catch (e) {
    if (e instanceof UsageError) {
      console.error(`${e.message}\n\n${USAGE}`);
      return 2;
    }
    const issues = e instanceof SceneProblems ? e.issues : [{ message: (e as Error).message }];
    if (jsonMode) console.log(JSON.stringify({ ok: false, issues }));
    else for (const i of issues) console.error(i.message);
    return 1;
  }
}

process.exit(await main(process.argv.slice(2)));
