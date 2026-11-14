import { readFileSync } from "node:fs";
import Ajv2020 from "ajv/dist/2020";
import type { ErrorObject } from "ajv";
import { routeStep } from "./route.ts";
import type { Scene, Step } from "./types.generated.ts";

export interface Issue {
  /** Where the problem is, for example `chapters[1].steps[0].from`. */
  path: string;
  /** A sentence a non-expert can read. */
  message: string;
}

const schema = JSON.parse(
  readFileSync(new URL("../schema/scene.schema.json", import.meta.url), "utf8"),
);
const ajv = new Ajv2020({ allErrors: true, strict: true });
const check = ajv.compile(schema);

function pathOf(ptr: string): string {
  return ptr
    .split("/")
    .slice(1)
    .map((p) => p.replace(/~1/g, "/").replace(/~0/g, "~"))
    .reduce((acc, p) => (/^\d+$/.test(p) ? `${acc}[${p}]` : acc ? `${acc}.${p}` : p), "");
}

function where(ptr: string): string {
  const p = pathOf(ptr);
  return p ? `"${p}"` : "the scene";
}

function describe(e: ErrorObject): string {
  const at = where(e.instancePath);
  const p = e.params as Record<string, unknown>;
  switch (e.keyword) {
    case "additionalProperties":
      return `${at}: unknown key "${p.additionalProperty}"`;
    case "required":
      return `${at}: missing required key "${p.missingProperty}"`;
    case "type":
      return `${at}: must be of type ${p.type}`;
    case "enum":
      return `${at}: must be one of ${(p.allowedValues as unknown[]).join(", ")}`;
    case "minItems":
      return `${at}: must have at least ${p.limit} item${p.limit === 1 ? "" : "s"}`;
    case "maxItems":
      return `${at}: must have at most ${p.limit} items`;
    case "oneOf":
      return `${at}: is neither a valid step nor a valid parallel block`;
    default:
      return `${at}: ${e.message ?? "is invalid"}`;
  }
}

function schemaIssues(scene: unknown): Issue[] {
  if (check(scene)) return [];
  const errors = check.errors ?? [];
  const out: Issue[] = [];
  const seen = new Set<string>();
  const add = (path: string, message: string) => {
    const key = path + "|" + message;
    if (!seen.has(key)) {
      seen.add(key);
      out.push({ path, message });
    }
  };
  for (const e of errors) {
    if (e.keyword === "oneOf") continue; // the branch errors below are more specific
    add(pathOf(e.instancePath), describe(e));
  }
  // A parallel block with no children shows up only as branch errors; make sure it is named.
  for (const e of errors) {
    if (e.keyword === "oneOf") add(pathOf(e.instancePath), describe(e));
  }
  return out;
}

const NAMED_COLORS = new Set(["blue", "orange", "green", "red", "purple", "yellow", "pink", "teal", "gray"]);

type Obj = Record<string, any>;
const isObj = (v: unknown): v is Obj => typeof v === "object" && v !== null && !Array.isArray(v);

function semanticIssues(scene: Obj): Issue[] {
  const issues: Issue[] = [];
  const nodes: Obj = isObj(scene.nodes) ? scene.nodes : {};
  const groups: Obj = isObj(scene.groups) ? scene.groups : {};
  const tracks: Obj = isObj(scene.tracks) ? scene.tracks : {};
  const has = (o: Obj, k: unknown) => typeof k === "string" && Object.hasOwn(o, k);

  for (const [id, n] of Object.entries(nodes)) {
    if (isObj(n) && n.group !== undefined && !has(groups, n.group)) {
      issues.push({ path: `nodes.${id}.group`, message: `node "${id}": group "${n.group}" does not exist` });
    }
  }

  for (const [id, t] of Object.entries(tracks)) {
    const c = isObj(t) ? t.color : undefined;
    if (typeof c === "string" && !NAMED_COLORS.has(c) && !/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(c)) {
      issues.push({
        path: `tracks.${id}.color`,
        message: `track "${id}": colour "${c}" is not a named colour or a hex value`,
      });
    }
  }

  const links: unknown[] = Array.isArray(scene.links) ? scene.links : [];
  links.forEach((l, i) => {
    if (!Array.isArray(l)) return;
    const k = i + 1;
    l.forEach((id, j) => {
      if (!has(nodes, id)) {
        issues.push({ path: `links[${i}][${j}]`, message: `link ${k}: node "${id}" does not exist` });
      }
    });
    const [a, b] = l;
    if (a === b && has(nodes, a)) {
      issues.push({ path: `links[${i}]`, message: `link ${k}: node "${a}" is linked to itself` });
    }
  });

  // Routing is only safe when every link is a pair of existing node ids.
  const linksOk =
    Array.isArray(scene.links) &&
    scene.links.every((l: unknown) => Array.isArray(l) && l.length === 2 && l.every((id) => has(nodes, id)));

  const checkStep = (step: Obj, ch: number, st: number, base: string) => {
    const label = `chapter ${ch + 1}, step ${st + 1}`;
    let ok = true;
    const ends: unknown[] = [step.from, step.to];
    ["from", "to"].forEach((key, idx) => {
      if (!has(nodes, ends[idx])) {
        ok = false;
        issues.push({ path: `${base}.${key}`, message: `${label}: node "${ends[idx]}" does not exist` });
      }
    });
    if (step.track !== undefined && !has(tracks, step.track)) {
      issues.push({ path: `${base}.track`, message: `${label}: track "${step.track}" does not exist` });
    }
    const via: unknown[] = Array.isArray(step.via) ? step.via : [];
    via.forEach((v, i) => {
      if (!has(nodes, v)) {
        ok = false;
        issues.push({ path: `${base}.via[${i}]`, message: `${label}: via node "${v}" does not exist` });
      }
    });
    if (!ok) return;
    if (step.from === step.to) {
      issues.push({ path: base, message: `${label}: from and to are the same node "${step.from}"` });
      return;
    }
    if (!linksOk) return;
    try {
      routeStep(scene as unknown as Scene, step as unknown as Step);
    } catch (e) {
      issues.push({ path: base, message: `${label}: ${(e as Error).message}` });
    }
  };

  const chapters: unknown[] = Array.isArray(scene.chapters) ? scene.chapters : [];
  chapters.forEach((c, ci) => {
    if (!isObj(c) || !Array.isArray(c.steps)) return;
    c.steps.forEach((s: unknown, si: number) => {
      if (!isObj(s)) return;
      const base = `chapters[${ci}].steps[${si}]`;
      if (Array.isArray(s.parallel)) {
        s.parallel.forEach((child: unknown, k: number) => {
          if (isObj(child)) checkStep(child, ci, si, `${base}.parallel[${k}]`);
        });
      } else {
        checkStep(s, ci, si, base);
      }
    });
  });

  return issues;
}

/** Check a scene model. Schema issues come first, then semantic issues. Never throws. */
export function validateScene(scene: unknown): Issue[] {
  const issues = schemaIssues(scene);
  if (isObj(scene)) {
    try {
      issues.push(...semanticIssues(scene));
    } catch {
      /* schema issues already describe a malformed shape */
    }
  }
  return issues;
}
