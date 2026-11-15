---
name: packetplay-icons
description: Draw and add a new isometric icon to packetplay in the isoflow style (same palette, outline, size and shadow as the built-in icons), keep it in icons/custom, and wire it into the schema, types, tests and the one-file skill. Use when the CEO asks for a new icon, a new node picture, or "an icon for X".
---

# Add a packetplay icon

Own icons live in `icons/custom/`, apart from the vendored isoflow icons in `icons/isoflow/` (never edit
those). Both folders are loaded by name, so `icon: nic` just works.

## Style rules (match the built-in icons)

- Isometric, viewed from above-right. Flat fills, no gradients. Every shape has a 4 px outline
  `#231F20` with round joins. Canvas about 520 to 700 px wide, 400 to 620 px high, 12 px padding.
- Palette: top `#CDD9EE`, white highlight `#FFFFFF`, left side `#B5C5DC`, right side `#6885A9`,
  dark blue `#4B6E98`, accent blue `#0070D9`, yellow `#FFC600`, black `#231F20`. One extra accent family
  is fine (the network card uses green `#2FA866` / `#1D7A47` / `#16623A`).
- A soft shadow parallelogram under the object, black at opacity 0.15.
- Details that make it readable at 60 px: one clear silhouette, two or three small features (ports,
  LEDs, a chip), no tiny text.
- No ids, no `<style>`, no gradients, no images, no text. Plain `<polygon>` shapes only.
- No private values, no absolute paths in any file you commit.

## Steps

1. Copy `example_nic.py` next to `isogen.py` (both in this skill folder) to `my_icon.py` and rewrite
   the drawing. `isogen.py` gives `Icon.box`, `top`, `face_u`, `shadow`, `save`, and `prism` (extrude any footprint, for example `gear(...)` or `circle(...)`). Worked examples: `example_nic.py`, `nic_settings.py` (card plus gear, reuses the card), `browser.py`. Axes: u right-down,
   v left-down, w up, 22 px per unit. Draw back to front.
2. Generate: `cd .claude/skills/packetplay-icons && python3 my_icon.py ../../../icons/custom/<name>.svg`.
   Name: lowercase letters, digits and hyphens, not already used (`bun run src/cli.ts icons`).
3. Look at it next to two built-ins (for example `switch-module.svg` and `server.svg`) in a headless
   browser screenshot (`chrome-headless-shell --screenshot=out.png --window-size=1300,420
   --allow-file-access-from-files file://<page>.html`, page with three `<img height=360>`). Fix overlaps
   (tall parts hiding others) and compare size and weight. Iterate until it fits in.
4. Wire it in: `bun run icons:sync && bun run gen:types && bun run build:skill`.
5. Update the icon count: README ("N built in"), and the two tests that assert the count
   (`test/icons.test.ts`, `test/cli-commands.test.ts`).
6. Verify: a tiny scene using `icon: <name>` passes `bun run src/cli.ts validate` and builds;
   `bun test`, `bun run typecheck`, `./scripts/check-public.sh --all` all exit 0.
7. Log it in `docs/TEAM.md`, then commit (`feat(icons): add <name> icon`) after check-public passes.
