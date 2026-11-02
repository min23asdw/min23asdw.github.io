/**
 * @jest-environment node
 */
import {
  agentsForArea,
  blockDuration,
  BLOCK_BUILD_MS,
  buildPath,
  clamp,
  nextSpeed,
  parkingSpot,
  sliceAcross,
  textDuration,
  TEXT_BUILD_MS,
  typeDuration,
  typedSlice,
  TYPE_BUILD_MS,
  alignmentGuides,
  tourStep,
  TOUR,
  dupDuration,
  DUP_TIMING,
} from "./constructConfig";

const fixedRandom = () => 0.5;

describe("constructConfig", () => {
  test("clamp bounds values", () => {
    expect(clamp(5, 0, 3)).toBe(3);
    expect(clamp(-1, 0, 3)).toBe(0);
    expect(clamp(2, 0, 3)).toBe(2);
  });

  test("typeDuration scales with length and stays in range", () => {
    expect(typeDuration(0)).toBe(TYPE_BUILD_MS.min);
    expect(typeDuration(10_000)).toBe(TYPE_BUILD_MS.max);
    expect(typeDuration(30)).toBeGreaterThan(typeDuration(20));
  });

  test("blockDuration maps random 0..1 into range", () => {
    expect(blockDuration(0)).toBe(BLOCK_BUILD_MS.min);
    expect(blockDuration(1)).toBe(BLOCK_BUILD_MS.max);
  });

  test("buildPath keeps every point inside the layer", () => {
    [0, 1, 2, 3].forEach((role) => {
      const path = buildPath(role, Math.random);
      expect(path.length).toBeGreaterThan(1);
      path.forEach(({ fx, fy }) => {
        expect(fx).toBeGreaterThanOrEqual(0);
        expect(fx).toBeLessThanOrEqual(1);
        expect(fy).toBeGreaterThanOrEqual(0);
        expect(fy).toBeLessThanOrEqual(1.1);
      });
    });
  });

  test("lead agent drags a corner-to-corner selection", () => {
    const [start, end] = buildPath(0, fixedRandom);
    expect(start).toEqual({ fx: 0, fy: 0 });
    expect(end).toEqual({ fx: 1, fy: 1 });
  });

  test("agentsForArea sends more agents to bigger layers", () => {
    expect(agentsForArea(100, 20)).toBe(1);
    expect(agentsForArea(400, 200)).toBe(2);
    expect(agentsForArea(1000, 400)).toBe(3);
  });

  test("nextSpeed cycles through speeds and recovers from unknown values", () => {
    expect(nextSpeed(1)).toBe(2);
    expect(nextSpeed(2)).toBe(0.5);
    expect(nextSpeed(0.5)).toBe(1);
    expect(nextSpeed(3)).toBe(1);
  });

  test("textDuration stays in range", () => {
    expect(textDuration(0)).toBe(TEXT_BUILD_MS.min);
    expect(textDuration(100_000)).toBe(TEXT_BUILD_MS.max);
  });

  test("sliceAcross fills segments in order", () => {
    expect(sliceAcross([3, 4], 0)).toEqual([0, 0]);
    expect(sliceAcross([3, 4], 5)).toEqual([3, 2]);
    expect(sliceAcross([3, 4], 99)).toEqual([3, 4]);
    expect(sliceAcross([3, 4], -2)).toEqual([0, 0]);
  });

  test("alignmentGuides keeps only shared edges, strongest first", () => {
    // 10/11 snap together (2 hits), 50 x3, 30 alone, -5 dropped
    expect(alignmentGuides([10, 11, 50, 50, 51, -5, 30], 10, 2)).toEqual([12, 52]);
    // cap keeps the most aligned edges, returned left to right
    expect(alignmentGuides([200, 200, 200, 0, 0, 100, 100, 100, 100], 2, 2)).toEqual([100, 200]);
    expect(alignmentGuides([5, 40, 80], 4, 2)).toEqual([]);
  });

  test("parkingSpot clusters waiting agents near the bottom-right corner", () => {
    const spots = [0, 1, 2, 3, 4].map((slot) => parkingSpot(slot, 1280, 720));
    spots.forEach(({ x, y }) => {
      expect(x).toBeGreaterThan(1280 - 120);
      expect(x).toBeLessThan(1280);
      expect(y).toBeGreaterThan(720 - 160);
      expect(y).toBeLessThan(720);
    });
    expect(new Set(spots.map((s) => `${s.x},${s.y}`)).size).toBe(spots.length);
  });

  test("tourStep scrolls by speed, slows when busy and caps long frames", () => {
    expect(tourStep(1000 / 60, 1, false)).toBeCloseTo(TOUR.pxPerSec / 60);
    expect(tourStep(20, 2, false)).toBeCloseTo(tourStep(20, 1, false) * 2);
    expect(tourStep(20, 1, true)).toBeCloseTo(tourStep(20, 1, false) * TOUR.busyFactor);
    expect(tourStep(5000, 1, false)).toBe(tourStep(50, 1, false));
    expect(tourStep(-10, 1, false)).toBe(0);
  });

  test("dupDuration: every copy is placed before any copy is edited", () => {
    const at = (d: ReturnType<typeof dupDuration>, share: number) => Math.round(share * d.total);
    // 3 rows of copies: rows sweep out one after another...
    const row0 = dupDuration({ rowRank: 0, lastRowRank: 2, fillOrder: 0 });
    const row2 = dupDuration({ rowRank: 2, lastRowRank: 2, fillOrder: 7 });
    expect(at(row2, row2.sweepAtShare)).toBeGreaterThan(at(row0, row0.dropShare));
    // ...and the first edit starts only after the last row has landed.
    expect(at(row0, row0.fillAtShare)).toBeGreaterThan(at(row2, row2.dropShare));
    // Edits run one card at a time.
    const next = dupDuration({ rowRank: 0, lastRowRank: 2, fillOrder: 1 });
    expect(at(next, next.fillAtShare) - at(row0, row0.fillAtShare)).toBe(DUP_TIMING.fill);
    expect(row0.total - at(row0, row0.fillAtShare)).toBe(DUP_TIMING.fill);
  });

  test("typedSlice reveals text progressively", () => {
    expect(typedSlice("hello", 0)).toBe("");
    expect(typedSlice("hello", 0.4)).toBe("he");
    expect(typedSlice("hello", 1)).toBe("hello");
    expect(typedSlice("hello", 2)).toBe("hello");
  });
});
