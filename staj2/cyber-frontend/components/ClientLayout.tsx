"use client";

import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Navbar title="Cyber Security System" />
          <Box sx={{ p: 3 }}>{children}</Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
