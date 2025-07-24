"use client";

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9160cdff",
    },
    secondary: {
      main: "#3d3adaff",
    },
  },
  typography: {
    fontFamily: "var(--font-geist-sans)",
  },
});

export default function MuiThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}