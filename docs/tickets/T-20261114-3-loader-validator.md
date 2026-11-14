# T-20261114-3: Implement loader and validator (M1)

- **Owner:** general-purpose agent (implementer)
- **Project:** projects/svg-scenes
- **Opened by:** svg-scenes-manager, 2026-11-14
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

<The agent fills this in when finished. Add the line `Status: done` (or `blocked`) at the top of
this section, then:>

- **Did:**
- **Verified (real output):**
- **Left / needs a decision:**
- **Lessons:**
