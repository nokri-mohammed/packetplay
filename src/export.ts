// `packetplay export`: render a scene to MP4 or GIF, frame by frame.
// The page exposes window.__packetplay = { durationMs, seek(ms) }. We start a local Chrome headless,
// talk to it over the Chrome DevTools Protocol (Bun's built-in WebSocket, localhost only), seek,
// screenshot, and hand the frames to ffmpeg. No npm dependency.
import { existsSync, mkdtempSync, readdirSync, renameSync, rmSync, statSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { basename, dirname, extname, join } from "node:path";

export class ExportUsageError extends Error {}

export type Format = "mp4" | "gif";

export interface ExportOptions {
  file: string;
  out: string;
  format: Format;
  fps: number;
  speed: number;
  width: number;
  from: number; // seconds of scene time
  to: number | undefined; // seconds of scene time, undefined = the end
  scale: number;
  /** Render with the camera following the packet. */
  follow: boolean;
  /** Zoom of the follow camera (only with follow). */
  zoom: number;
}

const num = (name: string, v: string | undefined): number => {
  if (v === undefined) throw new ExportUsageError(`${name} needs a number`);
  const n = Number(v);
  if (v.trim() === "" || !Number.isFinite(n)) throw new ExportUsageError(`${name} needs a number, got "${v}"`);
  return n;
};

export function formatFromPath(path: string): Format | undefined {
  const e = extname(path).toLowerCase();
  return e === ".mp4" ? "mp4" : e === ".gif" ? "gif" : undefined;
}

/** Parse the arguments after `export`. Throws ExportUsageError with a plain message. */
export function parseExportArgs(args: string[]): ExportOptions {
  const positional: string[] = [];
  let out: string | undefined;
  let format: string | undefined;
  let fps: number | undefined;
  let speed = 1;
  let width = 1280;
  let from = 0;
  let to: number | undefined;
  let scale = 1;
  let follow = false;
  let zoom: number | undefined;
  for (let i = 0; i < args.length; i++) {
    const a = args[i] as string;
    const next = () => args[++i];
    if (a === "-o" || a === "--out") {
      out = next();
      if (out === undefined) throw new ExportUsageError(`${a} needs a file name`);
    } else if (a === "--format") {
      format = next();
      if (format === undefined) throw new ExportUsageError("--format needs mp4 or gif");
    } else if (a === "--fps") fps = num(a, next());
    else if (a === "--speed") speed = num(a, next());
    else if (a === "--width") width = num(a, next());
    else if (a === "--from") from = num(a, next());
    else if (a === "--to") to = num(a, next());
    else if (a === "--scale") scale = num(a, next());
    else if (a === "--follow") follow = true;
    else if (a === "--zoom") zoom = num(a, next());
    else if (a.startsWith("-")) throw new ExportUsageError(`unknown option ${a}`);
    else positional.push(a);
  }
  if (positional.length !== 1) throw new ExportUsageError("export needs one scene file");
  if (!out) throw new ExportUsageError("export needs -o <out.mp4|out.gif>");
  if (format !== undefined && format !== "mp4" && format !== "gif") throw new ExportUsageError("--format must be mp4 or gif");
  const fmt = (format as Format | undefined) ?? formatFromPath(out);
  if (!fmt) throw new ExportUsageError("cannot tell the format: use an .mp4 or .gif file name, or --format mp4|gif");
  const f = fps ?? (fmt === "gif" ? 15 : 30);
  if (!(f >= 1 && f <= 120)) throw new ExportUsageError("--fps must be between 1 and 120");
  if (!(speed > 0 && speed <= 16)) throw new ExportUsageError("--speed must be above 0 and at most 16");
  if (!Number.isInteger(width) || width < 64 || width > 7680) throw new ExportUsageError("--width must be a whole number from 64 to 7680");
  if (!(from >= 0)) throw new ExportUsageError("--from must be 0 or more");
  if (to !== undefined && !(to > from)) throw new ExportUsageError("--to must be greater than --from");
  if (!(scale >= 0.5 && scale <= 4)) throw new ExportUsageError("--scale must be between 0.5 and 4");
  if (zoom !== undefined && !follow) throw new ExportUsageError("--zoom needs --follow");
  if (zoom !== undefined && !(zoom >= 0.2 && zoom <= 1.6)) throw new ExportUsageError("--zoom must be between 0.2 and 1.6");
  return { file: positional[0] as string, out, format: fmt, fps: f, speed, width, from, to, scale, follow, zoom: zoom ?? 1 };
}

/** Viewport height in CSS pixels for a 16:9 frame, rounded to an even number. */
export function viewportHeight(width: number): number {
  return Math.max(2, Math.round((width * 9) / 16 / 2) * 2);
}

export interface Plan {
  frames: number;
  /** Scene time in real milliseconds (1x) to seek to for frame i. */
  timeAt(i: number): number;
}

/** Frame count and seek times. The video lasts (to - from) / speed seconds at `fps`. */
export function planFrames(durationMs: number, o: Pick<ExportOptions, "fps" | "speed" | "from" | "to">): Plan {
  const startMs = Math.min(o.from * 1000, durationMs);
  const endMs = Math.min((o.to ?? durationMs / 1000) * 1000, durationMs);
  const spanMs = Math.max(0, endMs - startMs);
  const frames = Math.max(1, Math.round(((spanMs / o.speed) / 1000) * o.fps));
  return {
    frames,
    timeAt: (i) => Math.min(durationMs, startMs + ((i * 1000) / o.fps) * o.speed),
  };
}

// ---------------------------------------------------------------- ffmpeg arguments

const BASE = ["-y", "-hide_banner", "-loglevel", "error"];

/** MP4: frames come in on stdin as PNG. H.264, yuv420p, even dimensions, faststart, crf 20. */
/**
 * Where ffmpeg writes while it works: a hidden file beside the output, same extension so ffmpeg picks
 * the format. It is renamed to the real output only after ffmpeg finished cleanly, so an interrupted
 * or failed export never leaves a half-written (unplayable) file at the output path.
 */
export function partialPath(out: string): string {
  const ext = extname(out);
  return join(dirname(out), `.${basename(out, ext)}.partial${ext}`);
}

export function mp4Args(out: string, fps: number): string[] {
  return [
    ...BASE,
    "-f", "image2pipe", "-framerate", String(fps), "-c:v", "png", "-i", "-",
    "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2",
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", "-movflags", "+faststart",
    out,
  ];
}

/** GIF pass 1: build a palette from numbered PNG frames (pattern such as dir/f%06d.png). */
export function gifPaletteArgs(pattern: string, fps: number, palette: string): string[] {
  return [...BASE, "-framerate", String(fps), "-i", pattern, "-vf", "palettegen=stats_mode=diff", palette];
}

/** GIF pass 2: apply the palette; loop forever. */
export function gifUseArgs(pattern: string, fps: number, palette: string, out: string): string[] {
  return [
    ...BASE,
    "-framerate", String(fps), "-i", pattern, "-i", palette,
    "-lavfi", "paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle",
    "-loop", "0",
    out,
  ];
}

// ---------------------------------------------------------------- Chrome discovery

export interface ChromeLookups {
  env: (name: string) => string | undefined;
  which: (cmd: string) => string | null | undefined;
  exists: (path: string) => boolean;
  /** Playwright's headless shell: ~/.cache/ms-playwright/chromium_headless_shell-N/*\/chrome-headless-shell, any order. */
  playwrightShell: () => string[];
  /** Playwright's full Chromium: ~/.cache/ms-playwright/chromium-N/chrome-linux*\/chrome, any order. */
  playwright: () => string[];
}

export interface ChromeFound {
  path: string;
  /** A headless-only build takes no --headless flag; full Chrome needs --headless=new. */
  shell: boolean;
}

const versionOf = (p: string): number => Number(/(?:chromium|chromium_headless_shell)-(\d+)/.exec(p)?.[1] ?? 0);
const newestFirst = (a: string, b: string): number => versionOf(b) - versionOf(a);
const isShell = (p: string): boolean => /headless[-_]shell/.test(p);

/**
 * CHROME_PATH, then chrome-headless-shell (PATH, then Playwright's), then google-chrome, chromium,
 * chromium-browser, then Playwright's full Chromium (newest first).
 */
export function findChrome(l: ChromeLookups): ChromeFound | undefined {
  const fromEnv = l.env("CHROME_PATH");
  if (fromEnv && l.exists(fromEnv)) return { path: fromEnv, shell: isShell(fromEnv) };
  const onPath = l.which("chrome-headless-shell");
  if (onPath) return { path: onPath, shell: true };
  const shell = l.playwrightShell().sort(newestFirst)[0];
  if (shell) return { path: shell, shell: true };
  for (const cmd of ["google-chrome", "chromium", "chromium-browser"]) {
    const p = l.which(cmd);
    if (p) return { path: p, shell: false };
  }
  const full = l.playwright().sort(newestFirst)[0];
  return full ? { path: full, shell: false } : undefined;
}

function playwrightFind(dirRe: RegExp, subRe: RegExp, exe: string): string[] {
  const root = join(homedir(), ".cache", "ms-playwright");
  if (!existsSync(root)) return [];
  const found: string[] = [];
  for (const d of readdirSync(root)) {
    if (!dirRe.test(d)) continue;
    for (const sub of readdirSync(join(root, d))) {
      if (!subRe.test(sub)) continue;
      const p = join(root, d, sub, exe);
      if (existsSync(p)) found.push(p);
    }
  }
  return found;
}

function realLookups(): ChromeLookups {
  return {
    env: (n) => process.env[n],
    which: (c) => Bun.which(c),
    exists: (p) => existsSync(p),
    playwrightShell: () => playwrightFind(/^chromium_headless_shell-\d+$/, /^chrome-headless-shell/, "chrome-headless-shell"),
    playwright: () => playwrightFind(/^chromium-\d+$/, /^chrome-linux/, "chrome"),
  };
}

export const CHROME_HINT =
  "No Chrome found. The lightest install is chrome-headless-shell (no npm browser package is needed); " +
  "Chrome or Chromium also work. Install one (for example `sudo apt install chromium`) or set CHROME_PATH to its executable.";
export const FFMPEG_HINT = "ffmpeg not found. Install it (for example `sudo apt install ffmpeg`) and make sure it is on PATH.";

// ---------------------------------------------------------------- Chrome DevTools Protocol

class Cdp {
  private id = 0;
  private pending = new Map<number, { ok: (v: any) => void; fail: (e: Error) => void }>();
  private waiters: { method: string; ok: () => void }[] = [];
  sessionId: string | undefined;
  private constructor(private ws: WebSocket) {
    ws.addEventListener("message", (ev) => {
      const m = JSON.parse(String(ev.data));
      if (m.id !== undefined) {
        const p = this.pending.get(m.id);
        if (!p) return;
        this.pending.delete(m.id);
        if (m.error) p.fail(new Error(`${m.error.message}`));
        else p.ok(m.result);
      } else if (m.method) {
        this.waiters = this.waiters.filter((w) => (w.method === m.method ? (w.ok(), false) : true));
      }
    });
    ws.addEventListener("close", () => {
      for (const p of this.pending.values()) p.fail(new Error("Chrome closed the connection"));
      this.pending.clear();
    });
  }
  static open(url: string): Promise<Cdp> {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(url);
      ws.addEventListener("open", () => resolve(new Cdp(ws)));
      ws.addEventListener("error", () => reject(new Error("could not connect to Chrome")));
    });
  }
  send<T = any>(method: string, params: object = {}): Promise<T> {
    const id = ++this.id;
    return new Promise<T>((ok, fail) => {
      this.pending.set(id, { ok, fail });
      this.ws.send(JSON.stringify({ id, method, params, ...(this.sessionId ? { sessionId: this.sessionId } : {}) }));
    });
  }
  once(method: string): Promise<void> {
    return new Promise((ok) => this.waiters.push({ method, ok }));
  }
  close(): void {
    try {
      this.ws.close();
    } catch {}
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function withTimeout<T>(p: Promise<T>, ms: number, what: string): Promise<T> {
  let t: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([p, new Promise<never>((_, rej) => (t = setTimeout(() => rej(new Error(`timed out ${what}`)), ms)))]);
  } finally {
    if (t) clearTimeout(t);
  }
}

// ---------------------------------------------------------------- the command

export interface ExportResult {
  out: string;
  bytes: number;
  frames: number;
}

/** Render `html` (a built packetplay page) to opts.out. Throws Error with a readable message. */
export async function exportVideo(html: string, opts: ExportOptions): Promise<ExportResult> {
  const found = findChrome(realLookups());
  const ffmpeg = Bun.which("ffmpeg");
  if (!found) throw new Error(CHROME_HINT);
  if (!ffmpeg) throw new Error(FFMPEG_HINT);

  const work = mkdtempSync(join(tmpdir(), "packetplay-export-"));
  const partial = partialPath(opts.out);
  let proc: ReturnType<typeof Bun.spawn> | undefined;
  let cdp: Cdp | undefined;
  let enc: ReturnType<typeof Bun.spawn> | undefined;
  const cleanup = (): void => {
    cdp?.close();
    try {
      proc?.kill("SIGKILL");
    } catch {}
    try {
      enc?.kill("SIGKILL");
    } catch {}
    try {
      rmSync(work, { recursive: true, force: true });
    } catch {}
    try {
      rmSync(partial, { force: true });
    } catch {}
  };
  const onSignal = (code: number) => () => {
    cleanup();
    process.exit(code);
  };
  const sigint = onSignal(130);
  const sigterm = onSignal(143);
  process.on("SIGINT", sigint);
  process.on("SIGTERM", sigterm);

  try {
    await Bun.write(join(work, "page.html"), html);
    const profile = join(work, "profile");
    const height = viewportHeight(opts.width);
    const args = [
      found.path,
      ...(found.shell ? [] : ["--headless=new"]),
      "--remote-debugging-port=0",
      "--remote-allow-origins=*",
      `--user-data-dir=${profile}`,
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-gpu",
      "--hide-scrollbars",
      "--mute-audio",
      "--force-color-profile=srgb",
      "--disable-background-timer-throttling",
      "--disable-renderer-backgrounding",
      ...(process.getuid?.() === 0 ? ["--no-sandbox"] : []),
      "about:blank",
    ];
    proc = Bun.spawn(args, { stdout: "ignore", stderr: "ignore" });

    // With port 0 Chrome writes the real port and browser socket path to DevToolsActivePort.
    const portFile = join(profile, "DevToolsActivePort");
    let wsUrl = "";
    for (let i = 0; i < 100 && !wsUrl; i++) {
      if (proc.exitCode !== null) throw new Error("Chrome exited before it was ready");
      if (existsSync(portFile)) {
        const [port, path] = (await Bun.file(portFile).text()).split("\n");
        if (port && path) wsUrl = `ws://127.0.0.1:${port}${path}`;
      }
      if (!wsUrl) await sleep(100);
    }
    if (!wsUrl) throw new Error("Chrome did not start in time");

    cdp = await withTimeout(Cdp.open(wsUrl), 10000, "connecting to Chrome");
    const { targetId } = await cdp.send<{ targetId: string }>("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await cdp.send<{ sessionId: string }>("Target.attachToTarget", { targetId, flatten: true });
    cdp.sessionId = sessionId;
    await cdp.send("Page.enable");
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: opts.width,
      height,
      deviceScaleFactor: opts.scale,
      mobile: false,
    });
    const loaded = cdp.once("Page.loadEventFired");
    await cdp.send("Page.navigate", { url: "file://" + join(work, "page.html") + "#export" });
    await withTimeout(loaded, 20000, "loading the page");

    let durationMs = 0;
    for (let i = 0; i < 50 && durationMs <= 0; i++) {
      const r = await cdp.send("Runtime.evaluate", { expression: "window.__packetplay ? window.__packetplay.durationMs : 0", returnByValue: true });
      durationMs = Number(r.result?.value ?? 0);
      if (durationMs <= 0) await sleep(100);
    }
    if (durationMs <= 0) throw new Error("the page did not expose window.__packetplay");

    if (opts.follow) {
      await cdp.send("Runtime.evaluate", { expression: `window.__packetplay.setFollow(true, ${opts.zoom})`, returnByValue: true });
    }
    const plan = planFrames(durationMs, opts);
    const pattern = join(work, "f%06d.png");
    if (opts.format === "mp4") {
      enc = Bun.spawn([ffmpeg, ...mp4Args(partial, opts.fps)], { stdin: "pipe", stdout: "ignore", stderr: "pipe" });
    }
    const progress = (n: number) => process.stderr.write(`\rframe ${n} of ${plan.frames}`);
    for (let i = 0; i < plan.frames; i++) {
      await cdp.send("Runtime.evaluate", { expression: `window.__packetplay.seek(${plan.timeAt(i)})`, returnByValue: true });
      const shot = await cdp.send<{ data: string }>("Page.captureScreenshot", { format: "png" });
      const bytes = Buffer.from(shot.data, "base64");
      if (enc) {
        const stdin = enc.stdin as { write(b: Uint8Array): number | Promise<number>; flush(): unknown };
        await stdin.write(bytes);
        await stdin.flush();
      } else {
        await Bun.write(join(work, `f${String(i + 1).padStart(6, "0")}.png`), bytes);
      }
      progress(i + 1);
    }
    process.stderr.write("\n");

    // Chrome is no longer needed once the last frame is captured.
    cdp.close();
    try {
      proc.kill("SIGKILL");
    } catch {}

    if (enc) {
      await (enc.stdin as { end(): unknown }).end();
      const [code, err] = await Promise.all([enc.exited, new Response(enc.stderr as ReadableStream).text()]);
      if (code !== 0) throw new Error(`ffmpeg failed: ${err.trim()}`);
    } else {
      const palette = join(work, "palette.png");
      for (const a of [gifPaletteArgs(pattern, opts.fps, palette), gifUseArgs(pattern, opts.fps, palette, partial)]) {
        enc = Bun.spawn([ffmpeg, ...a], { stdout: "ignore", stderr: "pipe" });
        const [code, err] = await Promise.all([enc.exited, new Response(enc.stderr as ReadableStream).text()]);
        if (code !== 0) throw new Error(`ffmpeg failed: ${err.trim()}`);
      }
    }
    renameSync(partial, opts.out);   // only now does the output path change
    return { out: opts.out, bytes: statSync(opts.out).size, frames: plan.frames };
  } finally {
    process.off("SIGINT", sigint);
    process.off("SIGTERM", sigterm);
    cleanup();
  }
}
