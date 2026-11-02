import { memo, useEffect, useRef, useState } from "react";
import { RULER_MAX_BANDS } from "./constructConfig";

const LABEL_STEP_PX = 100;
const BAND_SLOTS = Array.from({ length: RULER_MAX_BANDS }, (_, i) => i);

interface RulersProps {
  visible: boolean;
}

const marks = (length: number): number[] =>
  Array.from({ length: Math.ceil(length / LABEL_STEP_PX) }, (_, i) => i * LABEL_STEP_PX);

/** Write a style only when it changes: this runs every frame for 6 bands. */
const setStyle = (
  el: HTMLElement,
  prop: "opacity" | "transform" | "width" | "height",
  value: string,
) => {
  if (el.style[prop] !== value) el.style[prop] = value;
};

/** Place one ruler band over [start, start + size], or hide it. */
const placeBand = (band: HTMLElement | null, start: number, size: number, axis: "x" | "y") => {
  if (!band) return;
  if (size <= 0) {
    setStyle(band, "opacity", "0");
    return;
  }
  setStyle(band, "opacity", "1");
  setStyle(
    band,
    "transform",
    axis === "x" ? `translateX(${Math.round(start)}px)` : `translateY(${Math.round(start)}px)`,
  );
  setStyle(band, axis === "x" ? "width" : "height", `${Math.round(size)}px`);
};

/**
 * Design-tool style rulers pinned to the top and left edges of the viewport.
 * Like a real editor, the extent of each layer under construction lights up on them.
 */
function Rulers({ visible }: RulersProps) {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  const topBands = useRef<Array<HTMLElement | null>>([]);
  const leftBands = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    let frame = 0;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setSize({ w: window.innerWidth, h: window.innerHeight }));
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Follow the layers being built every frame, only while the rulers are shown.
  useEffect(() => {
    if (!visible) return;
    let frame = requestAnimationFrame(function track() {
      // The section under construction first (a long band), then its building layers.
      const building = Array.from(
        document.querySelectorAll(".cx-scaffold--on, .cx--building"),
      ).slice(0, RULER_MAX_BANDS);
      BAND_SLOTS.forEach((i) => {
        const rect = building[i]?.getBoundingClientRect();
        placeBand(topBands.current[i], rect?.left ?? 0, rect?.width ?? 0, "x");
        placeBand(leftBands.current[i], rect?.top ?? 0, rect?.height ?? 0, "y");
      });
      frame = requestAnimationFrame(track);
    });
    return () => cancelAnimationFrame(frame);
  }, [visible]);

  return (
    <div className={`cx-rulers${visible ? " cx-rulers--visible" : ""}`} aria-hidden="true">
      <div className="cx-ruler cx-ruler--top">
        {BAND_SLOTS.map((i) => (
          <i key={i} className="cx-ruler__band" ref={(el) => (topBands.current[i] = el)} />
        ))}
        {marks(size.w).map((x) => (
          <span key={x} style={{ left: x }}>
            {x}
          </span>
        ))}
      </div>
      <div className="cx-ruler cx-ruler--left">
        {BAND_SLOTS.map((i) => (
          <i key={i} className="cx-ruler__band" ref={(el) => (leftBands.current[i] = el)} />
        ))}
        {marks(size.h).map((y) => (
          <span key={y} style={{ top: y }}>
            {y}
          </span>
        ))}
      </div>
    </div>
  );
}

export default memo(Rulers);
