# T-20261114-29: Version the scene schema

- **Owner:** general-purpose agent (implementer)
- **Project:** projects/packetplay
- **Opened by:** packetplay-manager, 2026-11-14
- **Model:** sonnet (one optional schema field, a loader check, exact tests, docs)
- **Status:** done

## Goal

Scenes can say which schema version they are written for, the tool knows which version it supports and
fails with a clear message for a newer one, and the schema has a real, stable identity.

## Context

- CEO request, 2026-11-14: asked "is the schema versioned?" (answer: no) and then "yes do that" to the
  manager's recommendation: an optional `version: 1` in scenes, a loader check with a clear error for
  unknown versions, and a versioned identity for the schema.
- Today: `schema/scene.schema.json` has `$id` `https://example.com/packetplay/scene.schema.json` (a
  placeholder), no version field; `package.json` is `0.0.0`; `$schema` in a scene is accepted and
  ignored; every schema change so far was optional and additive (`grid`, `at`, `group`, `hidden`,
  `reveal`, `typing`).
- Read `docs/LESSONS.md`, `schema/scene.schema.json`, `src/load.ts`, `src/validate.ts`,
  `test/schema.test.ts`, `test/load.test.ts`, `README.md`. CEO rules: no tester or browser automation.
  PUBLIC repo: no absolute local paths or usernames, no private values; the repository URL
  `github.com/nokri-mohammed/packetplay` is public and fine. No em dashes. No new dependencies.
  Do NOT move or rename `schema/scene.schema.json` (editors, tests and `gen:types` point at it).

## Spec

- Schema: add optional top-level `version` (`type: integer`, `minimum: 1`, description: "Schema version
  this scene is written for. Missing means 1."). Set `$id` to the real public raw URL of the file:
  `https://raw.githubusercontent.com/nokri-mohammed/packetplay/main/schema/scene.schema.json`. Add a
  `$comment` saying this is schema version 1 and that a breaking change will add `schema/v2/` while
  `v1` stays. Run `bun run gen:types` (the `Scene` type gets `version?: number`).
- Code: export `SCHEMA_VERSION = 1` (one place, for example `src/version.ts`, re-exported from
  `src/index.ts` by appending only your own line). In the loader (`loadScene` and `parseScene`), after
  parsing and before schema validation, if `version` is an integer greater than `SCHEMA_VERSION`, throw
  an error in the existing style (it names the file, like the other load errors) with exactly:
  `scene version N is not supported: this packetplay understands version 1 and older (update packetplay)`
  with `N` the number found. A missing version is treated as 1 and the loaded model is NOT changed (do
  not insert a `version` key). `version` of 0, a negative, a fraction or a non-number is reported by the
  normal schema validation (no special code).
- Keep the check in one place so `validateScene` and the CLI (`build`, `convert`) all get it through the
  loader. `bun run src/cli.ts convert` must keep `version` when present (it copies the model).
- Examples: add `version: 1` as the first key after the `# yaml-language-server` comment (YAML) in all
  five examples (webrtc, udp, website, osi, homenet) and regenerate each JSON with `bun run src/cli.ts
  convert <yaml> --to json -o <json>`. The existing YAML-vs-JSON equality tests must stay green.
- README: a short "Versioning" section: what `version` is, that missing means 1, that additions that
  are optional do not bump it, that a breaking change bumps it and adds a new schema folder, and what
  error a newer scene gets. No release or publishing text.
- Tests (exact): schema accepts `version: 1` and `2`, rejects `0`, `1.5`, `"1"`; loader throws the exact
  message for `version: 2` (YAML and JSON text, and the message names the file when loaded from a file;
  check how the existing load errors format the file name and keep that); loader accepts a scene without
  `version` and leaves the model without a `version` key; `SCHEMA_VERSION` is 1; `$id` is the raw URL;
  every example carries `version: 1` in both YAML and JSON; the icon-enum drift test and all other tests
  stay green.

## Scope

- Do: the schema field and `$id`, the version constant, the loader check, the examples, README, tests,
  then `bun run build:examples`.
- Do not: move the schema file, change other schema fields, the player, layout, timing or rendering. No
  commit, no push.

## Approvals

CEO approved the versioning plan on 2026-11-14 ("yes do that"). No release, tag or publishing is part of
this ticket.

## Rules

- Follow `CLAUDE.md`. Run `./scripts/check-public.sh --all` before finishing; it must exit 0.
- Never put the literal heading text of the Report section anywhere else in this file.

## Validation

- Real output in the Report section: `bun test` (count), `bun run typecheck`, `bun run build:examples`
  (all sizes), `./scripts/check-public.sh --all`, and the real error text printed for a scene with
  `version: 2` through the CLI (`bun run src/cli.ts build <file> -o <out>`, exit code too).

## Done when

- Tests are green, all five pages build, the schema has the optional `version` and a real `$id`, and a
  newer scene fails with the clear message.

## Report

Done. Nothing committed or pushed.

What changed:
- `schema/scene.schema.json`: optional `version` (integer, minimum 1), `$id` set to the raw GitHub URL, `$comment` about v1 and a future `schema/v2/`. `bun run gen:types` gave `version?: number`.
- `src/version.ts` exports `SCHEMA_VERSION = 1`; `src/index.ts` re-exports it (one appended line).
- `src/load.ts`: `parseScene` throws the version error after parsing and before validation; `loadScene` prefixes the file name. A missing version leaves the model unchanged.
- All five example YAMLs have `version: 1` after the language-server comment; JSON regenerated with `convert`.
- README "Versioning" section. New `test/version.test.ts` (11 tests).
- `test/fixtures/lower.scene.yml` and `upper.SCENE.YAML` are copies of the webrtc example, so each got the same `version: 1` line (otherwise the equality test failed).

Real output:
- `bun test`: 252 pass, 0 fail (19 files).
- `bun run typecheck`: `tsc --noEmit`, no errors.
- `bun run build:examples`: webrtc.html 87733 bytes, udp.html 73815, website.html 108583, osi.html 78287, homenet.html 110844.
- `./scripts/check-public.sh --all`: exit 0.
- CLI on a scene with `version: 2` (`bun run src/cli.ts build future.scene.yaml -o o.html`), exit code 1:
  `future.scene.yaml: scene version 2 is not supported: this packetplay understands version 1 and older (update packetplay)`

Left: nothing. Awaiting the manager's review and the CEO's commit approval.

Lessons:
- Test fixtures that are copies of an example (`test/fixtures/lower.scene.yml`, `upper.SCENE.YAML`) must be updated together with the example, or the equality test fails.
- A custom error class (`SceneVersionError`) lets `loadScene` tell the version error apart from JSON and YAML parse errors and add the file name without being wrapped as "invalid JSON".
- When piping a script to `tail`, `$?` is tail's exit code; run the script alone to read its real exit code.
