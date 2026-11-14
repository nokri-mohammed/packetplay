/* Generated from schema/scene.schema.json by `bun run gen:types`. Do not edit by hand. */

/**
 * A connection between two node ids.
 *
 * @minItems 2
 * @maxItems 2
 */
export type Link = [string, string];
/**
 * A single step, or a parallel block of steps.
 */
export type StepOrParallel = Step | Parallel;

/**
 * An svg-scenes scene: nodes, links, tracks and chapters of steps. The same model is used for YAML and JSON files.
 */
export interface Scene {
  /**
   * Optional schema reference, so JSON files can point at this schema.
   */
  $schema?: string;
  /**
   * Title of the scene, shown above the diagram.
   */
  title: string;
  /**
   * Background grid: iso (isometric tiles, the default) or none.
   */
  grid?: "iso" | "none";
  /**
   * Boxes in the diagram, keyed by node id.
   */
  nodes: {
    [k: string]: Node;
  };
  /**
   * Named areas that nodes can belong to, keyed by group id.
   */
  groups?: {
    [k: string]: Group;
  };
  /**
   * Connections between nodes, as pairs of node ids. Messages travel along links.
   */
  links: Link[];
  /**
   * Message categories with a label and a colour, keyed by track id.
   */
  tracks?: {
    [k: string]: Track;
  };
  /**
   * Ordered chapters, each with a list of steps.
   */
  chapters: Chapter[];
}
/**
 * One node in the diagram.
 */
export interface Node {
  /**
   * Text shown under the icon.
   */
  label: string;
  /**
   * File name stem of an SVG in icons/isoflow/.
   */
  icon:
    | "block"
    | "cache"
    | "cardterminal"
    | "cloud"
    | "cronjob"
    | "cube"
    | "desktop"
    | "diamond"
    | "dns"
    | "document"
    | "firewall"
    | "function-module"
    | "image"
    | "laptop"
    | "loadbalancer"
    | "lock"
    | "mail"
    | "mailmultiple"
    | "mobiledevice"
    | "office"
    | "package-module"
    | "paymentcard"
    | "plane"
    | "printer"
    | "pyramid"
    | "queue"
    | "router"
    | "server"
    | "speech"
    | "sphere"
    | "storage"
    | "switch-module"
    | "tower"
    | "truck"
    | "truck-2"
    | "user"
    | "vm";
  /**
   * Small second line under the label.
   */
  sub?: string;
  /**
   * Id of the group this node belongs to.
   */
  group?: string;
  /**
   * Optional manual position [i, j] in isometric tile coordinates. Fractions are allowed.
   *
   * @minItems 2
   * @maxItems 2
   */
  at?: [number, number];
}
/**
 * A named area around some nodes.
 */
export interface Group {
  /**
   * Text shown on the group.
   */
  label: string;
}
/**
 * A message category.
 */
export interface Track {
  /**
   * Name shown in the legend.
   */
  label: string;
  /**
   * A named colour or a hex colour such as #3b82f6.
   */
  color: ("blue" | "orange" | "green" | "red" | "purple" | "yellow" | "pink" | "teal" | "gray") | string;
}
/**
 * A group of steps that tells one part of the story.
 */
export interface Chapter {
  /**
   * Chapter title.
   */
  title: string;
  /**
   * Optional text shown when the chapter starts.
   */
  desc?: string;
  /**
   * Steps in order.
   */
  steps: StepOrParallel[];
}
/**
 * One message travelling from a node to another.
 */
export interface Step {
  /**
   * Id of the node the message starts at.
   */
  from: string;
  /**
   * Id of the node the message ends at.
   */
  to: string;
  /**
   * Node ids the route must pass through, in order.
   */
  via?: string[];
  /**
   * Id of the track (colour and legend entry).
   */
  track?: string;
  /**
   * Short text on the message.
   */
  label?: string;
  /**
   * Longer explanation shown in the caption panel.
   */
  desc?: string;
  /**
   * Key/value pairs shown on the data card.
   */
  data?: {
    [k: string]: unknown;
  };
  /**
   * Per-node changes while the message passes, keyed by node id.
   */
  at?: {
    [k: string]: Hop;
  };
  /**
   * packet: one message hops along the route. flow: a continuous stream.
   */
  mode?: "packet" | "flow";
  /**
   * Show the traffic in both directions.
   */
  both?: boolean;
  /**
   * Pause the player after this step.
   */
  pause?: boolean;
}
/**
 * What changes at a node when the message arrives.
 */
export interface Hop {
  /**
   * Data values to change on the card at this node.
   */
  set?: {
    [k: string]: unknown;
  };
  /**
   * Explanation shown when the message reaches this node.
   */
  desc?: string;
}
/**
 * Steps that run at the same time.
 */
export interface Parallel {
  /**
   * The steps to run together.
   *
   * @minItems 1
   */
  parallel: [Step, ...Step[]];
}
