# Lessons

- Validate with `Ajv2020` (`import Ajv2020 from "ajv/dist/2020"`). The default Ajv class rejects
  draft 2020-12 schemas. (T-20261114-1)
- The icon enum in `schema/scene.schema.json` is a static list. `test/schema.test.ts` fails if it
  drifts from `icons/isoflow/`. Update the schema and run `bun run gen:types` when icons change.
  (T-20261114-1)
