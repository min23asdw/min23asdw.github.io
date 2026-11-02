/**
 * @jest-environment node
 */
import { aimAt, atRest, omegaFor, placeAt, stepBody, Body } from "./agentMotion";

const run = (body: Body, seconds: number, fps = 60): Body[] => {
  const frames: Body[] = [];
  let b = body;
  for (let t = 0; t < seconds; t += 1 / fps) {
    b = stepBody(b, 1 / fps);
    frames.push(b);
  }
  return frames;
};

describe("agentMotion", () => {
  test("omegaFor: shorter moves are stiffer, within limits", () => {
    expect(omegaFor(200)).toBeGreaterThan(omegaFor(800));
    expect(omegaFor(1)).toBe(24);
    expect(omegaFor(100_000)).toBe(2.5);
  });

  test("settles on the target in about the requested time without overshoot", () => {
    const start = aimAt(placeAt(0, 0), 300, 0, 500, 0);
    const frames = run(start, 0.8);
    expect(Math.max(...frames.map((f) => f.x))).toBeLessThanOrEqual(300.001);
    // Within 2% of the distance once the requested 500ms are up (frame 30 at 60fps).
    expect(frames[29].x).toBeGreaterThan(294);
    expect(frames[frames.length - 1].x).toBeCloseTo(300, 0);
    expect(atRest(frames[frames.length - 1])).toBe(true);
  });

  test("starts fast and eases in (flick, then settle)", () => {
    const frames = run(aimAt(placeAt(0, 0), 300, 0, 500, 0), 0.5);
    const early = frames[3].x - frames[2].x;
    const late = frames[frames.length - 1].x - frames[frames.length - 2].x;
    expect(early).toBeGreaterThan(late * 5);
  });

  test("bend curves the path off the straight line", () => {
    const frames = run(aimAt(placeAt(0, 0), 300, 300, 500, 1), 0.3);
    expect(frames.some((f) => f.x - f.y > 10)).toBe(true);
  });

  test("long jumps are speed-limited instead of teleporting", () => {
    const frames = run(aimAt(placeAt(0, 0), 2000, 0, 300, 0), 1.5);
    const speeds = frames.slice(1).map((f, i) => (f.x - frames[i].x) * 60);
    expect(Math.max(...speeds)).toBeLessThanOrEqual(2201);
    expect(speeds[0]).toBeLessThan(speeds[5]); // ramps up, no instant jerk
    expect(frames[frames.length - 1].x).toBeCloseTo(2000, 0);
  });

  test("a long frame is sub-stepped and stays stable", () => {
    const b = stepBody(aimAt(placeAt(0, 0), 100, 100, 200, 0), 0.5);
    expect(Number.isFinite(b.x)).toBe(true);
    expect(b.x).toBeLessThanOrEqual(100.001);
  });
});
