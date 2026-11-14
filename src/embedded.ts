/**
 * Data the single-file build embeds. In the normal dev path this is undefined and the tool reads
 * the player source, icons and schema from disk. `scripts/build-skill.ts` replaces this whole
 * module with real data while bundling `src/cli.ts`.
 */
export interface Embedded {
  /** Minified browser player (the output of `Bun.build` on `src/player.ts`). */
  player: string;
  /** Icon name to SVG file text. */
  icons: Record<string, string>;
  /** The parsed scene schema. */
  schema: unknown;
}

export const embedded = undefined as Embedded | undefined;
