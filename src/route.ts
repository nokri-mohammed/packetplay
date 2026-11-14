import type { Scene, Step } from "./types.generated.ts";

/** Shortest path by hop count over undirected links; ties follow link declaration order. */
function shortest(adj: Map<string, string[]>, from: string, to: string): string[] {
  const prev = new Map<string, string>();
  const seen = new Set<string>([from]);
  const queue: string[] = [from];
  for (let i = 0; i < queue.length; i++) {
    const cur = queue[i] as string;
    if (cur === to) break;
    for (const next of adj.get(cur) ?? []) {
      if (seen.has(next)) continue;
      seen.add(next);
      prev.set(next, cur);
      queue.push(next);
    }
  }
  if (!seen.has(to)) throw new Error(`no route from "${from}" to "${to}"`);
  const path = [to];
  for (let n = to; n !== from; ) {
    n = prev.get(n) as string;
    path.push(n);
  }
  return path.reverse();
}

/**
 * Node path for a step: from, through each `via` node in order, to `to`.
 * Assumes every node id exists (validation runs first); an unknown id surfaces as "no route".
 */
export function routeStep(scene: Scene, step: Step): string[] {
  if (step.from === step.to) throw new Error(`from and to are the same node "${step.from}"`);
  const adj = new Map<string, string[]>();
  const add = (a: string, b: string) => {
    const list = adj.get(a);
    if (list) list.push(b);
    else adj.set(a, [b]);
  };
  for (const [a, b] of scene.links) {
    add(a, b);
    add(b, a);
  }
  const stops = [step.from, ...(step.via ?? []), step.to];
  const path: string[] = [stops[0] as string];
  for (let i = 1; i < stops.length; i++) {
    path.push(...shortest(adj, stops[i - 1] as string, stops[i] as string).slice(1));
  }
  return path;
}
