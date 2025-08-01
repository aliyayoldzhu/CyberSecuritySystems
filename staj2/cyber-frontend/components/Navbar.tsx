"use client";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import ShieldIcon from "@mui/icons-material/Shield";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";
import { useThemeToggle } from "@/components/MuiThemeWrapper";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useRouter } from "next/navigation";

export default function Navbar({ title }: { title: string }) {
  const { mode, toggleMode } = useThemeToggle();
  const router = useRouter();

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ borderBottom: "1px solid #ffffffff" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ShieldIcon sx={{ mr: 1 }} />
            <Typography fontWeight={600}>{title}</Typography>
          </Box>
        </Link>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Dark mode */}
          <Tooltip
            title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
          >
            <IconButton onClick={toggleMode} color="inherit">
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>

          {/* Favourites */}
          <Tooltip title="Favourites">
            <IconButton onClick={() => router.push("/favourites")}>
              <FavoriteIcon />
            </IconButton>
          </Tooltip>

          {/* Cart */}
          <Tooltip title="Shopping Cart">
            <IconButton onClick={() => router.push("/cart")}>
              <ShoppingCartIcon />
            </IconButton>
          </Tooltip>

          {/* Avatar */}
          <IconButton>
            <Avatar alt="U" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
