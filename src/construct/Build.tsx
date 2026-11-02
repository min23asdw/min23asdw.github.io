import {
  createContext,
  createElement,
  CSSProperties,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { isAboveViewport, useConstruct } from "./ConstructProvider";
import { useScaffold } from "./Scaffold";
import { startDomTyping } from "./domTyping";
import { useDupGroup } from "./DupGroup";
import { startDuplicate } from "./duplicate";
import type { DupSpec } from "./agentPlans";
import {
  blockDuration,
  BuildKind,
  dupDuration,
  SETTLE_MS,
  textDuration,
  typeDuration,
} from "./constructConfig";

/**
 * pending  - not reached yet, content is a blurred "raw" draft
 * queued   - in view, waiting for a free agent
 * building - agents drag the box open, then the draft sharpens / text is typed
 * built    - finished, outline fades away
 */
export type BuildPhase = "pending" | "queued" | "building" | "built";

interface PhaseInfo {
  phase: BuildPhase;
  durationMs: number;
}

const PhaseContext = createContext<PhaseInfo>({ phase: "built", durationMs: 0 });

export const useBuildPhase = (): PhaseInfo => useContext(PhaseContext);

interface BuildProps {
  children: ReactNode;
  /** Layer name shown on the selection tag, e.g. "h1 · Name". */
  label?: string;
  kind?: BuildKind;
  as?: "div" | "span" | "li" | "section";
  className?: string;
  style?: CSSProperties;
  /** Position inside a <DupGroup>: card 0 is built, every later card is a duplicate. */
  dupIndex?: number;
}

/** Share of a text build spent typing; the rest lets the caret rest at the end. */
const TEXT_TYPING_SHARE = 0.9;

/** Two "+" crosshair markers scattered inside the layer, like snap points in a design tool. */
const randomCrosshairs = (): CSSProperties =>
  ({
    "--cx-x1": `${15 + Math.random() * 30}%`,
    "--cx-y1": `${20 + Math.random() * 50}%`,
    "--cx-x2": `${55 + Math.random() * 35}%`,
    "--cx-y2": `${15 + Math.random() * 60}%`,
  } as CSSProperties);

const durationFor = (kind: BuildKind, el: HTMLElement): number => {
  const length = (el.textContent ?? "").length;
  if (kind === "type") return typeDuration(length);
  if (kind === "text") return textDuration(length);
  return blockDuration(Math.random());
};

function Build({
  children,
  label,
  kind = "block",
  as = "div",
  className,
  style,
  dupIndex,
}: BuildProps) {
  const { enabled, skipped, register, schedule, observe } = useConstruct();
  const scaffold = useScaffold();
  const group = useDupGroup();
  const index = group ? dupIndex : undefined;
  const isCopy = index !== undefined && index > 0;
  const ref = useRef<HTMLElement>(null);
  const caretRef = useRef<HTMLElement>(null);
  const dupSpec = useRef<DupSpec | undefined>(undefined);
  const cancelJob = useRef<(() => void) | undefined>(undefined);
  const releaseScaffold = useRef<(() => void) | undefined>(undefined);
  const [phase, setPhase] = useState<BuildPhase>(enabled ? "pending" : "built");
  const [durationMs, setDurationMs] = useState(0);
  const [size, setSize] = useState("");
  const [settled, setSettled] = useState(!enabled);
  const [crosshairs] = useState(randomCrosshairs);

  useEffect(() => (enabled ? register() : undefined), [enabled, register]);

  useEffect(
    () => () => {
      cancelJob.current?.();
      releaseScaffold.current?.();
    },
    []
  );

  useEffect(() => {
    const el = ref.current;
    if (!enabled || skipped || !el) return;

    const enqueue = () => {
      // Only layers actually being worked on keep the section scaffold up, so a
      // finished section never lights up again when scrolled back into view.
      releaseScaffold.current = scaffold?.register();
      // A copy's timing comes from its place in the grid: placed with its row,
      // edited in reading order once every copy has landed.
      const layout = isCopy ? group?.layoutFor(el) : null;
      const dupTiming = layout ? dupDuration(layout) : null;
      dupSpec.current =
        layout && dupTiming
          ? {
              master: layout.master,
              from: layout.from,
              rowEnd: layout.rowEnd,
              leadsRow: layout.leadsRow,
              sweepAtShare: dupTiming.sweepAtShare,
              dropShare: dupTiming.dropShare,
              fillAtShare: dupTiming.fillAtShare,
            }
          : undefined;
      const duration = dupTiming ? dupTiming.total : durationFor(kind, el);
      setDurationMs(duration);
      setPhase("queued");
      cancelJob.current = schedule({
        el,
        durationMs: duration,
        kind,
        dup: dupSpec.current,
        parallel: isCopy,
        onStart: (scaledMs) => {
          setSize(`${Math.round(el.offsetWidth)} × ${Math.round(el.offsetHeight)}`);
          setDurationMs(scaledMs);
          setPhase("building");
        },
        onDone: () => setPhase("built"),
      });
    };

    // Copies don't wait to be scrolled to: as soon as the first card is built every
    // slot gets its copy, so the grid never shows a gap.
    if (isCopy && group && index !== undefined) {
      return group.whenReady(index, enqueue);
    }

    return observe(el, () => {
      // Already scrolled past (or partly above the top edge): no animation.
      if (isAboveViewport(el) || el.getBoundingClientRect().top < 0) {
        cancelJob.current = schedule({
          el,
          durationMs: 0,
          instant: true,
          onStart: () => undefined,
          onDone: () => setPhase("built"),
        });
        return;
      }
      enqueue();
    });
  }, [enabled, skipped, kind, schedule, observe, scaffold, index, isCopy, group]);

  useEffect(() => {
    const el = ref.current;
    if (index === undefined || !group || !el) return;
    return group.register(index, el);
  }, [index, group]);

  useEffect(() => {
    if (index !== undefined && (phase === "built" || skipped)) group?.markDone(index);
  }, [index, group, phase, skipped]);

  useEffect(() => {
    const el = ref.current;
    const spec = dupSpec.current;
    if (!isCopy || phase !== "building" || skipped || !el || !spec) return;
    return startDuplicate(el, spec, durationMs, caretRef.current);
  }, [isCopy, phase, skipped, durationMs]);

  // Rich text is typed in place; the stop function restores the exact text.
  useEffect(() => {
    const el = ref.current;
    if (kind !== "text" || phase !== "building" || skipped || !el) return;
    return startDomTyping(el, caretRef.current, durationMs * TEXT_TYPING_SHARE);
  }, [kind, phase, skipped, durationMs]);

  useEffect(() => {
    if (phase !== "built" && !skipped) return;
    releaseScaffold.current?.();
    releaseScaffold.current = undefined;
    if (settled) return;
    const t = window.setTimeout(() => setSettled(true), SETTLE_MS);
    return () => window.clearTimeout(t);
  }, [phase, skipped, settled]);

  const effectivePhase: BuildPhase = skipped ? "built" : phase;
  const showFrame = enabled && !skipped && !settled;

  const frameClass = showFrame
    ? `cx cx--${effectivePhase} cx--${kind}${isCopy ? " cx--copy" : ""}`
    : undefined;
  const classes = [frameClass, className]
    .filter(Boolean)
    .join(" ");

  const selected = effectivePhase === "building" || effectivePhase === "built";
  // Stable context value: children re-render only when the phase or timing changes.
  const phaseInfo = useMemo(
    () => ({ phase: effectivePhase, durationMs }),
    [effectivePhase, durationMs]
  );

  const frameStyle = { ...style, "--cx-dur": `${durationMs}ms` } as CSSProperties;

  return createElement(
    as,
    {
      ref,
      className: classes || undefined,
      style: frameStyle,
      "data-cx": "",
      "aria-busy": effectivePhase === "building" || undefined,
    },
    showFrame && (
      <span className="cx-frame" aria-hidden="true" key="frame" style={crosshairs}>
        <i className="cx-cross cx-cross--a" />
        <i className="cx-cross cx-cross--b" />
        {/* Handles and the size readout only exist once agents are on the layer:
            ~50 waiting wireframes would otherwise carry hundreds of hidden nodes. */}
        {selected && (
          <>
            <i className="cx-h cx-h--tl" />
            <i className="cx-h cx-h--tr" />
            <i className="cx-h cx-h--bl" />
            <i className="cx-h cx-h--br" />
          </>
        )}
        {label && <span className="cx-tag">{isCopy ? `⧉ ${label}` : label}</span>}
        {selected && size && <span className="cx-dim">{size}</span>}
        {/* Text layers show an I-beam while waiting; "text" moves it along as it types. */}
        {(kind !== "block" || isCopy) && <i className="cx-ibeam" ref={caretRef} />}
      </span>
    ),
    <PhaseContext.Provider value={phaseInfo} key="body">
      {children}
    </PhaseContext.Provider>
  );
}

export default Build;
