# Lessons

- Validate with `Ajv2020` (`import Ajv2020 from "ajv/dist/2020"`). The default Ajv class rejects
  draft 2020-12 schemas. (T-20261114-1)
- Tests and `src/index.ts` import with `.ts` extensions, so `tsconfig.json` needs
  `allowImportingTsExtensions: true` (valid with `noEmit`). Without it `tsc` gives TS5097.
  (T-20261114-3 and 4)
- When two implementers run in parallel, tell each to append only its own lines to shared files
  such as `src/index.ts`. It worked cleanly in M1. A shared config fix is the manager's job.
- Bun reports a missing import as one error per test file, not per test. Per-test red only appears
  once stubs exist. (T-20261114-2)
- When one module consumes another that is built in parallel, the second implementer wrote a
  private copy of the routing logic (found in review, fixed in T-20261114-6). Next time: build the
  shared module first, or give the second ticket a stub to call. (T-20261114-5)
- Tests that only assert "some issue exists" or use a bare `toThrow()` are weak. Ask tdd-guide to
  assert exact messages and paths. (T-20261114-5)
- Reviewer line numbers can be wrong. Check each finding against the real file before ticketing.
  (T-20261114-5)
- Deferred: steps inside a `parallel` block share the block's "chapter N, step M" label, so two bad
  children give the same message and differ only in `path`. Revisit in M3. (T-20261114-5)
- tdd-guide must run `bun run typecheck` on its tests before handing over (`noUncheckedIndexedAccess`
  broke about 60 lines in M2), count fixtures with the same filter as the code (`*.svg`, not
  `ls | wc -l`), and check fractional or rounding cases by hand against the spec formula. Three test
  bugs in M2 came from skipping this. (T-20261114-7)
- Only `icons/isoflow/block.svg` has a `<style>` block (classes `.st0` to `.st5`, not scoped). Safe
  today, but it would clash if another icon with a style block joined the same page. Scope or
  inline the styles if more such icons are added. (T-20261114-9)
- The static SVG has no `<style>` (a test forbids it): styling uses presentation attributes
  (`fill="currentColor"` and so on). Player CSS lives in the HTML page around the SVG, never inside
  it. When a ticket and a frozen test disagree the test wins, so read the test regexes before
  writing structure advice. (T-20261114-10)
- Schema bounds only reach the validator through the schema, so a one-line `minimum` plus a
  `validateScene` test covers both layers. Write control characters in tests as `\u` escapes.
  (T-20261114-12)
- Never write the literal text `## Report` in a ticket body: an agent's edit of the Report section
  matched it and overwrote the ticket (T-20261114-12, repaired by the manager). Refer to "the Report
  section" in words instead.
- CEO rule (2026-11-14): when the CEO says he will test the product himself, skip tester and
  reviewer agents and browser automation. Keep only a small smoke test. (T-20261114-14)
- Typecheck does not flag unused imports (no `noUnusedLocals`), so check imports by hand. A box drawn on the lane point covers the icons at every node: draw info boxes as a balloon with a gap of at least half the icon size. (T-20261114-18)
- The icon enum in `schema/scene.schema.json` is a static list. `test/schema.test.ts` fails if it
  drifts from `icons/isoflow/`. Update the schema and run `bun run gen:types` when icons change.
  (T-20261114-1)
- A step needs `from != to`, so a same-node action (typing, crossing a cable) cannot be its own step: model it as a hop from a neighbour node or describe it in the next step's desc. (T-20261114-19 and 20)
- A plain YAML scalar value (for example `desc:`) must not contain `: `, or the parser fails; use quotes or reword. Groups on a chain of nodes come out as adjacent bands sharing an edge. (T-20261114-21)
- A ticket line "other examples build unchanged" should mean scene, layout and timing, not byte size: adding timeline fields changes page JSON for every example. (T-20261114-22)
- The "used before revealed" check needs the routed path, so route validation returns its path. A back lane is already drawn in its own travel direction, so one dash offset serves both lanes of a `both` step. (T-20261114-22)
- Packet endpoints and the drawn arrow must be the same points, so lane geometry lives in one `lanes.ts` helper (`lanePacketEnds`). Restore a line's attributes from a snapshot taken at load rather than recomputing the base values. Arrowhead colour per track is open (needs `context-stroke` or a marker per track). (T-20261114-23)
- `test/build.test.ts` counts `data-node=` over the whole page including bundled player code: select with `querySelectorAll("g[data-node]")`. Hand-built `StepTL` fixtures in tests need `typingMs` (else NaN). A caret blink test needs about 10 characters. `frameAt` must skip the packet while typing because `hopAt` falls back to hop 0. (T-20261114-24)
- Shake and pop share one node transform string (`translate` then `scale`, same pivot). On a `both` step only the forward dot jumps to the far side; the return packet keeps its position (open, not yet asked for). (T-20261114-25)
- Hop time is now `durMs = max(HOP_MIN_MS, round(len / HOP_SPEED))` from the trimmed arrow length, so run times depend on the layout: every layout change needs the exact test totals recomputed. In a `both` step mirrored hops share the larger duration. Flow steps still use `FLOW_MS` (speed not constant on long routes). In tests, a hop between nodes 200 px apart is 112 px (not 88: that is the gap between two hops). (T-20261114-27)
- Plush UI (plush-ui.pages.dev) is React, shadcn and Radix on Tailwind v4 (MIT): it cannot go into the single-file, zero-dependency page, so the look is ported as plain CSS tokens and inline SVG icons. Any attribute text (title, aria) counts as page text for tests that forbid a string. (T-20261114-28)
- Fixtures that are copies of an example (`test/fixtures/lower.scene.yml`, `upper.SCENE.YAML`) must be updated together with it. The version check lives in `parseScene` (custom error class so `loadScene` can add the file name). Piping a script to `tail` hides its exit code: check `$?` separately. (T-20261114-29)
- The skill ships as a Claude Code plugin from the repo root: `.claude-plugin/plugin.json` and `marketplace.json` (source `./`), skill at `skills/packetplay/`. Install: `/plugin marketplace add nokri-mohammed/packetplay`, `/plugin install packetplay@packetplay`. `skills/packetplay/packetplay.js` is committed output: rerun `bun run build:skill` whenever `src/` changes (a freshness test could be added). `claude plugin validate .` checks the manifests. MCP over stdio needs no port; HTTP does. (T-20261114-30)
- Release flow (0.9.0 done): push to main, release-please keeps a release PR, merging it tags and creates the GitHub release. Force a version with a `Release-As: x.y.z` footer on an empty `chore: release` commit. Once plugin.json carries a version, plugin users only get updates on a new release version. npm stays off: package.json is private. (T-20261114-30 follow-up)
