export type ThemeMode = "light" | "dark";

export const THEME_STORAGE_KEY = "portfolio-theme";
/** Dark by default: the construction overlay reads like a design tool on a dark canvas. */
export const DEFAULT_THEME: ThemeMode = "dark";

export const isThemeMode = (value: unknown): value is ThemeMode =>
  value === "light" || value === "dark";

/** Stored choice wins; anything else (missing, corrupted) falls back to the default. */
export const resolveTheme = (stored: unknown, fallback: ThemeMode = DEFAULT_THEME): ThemeMode =>
  isThemeMode(stored) ? stored : fallback;

export const toggleTheme = (mode: ThemeMode): ThemeMode => (mode === "dark" ? "light" : "dark");
