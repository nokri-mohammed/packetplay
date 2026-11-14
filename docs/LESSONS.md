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
- The icon enum in `schema/scene.schema.json` is a static list. `test/schema.test.ts` fails if it
  drifts from `icons/isoflow/`. Update the schema and run `bun run gen:types` when icons change.
  (T-20261114-1)
