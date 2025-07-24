"use client";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StorageIcon from "@mui/icons-material/Storage";
import SettingsIcon from "@mui/icons-material/Settings";
import Link from "next/link";

const drawerWidth = 240;

const navItems = [
  { text: "Dashboard", icon: <DashboardIcon />, href: "/dashboard" },
  { text: "Inventory", icon: <StorageIcon />, href: "/inventory" },
  { text: "Settings", icon: <SettingsIcon />, href: "/settings" },
];

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#000000ff",
        },
      }}
    >
      <Toolbar />
      <List>
        {navItems.map(({ text, icon, href }) => (
          <Link href={href} key={text} passHref legacyBehavior>
            <ListItemButton component="a">
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Drawer>
  );
}
