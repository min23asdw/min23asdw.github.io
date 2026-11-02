const LOREM_WORDS = (
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor " +
  "incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud"
).split(" ");

/** `count` letters of lorem, starting at word `wordIndex` (words run together if needed). */
const loremLetters = (wordIndex: number, count: number): string => {
  let out = "";
  for (let i = wordIndex; out.length < count; i += 1) {
    out += LOREM_WORDS[i % LOREM_WORDS.length];
  }
  return out.slice(0, count);
};

/**
 * Placeholder text with the same shape as `text`: every word is swapped for a
 * lorem word of the same length (capitalised if the original was), whitespace
 * stays put, so a template card wraps exactly like the real one.
 * `offset` picks where in the lorem list to start (vary it per text node).
 */
export const loremLike = (text: string, offset = 0): string => {
  let word = Math.max(0, offset);
  return text.replace(/\S+/g, (original) => {
    const swap = loremLetters(word, original.length);
    word += 1;
    const capital = original[0] !== original[0].toLowerCase();
    return capital ? swap[0].toUpperCase() + swap.slice(1) : swap;
  });
};
