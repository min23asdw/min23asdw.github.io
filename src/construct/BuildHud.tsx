import type { AgentSpec } from "./constructConfig";
import type { ConstructStats } from "./ConstructProvider";

const AVATAR_LIMIT = 5;

interface BuildHudProps {
  visible: boolean;
  agents: readonly AgentSpec[];
  stats: ConstructStats;
  speed: number;
  onSpeed: () => void;
  touring: boolean;
  onTour: () => void;
  onSkip: () => void;
}

/** Floating build bar: avatars · "8 agents │ 12 / 38 layers" · progress · tour · speed · close. */
function BuildHud({
  visible,
  agents,
  stats,
  speed,
  onSpeed,
  touring,
  onTour,
  onSkip,
}: BuildHudProps) {
  // A layer can unmount mid-build (collapsed tab), so built may briefly exceed total.
  const built = Math.min(stats.built, stats.total);
  const progress = stats.total > 0 ? built / stats.total : 0;

  return (
    <div className={`cx-hud${visible ? " cx-hud--visible" : ""}`} role="status">
      <span className="cx-hud__avatars" aria-hidden="true">
        {agents.slice(0, AVATAR_LIMIT).map((a) => (
          <i key={a.id} style={{ backgroundColor: a.color }}>
            {a.initial}
          </i>
        ))}
      </span>
      <span className="cx-hud__stat">
        <b>{agents.length}</b> agents
      </span>
      <span className="cx-hud__divider" aria-hidden="true" />
      <span className="cx-hud__stat">
        <b>{built}</b> / {stats.total} layers
      </span>
      <span className="cx-hud__bar" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </span>
      <button
        type="button"
        className={`cx-hud__mode${touring ? " cx-hud__mode--on" : ""}`}
        onClick={onTour}
        aria-pressed={touring}
        title={touring ? "Stop the auto-scroll tour" : "Auto-scroll through the build"}
      >
        {touring ? "Touring" : "Tour"}
      </button>
      <button
        type="button"
        className="cx-hud__btn"
        onClick={onSpeed}
        aria-label={`Build speed ${speed}x, change speed`}
      >
        {speed}x
      </button>
      <button
        type="button"
        className="cx-hud__btn"
        onClick={onSkip}
        aria-label="Skip build animation"
        title="Skip"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
          <path d="M1 1 L9 9 M9 1 L1 9" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>
    </div>
  );
}

export default BuildHud;
