import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { resolveTheme, THEME_STORAGE_KEY, ThemeMode, toggleTheme } from "./themeMode";

interface ThemeModeApi {
  mode: ThemeMode;
  toggle: () => void;
}

const ThemeModeContext = createContext<ThemeModeApi>({ mode: "dark", toggle: () => undefined });

export const useThemeMode = (): ThemeModeApi => useContext(ThemeModeContext);

// public/index.html sets data-theme before React loads (no flash), so start from it.
const readInitialMode = (): ThemeMode => {
  try {
    return resolveTheme(
      document.documentElement.getAttribute("data-theme") ??
        window.localStorage.getItem(THEME_STORAGE_KEY)
    );
  } catch {
    return resolveTheme(null);
  }
};

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(readInitialMode);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch {
      // Storage blocked (private mode): the choice just won't persist.
    }
  }, [mode]);

  const toggle = useCallback(() => setMode(toggleTheme), []);
  const api = useMemo(() => ({ mode, toggle }), [mode, toggle]);
  // Keeps MUI internals (ripples, drawers, icons) in step with the CSS tokens.
  const muiTheme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <ThemeModeContext.Provider value={api}>
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
