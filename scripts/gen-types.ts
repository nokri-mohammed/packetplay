import { compileFromFile } from "json-schema-to-typescript";
import { writeFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const ts = await compileFromFile(new URL("schema/scene.schema.json", root).pathname, {
  bannerComment:
    "/* Generated from schema/scene.schema.json by `bun run gen:types`. Do not edit by hand. */",
  additionalProperties: false,
  style: { singleQuote: false },
});
await writeFile(new URL("src/types.generated.ts", root), ts);
console.log("wrote src/types.generated.ts");
