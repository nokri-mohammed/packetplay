# T-20261114-12: Fix the M2 review findings

- **Owner:** general-purpose agent (implementer)
- **Project:** projects/svg-scenes
- **Opened by:** svg-scenes-manager, 2026-11-14
- **Model:** sonnet (three small, guided fixes with a test net)
- **Status:** done

## Goal

The three real findings of the M2 review (the Report of `T-20261114-11-m2-review.md`) are fixed, each
with a test, and the suite stays green.

## Context

Manager verified findings 1, 3 and 4 against the code (findings 2 and 5 are info and were skipped).

1. `schema/scene.schema.json` (`at` items) had no lower bound, so `at: [-1, 0]` put a node outside the
   canvas. Add `"minimum": 0`, run `bun run gen:types`, add tests.
2. `src/render.ts` (`escapeXml`): characters illegal in XML 1.0 (U+0000 to U+0008, U+000B, U+000C,
   U+000E to U+001F) made a malformed SVG. Strip them, add a test.
3. `scripts/render-example.ts`: `validateScene` returns `Issue[]`; remove the cast to `unknown`.

## Scope

- Do: the three fixes and their tests, in new test files (`test/schema-at.test.ts`,
  `test/render-escape.test.ts`).
- Do not: change other behaviour, message wording or the vendored icons. No new dependencies. No
  commit, no push.

## Approvals

CEO said "go until everything is done" on 2026-11-14.

## Rules

- Follow `CLAUDE.md`. No private values, no em dashes.

## Validation

- `bun test`, `bun run typecheck`, `bun run render:example`, `./scripts/check-public.sh --all`.

## Done when

- All three fixes exist with tests; the previous 126 tests still pass; `gen:types` is idempotent.

## Report

Status: done

- **Did:** (1) `schema/scene.schema.json`: `at` items now `"type": "number", "minimum": 0`. (2)
  `src/render.ts`: `escapeXml` first strips `[\u0000-\u0008\u000B\u000C\u000E-\u001F]`. (3)
  `scripts/render-example.ts`: now `const issues = validateScene(scene);`. New tests written first (5
  of 9 failed red, the rest were guards): `test/schema-at.test.ts` (6) and `test/render-escape.test.ts`
  (3, exact output strings; tab is kept). No frozen test changed.
- **Verified (real output):** manager re-ran: `bun test` 135 pass, 0 fail, 10 files; `bun run
  typecheck` clean; `bun run gen:types` leaves `src/types.generated.ts` unchanged (idempotent);
  `./scripts/check-public.sh --all` exit 0.
- **Left / needs a decision:** nothing.
- **Lessons:** [project] Schema bounds only reach the validator through the schema, so a one-line
  `minimum` plus a `validateScene` test covers both layers. Write control characters in tests as `\u`
  escapes, never literally. [project] Do not put the literal text `## Report` in a ticket body: an
  agent's edit of the Report section can match it and overwrite the ticket.
