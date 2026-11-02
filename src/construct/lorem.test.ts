/**
 * @jest-environment node
 */
import { loremLike } from "./lorem";

describe("loremLike", () => {
  test("keeps length and whitespace positions", () => {
    const source = "Smart Water\nMonitoring  System";
    const out = loremLike(source);
    expect(out).toHaveLength(source.length);
    Array.from(source).forEach((ch, i) => {
      expect(/\s/.test(out[i])).toBe(/\s/.test(ch));
    });
  });

  test("swaps whole words, capitalised where the original was", () => {
    expect(loremLike("Smart Water system")).toBe("Lorem Ipsum dolors");
    expect(loremLike("Jun 2023")).toBe("Lor ipsu");
  });

  test("offset starts further into the lorem and empty input stays empty", () => {
    expect(loremLike("abc", 1)).toBe("ips");
    expect(loremLike("")).toBe("");
  });
});
