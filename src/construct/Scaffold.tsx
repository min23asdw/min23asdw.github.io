import {
  createContext,
  CSSProperties,
  ReactNode,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useConstruct } from "./ConstructProvider";
import { alignmentGuides, MAX_GUIDES, MIN_GUIDE_ALIGNMENT } from "./constructConfig";

interface ScaffoldApi {
  /** Call when a layer starts being worked on; call the returned function once it is built. */
  register: () => () => void;
}

const ScaffoldContext = createContext<ScaffoldApi | null>(null);

export const useScaffold = (): ScaffoldApi | null => useContext(ScaffoldContext);

interface Box {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface Padding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface Layout {
  box: Box;
  padding: Padding;
  xs: number[];
}

const MIN_LABELLED_PADDING = 12;
/** Skip column guides this close to the padding edges - the bands already show them. */
const EDGE_SLACK_PX = 8;

const measure = (wrapper: HTMLElement): Layout | null => {
  const target = (wrapper.firstElementChild as HTMLElement | null) ?? wrapper;
  const origin = wrapper.getBoundingClientRect();
  const rect = target.getBoundingClientRect();
  if (rect.height === 0) return null;

  const css = window.getComputedStyle(target);
  const box = {
    top: rect.top - origin.top,
    left: rect.left - origin.left,
    width: rect.width,
    height: rect.height,
  };
  const layers = Array.from(wrapper.querySelectorAll<HTMLElement>("[data-cx]")).map((el) =>
    el.getBoundingClientRect()
  );

  const padding = {
    top: parseFloat(css.paddingTop) || 0,
    right: parseFloat(css.paddingRight) || 0,
    bottom: parseFloat(css.paddingBottom) || 0,
    left: parseFloat(css.paddingLeft) || 0,
  };
  const innerLeft = padding.left + EDGE_SLACK_PX;
  const innerRight = rect.width - padding.right - EDGE_SLACK_PX;

  return {
    box,
    padding,
    xs: alignmentGuides(
      layers
        .flatMap((r) => [r.left - rect.left, r.right - rect.left])
        .filter((x) => x > innerLeft && x < innerRight),
      MAX_GUIDES,
      MIN_GUIDE_ALIGNMENT
    ),
  };
};

const PaddingBand = ({ style, size }: { style: CSSProperties; size: number }) =>
  size > 0 ? (
    <span className="cx-pad" style={style}>
      {size >= MIN_LABELLED_PADDING && <em>{Math.round(size)}</em>}
    </span>
  ) : null;

interface ScaffoldProps {
  children: ReactNode;
}

/**
 * Wraps a section: while layers inside are being built, draws the section's
 * layout scaffold - a few column guides where layers line up, and hatched padding bands.
 */
function Scaffold({ children }: ScaffoldProps) {
  const { enabled, skipped } = useConstruct();
  const wrapper = useRef<HTMLDivElement>(null);
  const [pending, setPending] = useState(0);
  const [layout, setLayout] = useState<Layout | null>(null);

  const register = useCallback(() => {
    setPending((n) => n + 1);
    let released = false;
    return () => {
      if (released) return;
      released = true;
      setPending((n) => Math.max(0, n - 1));
    };
  }, []);

  const api = useMemo(() => ({ register }), [register]);
  // On only while layers inside are queued or building (they register as they
  // enter the viewport), so finished sections stay clean when scrolled back to.
  const active = enabled && !skipped && pending > 0;

  // Measure when the scaffold turns on, then only when the section actually
  // resizes (e.g. a panel expands) - not on every layer that finishes.
  useLayoutEffect(() => {
    const el = wrapper.current;
    if (!active || !el) return;
    setLayout(measure(el));
    if (!("ResizeObserver" in window)) return;
    let frame = 0;
    const resize = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setLayout(measure(el)));
    });
    resize.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
    };
  }, [active]);

  const { box, padding: p, xs } = layout ?? {
    box: { top: 0, left: 0, width: 0, height: 0 },
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
    xs: [],
  };

  return (
    <ScaffoldContext.Provider value={enabled ? api : null}>
      <div ref={wrapper} className={enabled ? "cx-scaffold-host" : undefined}>
        {children}
        {enabled && layout && (
          <div
            className={`cx-scaffold${active ? " cx-scaffold--on" : ""}`}
            style={box}
            aria-hidden="true"
          >
            <PaddingBand size={p.top} style={{ top: 0, left: 0, right: 0, height: p.top }} />
            <PaddingBand size={p.bottom} style={{ bottom: 0, left: 0, right: 0, height: p.bottom }} />
            <PaddingBand
              size={p.left}
              style={{ top: p.top, bottom: p.bottom, left: 0, width: p.left }}
            />
            <PaddingBand
              size={p.right}
              style={{ top: p.top, bottom: p.bottom, right: 0, width: p.right }}
            />
            {xs.map((x, i) => (
              <i
                key={`x${x}`}
                className="cx-guide cx-guide--v"
                style={{ left: x, animationDelay: `${i * 60}ms` }}
              />
            ))}
          </div>
        )}
      </div>
    </ScaffoldContext.Provider>
  );
}

export default Scaffold;
