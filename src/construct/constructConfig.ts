/**
 * Tuning knobs for the "agents constructing the page" scroll animation.
 */

export interface AgentSpec {
  id: string;
  name: string;
  /** Letter(s) shown in the HUD avatar. */
  initial: string;
  color: string;
}

export const AGENTS: readonly AgentSpec[] = [
  { id: "a0", name: "Claude", initial: "C", color: "#D97757" },
  { id: "a1", name: "agent-01", initial: "1", color: "#38bdf8" },
  { id: "a2", name: "agent-02", initial: "2", color: "#a78bfa" },
  { id: "a3", name: "agent-03", initial: "3", color: "#34d399" },
  { id: "a4", name: "agent-04", initial: "4", color: "#f472b6" },
  { id: "a5", name: "agent-05", initial: "5", color: "#fbbf24" },
  { id: "a6", name: "agent-06", initial: "6", color: "#60a5fa" },
  { id: "a7", name: "agent-07", initial: "7", color: "#fb7185" },
];

/** Playback speeds the HUD's speed button cycles through. */
export const SPEEDS: readonly number[] = [1, 2, 0.5];

export const nextSpeed = (current: number): number =>
  SPEEDS[(SPEEDS.indexOf(current) + 1) % SPEEDS.length] ?? SPEEDS[0];

/** Fewer cursors on small screens so the page stays readable. */
export const MOBILE_AGENT_COUNT = 4;
export const MOBILE_BREAKPOINT_PX = 600;

/** How many layers may be under construction at the same time. */
export const MAX_CONCURRENT_BUILDS = 3;
/** Minimum gap between two builds starting, gives the sequential "assembly" feel. */
export const BUILD_STAGGER_MS = 84;
/** Build durations below the first screen are multiplied by this. */
export const BUILD_DURATION_SCALE = 0.6;

/**
 * The first screen is built by the whole swarm at once, like the opening of the
 * reference video: every agent flies in together and the profile is done in ~2s.
 */
export const INTRO = {
  windowMs: 1500,
  /** Every agent works the first screen. */
  agents: AGENTS.length,
  concurrency: 8,
  staggerMs: 40,
  /** Build durations on the first screen are multiplied by this. */
  durationScale: 0.5,
  /** Opening beat: a blank page while the swarm circles in; building starts after it. */
  swarmMs: 800,
  /** Then bare wireframes (with layer tags) before the drafts fade in. */
  wireMs: 500,
  /** Full-width layout guides drawn over the first screen (from load), then faded out. */
  guidesMs: 2400,
} as const;

/** Auto-scroll "Touring" mode: the page glides down while agents build just ahead. */
export const TOUR = {
  pxPerSec: 120,
  /** Creep at this share of the speed while layers wait for agents, so builds stay on screen. */
  busyFactor: 0.15,
} as const;

/** Pixels to scroll this frame; a long frame (tab switch) never jumps the page. */
export const tourStep = (dtMs: number, speed: number, busy: boolean): number =>
  (clamp(dtMs, 0, 50) / 1000) * TOUR.pxPerSec * speed * (busy ? TOUR.busyFactor : 1);

/** Max selection bands the rulers mirror at once. */
export const RULER_MAX_BANDS = 3;

/** Where waiting agents sit: a small cluster above the bottom-right corner. */
export const parkingSpot = (
  slot: number,
  viewportWidth: number,
  viewportHeight: number
): { x: number; y: number } => ({
  x: viewportWidth - 56 - (slot % 3) * 22,
  y: viewportHeight - 96 - Math.floor(slot / 3) * 26,
});

export const BLOCK_BUILD_MS = { min: 750, max: 1100 };
export const TYPE_BUILD_MS = { min: 600, max: 1800, perChar: 28, base: 300 };
/** Paragraph-style text types faster per char, but takes longer overall. */
export const TEXT_BUILD_MS = { min: 700, max: 2400, perChar: 9, base: 400 };
/**
 * Duplicated grid cards, Figma "repeat grid" style, in two passes:
 *  1. place - row by row the copies sweep out until every slot holds a copy,
 *  2. edit  - then the copies are edited one by one (new image, retyped text).
 * Raw times, scaled like every other build.
 */
export const DUP_TIMING = {
  /** Time for the cursor to grab the handle before the first sweep. */
  lead: 250,
  sweep: 550,
  /** Pause between one row landing and the next row sweeping out. */
  rowGap: 150,
  /** Pause after the last copy lands, before the first edit. */
  hold: 300,
  fill: 1100,
} as const;

export interface DupPlacement {
  /** Row of the copy, counted from the first card's row. */
  rowRank: number;
  /** Row of the last copy in the grid. */
  lastRowRank: number;
  /** Position in the edit pass (reading order among the copies). */
  fillOrder: number;
}

export interface DupDuration {
  total: number;
  sweepAtShare: number;
  dropShare: number;
  fillAtShare: number;
}

/** Every copy is placed before any copy is edited, so the grid never shows a gap. */
export const dupDuration = ({ rowRank, lastRowRank, fillOrder }: DupPlacement): DupDuration => {
  const step = DUP_TIMING.sweep + DUP_TIMING.rowGap;
  const sweepAt = DUP_TIMING.lead + Math.max(0, rowRank) * step;
  const drop = sweepAt + DUP_TIMING.sweep;
  const allPlaced = DUP_TIMING.lead + Math.max(0, lastRowRank) * step + DUP_TIMING.sweep;
  const fillAt = allPlaced + DUP_TIMING.hold + Math.max(0, fillOrder) * DUP_TIMING.fill;
  const total = fillAt + DUP_TIMING.fill;
  return {
    total,
    sweepAtShare: sweepAt / total,
    dropShare: drop / total,
    fillAtShare: fillAt / total,
  };
};
/** Share of the build spent dragging the selection box open. */
export const DRAW_SHARE = 0.35;
/** Max column guides a section scaffold draws. */
export const MAX_GUIDES = 4;
/** An edge becomes a column guide only when this many layers line up on it. */
export const MIN_GUIDE_ALIGNMENT = 2;

/** How long the selection outline lingers after a layer is done. */
export const SETTLE_MS = 450;
/** HUD / rulers / cursors fade out after this much idle time. */
export const IDLE_HIDE_MS = 2200;
export const WANDER_INTERVAL_MS = 1400;

/**
 * block - raw draft develops into the real thing behind a scan line
 * type  - heading typed over a faint draft (use with <TypeText>)
 * text  - any rich text (paragraphs, links) typed out in place with an I-beam
 */
export type BuildKind = "block" | "type" | "text";

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export const typeDuration = (textLength: number): number =>
  clamp(
    TYPE_BUILD_MS.base + textLength * TYPE_BUILD_MS.perChar,
    TYPE_BUILD_MS.min,
    TYPE_BUILD_MS.max
  );

export const textDuration = (textLength: number): number =>
  clamp(
    TEXT_BUILD_MS.base + textLength * TEXT_BUILD_MS.perChar,
    TEXT_BUILD_MS.min,
    TEXT_BUILD_MS.max
  );

export const blockDuration = (random: number): number =>
  Math.round(BLOCK_BUILD_MS.min + random * (BLOCK_BUILD_MS.max - BLOCK_BUILD_MS.min));

/** A point inside a layer, expressed as fractions of its width / height. */
export interface PathPoint {
  fx: number;
  fy: number;
}

/**
 * Route a cursor takes across a layer while "building" it.
 * Lead agent drags a selection box corner-to-corner, helpers sweep rows.
 */
export const buildPath = (role: number, random: () => number): PathPoint[] => {
  if (role === 0) {
    return [
      { fx: 0, fy: 0 },
      { fx: 1, fy: 1 },
      { fx: 0.5 + random() * 0.4, fy: 0.3 + random() * 0.5 },
    ];
  }
  const row = (role % 3) / 3 + 0.15;
  return [
    { fx: random() * 0.3, fy: row },
    { fx: 0.6 + random() * 0.4, fy: row + random() * 0.1 },
    { fx: random(), fy: clamp(row + 0.25, 0, 1) },
  ];
};

/** Number of helpers to send, bigger layers get more agents. */
export const agentsForArea = (width: number, height: number): number => {
  const area = width * height;
  if (area > 200_000) return 3;
  if (area > 40_000) return 2;
  return 1;
};

export const typedSlice = (text: string, progress: number): string =>
  text.slice(0, Math.round(clamp(progress, 0, 1) * text.length));

/**
 * Spread `count` typed characters across consecutive text segments.
 * sliceAcross([3, 4], 5) -> [3, 2]
 */
export const sliceAcross = (lengths: readonly number[], count: number): number[] => {
  let remaining = Math.max(0, count);
  return lengths.map((len) => {
    const take = Math.min(len, remaining);
    remaining -= take;
    return take;
  });
};

/**
 * Pick the column lines of a layout: edges shared by at least `minCount`
 * layers, strongest first, capped at `max`, returned left to right.
 */
export const alignmentGuides = (
  positions: readonly number[],
  max: number,
  minCount: number,
  snap = 4
): number[] => {
  const counts = positions
    .map((p) => Math.round(p / snap) * snap)
    .filter((p) => p >= 0)
    .reduce((acc, p) => acc.set(p, (acc.get(p) ?? 0) + 1), new Map<number, number>());
  return Array.from(counts.entries())
    .filter(([, count]) => count >= minCount)
    .sort((a, b) => b[1] - a[1] || a[0] - b[0])
    .slice(0, max)
    .map(([p]) => p)
    .sort((a, b) => a - b);
};
