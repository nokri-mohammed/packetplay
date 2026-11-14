# Team: svg-scenes

```mermaid
flowchart TD
  CEO[CEO: approvals, priorities] --> COS[Chief of staff: main session, plans and routes]
  CEO --> MGR[svg-scenes-manager: owns repo and roadmap, commits and pushes]
  COS --> MGR
  MGR --> TDD[tdd-guide: writes tests first]
  MGR --> IMP[implementer: general-purpose agent, builds the code]
  MGR --> REV[code-reviewer: checks each diff]
```

## Involvement log

| Date | Who | What |
|---|---|---|
| 2026-11-14 | background agent | Project scaffolded (T-20261114-8): public repo, manager, design plan, WebRTC example, isoflow icons. |
| 2026-11-14 | svg-scenes-manager | CEO approved the design plan. Wrote M1 tickets T-20261114-1 to 5 (toolchain and schema, tests, loader and validator, router, review). |
| 2026-11-14 | general-purpose (sonnet) | T-20261114-1 done: Bun and TypeScript toolchain, JSON Schema, generated types, 6 tests. Manager re-ran tests, typecheck, gen:types idempotence and the public check. |
| 2026-11-14 | general-purpose (sonnet), acting as tdd-guide | T-20261114-2 done: 40 failing M1 tests for loader, validator and router (tdd-guide is not installed in this session). |
| 2026-11-14 | general-purpose (sonnet) x2 | T-20261114-3 (loader, validator) and T-20261114-4 (router) done in parallel. Manager added `allowImportingTsExtensions` to tsconfig. Full suite: 48 pass. |
| 2026-11-14 | general-purpose (sonnet), acting as code-reviewer | T-20261114-5 done: review of the M1 diff, no high findings, one medium (duplicated routing). |
| 2026-11-14 | general-purpose (sonnet) | T-20261114-6 done: validator now uses `routeStep`, stricter Ajv, empty-file error, stronger tests. Manager re-ran the suite and read the diff. Full suite: 56 pass. M1 complete. |
| 2026-11-14 | svg-scenes-manager | CEO said "go" for M2. Wrote tickets T-20261114-7 to 11 (tests, layout, icons, render, review). Layout and icons run in parallel, render waits for both. |
| 2026-11-14 | general-purpose (sonnet), acting as tdd-guide | T-20261114-7 done: M2 tests for layout, icons, render. Manager fixed two test bugs (icon count 37, fractional canvas height 720); a sonnet agent fixed strict typing in the tests. |
| 2026-11-14 | general-purpose (sonnet) x2 | T-20261114-8 (layout) and T-20261114-9 (icon loader, `prefixIds` helper) done in parallel. 104 tests pass, only render is red. |
| 2026-11-14 | general-purpose (sonnet) | T-20261114-10 done: static SVG renderer and `bun run render:example`. Manager re-ran tests, typecheck and parsed `dist/webrtc.svg`. 126 tests pass. |
| 2026-11-14 | general-purpose (sonnet), acting as code-reviewer | T-20261114-11 done: M2 review, no medium or higher findings, three small fixes ticketed. |
| 2026-11-14 | general-purpose (sonnet) | T-20261114-12 done: `at` minimum, illegal XML character stripping, script cleanup. 135 tests pass. |
| 2026-11-14 | svg-scenes-manager | CEO: "I want to test it, do not spend tokens on a tester". Stopped the M3 test-writing agent (T-20261114-13 cancelled, kept as design spec). M3 and M4 merged into one implementation ticket, T-20261114-14. No tester or reviewer agents from here. |
