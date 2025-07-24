"use client";

import { Box, Typography, Button, Grid, Paper, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StorageIcon from "@mui/icons-material/Storage";
import SettingsIcon from "@mui/icons-material/Settings";
import SecurityIcon from "@mui/icons-material/Security";

export default function Home() {
  const router = useRouter();

  const navigationItems = [
    {
      title: "Dashboard",
      description: "View system overview and device categories",
      icon: <DashboardIcon sx={{ fontSize: 48 }} />,
      path: "/dashboard",
      color: "#9160cdff",
    },
    {
      title: "Inventory",
      description: "Manage your network devices and equipment",
      icon: <StorageIcon sx={{ fontSize: 48 }} />,
      path: "/inventory",
      color: "#3d3adaff",
    },
    {
      title: "Settings",
      description: "Configure system preferences and options",
      icon: <SettingsIcon sx={{ fontSize: 48 }} />,
      path: "/settings",
      color: "#6366f1",
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
        }}
      >
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <SecurityIcon sx={{ fontSize: 80, color: "#9160cdff", mb: 2 }} />
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(135deg, #9160cdff 0%, #3d3adaff 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
            }}
          >
            Cyber Security System
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            Comprehensive network device management and security monitoring platform
          </Typography>
        </Box>

        {/* Navigation Cards */}
        <Grid container spacing={4} sx={{ maxWidth: 900 }}>
          {navigationItems.map((item, index) => (
            <Grid item xs={12} md={4} key={item.title}>
              <Paper
                elevation={8}
                sx={{
                  p: 4,
                  height: 280,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textAlign: "center",
                  background: `linear-gradient(135deg, ${item.color}20 0%, ${item.color}10 100%)`,
                  border: `1px solid ${item.color}30`,
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: `0 12px 40px ${item.color}40`,
                    background: `linear-gradient(135deg, ${item.color}30 0%, ${item.color}20 100%)`,
                  },
                }}
                onClick={() => router.push(item.path)}
              >
                <Box sx={{ color: item.color, mb: 2 }}>
                  {item.icon}
                </Box>
                
                <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {item.description}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                    "&:hover": {
                      background: `linear-gradient(135deg, ${item.color}dd 0%, ${item.color}bb 100%)`,
                    },
                    borderRadius: 2,
                    py: 1.5,
                    fontWeight: 600,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(item.path);
                  }}
                >
                  Access {item.title}
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Footer Section */}
        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Secure • Reliable • Comprehensive
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}