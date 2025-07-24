"use client";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";

export default function Navbar({ title }: { title: string }) {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ borderBottom: "1px solid #ffffffff" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton>
            <Avatar alt="U" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
