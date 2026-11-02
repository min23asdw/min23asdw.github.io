/**
 * @jest-environment node
 */
import { DEFAULT_THEME, isThemeMode, resolveTheme, toggleTheme } from "./themeMode";

describe("themeMode", () => {
  test("isThemeMode accepts only light and dark", () => {
    expect(isThemeMode("light")).toBe(true);
    expect(isThemeMode("dark")).toBe(true);
    expect(isThemeMode("Dark")).toBe(false);
    expect(isThemeMode(null)).toBe(false);
  });

  test("resolveTheme keeps a valid stored choice", () => {
    expect(resolveTheme("light")).toBe("light");
    expect(resolveTheme("dark", "light")).toBe("dark");
  });

  test("resolveTheme falls back on missing or corrupted values", () => {
    expect(resolveTheme(null)).toBe(DEFAULT_THEME);
    expect(resolveTheme("purple", "light")).toBe("light");
  });

  test("toggleTheme flips the mode", () => {
    expect(toggleTheme("dark")).toBe("light");
    expect(toggleTheme("light")).toBe("dark");
  });
});
