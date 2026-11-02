import { sliceAcross } from "./constructConfig";

/** Overlay chrome (selection frame, duplicate clone) is never typed. */
const FRAME_SELECTOR = ".cx-frame, .cx-dup-clone";

const collectTextNodes = (root: HTMLElement): Text[] => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) =>
      node.parentElement?.closest(FRAME_SELECTOR)
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_ACCEPT,
  });
  const nodes: Text[] = [];
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    nodes.push(n as Text);
  }
  return nodes;
};

/** Put the I-beam right after the last typed character. */
const placeCaret = (caret: HTMLElement, node: Text, offset: number) => {
  const frame = caret.offsetParent;
  if (!frame) return;
  const range = document.createRange();
  range.setStart(node, offset);
  range.collapse(true);
  const rect = range.getClientRects()[0] ?? range.getBoundingClientRect();
  if (!rect || (rect.width === 0 && rect.height === 0 && rect.left === 0)) return;
  const base = frame.getBoundingClientRect();
  caret.style.height = `${rect.height}px`;
  caret.style.transform = `translate(${rect.left - base.left}px, ${rect.top - base.top}px)`;
};

/**
 * Types every text node inside `root` from empty to full over `durationMs`,
 * keeping inline formatting (bold, links). The root's height is locked so the
 * layout never jumps. Returns a function that stops and restores the text.
 */
export const startDomTyping = (
  root: HTMLElement,
  caret: HTMLElement | null,
  durationMs: number
): (() => void) => {
  const nodes = collectTextNodes(root);
  const originals = nodes.map((n) => n.nodeValue ?? "");
  const lengths = originals.map((t) => t.length);
  const total = lengths.reduce((a, b) => a + b, 0);
  const previousMinHeight = root.style.minHeight;

  root.style.minHeight = `${root.offsetHeight}px`;
  nodes.forEach((n) => {
    n.nodeValue = "";
  });

  const start = performance.now();
  let frame = 0;
  let stopped = false;
  let lastCount = -1;

  const restore = () => {
    if (stopped) return;
    stopped = true;
    cancelAnimationFrame(frame);
    nodes.forEach((n, i) => {
      n.nodeValue = originals[i];
    });
    root.style.minHeight = previousMinHeight;
  };

  const tick = (now: number) => {
    const progress = Math.min(1, (now - start) / Math.max(1, durationMs));
    const count = Math.round(progress * total);

    // Only touch the DOM (and pay for a layout read) when a new character appears.
    if (count !== lastCount) {
      lastCount = count;
      const shown = sliceAcross(lengths, count);
      shown.forEach((n, i) => {
        const text = originals[i].slice(0, n);
        if (nodes[i].nodeValue !== text) nodes[i].nodeValue = text;
      });

      const lastIndex = shown.findIndex((n, i) => n < lengths[i]);
      const caretIndex = lastIndex === -1 ? nodes.length - 1 : lastIndex;
      if (caret && nodes[caretIndex]) placeCaret(caret, nodes[caretIndex], shown[caretIndex]);
    }

    if (progress < 1) {
      frame = requestAnimationFrame(tick);
    } else {
      restore();
    }
  };

  frame = requestAnimationFrame(tick);
  return restore;
};
