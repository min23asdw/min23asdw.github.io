import { memo, useEffect, useState } from "react";
import { alignmentGuides, INTRO } from "./constructConfig";

/** Caps keep the opening busy but readable. */
const MAX_ROWS = 10;
const MAX_COLUMNS = 5;
const SNAP_PX = 6;
const FADE_MS = 700;
const DRAW_STAGGER_MS = 35;

interface Lines {
  rows: number[];
  columns: number[];
}

/**
 * Opening beat of the reference video: thin layout guides run edge to edge
 * through every layer of the first screen, drawn out one after another, then
 * fade away once the swarm has built it. Only shown when the page opens at the top.
 */
function IntroGuides() {
  const [lines, setLines] = useState<Lines | null>(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (window.scrollY > window.innerHeight / 2) return;
    // Drawn once the swarm has circled in, as the wireframes appear.
    const measureTimer = window.setTimeout(() => {
      const rects = Array.from(document.querySelectorAll("[data-cx]"))
        .map((el) => el.getBoundingClientRect())
        .filter((r) => r.width > 0 && r.bottom > 0 && r.top < window.innerHeight);
      setLines({
        rows: alignmentGuides(
          rects.flatMap((r) => [r.top, r.bottom]),
          MAX_ROWS,
          1,
          SNAP_PX
        ),
        columns: alignmentGuides(
          rects.flatMap((r) => [r.left, r.right]),
          MAX_COLUMNS,
          2,
          SNAP_PX
        ),
      });
    }, INTRO.swarmMs);
    const fade = () => setFading(true);
    const fadeTimer = window.setTimeout(fade, INTRO.guidesMs);
    const endTimer = window.setTimeout(() => setLines(null), INTRO.guidesMs + FADE_MS);
    // Viewport-fixed guides would drift off their layers, so leave as soon as the page moves.
    window.addEventListener("scroll", fade, { once: true, passive: true });
    return () => {
      window.clearTimeout(measureTimer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(endTimer);
      window.removeEventListener("scroll", fade);
    };
  }, []);

  if (!lines) return null;
  return (
    <div className={`cx-intro${fading ? " cx-intro--fading" : ""}`} aria-hidden="true">
      {lines.rows.map((y, i) => (
        <i
          key={`r${y}`}
          className="cx-intro__row"
          style={{ top: y, animationDelay: `${i * DRAW_STAGGER_MS}ms` }}
        />
      ))}
      {lines.columns.map((x, i) => (
        <i
          key={`c${x}`}
          className="cx-intro__col"
          style={{ left: x, animationDelay: `${i * DRAW_STAGGER_MS}ms` }}
        />
      ))}
    </div>
  );
}

export default memo(IntroGuides);
