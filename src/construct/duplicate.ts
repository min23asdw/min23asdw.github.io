import { DupSpec, dupTimeline } from "./agentPlans";
import { startDomTyping } from "./domTyping";
import { loremLike } from "./lorem";

/** The slot's selection flashes on landing, then stays off until its edit turn. */
const LANDING_FLASH_MS = 450;
/** Set on the slot while its content is being filled (shows the I-beam). */
const FILLING_ATTR = "data-cx-fill";
const SWAP_MS = 90;
/** Motion blur at the fastest point of the sweep. */
const SWEEP_BLUR_PX = 5;
const SAME_ROW_PX = 8;
const TYPING_SHARE = 0.9;

/**
 * Turn a clone of the first card into a blank template: images become image
 * placeholders of the same size, text becomes lorem ipsum of the same shape.
 */
const toTemplate = (clone: HTMLElement, source: Element) => {
  const media = Array.from(source.querySelectorAll<HTMLElement>("img, video, canvas"));
  Array.from(clone.querySelectorAll<HTMLElement>("img, video, canvas")).forEach((el, i) => {
    const size = media[i]?.getBoundingClientRect();
    const placeholder = document.createElement("span");
    placeholder.className = "cx-ph-img";
    placeholder.style.width = size ? `${size.width}px` : "100%";
    placeholder.style.height = size ? `${size.height}px` : "120px";
    el.replaceWith(placeholder);
  });
  const walker = document.createTreeWalker(clone, NodeFilter.SHOW_TEXT);
  const texts: Text[] = [];
  for (let n = walker.nextNode(); n; n = walker.nextNode()) texts.push(n as Text);
  texts.reduce((offset, node) => {
    const value = node.nodeValue ?? "";
    node.nodeValue = loremLike(value, offset);
    // Continue the lorem where this text node left off.
    return offset + (value.match(/\S+/g)?.length ?? 0);
  }, 0);
  clone.classList.add("cx-template");
};

const isContent = (el: Element) =>
  !el.classList.contains("cx-frame") && !el.classList.contains("cx-dup-clone");

/**
 * Figma-style smart guide: a pink line between the card the copy came from and
 * the dropped copy, labelled with the gap in px. In the slot's own coordinates.
 */
const spacingGuide = (from: DOMRect, to: DOMRect): HTMLElement | null => {
  const sameRow = Math.abs(from.top - to.top) < SAME_ROW_PX;
  const gap = sameRow ? to.left - from.right : to.top - from.bottom;
  if (gap <= 0) return null;

  const guide = document.createElement("span");
  guide.className = `cx-spacing cx-spacing--${sameRow ? "h" : "v"}`;
  guide.setAttribute("aria-hidden", "true");
  const label = document.createElement("em");
  label.textContent = `${Math.round(gap)}`;
  guide.appendChild(label);

  if (sameRow) {
    guide.style.left = `${-gap}px`;
    guide.style.top = `${Math.min(from.height, to.height) / 2}px`;
    guide.style.width = `${gap}px`;
  } else {
    guide.style.top = `${-gap}px`;
    guide.style.left = `${to.width / 2}px`;
    guide.style.height = `${gap}px`;
  }
  return guide;
};

/**
 * Keyframes from times in ms. Offsets are clamped to [0, 1] and never go
 * backwards (WAAPI rejects that), e.g. when the edit follows the landing closely.
 */
const timed = (durationMs: number, frames: Array<Keyframe & { at: number }>): Keyframe[] =>
  frames.reduce<Keyframe[]>((out, { at, ...frame }) => {
    const previous = out.length ? (out[out.length - 1].offset as number) : 0;
    const offset = Math.max(previous, Math.min(1, Math.max(0, at / durationMs)));
    return [...out, { ...frame, offset }];
  }, []);

/**
 * Repeat-grid copy, in the card's slot:
 *  1. sweep - a clone of the first card shoots out of the neighbouring card (motion blur)
 *  2. drop  - it lands with a quick selection flash and a spacing guide, and waits
 *             there as a copy until every slot is filled
 *  3. fill  - on this card's turn the clone gives way: the new image develops and
 *             the text is retyped with the I-beam.
 * Returns a cleanup that restores the real card.
 */
export const startDuplicate = (
  slot: HTMLElement,
  spec: DupSpec,
  durationMs: number,
  caret: HTMLElement | null
): (() => void) => {
  const content = Array.from(spec.master.children).find(isContent);
  const real = Array.from(slot.children).find(isContent);
  if (!content || !real || typeof slot.animate !== "function") return () => undefined;

  const t = dupTimeline(durationMs, spec);

  const clone = content.cloneNode(true) as HTMLElement;
  clone.classList.add("cx-dup-clone");
  clone.setAttribute("aria-hidden", "true");
  // Hidden until its sweep; otherwise it flashes for a frame before the animation applies.
  clone.style.opacity = "0";
  clone.querySelectorAll("a, button, [tabindex]").forEach((el) => el.setAttribute("tabindex", "-1"));
  toTemplate(clone, content);

  const from = spec.from.getBoundingClientRect();
  const to = slot.getBoundingClientRect();
  const dx = from.left - to.left;
  const dy = from.top - to.top;
  const mid = t.sweep + (t.drop - t.sweep) * 0.45;
  slot.appendChild(clone);

  const guide = spacingGuide(from, to);
  if (guide) slot.appendChild(guide);

  const images = Array.from(real.querySelectorAll<HTMLElement>("img, video, canvas"));
  const animations: Animation[] = [
    clone.animate(
      timed(durationMs, [
        { at: 0, transform: `translate(${dx}px, ${dy}px)`, opacity: 0, filter: "blur(0)" },
        { at: t.sweep, transform: `translate(${dx}px, ${dy}px)`, opacity: 0, filter: "blur(0)" },
        {
          at: t.sweep + 1,
          transform: `translate(${dx}px, ${dy}px)`,
          opacity: 0.9,
          filter: "blur(0)",
          easing: "cubic-bezier(0.5, 0, 1, 1)",
        },
        // Fast through the middle: smeared like a quick drag on screen.
        {
          at: mid,
          transform: `translate(${dx * 0.35}px, ${dy * 0.35}px)`,
          opacity: 0.85,
          filter: `blur(${SWEEP_BLUR_PX}px)`,
          easing: "cubic-bezier(0, 0, 0.2, 1)",
        },
        { at: t.drop, transform: "translate(0, 0)", opacity: 1, filter: "blur(0)" },
        { at: t.fill, transform: "translate(0, 0)", opacity: 1, filter: "blur(0)" },
        { at: t.fill + SWAP_MS, transform: "translate(0, 0)", opacity: 0, filter: "blur(0)" },
        { at: durationMs, transform: "translate(0, 0)", opacity: 0, filter: "blur(0)" },
      ]),
      { duration: durationMs, fill: "both" }
    ),
    real.animate(
      timed(durationMs, [
        { at: 0, opacity: 0 },
        { at: t.fill, opacity: 0 },
        { at: t.fill + SWAP_MS, opacity: 1 },
        { at: durationMs, opacity: 1 },
      ]),
      { duration: durationMs, fill: "both" }
    ),
    // The new image is clicked in and develops from a raw blur.
    ...images.map((img) =>
      img.animate(
        timed(durationMs, [
          { at: 0, opacity: 0, filter: "blur(8px) grayscale(1)" },
          { at: t.fill, opacity: 0, filter: "blur(8px) grayscale(1)" },
          { at: t.type, opacity: 1, filter: "blur(0) grayscale(0)" },
          { at: durationMs, opacity: 1, filter: "blur(0) grayscale(0)" },
        ]),
        { duration: durationMs, fill: "both" }
      )
    ),
  ];
  const frame = slot.querySelector<HTMLElement>(":scope > .cx-frame");
  if (frame) {
    animations.push(
      frame.animate(
        timed(durationMs, [
          { at: 0, opacity: 0 },
          { at: t.drop, opacity: 0 },
          { at: t.drop + 80, opacity: 1 },
          { at: t.drop + LANDING_FLASH_MS, opacity: 1 },
          { at: t.drop + LANDING_FLASH_MS + 200, opacity: 0 },
          { at: t.fill - 120, opacity: 0 },
          { at: t.fill, opacity: 1 },
          { at: durationMs, opacity: 1 },
        ]),
        { duration: durationMs, fill: "both" }
      )
    );
  }
  if (guide) {
    animations.push(
      guide.animate(
        timed(durationMs, [
          { at: 0, opacity: 0 },
          { at: t.drop, opacity: 0 },
          { at: t.drop + 80, opacity: 1 },
          { at: t.drop + 600, opacity: 1 },
          { at: t.drop + 800, opacity: 0 },
          { at: durationMs, opacity: 0 },
        ]),
        { duration: durationMs, fill: "both" }
      )
    );
  }

  let stopTyping: () => void = () => undefined;
  const fillTimer = window.setTimeout(() => slot.setAttribute(FILLING_ATTR, ""), t.fill);
  const typeTimer = window.setTimeout(() => {
    // Nobody sees an off-screen card being retyped: skip the per-character DOM work.
    const r = slot.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) return;
    stopTyping = startDomTyping(slot, caret, (durationMs - t.type) * TYPING_SHARE);
  }, t.type);

  return () => {
    window.clearTimeout(fillTimer);
    window.clearTimeout(typeTimer);
    stopTyping();
    animations.forEach((a) => a.cancel());
    clone.remove();
    guide?.remove();
    slot.removeAttribute(FILLING_ATTR);
  };
};
