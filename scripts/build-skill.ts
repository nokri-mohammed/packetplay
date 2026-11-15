// Builds skills/packetplay/packetplay.js: the whole CLI as one file that needs only Bun.
// The player bundle, the icons and the schema are embedded by replacing src/embedded.ts.
import { chmodSync, readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import type { BunPlugin } from "bun";

const root = new URL("../", import.meta.url);
const path = (p: string) => fileURLToPath(new URL(p, root));

const player = await Bun.build({
  entrypoints: [path("src/player.ts")],
  target: "browser",
  minify: true,
});
if (!player.success || !player.outputs[0]) {
  throw new Error("Player bundle failed: " + player.logs.map((l) => l.message).join("; "));
}
const playerJs = await player.outputs[0].text();

const icons: Record<string, string> = {};
for (const dir of ["icons/isoflow/", "icons/custom/"]) {
  for (const f of readdirSync(path(dir)).filter((f) => f.endsWith(".svg")).sort()) {
    icons[f.slice(0, -4)] = readFileSync(path(dir) + f, "utf8");
  }
}
const schema: unknown = JSON.parse(readFileSync(path("schema/scene.schema.json"), "utf8"));

const embeddedModule = `export const embedded = ${JSON.stringify({ player: playerJs, icons, schema })};`;
const embedPlugin: BunPlugin = {
  name: "embed-data",
  setup(build) {
    build.onLoad({ filter: /src[\\/]embedded\.ts$/ }, () => ({ contents: embeddedModule, loader: "js" }));
  },
};

const out = path("skills/packetplay/");
const built = await Bun.build({
  entrypoints: [path("src/cli.ts")],
  outdir: out,
  naming: "packetplay.js",
  target: "bun",
  minify: true,
  plugins: [embedPlugin],
});
if (!built.success) {
  throw new Error("Skill bundle failed: " + built.logs.map((l) => l.message).join("; "));
}

const file = out + "packetplay.js";
let text = readFileSync(file, "utf8");
if (!text.startsWith("#!")) {
  text = "#!/usr/bin/env bun\n" + text;
  await Bun.write(file, text);
}
chmodSync(file, 0o755);
console.log(`Wrote skills/packetplay/packetplay.js (${Buffer.byteLength(text)} bytes, ${Object.keys(icons).length} icons)`);
