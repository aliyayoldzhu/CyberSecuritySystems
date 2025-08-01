"use client";

import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // If it's the home page, don't show sidebar and navbar
  if (isHomePage) {
    return <>{children}</>;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Navbar title="Cyber Security" />
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}
