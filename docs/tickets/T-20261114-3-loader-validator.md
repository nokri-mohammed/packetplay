# T-20261114-3: Implement loader and validator (M1)

- **Owner:** general-purpose agent (implementer)
- **Project:** projects/packetplay
- **Opened by:** packetplay-manager, 2026-11-14
- **Model:** sonnet (clear spec and tests, no design decisions)
- **Status:** open (starts after T-20261114-2 is done)

## Goal

`test/load.test.ts` and `test/validate.test.ts` pass, with `src/load.ts` and `src/validate.ts`
implemented exactly to the API in T-20261114-2.

## Context

- Read first: T-20261114-1 and T-20261114-2 (including their Reports), the plan section "Pipeline".
- Use `yaml` for YAML, `JSON.parse` for JSON, `ajv` with `schema/scene.schema.json` for schema checks.
- Validator order: schema issues first, then semantic issues. Convert ajv errors into plain
  `{ path, message }` issues a non-expert can read (no raw JSON pointer jargon in `message`).
- Messages are part of the product: keep them specific, for example
  `chapter 2, step 1: node "stn" does not exist`.

## Scope

- Do: implement `src/load.ts` and `src/validate.ts`, export from `src/index.ts`. Make the M1 loader
  and validator tests pass without weakening them.
- Do not: change the tests to make them pass (if a test is wrong, say so in the Report). Do not
  implement the router (ticket 4). No new dependencies. No commit.

## Approvals

CEO approved the design plan on 2026-11-14.

## Rules

- Follow `CLAUDE.md` in the repo. No private values, no em dashes.

## Validation

- `bun test test/load.test.ts test/validate.test.ts` and `bun run typecheck`, real output in the Report.
- code-reviewer checks the diff (ticket 5).

## Done when

- All loader and validator tests pass, typecheck is clean.
- `./scripts/check-public.sh --all` exits 0.

## Report

Status: done

- **Did:** Added `src/load.ts` (`parseScene(text, "yaml"|"json")`, `loadScene(path)`; errors name the file, YAML errors give `line N`, unsupported extension names the extension and `.yaml`) and `src/validate.ts` (`validateScene(unknown): Issue[]`, ajv 2020 on `schema/scene.schema.json`; schema issues first, then semantic issues; never throws). Message wording follows ticket 2's Report exactly. Appended two `export *` lines to `src/index.ts`. Tests unchanged. Nothing committed.
- **Verified (real output):**
  - `bun test test/load.test.ts test/validate.test.ts`: `28 pass, 0 fail, 51 expect() calls`
  - `bun run typecheck`: `$ tsc --noEmit`, exit 0 (after the router agent added `allowImportingTsExtensions` to tsconfig; before that, `.ts` import paths in tests gave TS5097)
  - `./scripts/check-public.sh --all`: exit 0; no em dashes in the new files
- **Left / needs a decision:** The "no route" check in the validator uses its own small undirected BFS over `links`, not `src/route.ts`, to avoid depending on the router that was being written in parallel. It checks each leg of `from, via..., to`. The manager may prefer to reuse `routeStep` later (ticket 5 review). Schema messages are plain sentences with a dotted path, for example `"chapters[0].steps[0]": unknown key "x"`.
- **Lessons:** TypeScript 7 requires `allowImportingTsExtensions` when tests import `../src/x.ts`.
