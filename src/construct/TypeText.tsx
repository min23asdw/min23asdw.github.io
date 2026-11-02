import { useEffect, useState } from "react";
import { useBuildPhase } from "./Build";
import { typedSlice } from "./constructConfig";

/** Share of the build time spent typing; the rest lets the caret rest at the end. */
const TYPING_SHARE = 0.85;

interface TypeTextProps {
  /** Use "\n" for line breaks. */
  text: string;
}

/**
 * Types its text out with a caret while the surrounding <Build> is building.
 * The full text stays underneath as a faint blurred draft, which keeps the final
 * layout and stays readable to screen readers.
 */
function TypeText({ text }: TypeTextProps) {
  const { phase, durationMs } = useBuildPhase();
  // Track whole characters, not raw progress, so React only re-renders on a new char.
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (phase !== "building") return;

    const start = performance.now();
    const total = Math.max(1, durationMs * TYPING_SHARE);
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      setTyped(typedSlice(text, p).length);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [phase, durationMs, text]);

  if (phase !== "building") {
    return <span className="cx-type">{text}</span>;
  }

  return (
    <span className="cx-type cx-type--typing">
      <span className="cx-type__ghost">{text}</span>
      <span className="cx-type__live" aria-hidden="true">
        {text.slice(0, typed)}
        <span className="cx-caret" />
      </span>
    </span>
  );
}

export default TypeText;
