import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import AgentLayer, { AgentLayerHandle } from "./AgentLayer";
import BuildHud from "./BuildHud";
import type { BuildKind } from "./constructConfig";
import type { DupSpec } from "./agentPlans";
import Rulers from "./Rulers";
import IntroGuides from "./IntroGuides";
import { useTour } from "./useTour";
import {
  AGENTS,
  BUILD_DURATION_SCALE,
  BUILD_STAGGER_MS,
  IDLE_HIDE_MS,
  INTRO,
  MAX_CONCURRENT_BUILDS,
  MOBILE_AGENT_COUNT,
  MOBILE_BREAKPOINT_PX,
  nextSpeed,
  SPEEDS,
} from "./constructConfig";
import "./construct.css";
import "./constructSequences.css";

export interface BuildJob {
  el: HTMLElement;
  durationMs: number;
  /** Receives the duration actually used, after duration scale and playback speed. */
  onStart: (durationMs: number) => void;
  onDone: () => void;
  /** Finish immediately without animating (layer is above the viewport). */
  instant?: boolean;
  /** Cap on cursors sent to this layer (defaults to what its plan needs). */
  maxAgents?: number;
  /** Decides what the cursors do: drag a box open, or ride the typing caret. */
  kind?: BuildKind;
  /** Duplicated grid card (repeat grid): where it sweeps from and when it is filled. */
  dup?: DupSpec;
  /**
   * Starts right away, outside the concurrency limit and stagger: repeat-grid
   * copies run as one long choreography whose timing must not drift.
   */
  parallel?: boolean;
}

interface QueuedJob {
  job: BuildJob;
  /** Page coordinates captured once at enqueue time, used for reading order. */
  y: number;
  x: number;
  intro: boolean;
}

interface ConstructApi {
  /** False when animations are disabled (reduced motion / unsupported browser). */
  enabled: boolean;
  /** True once the visitor pressed "skip"; every layer renders finished. */
  skipped: boolean;
  register: () => () => void;
  schedule: (job: BuildJob) => () => void;
  /** Calls `onVisible` once when `el` enters the viewport (one shared observer). */
  observe: (el: Element, onVisible: () => void) => () => void;
}

export interface ConstructStats {
  total: number;
  built: number;
  active: number;
}

const DISABLED_API: ConstructApi = {
  enabled: false,
  skipped: true,
  register: () => () => undefined,
  schedule: (job) => {
    job.onDone();
    return () => undefined;
  },
  observe: () => () => undefined,
};

/**
 * The huge top margin makes everything *above* the viewport count as seen, so
 * layers you are already past (mid-page reload, nav jump) complete instantly and
 * scrolling up never replays the animation. Only content entering from below builds.
 */
const OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: [0, 0.05, 0.2],
  rootMargin: "100000px 0px -6% 0px",
};

/** True when the element sits entirely above the visible viewport. */
export const isAboveViewport = (el: Element): boolean => el.getBoundingClientRect().bottom <= 0;

const ApiContext = createContext<ConstructApi>(DISABLED_API);

export const useConstruct = (): ConstructApi => useContext(ApiContext);

const detectEnabled = (): boolean => {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) return false;
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    ?.saveData;
  return !saveData && !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
};

const byReadingOrder = (a: QueuedJob, b: QueuedJob): number =>
  Math.round(a.y - b.y) || a.x - b.x;

interface ConstructProviderProps {
  children: ReactNode;
}

export function ConstructProvider({ children }: ConstructProviderProps) {
  const [enabled] = useState(detectEnabled);
  const [skipped, setSkipped] = useState(false);
  const [stats, setStats] = useState<ConstructStats>({ total: 0, built: 0, active: 0 });
  const [chromeVisible, setChromeVisible] = useState(false);
  const [speed, setSpeed] = useState(SPEEDS[0]);
  const speedRef = useRef(speed);
  const [introDone, setIntroDone] = useState(false);
  const introActive = useRef(0);

  const mountedAt = useRef(performance.now());
  const agentLayer = useRef<AgentLayerHandle>(null);
  const queue = useRef<QueuedJob[]>([]);
  const activeCount = useRef(0);
  const lastStart = useRef(0);
  const pumpTimer = useRef<number | undefined>(undefined);
  const jobTimers = useRef<Set<number>>(new Set());
  const observer = useRef<IntersectionObserver | null>(null);
  const visibleCallbacks = useRef<Map<Element, () => void>>(new Map());

  const agents = useMemo(
    () =>
      window.innerWidth < MOBILE_BREAKPOINT_PX ? AGENTS.slice(0, MOBILE_AGENT_COUNT) : AGENTS,
    []
  );

  // The first screen is done once its window has passed and no intro layer is
  // queued or building; then the parked agents join in.
  const checkIntroDone = useCallback(() => {
    if (performance.now() - mountedAt.current < INTRO.windowMs) return;
    if (introActive.current > 0 || queue.current.some((q) => q.intro)) return;
    setIntroDone(true);
  }, []);

  const completeNow = useCallback((job: BuildJob) => {
    setStats((s) => ({ ...s, built: s.built + 1 }));
    job.onDone();
  }, []);

  const pump = useCallback(() => {
    window.clearTimeout(pumpTimer.current);
    // Nothing is built while the opening swarm is still circling in.
    const hold = mountedAt.current + INTRO.swarmMs - performance.now();
    if (hold > 0) {
      pumpTimer.current = window.setTimeout(pump, hold);
      return;
    }
    while (queue.current.length > 0) {
      const [next, ...rest] = queue.current;

      // Scrolled past it while it waited: finish without animating off-screen.
      if (isAboveViewport(next.job.el)) {
        queue.current = rest;
        completeNow(next.job);
        continue;
      }

      // First-screen layers build wider and faster so the page is readable quickly.
      const boost = next.intro ? INTRO : null;
      const { parallel } = next.job;
      const concurrency = boost?.concurrency ?? MAX_CONCURRENT_BUILDS;
      if (!parallel && activeCount.current >= concurrency) return;

      const stagger = (boost?.staggerMs ?? BUILD_STAGGER_MS) / speedRef.current;
      const wait = parallel ? 0 : lastStart.current + stagger - performance.now();
      if (wait > 0) {
        pumpTimer.current = window.setTimeout(pump, wait);
        return;
      }

      queue.current = rest;
      if (!parallel) {
        activeCount.current += 1;
        lastStart.current = performance.now();
      }
      if (next.intro) introActive.current += 1;
      setStats((s) => ({ ...s, active: s.active + 1 }));

      const { job } = next;
      const durationMs = Math.round(
        (job.durationMs * (boost?.durationScale ?? BUILD_DURATION_SCALE)) / speedRef.current
      );
      job.onStart(durationMs);
      agentLayer.current?.dispatch(job.el, {
        durationMs,
        kind: job.kind ?? "block",
        dup: job.dup,
        maxAgents: job.maxAgents,
      });

      const timer = window.setTimeout(() => {
        jobTimers.current.delete(timer);
        if (!parallel) activeCount.current -= 1;
        if (next.intro) introActive.current -= 1;
        setStats((s) => ({ ...s, active: s.active - 1, built: s.built + 1 }));
        job.onDone();
        pump();
        checkIntroDone();
      }, durationMs);
      jobTimers.current.add(timer);
    }
  }, [completeNow, checkIntroDone]);

  const register = useCallback(() => {
    setStats((s) => ({ ...s, total: s.total + 1 }));
    return () => setStats((s) => ({ ...s, total: Math.max(0, s.total - 1) }));
  }, []);

  const schedule = useCallback(
    (job: BuildJob) => {
      if (job.instant) {
        completeNow(job);
        return () => undefined;
      }
      const rect = job.el.getBoundingClientRect();
      const entry: QueuedJob = {
        job,
        y: rect.top + window.scrollY,
        x: rect.left,
        intro: performance.now() - mountedAt.current < INTRO.windowMs,
      };
      queue.current = [...queue.current, entry].sort(byReadingOrder);
      // Wait a frame so layers entering the viewport together are sorted first.
      window.clearTimeout(pumpTimer.current);
      pumpTimer.current = window.setTimeout(pump, 16);
      return () => {
        queue.current = queue.current.filter((q) => q !== entry);
      };
    },
    [pump, completeNow]
  );

  const observe = useCallback((el: Element, onVisible: () => void) => {
    if (!observer.current) {
      observer.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || entry.intersectionRect.height < 1) return;
          const callback = visibleCallbacks.current.get(entry.target);
          visibleCallbacks.current.delete(entry.target);
          observer.current?.unobserve(entry.target);
          callback?.();
        });
      }, OBSERVER_OPTIONS);
    }
    visibleCallbacks.current.set(el, onVisible);
    observer.current.observe(el);
    return () => {
      visibleCallbacks.current.delete(el);
      observer.current?.unobserve(el);
    };
  }, []);

  const isBusy = useCallback(
    () => queue.current.length > 0 || activeCount.current >= MAX_CONCURRENT_BUILDS,
    []
  );
  const { touring, toggleTour } = useTour({ speedRef, isBusy });

  const skip = useCallback(() => {
    window.clearTimeout(pumpTimer.current);
    jobTimers.current.forEach((t) => window.clearTimeout(t));
    jobTimers.current.clear();
    queue.current = [];
    activeCount.current = 0;
    observer.current?.disconnect();
    visibleCallbacks.current.clear();
    setStats((s) => ({ ...s, active: 0, built: s.total }));
    setSkipped(true);
  }, []);

  const cycleSpeed = useCallback(() => {
    setSpeed((current) => {
      const next = nextSpeed(current);
      speedRef.current = next;
      return next;
    });
  }, []);

  useEffect(
    () => () => {
      window.clearTimeout(pumpTimer.current);
      jobTimers.current.forEach((t) => window.clearTimeout(t));
      observer.current?.disconnect();
    },
    []
  );

  // Open on a blank page while the swarm circles in, then bare wireframes,
  // then the raw drafts fade in.
  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("cx-void", "cx-wire");
    const timers = [
      window.setTimeout(() => root.classList.remove("cx-void"), INTRO.swarmMs),
      window.setTimeout(() => root.classList.remove("cx-wire"), INTRO.swarmMs + INTRO.wireMs),
    ];
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      root.classList.remove("cx-void", "cx-wire");
    };
  }, [enabled]);

  // Covers a first screen with nothing to build (e.g. loaded mid-page).
  useEffect(() => {
    const t = window.setTimeout(checkIntroDone, INTRO.windowMs + 100);
    return () => window.clearTimeout(t);
  }, [checkIntroDone]);

  // Rulers, HUD and cursors show while building and fade after a quiet spell.
  useEffect(() => {
    if (skipped) {
      setChromeVisible(false);
      return;
    }
    if (stats.active > 0 || touring) {
      setChromeVisible(true);
      return;
    }
    const t = window.setTimeout(() => setChromeVisible(false), IDLE_HIDE_MS);
    return () => window.clearTimeout(t);
  }, [stats.active, skipped, touring]);

  const api = useMemo<ConstructApi>(
    () => (enabled ? { enabled, skipped, register, schedule, observe } : DISABLED_API),
    [enabled, skipped, register, schedule, observe]
  );

  return (
    <ApiContext.Provider value={api}>
      {children}
      {enabled && !skipped && (
        <>
          <IntroGuides />
          <Rulers visible={chromeVisible} />
          <AgentLayer
            ref={agentLayer}
            agents={agents}
            visible={chromeVisible}
            workforce={introDone ? agents.length : Math.min(INTRO.agents, agents.length)}
          />
          <BuildHud
            visible={chromeVisible}
            agents={agents}
            stats={stats}
            speed={speed}
            onSpeed={cycleSpeed}
            touring={touring}
            onTour={toggleTour}
            onSkip={skip}
          />
        </>
      )}
    </ApiContext.Provider>
  );
}
