import { MutableRefObject, useCallback, useEffect, useState } from "react";
import { tourStep } from "./constructConfig";

interface TourOptions {
  speedRef: MutableRefObject<number>;
  /** True while layers are waiting for agents; the tour slows so builds stay ahead. */
  isBusy: () => boolean;
}

interface Tour {
  touring: boolean;
  toggleTour: () => void;
}

/** Any manual scroll intent hands control back to the visitor. */
const STOP_EVENTS = ["wheel", "touchstart", "keydown", "mousedown"] as const;

/**
 * "Touring" mode from the video: the page scrolls itself while agents build
 * the next section just ahead of the viewport.
 */
export function useTour({ speedRef, isBusy }: TourOptions): Tour {
  const [touring, setTouring] = useState(false);

  useEffect(() => {
    if (!touring) return;
    const root = document.documentElement;
    // CSS `scroll-behavior: smooth` would animate every per-frame step.
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    let position = window.scrollY;
    let last = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const dt = now - last;
      last = now;
      const bottom = root.scrollHeight - window.innerHeight;
      if (position >= bottom - 1) {
        setTouring(false);
        return;
      }
      position = Math.min(bottom, position + tourStep(dt, speedRef.current, isBusy()));
      window.scrollTo(0, position);
      frame = requestAnimationFrame(tick);
    });

    const stop = (event: Event) => {
      // Clicks on the HUD itself (speed, tour toggle) must not cancel the tour.
      if (event.target instanceof Element && event.target.closest(".cx-hud")) return;
      setTouring(false);
    };
    STOP_EVENTS.forEach((type) => window.addEventListener(type, stop, { passive: true }));

    return () => {
      cancelAnimationFrame(frame);
      root.style.scrollBehavior = previousBehavior;
      STOP_EVENTS.forEach((type) => window.removeEventListener(type, stop));
    };
  }, [touring, speedRef, isBusy]);

  const toggleTour = useCallback(() => setTouring((t) => !t), []);

  return { touring, toggleTour };
}
