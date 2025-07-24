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
import ClientLayout from "@/components/ClientLayout";

const categories = [
  { name: "Firewalls", icon: <SecurityIcon fontSize="large" />, count: 12 },
  { name: "Switches", icon: <DnsIcon fontSize="large" />, count: 8 },
  { name: "Routers", icon: <RouterIcon fontSize="large" />, count: 15 },
  { name: "Laptops", icon: <LaptopMacIcon fontSize="large" />, count: 45 },
  { name: "Servers", icon: <StorageIcon fontSize="large" />, count: 6 },
  { name: "Access Points", icon: <WifiIcon fontSize="large" />, count: 23 },
];

export default function DashboardPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ClientLayout>
      <Box>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Device Categories
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Overview of all network devices and equipment in your inventory
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {categories.map((category) => (
            <Grid item xs={6} sm={4} md={3} key={category.name}>
              <Paper
                elevation={5}
                sx={{
                  height: isMobile ? 140 : 160,
                  background:
                    "linear-gradient(135deg, #9160cdff 0%, #3d3adaff 100%)",
                  borderRadius: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 32px rgba(145, 96, 205, 0.4)",
                  },
                }}
                onClick={() => alert(`Navigate to ${category.name} management`)}
              >
                {category.icon}
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 1 }}>
                  {category.name}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {category.count} devices
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ClientLayout>
  );
}