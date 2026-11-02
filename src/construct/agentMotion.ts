/**
 * Cursor motion as a critically damped spring: a quick flick toward the target
 * that eases into place without overshoot. Giving the x and y axes slightly
 * different stiffness bends the path into a natural, hand-drawn arc.
 */
export interface Body {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  /** Stiffness per axis (rad/s); higher settles faster. */
  wx: number;
  wy: number;
}

const MIN_OMEGA = 2.5;
const MAX_OMEGA = 24;
/** After this many 1/omega periods a critically damped spring is within ~1% of its target. */
const SETTLE_PERIODS = 6.5;
/** Larger frames are split into sub-steps so a slow frame never destabilises the spring. */
const MAX_SUBSTEP_S = 1 / 120;
/**
 * A hand has a top speed and can't jerk instantly: long jumps ramp up and cruise
 * instead of teleporting (an uncapped spring peaked near 8000 px/s).
 */
const MAX_SPEED = 2200;
const MAX_ACCEL = 26000;
const REST_DISTANCE = 0.4;
const REST_SPEED = 4;

/** Stiffness that settles the move in about `ms`. */
export const omegaFor = (ms: number): number =>
  Math.min(MAX_OMEGA, Math.max(MIN_OMEGA, SETTLE_PERIODS / Math.max(ms / 1000, 0.001)));

export const placeAt = (x: number, y: number): Body => ({
  x,
  y,
  vx: 0,
  vy: 0,
  tx: x,
  ty: y,
  wx: MAX_OMEGA,
  wy: MAX_OMEGA,
});

/**
 * Aim at a new target, settling in about `ms`. `bend` (0..1) slows the
 * vertical axis a little so the cursor travels on a curve instead of a ruler line.
 */
export const aimAt = (body: Body, tx: number, ty: number, ms: number, bend: number): Body => {
  const omega = omegaFor(ms);
  return { ...body, tx, ty, wx: omega, wy: omega * (1 - 0.3 * bend) };
};

/** Scale (x, y) down so its length is at most `max`. */
const capLength = (x: number, y: number, max: number): [number, number] => {
  const length = Math.hypot(x, y);
  return length > max ? [(x / length) * max, (y / length) * max] : [x, y];
};

/** One sub-step: spring force, then hand-like limits on acceleration and speed. */
const subStep = (b: Body, dt: number): Body => {
  const [ax, ay] = capLength(
    b.wx * b.wx * (b.tx - b.x) - 2 * b.wx * b.vx,
    b.wy * b.wy * (b.ty - b.y) - 2 * b.wy * b.vy,
    MAX_ACCEL
  );
  const [vx, vy] = capLength(b.vx + ax * dt, b.vy + ay * dt, MAX_SPEED);
  return { ...b, vx, vy, x: b.x + vx * dt, y: b.y + vy * dt };
};

export const stepBody = (body: Body, dtSeconds: number): Body => {
  const steps = Math.max(1, Math.ceil(dtSeconds / MAX_SUBSTEP_S));
  const dt = dtSeconds / steps;
  let next = body;
  for (let i = 0; i < steps; i += 1) next = subStep(next, dt);
  return next;
};

export const atRest = (body: Body): boolean =>
  Math.hypot(body.tx - body.x, body.ty - body.y) < REST_DISTANCE &&
  Math.hypot(body.vx, body.vy) < REST_SPEED;
