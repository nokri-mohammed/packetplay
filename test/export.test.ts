import { describe, expect, test } from "bun:test";
import {
  ExportUsageError,
  findChrome,
  formatFromPath,
  gifPaletteArgs,
  gifUseArgs,
  mp4Args,
  parseExportArgs,
  planFrames,
  viewportHeight,
  type ChromeLookups,
} from "../src/export.ts";

describe("parseExportArgs", () => {
  test("infers the format from the extension and applies defaults", () => {
    const o = parseExportArgs(["a.yaml", "-o", "x.mp4"]);
    expect(o).toEqual({ file: "a.yaml", out: "x.mp4", format: "mp4", fps: 30, speed: 1, width: 1280, from: 0, to: undefined, scale: 1, follow: false, zoom: 1 });
    expect(parseExportArgs(["a.yaml", "-o", "x.GIF"])).toMatchObject({ format: "gif", fps: 15 });
  });
  test("--format wins over the extension; options parse", () => {
    const o = parseExportArgs(["a.yaml", "-o", "x.bin", "--format", "gif", "--fps", "10", "--speed", "2", "--width", "800", "--from", "1", "--to", "4.5", "--scale", "2"]);
    expect(o).toMatchObject({ format: "gif", fps: 10, speed: 2, width: 800, from: 1, to: 4.5, scale: 2 });
  });
  test("--follow and --zoom", () => {
    expect(parseExportArgs(["a.yaml", "-o", "x.mp4", "--follow"])).toMatchObject({ follow: true, zoom: 1 });
    expect(parseExportArgs(["a.yaml", "-o", "x.mp4", "--follow", "--zoom", "0.8"])).toMatchObject({ follow: true, zoom: 0.8 });
    expect(() => parseExportArgs(["a.yaml", "-o", "x.mp4", "--zoom", "1"])).toThrow(ExportUsageError);
    expect(() => parseExportArgs(["a.yaml", "-o", "x.mp4", "--follow", "--zoom", "5"])).toThrow(ExportUsageError);
  });
  test("rejects bad input", () => {
    const bad = (a: string[]) => expect(() => parseExportArgs(a)).toThrow(ExportUsageError);
    bad(["-o", "x.mp4"]);
    bad(["a.yaml"]);
    bad(["a.yaml", "-o", "x.bin"]);
    bad(["a.yaml", "-o", "x.mp4", "--fps", "0"]);
    bad(["a.yaml", "-o", "x.mp4", "--fps", "abc"]);
    bad(["a.yaml", "-o", "x.mp4", "--speed", "0"]);
    bad(["a.yaml", "-o", "x.mp4", "--from", "5", "--to", "5"]);
    bad(["a.yaml", "-o", "x.mp4", "--width", "10"]);
    bad(["a.yaml", "-o", "x.mp4", "--format", "webm"]);
    bad(["a.yaml", "-o", "x.mp4", "--nope"]);
    bad(["a.yaml", "b.yaml", "-o", "x.mp4"]);
  });
  test("formatFromPath", () => {
    expect(formatFromPath("a/b.mp4")).toBe("mp4");
    expect(formatFromPath("b.png")).toBeUndefined();
  });
});

describe("frame math", () => {
  const o = { fps: 30, speed: 1, from: 0, to: undefined };
  test("frames and times", () => {
    const p = planFrames(10000, o);
    expect(p.frames).toBe(300);
    expect(p.timeAt(0)).toBe(0);
    expect(p.timeAt(30)).toBeCloseTo(1000, 6);
  });
  test("speed shortens the video and steps faster through the scene", () => {
    const p = planFrames(10000, { ...o, speed: 2 });
    expect(p.frames).toBe(150);
    expect(p.timeAt(30)).toBeCloseTo(2000, 6);
  });
  test("from and to select a range, clamped to the duration", () => {
    const p = planFrames(10000, { ...o, fps: 10, from: 2, to: 4 });
    expect(p.frames).toBe(20);
    expect(p.timeAt(0)).toBe(2000);
    expect(planFrames(10000, { ...o, to: 99 }).frames).toBe(300);
    expect(planFrames(10000, { ...o, from: 3 }).frames).toBe(210);
  });
  test("never fewer than one frame, never past the end", () => {
    expect(planFrames(0, o).frames).toBe(1);
    expect(planFrames(1000, { ...o, from: 50 }).timeAt(0)).toBe(1000);
  });
  test("viewport height is 16:9 and even", () => {
    expect(viewportHeight(1280)).toBe(720);
    expect(viewportHeight(801) % 2).toBe(0);
  });
});

describe("ffmpeg arguments", () => {
  test("mp4", () => {
    const a = mp4Args("o.mp4", 30);
    expect(a).toContain("libx264");
    expect(a.join(" ")).toContain("-pix_fmt yuv420p");
    expect(a.join(" ")).toContain("-crf 20");
    expect(a.join(" ")).toContain("-movflags +faststart");
    expect(a.join(" ")).toContain("-f image2pipe");
    expect(a.join(" ")).toContain("trunc(iw/2)*2");
    expect(a[a.length - 1]).toBe("o.mp4");
  });
  test("gif is two passes and loops forever", () => {
    expect(gifPaletteArgs("f%06d.png", 15, "p.png").join(" ")).toContain("palettegen");
    const u = gifUseArgs("f%06d.png", 15, "p.png", "o.gif");
    expect(u.join(" ")).toContain("paletteuse");
    expect(u.join(" ")).toContain("-loop 0");
    expect(u[u.length - 1]).toBe("o.gif");
  });
});

describe("findChrome order", () => {
  const mk = (over: Partial<ChromeLookups>): ChromeLookups => ({
    env: () => undefined,
    which: () => null,
    exists: () => true,
    playwrightShell: () => [],
    playwright: () => [],
    ...over,
  });
  const onPath = (...names: string[]) => (c: string) => (names.includes(c) ? "/bin/" + c : null);
  test("CHROME_PATH first, when it exists; shell detected from its name", () => {
    expect(findChrome(mk({ env: () => "/opt/c", which: onPath("chrome-headless-shell") }))).toEqual({ path: "/opt/c", shell: false });
    expect(findChrome(mk({ env: () => "/opt/chrome-headless-shell" }))).toEqual({ path: "/opt/chrome-headless-shell", shell: true });
    expect(findChrome(mk({ env: () => "/opt/c", exists: () => false, which: onPath("chromium") }))?.path).toBe("/bin/chromium");
  });
  test("headless shell beats full Chrome: PATH, then Playwright shell (newest first)", () => {
    expect(findChrome(mk({ which: onPath("chrome-headless-shell", "google-chrome") }))).toEqual({ path: "/bin/chrome-headless-shell", shell: true });
    const sh = ["/h/chromium_headless_shell-1200/x/chrome-headless-shell", "/h/chromium_headless_shell-1248/x/chrome-headless-shell"];
    expect(findChrome(mk({ playwrightShell: () => [...sh], which: onPath("google-chrome") }))).toEqual({ path: sh[1] as string, shell: true });
  });
  test("then google-chrome, chromium, chromium-browser in that order", () => {
    const seen: string[] = [];
    const r = findChrome(mk({ which: (c) => (seen.push(c), c === "chromium-browser" ? "/b" : null) }));
    expect(seen).toEqual(["chrome-headless-shell", "google-chrome", "chromium", "chromium-browser"]);
    expect(r).toEqual({ path: "/b", shell: false });
  });
  test("last, the newest Playwright Chromium; undefined when none", () => {
    const pw = ["/h/chromium-1200/chrome-linux/chrome", "/h/chromium-1248/chrome-linux64/chrome"];
    expect(findChrome(mk({ playwright: () => [...pw] }))).toEqual({ path: pw[1] as string, shell: false });
    expect(findChrome(mk({}))).toBeUndefined();
  });
});
