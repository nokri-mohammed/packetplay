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
- The icon enum in `schema/scene.schema.json` is a static list. `test/schema.test.ts` fails if it
  drifts from `icons/isoflow/`. Update the schema and run `bun run gen:types` when icons change.
  (T-20261114-1)
