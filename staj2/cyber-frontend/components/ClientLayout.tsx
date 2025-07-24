"use client";

import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

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
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // If it's the home page, don't show sidebar and navbar
  if (isHomePage) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    );
  }

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