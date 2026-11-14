import { mkdir } from "node:fs/promises";
import { layoutScene } from "../src/layout.ts";
import { loadScene } from "../src/load.ts";
import { renderSvg } from "../src/render.ts";
import { validateScene } from "../src/validate.ts";

const root = new URL("../", import.meta.url).pathname;
const scene = await loadScene(root + "examples/webrtc.scene.yaml");

const issues = validateScene(scene);
if (issues.length > 0) {
  console.error("Scene is not valid:");
  for (const issue of issues) console.error(" -", JSON.stringify(issue));
  process.exit(1);
}

const svg = renderSvg(scene, layoutScene(scene));
await mkdir(root + "dist", { recursive: true });
await Bun.write(root + "dist/webrtc.svg", svg);
console.log(`Wrote dist/webrtc.svg (${svg.length} bytes)`);
