import { describe, expect, test } from "bun:test";
import { mkdtempSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const root = new URL("../", import.meta.url).pathname;
const udp = root + "examples/udp.scene.yaml";

const run = async (args: string[]) => {
  const p = Bun.spawn(["bun", "run", root + "src/cli.ts", ...args], { stdout: "pipe", stderr: "pipe" });
  const [out, err, code] = await Promise.all([new Response(p.stdout).text(), new Response(p.stderr).text(), p.exited]);
  return { out, err, code };
};

const withDir = async (fn: (dir: string) => Promise<void>) => {
  const dir = mkdtempSync(join(tmpdir(), "packetplay-cli-"));
  try {
    await fn(dir);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
};

const BAD = `title: Bad
nodes:
  a: { label: A, icon: laptop }
links: []
chapters:
  - title: t
    steps:
      - { from: a, to: a, label: x }
`;

describe("cli validate", () => {
  test("a good scene prints one ok line, exits 0 and writes no HTML", async () => {
    await withDir(async (dir) => {
      const f = join(dir, "udp.scene.yaml");
      await Bun.write(f, Bun.file(udp));
      const { out, err, code } = await run(["validate", f]);
      expect(code).toBe(0);
      expect(out).toBe("ok: How a UDP message travels (4 nodes, 3 steps)\n");
      expect(err).toBe("");
      expect(readdirSync(dir)).toEqual(["udp.scene.yaml"]);
    });
  });

  test("a bad scene prints each problem on its own line and exits 1", async () => {
    await withDir(async (dir) => {
      const f = join(dir, "bad.scene.yaml");
      writeFileSync(f, BAD);
      const { out, err, code } = await run(["validate", f]);
      expect(code).toBe(1);
      expect(out).toBe("");
      expect(err).toBe(`${f}: chapter 1, step 1: from and to are the same node "a"\n`);
    });
  });

  test("--json on a bad scene prints one object with message and path, exit 1", async () => {
    await withDir(async (dir) => {
      const f = join(dir, "bad.scene.yaml");
      writeFileSync(f, BAD);
      const { out, code } = await run(["validate", f, "--json"]);
      expect(code).toBe(1);
      expect(out.endsWith("\n")).toBe(true);
      expect(JSON.parse(out)).toEqual({
        ok: false,
        issues: [
          {
            message: `${f}: chapter 1, step 1: from and to are the same node "a"`,
            path: "chapters[0].steps[0]",
          },
        ],
      });
    });
  });

  test("--json on a good scene prints title, nodes and steps, exit 0", async () => {
    const { out, code } = await run(["validate", udp, "--json"]);
    expect(code).toBe(0);
    expect(JSON.parse(out)).toEqual({ ok: true, title: "How a UDP message travels", nodes: 4, steps: 3 });
  });

  test("--json reports a file that cannot be read as an issue", async () => {
    const { out, code } = await run(["validate", "/nonexistent/none.scene.yaml", "--json"]);
    expect(code).toBe(1);
    expect(JSON.parse(out)).toEqual({
      ok: false,
      issues: [{ message: "none.scene.yaml: cannot read file (ENOENT)" }],
    });
  });

  test("a missing file name exits 2", async () => {
    const { err, code } = await run(["validate"]);
    expect(code).toBe(2);
    expect(err).toContain("validate needs one scene file");
  });
});

describe("cli build --json", () => {
  test("success prints title, nodes, steps and out", async () => {
    await withDir(async (dir) => {
      const o = join(dir, "x.html");
      const { out, code } = await run(["build", udp, "-o", o, "--json"]);
      expect(code).toBe(0);
      expect(JSON.parse(out)).toEqual({ ok: true, title: "How a UDP message travels", nodes: 4, steps: 3, out: o });
      expect(readdirSync(dir)).toEqual(["x.html"]);
    });
  });

  test("failure prints the issues object and exit 1, and writes no HTML", async () => {
    await withDir(async (dir) => {
      const f = join(dir, "bad.scene.yaml");
      writeFileSync(f, BAD);
      const { out, code } = await run(["build", f, "--json"]);
      expect(code).toBe(1);
      expect(JSON.parse(out).ok).toBe(false);
      expect(JSON.parse(out).issues[0].path).toBe("chapters[0].steps[0]");
      expect(readdirSync(dir)).toEqual(["bad.scene.yaml"]);
    });
  });

  test("without --json the text output is unchanged", async () => {
    await withDir(async (dir) => {
      const o = join(dir, "x.html");
      const { out, code } = await run(["build", udp, "-o", o]);
      expect(code).toBe(0);
      expect(out).toMatch(new RegExp(`^Wrote ${o.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")} \\(\\d+ bytes\\)\\n$`));
    });
  });
});

describe("cli icons", () => {
  test("prints the 40 icon names sorted, one per line", async () => {
    const { out, code } = await run(["icons"]);
    expect(code).toBe(0);
    const names = out.trimEnd().split("\n");
    const files = [...readdirSync(root + "icons/isoflow"), ...readdirSync(root + "icons/custom")]
      .filter((f) => f.endsWith(".svg"))
      .map((f) => f.slice(0, -4))
      .sort();
    expect(names).toEqual(files);
    expect(names.length).toBe(40);
    expect(out.endsWith("\n")).toBe(true);
  });

  test("extra arguments exit 2", async () => {
    const { code } = await run(["icons", "x"]);
    expect(code).toBe(2);
  });
});
