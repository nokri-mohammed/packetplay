# T-20261114-1: Toolchain, JSON Schema and generated types (M1)

- **Owner:** general-purpose agent (implementer)
- **Project:** projects/svg-scenes
- **Opened by:** svg-scenes-manager, 2026-11-14
- **Model:** sonnet (small, well specified setup work, no design decisions)
- **Status:** open

## Goal

The repo runs `bun test` and `bun run typecheck` cleanly, and `schema/scene.schema.json` exists as the
single source of truth for the scene format, with TypeScript types generated from it.

## Context

- Plan: `docs/plans/2026-11-14-svg-scenes.md` (approved by the CEO on 2026-11-14). Read "Scene format".
- Example scenes that MUST validate against the schema: `examples/webrtc.scene.yaml` and
  `examples/webrtc.scene.json`. The yaml file's first line already points at
  `../schema/scene.schema.json`.
- Stack: Bun, TypeScript (strict). Source in `src/`, tests in `test/`, schema in `schema/`.
- Scene model (top level): `title`, `nodes`, `groups`, `links`, `tracks`, `chapters`.
  - `nodes`: id to `{ label, icon, sub?, group?, at?: [x, y] }`. `icon` is the file name stem of an
    SVG in `icons/isoflow/` (enum generated from that folder, or a documented pattern).
  - `groups`: id to `{ label }`.
  - `links`: array of `[nodeId, nodeId]`.
  - `tracks`: id to `{ label, color }`. `color` is a named colour (blue, orange, green, ...) or hex.
  - `chapters`: array of `{ title, desc?, steps }`.
  - step: `{ from, to, via?: string[], track?, label?, desc?, data?: object, at?: { <node>: { set?: object, desc?: string } }, mode?: "packet"|"flow", both?: boolean, pause?: boolean }`
    or `{ parallel: step[] }`.
- Dependencies approved by the manager for this ticket (devDependencies unless noted):
  `typescript`, `@types/bun`, `json-schema-to-typescript`. Runtime dependencies approved:
  `yaml` (parser), `ajv` (JSON Schema validation). No other new dependencies.
- Generated types go to `src/types.generated.ts` and are committed. Add `bun run gen:types`.

## Scope

- Do: `package.json` (name `svg-scenes`, MIT, type module, scripts: `test`, `typecheck`, `gen:types`),
  `tsconfig.json` (strict), `schema/scene.schema.json` (draft 2020-12, `additionalProperties: false`
  everywhere, helpful `description` on each field), the type generator script, a minimal
  `src/index.ts` that re-exports the types, and ONE test `test/schema.test.ts` proving both example
  scenes validate and one broken scene (unknown top-level key) fails.
- Do not: write the loader, validator semantics or router (tickets 3 and 4). Do not add icon packs or
  touch `icons/`. Do not commit or push (the manager does that).

## Approvals

CEO approved the design plan on 2026-11-14 ("approve"). That covers this M1 work. Commits and pushes
are done by the manager only.

## Rules

- Follow `CLAUDE.md` in the repo. Public repo: no private values, only documentation examples. No
  em dashes anywhere (code, comments, docs).
- Stay inside the scope. Report anything else in the Report.

## Validation

- `bun install && bun test && bun run typecheck` all pass, real output pasted into the Report.
- `bun run gen:types` is idempotent (running it twice leaves `git diff` empty).
- code-reviewer checks the diff (ticket 5).

## Done when

- `schema/scene.schema.json` exists and both example scenes validate against it.
- A scene with an unknown key, a step without `from`/`to`, and a link with three ids all fail.
- Types are generated and committed; `bun run typecheck` is clean.
- `./scripts/check-public.sh --all` exits 0.

## Report

Status: done

- **Did:** Added `package.json` (MIT, module, scripts `test`, `typecheck`, `gen:types`), `tsconfig.json`
  (strict), `schema/scene.schema.json` (draft 2020-12, `additionalProperties: false` everywhere, field
  descriptions, icon enum taken from the 37 files in `icons/isoflow/`), `scripts/gen-types.ts`,
  `src/index.ts` (re-exports types), generated `src/types.generated.ts`, and `test/schema.test.ts`
  (6 tests: both examples validate; unknown key, step without from/to, three-id link fail; icon enum
  matches the icons folder). Dependencies: runtime `yaml`, `ajv`; dev `typescript`, `@types/bun`,
  `json-schema-to-typescript`. Nothing committed. `bun.lock` created.
- **Verified (real output):**
  - `bun test`: `6 pass, 0 fail, 6 expect() calls`
  - `bun run typecheck`: `$ tsc --noEmit`, exit 0
  - `bun run gen:types` run twice: output identical (diff empty)
  - `./scripts/check-public.sh --all`: exit 0
- **Left / needs a decision:** The icon enum is static in the schema; the test fails if it drifts from
  `icons/isoflow/`, but there is no generator for it. The schema also allows an optional `$schema` key
  so JSON files can reference it. `tracks` and `groups` are optional, `title`, `nodes`, `links`,
  `chapters` are required. Test-first order was not followed here (setup ticket).
- **Lessons:** `Ajv2020` (`ajv/dist/2020`) is needed for draft 2020-12 schemas; default Ajv rejects them.
