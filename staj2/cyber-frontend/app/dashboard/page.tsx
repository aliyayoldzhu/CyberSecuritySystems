"use client";

import {
  Box,
  Grid,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import RouterIcon from "@mui/icons-material/Router";
import DnsIcon from "@mui/icons-material/Dns";
import StorageIcon from "@mui/icons-material/Storage";
import WifiIcon from "@mui/icons-material/Wifi";

const categories = [
  { name: "Firewalls", icon: <SecurityIcon fontSize="large" /> },
  { name: "Switches", icon: <DnsIcon fontSize="large" /> },
  { name: "Routers", icon: <RouterIcon fontSize="large" /> },
  { name: "Laptops", icon: <LaptopMacIcon fontSize="large" /> },
  { name: "Servers", icon: <StorageIcon fontSize="large" /> },
  { name: "Access Points", icon: <WifiIcon fontSize="large" /> },
];

export default function DashboardPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Device Categories
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {categories.map((category) => (
          <Grid item xs={6} sm={4} md={3} key={category.name}>
            <Paper
              elevation={5}
              sx={{
                height: isMobile ? 120 : 140,
                background:
                  "linear-gradient(135deg, #9160cdff 0%, #3d3adaff 100%)",
                borderRadius: "2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
              onClick={() => alert(`Go to ${category.name}`)}
            >
              {category.icon}
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 1 }}>
                {category.name}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
