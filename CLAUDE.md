# packetplay: project rules

- This repo is PUBLIC. Never commit private details: addresses, hostnames, usernames, emails,
  tokens, or anything from the CEO's private setup. Use documentation examples (`192.0.2.20`,
  `call.example.com`).
- Run `./scripts/check-public.sh` (staged) or `--all` before every commit. It must exit 0. The
  shared private blocklist lives at `~/.config/private-patterns/patterns.txt` (outside every repo,
  never print its values); the script refuses to run without it. Keep `private/` in `.gitignore`.
- Conventional Commits, no co-author trailer, no em dashes anywhere. Commit email is the repo-local
  noreply address.
- Stack: Bun, TypeScript, anime.js v4. No new dependencies without the manager's note in the ticket.
- Test-first: tdd-guide writes the tests, then the implementation, then code-reviewer checks the diff.
- Tickets live in `docs/tickets/` (from `homelab-team-all/docs/tickets/TEMPLATE.md`). Plans live in
  `docs/plans/`. The team diagram is `docs/TEAM.md`.
- `packetplay-manager` coordinates all work and is the CEO's contact. Plans, releases, npm
  publishing and deletes need the CEO's approval.
- Releases run through the release-please pull request (see README, Releasing). Merging that pull request
  is the release, so the manager merges it only after the CEO says to. Use Conventional Commit types
  correctly (`feat`, `fix`, `feat!`), because they decide the version and the changelog.
- Only the isoflow icons are vendored (MIT). Do not add other icon packs.
- The team-wide rules in `homelab-team-all/CLAUDE.md` apply.
