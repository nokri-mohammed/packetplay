// Make schema/scene.schema.json list every icon in icons/isoflow and icons/custom.
// Run `bun run icons:sync`, then `bun run gen:types` and `bun run build:skill`.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";

const root = new URL("../", import.meta.url).pathname;
const names = ["icons/isoflow", "icons/custom"]
  .flatMap((d) => readdirSync(root + d))
  .filter((f) => f.endsWith(".svg"))
  .map((f) => f.slice(0, -4))
  .sort();
const dupes = names.filter((n, i) => names.indexOf(n) !== i);
if (dupes.length > 0) throw new Error(`duplicate icon names: ${dupes.join(", ")}`);

const file = root + "schema/scene.schema.json";
const schema = JSON.parse(readFileSync(file, "utf8"));
schema.$defs.node.properties.icon.enum = names;
writeFileSync(file, JSON.stringify(schema, null, 2) + "\n");
console.log(`schema lists ${names.length} icons`);
