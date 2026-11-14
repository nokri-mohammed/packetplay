# T-20261114-6: Fix the M1 review findings

- **Owner:** general-purpose agent (implementer)
- **Project:** projects/packetplay
- **Opened by:** packetplay-manager, 2026-11-14
- **Model:** sonnet (small, guided refactor with an existing test net)
- **Status:** open

## Goal

The validator and the router share one routing implementation, the weak M1 tests are strengthened,
and the small robustness gaps found in the review of T-20261114-5 are closed. `bun test` stays green.

## Context

- Source of the findings: `## Report

Status: done

- **Did:** Steps 1 to 6 in order, `bun test` green after each. (1) `src/route.ts` imports types from `./types.generated.ts`, doc comment added. (2) `src/validate.ts`: `adj` and `connected` deleted, `checkStep` calls `routeStep` in try/catch (pushes `${label}: ${e.message}`, path `base`), only when `links` is an array of pairs of existing node ids; `from === to` message kept. (3) Ajv now `strict: true`; the schema compiles with no exception needed. (4) `src/load.ts` `parseScene` throws `file is empty or not a scene` for non-object results (null, empty YAML, arrays); `loadScene` prefixes the file name. (5) Strengthened tests: unknown top-level key (exact issue, path `""`), empty parallel (two exact messages), step path (`chapters[1].steps[0].from`), schema-before-semantic order (exact schema message), `parseScene` malformed cases (message matched), router `same`, `no route` and `via` tests (full messages). (6) Added tests: via-leg no-route through `validateScene`, unknown track and unknown via in `parallel`, JSON example valid, `.yml` and `.YAML` loading, empty YAML and JSON `null` (plus `[]` and comment-only YAML in parseScene). New fixtures in `test/fixtures/`: `empty.scene.yaml`, `null.scene.json`, `lower.scene.yml`, `upper.SCENE.YAML`. No message wording changed; parallel "chapter N, step M" wording untouched.
- **Verified (real output):**
  - `bun test`: `56 pass, 0 fail, 86 expect() calls, Ran 56 tests across 4 files` (48 before, 8 new).
  - `bun run typecheck`: `$ tsc --noEmit`, no errors.
  - `./scripts/check-public.sh --all`: exit 0.
  - `grep -n "connected\|adj" src/validate.ts`: no output; `src/validate.ts` imports `routeStep`.
  - No em dash in src or test. Nothing committed.
- **Left / needs a decision:** Review finding 6 (parallel numbering wording) deferred to M3 as ticketed.
- **Lessons:** Probing real output of the validator before writing exact-message assertions avoided guessing (the empty-parallel case yields five schema issues, not one).
