#!/usr/bin/env bun
import { writeFile } from "node:fs/promises";
import { basename, dirname, extname, join } from "node:path";
import { stringify as toYaml } from "yaml";
import { loadScene } from "./load.ts";
import { buildHtml } from "./page.ts";
import { validateScene } from "./validate.ts";
import type { Scene } from "./types.generated.ts";

const USAGE = `Usage:
  packetplay build <file> [-o <out.html>]
  packetplay convert <file> --to json|yaml [-o <out>]
  packetplay --help

build    Turn a scene file (.yaml, .yml or .json) into one self-contained HTML page.
convert  Write the same scene as JSON or YAML (stdout when no -o is given).
`;

class UsageError extends Error {}

interface Parsed {
  positional: string[];
  out?: string;
  to?: string;
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
    } else if (a.startsWith("-")) {
      throw new UsageError(`unknown option ${a}`);
    } else {
      p.positional.push(a);
    }
  }
  return p;
}

async function loadValid(file: string): Promise<Scene> {
  const scene = await loadScene(file);
  const issues = validateScene(scene);
  if (issues.length > 0) {
    for (const i of issues) console.error(`${file}: ${i.message}`);
    process.exit(1);
  }
  return scene;
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
  try {
    if (cmd === "build") {
      const a = parseArgs(rest);
      const file = a.positional[0];
      if (!file || a.positional.length > 1) throw new UsageError("build needs one scene file");
      const out = a.out ?? join(dirname(file), basename(file, extname(file)) + ".html");
      const scene = await loadValid(file);
      const html = await buildHtml(scene);
      await writeFile(out, html);
      console.log(`Wrote ${out} (${Buffer.byteLength(html)} bytes)`);
      return 0;
    }
    if (cmd === "convert") {
      const a = parseArgs(rest);
      const file = a.positional[0];
      if (!file || a.positional.length > 1) throw new UsageError("convert needs one scene file");
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
    console.error((e as Error).message);
    return 1;
  }
}

process.exit(await main(process.argv.slice(2)));
