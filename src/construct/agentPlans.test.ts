/**
 * @jest-environment node
 */
import { agentsNeeded, approachMs, dupTimeline, FILL_IMAGE_SHARE } from "./agentPlans";

describe("agentPlans", () => {
  test("approachMs: farther grabs take longer, within bounds", () => {
    expect(approachMs(800, 2000)).toBeGreaterThan(approachMs(100, 2000));
    expect(approachMs(0, 2000)).toBe(140);
    expect(approachMs(100_000, 2000)).toBe(600);
    // Short builds never spend more than 30% walking.
    expect(approachMs(0, 200)).toBe(60);
  });

  test("agentsNeeded: one per action, a second only to click big media", () => {
    expect(agentsNeeded({ kind: "text", durationMs: 1000 }, 900_000)).toBe(1);
    expect(agentsNeeded({ kind: "block", durationMs: 1000 }, 10_000)).toBe(1);
    expect(agentsNeeded({ kind: "block", durationMs: 1000 }, 90_000)).toBe(2);
  });

  test("dupTimeline: sweep, drop, then fill and retype, in order", () => {
    const t = dupTimeline(2000, { sweepAtShare: 0.1, dropShare: 0.35, fillAtShare: 0.6 });
    expect(t.sweep).toBe(200);
    expect(t.drop).toBe(700);
    expect(t.fill).toBe(1200);
    expect(t.type).toBe(1200 + 800 * FILL_IMAGE_SHARE);
  });
});
