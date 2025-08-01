"use client";

import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  PaletteMode,
} from "@mui/material";
import { createContext, useContext, useMemo, useState } from "react";

interface ThemeContextType {
  mode: PaletteMode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleMode: () => {},
});

export function useThemeToggle() {
  return useContext(ThemeContext);
}

export default function MuiThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<PaletteMode>("dark"); // default mode

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  // ✅ Create dynamic theme based on mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#9160cdff",
          },
          secondary: {
            main: "#3d3adaff",
          },
          ...(mode === "dark"
            ? {
                background: {
                  default: "#121212",
                  paper: "#1d1d1d",
                },
              }
            : {
                background: {
                  default: "#f9f9f9",
                  paper: "#ffffff",
                },
              }),
        },
        typography: {
          fontFamily: "var(--font-geist-sans)",
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
