import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useRef } from "react";
import { aimAt, atRest, Body, placeAt, stepBody } from "./agentMotion";
import { AgentControl, agentsNeeded, Hire, Plan, runDup, runPlan } from "./agentPlans";
import { AgentSpec, INTRO, parkingSpot, WANDER_INTERVAL_MS } from "./constructConfig";

export interface DispatchOptions extends Plan {
  /** Cap on cursors for this layer. */
  maxAgents?: number;
}

export interface AgentLayerHandle {
  /** Send free agents to carry out the layer's plan (drag, type, carry a copy...). */
  dispatch: (el: HTMLElement, options: DispatchOptions) => void;
}

interface AgentLayerProps {
  agents: readonly AgentSpec[];
  visible: boolean;
  /** Only the first `workforce` agents work; the rest wait parked bottom-right. */
  workforce: number;
}

interface AgentState {
  body: Body;
  busyUntil: number;
}

const WANDER_RANGE = { x: 110, y: 80 };
/** Share of wander ticks an idle agent sits still (idle cursors mostly rest). */
const WANDER_SKIP = 0.65;
const CLICK_MS = 140;
/** After circling in, the flock spreads out over the page this fast. */
const SWARM_SPREAD_MS = 450;
/**
 * Opening swirl: the flock circles a centre that glides in from the left. The
 * orbit speed (radius x spin) beats the centre's travel, so paths form real loops.
 */
const SWIRL = {
  tickMs: 40,
  followMs: 90,
  radius: [45, 120],
  spin: [9, 13],
  squash: 0.7,
  from: -0.03,
  to: 0.33,
} as const;

const between = ([min, max]: readonly [number, number]) => min + Math.random() * (max - min);
const easeOut = (t: number) => 1 - (1 - t) * (1 - t);
const PARK_MS = 1400;
/** Idle drifting is lazier than working moves. */
const WANDER_SETTLE_MS = 1800;

const distance = (a: Body, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y);

const parkedPoint = (slot: number) =>
  parkingSpot(slot, window.innerWidth, window.innerHeight);

interface AgentCursorProps {
  spec: AgentSpec;
  /** Only the lead (Claude) carries a name tag; helpers are bare arrows like in the video. */
  labelled: boolean;
}

const AgentCursor = ({ spec, labelled }: AgentCursorProps) => (
  <>
    <svg width="18" height="20" viewBox="0 0 18 20" aria-hidden="true">
      <path
        d="M1.5 1.5 L16 9.2 L9.4 10.6 L6.3 17.6 Z"
        fill={spec.color}
        stroke="#fff"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
    {labelled && (
      <span className="cx-agent__tag" style={{ backgroundColor: spec.color }}>
        {spec.name}
      </span>
    )}
  </>
);

const AgentLayer = forwardRef<AgentLayerHandle, AgentLayerProps>(
  ({ agents, visible, workforce }, ref) => {
    const nodes = useRef<Array<HTMLDivElement | null>>([]);
    const states = useRef<AgentState[]>([]);
    const timers = useRef<number[]>([]);
    const workforceRef = useRef(workforce);
    const frame = useRef(0);
    const layer = useRef<HTMLDivElement>(null);
    /** Bumped on every new assignment so stale steps of an old plan are dropped. */
    const jobIds = useRef<number[]>([]);

    const written = useRef<string[]>([]);
    // Only touch the DOM for cursors that actually moved since the last frame.
    const render = useCallback(() => {
      states.current.forEach(({ body }, i) => {
        const node = nodes.current[i];
        const transform = `translate3d(${body.x.toFixed(1)}px, ${body.y.toFixed(1)}px, 0)`;
        if (!node || written.current[i] === transform) return;
        node.style.transform = transform;
        written.current[i] = transform;
      });
    }, []);

    // One rAF loop drives every cursor; it stops itself once they are all at rest.
    const kick = useCallback(() => {
      if (frame.current) return;
      let last = performance.now();
      const tick = (now: number) => {
        const dt = Math.min(now - last, 100) / 1000;
        last = now;
        states.current = states.current.map((s) => ({ ...s, body: stepBody(s.body, dt) }));
        render();
        frame.current = states.current.every((s) => atRest(s.body))
          ? 0
          : requestAnimationFrame(tick);
      };
      frame.current = requestAnimationFrame(tick);
    }, [render]);

    const moveTo = (index: number, x: number, y: number, ms: number) => {
      states.current = states.current.map((s, i) =>
        i === index
          ? { ...s, body: ms <= 0 ? placeAt(x, y) : aimAt(s.body, x, y, ms, Math.random()) }
          : s
      );
      if (ms <= 0) render();
      kick();
    };

    const setParked = (index: number, parked: boolean) =>
      nodes.current[index]?.classList.toggle("cx-agent--parked", parked);

    // Opening swarm: the whole flock swirls in from the left edge in circles, like
    // the first frames of the reference video, then spreads out to work (or park).
    useEffect(() => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const orbits = agents.map((_, i) => ({
        radius: between(SWIRL.radius),
        spin: between(SWIRL.spin),
        phase: (i / agents.length) * Math.PI * 2,
      }));
      const centerAt = (t: number) => ({
        x: w * (SWIRL.from + (SWIRL.to - SWIRL.from) * easeOut(t)),
        y: h * 0.45,
      });
      states.current = agents.map((_, i) => {
        const c = centerAt(0);
        const o = orbits[i];
        return {
          body: placeAt(c.x + Math.cos(o.phase) * o.radius, c.y + Math.sin(o.phase) * o.radius),
          busyUntil: 0,
        };
      });
      render();

      const spread = () =>
        agents.forEach((_, i) => {
          if (i >= workforceRef.current) {
            const spot = parkedPoint(i - workforceRef.current);
            setParked(i, true);
            moveTo(i, spot.x, spot.y, PARK_MS);
            return;
          }
          if (states.current[i].busyUntil > performance.now()) return;
          moveTo(i, w * (0.15 + Math.random() * 0.6), h * (0.2 + Math.random() * 0.5), SWARM_SPREAD_MS);
        });

      const start = performance.now();
      let swirlTimer = 0;
      const swirl = () => {
        const elapsed = performance.now() - start;
        if (elapsed >= INTRO.swarmMs) {
          spread();
          return;
        }
        const c = centerAt(elapsed / INTRO.swarmMs);
        const seconds = elapsed / 1000;
        orbits.forEach((o, i) => {
          const angle = o.phase + o.spin * seconds;
          moveTo(
            i,
            c.x + Math.cos(angle) * o.radius,
            c.y + Math.sin(angle) * o.radius * SWIRL.squash,
            SWIRL.followMs
          );
        });
        swirlTimer = window.setTimeout(swirl, SWIRL.tickMs);
      };
      swirl();
      return () => {
        window.clearTimeout(swirlTimer);
        cancelAnimationFrame(frame.current);
        frame.current = 0;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [agents]);

    // Workforce grows after the first screen: parked agents get up and join.
    useEffect(() => {
      workforceRef.current = workforce;
      agents.forEach((_, i) => {
        const parked = i >= workforce;
        setParked(i, parked);
        if (parked) {
          const spot = parkedPoint(i - workforce);
          moveTo(i, spot.x, spot.y, PARK_MS);
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [workforce, agents]);

    // Idle working agents wander around the viewport - only while the layer is visible.
    useEffect(() => {
      if (!visible) return;
      const id = window.setInterval(() => {
        const now = performance.now();
        states.current.forEach(({ body, busyUntil }, i) => {
          // Not every idle agent moves every tick, so they don't drift in lockstep.
          if (i >= workforceRef.current || busyUntil > now || Math.random() < WANDER_SKIP) return;
          const x = Math.min(
            window.innerWidth - 40,
            Math.max(20, body.x + (Math.random() - 0.5) * WANDER_RANGE.x)
          );
          const y = Math.min(
            window.innerHeight - 40,
            Math.max(20, body.y + (Math.random() - 0.5) * WANDER_RANGE.y)
          );
          moveTo(i, x, y, WANDER_SETTLE_MS);
        });
      }, WANDER_INTERVAL_MS);
      return () => window.clearInterval(id);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);

    useEffect(
      () => () => {
        timers.current.forEach((t) => window.clearTimeout(t));
      },
      []
    );

    const press = (index: number, down: boolean) =>
      nodes.current[index]?.classList.toggle("cx-agent--press", down);

    const ripple = (x: number, y: number) => {
      const ring = document.createElement("i");
      ring.className = "cx-ripple";
      ring.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ring.addEventListener("animationend", () => ring.remove(), { once: true });
      layer.current?.appendChild(ring);
    };

    const controlFor = (index: number): AgentControl => {
      const jobId = (jobIds.current[index] ?? 0) + 1;
      jobIds.current = Object.assign([...jobIds.current], { [index]: jobId });
      const current = () => jobIds.current[index] === jobId;
      const after = (ms: number, fn: () => void) => {
        const t = window.setTimeout(() => current() && fn(), ms);
        timers.current = [...timers.current.slice(-200), t];
      };
      return {
        position: () => {
          const { x, y } = states.current[index].body;
          return { x, y };
        },
        moveTo: (x, y, settleMs) => moveTo(index, x, y, Math.max(1, settleMs)),
        press: (down) => press(index, down),
        click: (x, y) => {
          press(index, true);
          ripple(x, y);
          after(CLICK_MS, () => press(index, false));
        },
        after,
      };
    };

    /** Idle working agents closest to `point` first; parked agents stay put. */
    const nearestFree = (point: { x: number; y: number }, count: number, busyForMs: number) => {
      const now = performance.now();
      const picked = states.current
        .map((s, i) => ({ i, idle: s.busyUntil <= now, d: distance(s.body, point) }))
        .filter(({ i }) => i < workforceRef.current)
        .sort((a, b) => Number(b.idle) - Number(a.idle) || a.d - b.d)
        .slice(0, count)
        .map(({ i }) => i);
      const busy = new Set(picked);
      states.current = states.current.map((s, j) =>
        busy.has(j) ? { ...s, busyUntil: now + busyForMs } : s
      );
      picked.forEach((i) => press(i, false));
      return picked.map(controlFor);
    };

    // Long repeat-grid builds borrow a cursor only for the moments that need one.
    const hire: Hire = (atMs, untilMs, near, work) => {
      const t = window.setTimeout(() => {
        const [ctl] = nearestFree(near(), 1, Math.max(0, untilMs - Math.max(0, atMs)));
        if (ctl) work(ctl);
      }, Math.max(0, atMs));
      timers.current = [...timers.current.slice(-200), t];
    };

    useImperativeHandle(ref, () => ({
      dispatch: (el, { maxAgents, ...plan }) => {
        if (plan.dup) {
          runDup(hire, el, plan.dup, plan.durationMs);
          return;
        }
        const rect = el.getBoundingClientRect();
        const center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
        const wanted = Math.min(agentsNeeded(plan, rect.width * rect.height), maxAgents ?? Infinity);
        runPlan(nearestFree(center, wanted, plan.durationMs), el, plan);
      },
    }));

    return (
      <div
        ref={layer}
        className={`cx-agents${visible ? " cx-agents--visible" : ""}`}
        aria-hidden="true"
      >
        {agents.map((spec, i) => (
          <div
            key={spec.id}
            className="cx-agent"
            ref={(node) => {
              nodes.current[i] = node;
            }}
          >
            <AgentCursor spec={spec} labelled={i === 0} />
          </div>
        ))}
      </div>
    );
  }
);

AgentLayer.displayName = "AgentLayer";

export default memo(AgentLayer);
