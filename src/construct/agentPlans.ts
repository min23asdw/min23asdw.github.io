import { BuildKind, clamp, DRAW_SHARE } from "./constructConfig";

/**
 * What each cursor actually *does* on a layer, so every move has a visible
 * result: grab a corner and drag the selection open, click the image, ride the
 * typing caret, or carry a duplicated card into its slot.
 */
export interface AgentControl {
  position: () => { x: number; y: number };
  moveTo: (x: number, y: number, settleMs: number) => void;
  /** Mouse button held (the arrow dips) while dragging. */
  press: (down: boolean) => void;
  /** A click: a quick press plus a ripple at the point. */
  click: (x: number, y: number) => void;
  /** Runs `fn` after `ms`, unless this agent has been given new work since. */
  after: (ms: number, fn: () => void) => void;
}

/**
 * A repeat-grid copy: where it sweeps out from, and its place in the two passes
 * (all copies placed first, then edited one by one), as shares of its build.
 */
export interface DupSpec {
  master: HTMLElement;
  from: HTMLElement;
  rowEnd: HTMLElement;
  leadsRow: boolean;
  sweepAtShare: number;
  dropShare: number;
  fillAtShare: number;
}

interface Point {
  x: number;
  y: number;
}

/**
 * Borrow a free cursor for a stretch of a long build: at `atMs` the nearest idle
 * agent to `near()` is handed to `work`, and stays busy until `untilMs`.
 */
export type Hire = (
  atMs: number,
  untilMs: number,
  near: () => Point,
  work: (ctl: AgentControl) => void
) => void;

export interface Plan {
  kind: BuildKind;
  durationMs: number;
  /** Set for duplicated grid cards. */
  dup?: DupSpec;
}

/** Hand speed used to time the walk to the first grab point (px per ms). */
const APPROACH_SPEED = 1.6;
const APPROACH_MIN_MS = 140;
/** Share of a build the walk to the grab point may use at most. */
const APPROACH_MAX_SHARE = 0.3;
/** Duplicates: share of the fill spent on the new image before the text is retyped. */
export const FILL_IMAGE_SHARE = 0.25;
const CARET_FOLLOW_MS = 70;
const CARET_SETTLE_MS = 140;
const MIN_MEDIA_AREA = 2500;

/** Time to reach the grab point: distance at hand speed, within sensible bounds. */
export const approachMs = (distancePx: number, durationMs: number): number =>
  Math.round(
    clamp(
      distancePx / APPROACH_SPEED,
      Math.min(APPROACH_MIN_MS, durationMs * APPROACH_MAX_SHARE),
      durationMs * APPROACH_MAX_SHARE
    )
  );

/**
 * Timeline of one repeat-grid copy in ms, shared by the cursors and the clone so
 * they stay in sync: sweep out, drop, then (on its turn) fill: click a new image
 * in, then retype the text.
 */
export interface DupTimeline {
  sweep: number;
  drop: number;
  fill: number;
  type: number;
}

export const dupTimeline = (
  durationMs: number,
  spec: Pick<DupSpec, "sweepAtShare" | "dropShare" | "fillAtShare">
): DupTimeline => {
  const fill = durationMs * spec.fillAtShare;
  return {
    sweep: durationMs * spec.sweepAtShare,
    drop: durationMs * spec.dropShare,
    fill,
    type: fill + (durationMs - fill) * FILL_IMAGE_SHARE,
  };
};

/** Lead time to walk to the handle / the image before the action starts. */
const DUP_GRAB_LEAD_MS = 220;
const DUP_EDIT_LEAD_MS = 260;

/** How many cursors a layer needs: one per action, a second only to click big media. */
export const agentsNeeded = (plan: Plan, area: number): number =>
  plan.kind === "block" && !plan.dup && area > 40_000 ? 2 : 1;

const pointIn = (el: Element, fx: number, fy: number) => {
  const r = el.getBoundingClientRect();
  return { x: r.left + fx * r.width, y: r.top + fy * r.height };
};

const distanceTo = (ctl: AgentControl, p: { x: number; y: number }) => {
  const at = ctl.position();
  return Math.hypot(p.x - at.x, p.y - at.y);
};

/** Delay the selection box until the lead cursor has the corner in hand. */
export const GRAB_VAR = "--cx-grab";

/** Lead on a block: grab the corner, drag the box open with it, release, click to apply. */
const leadBlock = (ctl: AgentControl, el: HTMLElement, durationMs: number) => {
  const approach = approachMs(distanceTo(ctl, pointIn(el, 0, 0)), durationMs);
  const drag = durationMs * DRAW_SHARE;
  const applyAt = Math.min(approach + drag + durationMs * 0.12, durationMs * 0.9);
  el.style.setProperty(GRAB_VAR, `${approach}ms`);

  const corner = pointIn(el, 0, 0);
  ctl.moveTo(corner.x, corner.y, approach);
  ctl.after(approach, () => {
    ctl.press(true);
    const end = pointIn(el, 1, 1);
    ctl.moveTo(end.x, end.y, drag);
  });
  ctl.after(approach + drag, () => {
    ctl.press(false);
    const spot = pointIn(el, 0.6 + Math.random() * 0.2, 0.35 + Math.random() * 0.3);
    ctl.moveTo(spot.x, spot.y, applyAt - approach - drag);
  });
  ctl.after(applyAt, () => {
    const spot = ctl.position();
    ctl.click(spot.x, spot.y);
  });
};

/** Helper on a big block: go to its image (or main area) and click it into place. */
const helperMedia = (ctl: AgentControl, el: HTMLElement, durationMs: number) => {
  const media = Array.from(el.querySelectorAll("img, video, canvas, svg")).find((m) => {
    const r = m.getBoundingClientRect();
    return r.width * r.height >= MIN_MEDIA_AREA;
  });
  const target = () => (media ? pointIn(media, 0.5, 0.5) : pointIn(el, 0.5, 0.35));
  const arrive = durationMs * 0.45;
  ctl.after(durationMs * 0.12, () => {
    const p = target();
    ctl.moveTo(p.x, p.y, arrive - durationMs * 0.12);
  });
  ctl.after(arrive + durationMs * 0.08, () => {
    const p = target();
    ctl.click(p.x, p.y);
  });
};

/** Typing: the cursor rides just below the caret while the text appears. */
const typist = (ctl: AgentControl, el: HTMLElement, durationMs: number) => {
  const start = pointIn(el, 0, 0.5);
  ctl.moveTo(start.x, start.y, approachMs(distanceTo(ctl, start), durationMs));
  for (let t = CARET_FOLLOW_MS; t < durationMs; t += CARET_FOLLOW_MS) {
    ctl.after(t, () => {
      const caret = el.querySelector(".cx-caret, .cx-ibeam");
      const r = caret?.getBoundingClientRect();
      if (!r || r.height === 0) return;
      ctl.moveTo(r.right + 2, r.bottom - 2, CARET_SETTLE_MS);
    });
  }
};

const sameRow = (a: Element, b: Element) =>
  Math.abs(a.getBoundingClientRect().top - b.getBoundingClientRect().top) < 8;

/**
 * Repeat-grid copy, two cursor jobs:
 *  - place: the row's first copy hires a cursor that grabs the edge handle of the
 *    card it comes from and drags the whole row out (right, or down for new rows);
 *  - edit: on this card's turn a cursor clicks a new image in, then retypes the text.
 */
export const runDup = (hire: Hire, el: HTMLElement, dup: DupSpec, durationMs: number): void => {
  const t = dupTimeline(durationMs, dup);
  const horizontal = sameRow(dup.from, el);
  const handle = () => (horizontal ? pointIn(dup.from, 1, 0.5) : pointIn(dup.from, 0.5, 1));

  if (dup.leadsRow) {
    hire(t.sweep - DUP_GRAB_LEAD_MS, t.drop + 120, handle, (ctl) => {
      const h = handle();
      ctl.moveTo(h.x, h.y, DUP_GRAB_LEAD_MS);
      ctl.after(DUP_GRAB_LEAD_MS, () => {
        ctl.press(true);
        const end = horizontal ? pointIn(dup.rowEnd, 1, 0.5) : pointIn(el, 0.5, 1);
        ctl.moveTo(end.x, end.y, t.drop - t.sweep);
      });
      ctl.after(DUP_GRAB_LEAD_MS + t.drop - t.sweep, () => ctl.press(false));
    });
  }

  const image = () => pointIn(el, 0.5, 0.3);
  hire(t.fill - DUP_EDIT_LEAD_MS, durationMs, image, (ctl) => {
    const p = image();
    ctl.moveTo(p.x, p.y, DUP_EDIT_LEAD_MS);
    ctl.after(DUP_EDIT_LEAD_MS, () => {
      const at = ctl.position();
      ctl.click(at.x, at.y);
    });
    ctl.after(DUP_EDIT_LEAD_MS + (t.type - t.fill), () => typist(ctl, el, durationMs - t.type));
  });
};

/** Start the plan for every assigned cursor; index 0 is the lead. */
export const runPlan = (agents: readonly AgentControl[], el: HTMLElement, plan: Plan): void => {
  const [lead, helper] = agents;
  if (!lead) return;
  if (plan.kind !== "block") {
    typist(lead, el, plan.durationMs);
    return;
  }
  leadBlock(lead, el, plan.durationMs);
  if (helper) helperMedia(helper, el, plan.durationMs);
};
