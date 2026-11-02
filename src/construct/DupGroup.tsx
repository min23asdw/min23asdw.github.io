import { createContext, ReactNode, useContext, useMemo, useRef } from "react";
import type { DupPlacement } from "./constructConfig";

/**
 * A grid built like a Figma "repeat grid": agents build the first card, then
 * copies of it are swept out row by row until every slot is filled, and only
 * then is each copy edited into its real content, one after another.
 */
export interface DupLayout extends DupPlacement {
  /** The first card: what every copy looks like before it is edited. */
  master: HTMLElement;
  /** Where the copy sweeps out from: the first card, or the card above. */
  from: HTMLElement;
  /** Last card of the copy's row: where the row's drag ends. */
  rowEnd: HTMLElement;
  /** The first copy of a row: its cursor drags the whole row out. */
  leadsRow: boolean;
}

interface DupGroupApi {
  register: (index: number, el: HTMLElement) => () => void;
  markDone: (index: number) => void;
  /** Runs `fn` once the first card is built (right away for the first card itself). */
  whenReady: (index: number, fn: () => void) => () => void;
  layoutFor: (el: HTMLElement) => DupLayout | null;
}

const DupGroupContext = createContext<DupGroupApi | null>(null);

export const useDupGroup = (): DupGroupApi | null => useContext(DupGroupContext);

/** Cards whose tops are this close share a row. */
const ROW_TOLERANCE_PX = 8;

/** Row number of each item, from the item tops (rows counted top to bottom). */
export const rowIndices = (tops: readonly number[], tolerance = ROW_TOLERANCE_PX): number[] => {
  const rowTops = Array.from(new Set(tops))
    .sort((a, b) => a - b)
    .reduce<number[]>(
      (rows, top) => (rows.length && top - rows[rows.length - 1] < tolerance ? rows : [...rows, top]),
      []
    );
  return tops.map((top) => rowTops.filter((rowTop) => rowTop <= top + tolerance).length - 1);
};

interface Card {
  index: number;
  el: HTMLElement;
  row: number;
  left: number;
}

const byReadingOrder = (a: Card, b: Card) => a.row - b.row || a.left - b.left;

function DupGroup({ children }: { children: ReactNode }) {
  const cards = useRef<Map<number, HTMLElement>>(new Map());
  const masterDone = useRef(false);
  const waiting = useRef<Set<() => void>>(new Set());

  const api = useMemo<DupGroupApi>(() => {
    const measure = (): Card[] => {
      const entries = Array.from(cards.current.entries());
      const rects = entries.map(([, el]) => el.getBoundingClientRect());
      const rows = rowIndices(rects.map((r) => Math.round(r.top)));
      return entries.map(([index, el], i) => ({ index, el, row: rows[i], left: rects[i].left }));
    };

    return {
      register: (index, el) => {
        cards.current = new Map(cards.current).set(index, el);
        return () => {
          const next = new Map(cards.current);
          next.delete(index);
          cards.current = next;
        };
      },
      markDone: (index) => {
        if (index !== 0 || masterDone.current) return;
        masterDone.current = true;
        const pending = Array.from(waiting.current);
        waiting.current = new Set();
        pending.forEach((fn) => fn());
      },
      whenReady: (index, fn) => {
        if (index === 0 || masterDone.current) {
          fn();
          return () => undefined;
        }
        waiting.current = new Set(waiting.current).add(fn);
        return () => {
          const rest = new Set(waiting.current);
          rest.delete(fn);
          waiting.current = rest;
        };
      },
      layoutFor: (el) => {
        const layout = measure();
        const me = layout.find((c) => c.el === el);
        const master = layout.find((c) => c.index === 0);
        if (!me || !master) return null;
        const copies = layout.filter((c) => c.index !== 0).sort(byReadingOrder);
        const rowMates = copies.filter((c) => c.row === me.row);
        const rowStart = rowMates[0] ?? me;
        // Later rows sweep straight down, each copy out of the card above it.
        const above = layout
          .filter((c) => c.row === me.row - 1)
          .sort((a, b) => Math.abs(a.left - me.left) - Math.abs(b.left - me.left))[0];
        return {
          master: master.el,
          from: me.row <= master.row || !above ? master.el : above.el,
          rowEnd: (rowMates[rowMates.length - 1] ?? me).el,
          leadsRow: rowStart === me,
          rowRank: me.row - master.row,
          lastRowRank: Math.max(0, ...copies.map((c) => c.row - master.row)),
          fillOrder: copies.indexOf(me),
        };
      },
    };
  }, []);

  return <DupGroupContext.Provider value={api}>{children}</DupGroupContext.Provider>;
}

export default DupGroup;
