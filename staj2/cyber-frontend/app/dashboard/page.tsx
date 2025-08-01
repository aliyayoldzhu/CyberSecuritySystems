"use client";

import { Box, Paper, Typography, useTheme, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid";
import SecurityIcon from "@mui/icons-material/Security";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import RouterIcon from "@mui/icons-material/Router";
import DnsIcon from "@mui/icons-material/Dns";
import StorageIcon from "@mui/icons-material/Storage";
import WifiIcon from "@mui/icons-material/Wifi";
import ClientLayout from "@/components/ClientLayout";
import { useRouter } from "next/navigation";

const categories = [
  { name: "Firewalls", icon: <SecurityIcon fontSize="large" />, count: 20 },
  { name: "Switches", icon: <DnsIcon fontSize="large" />, count: 8 },
  { name: "Routers", icon: <RouterIcon fontSize="large" />, count: 15 },
  { name: "Laptops", icon: <LaptopMacIcon fontSize="large" />, count: 45 },
  { name: "Servers", icon: <StorageIcon fontSize="large" />, count: 6 },
  { name: "Access Points", icon: <WifiIcon fontSize="large" />, count: 23 },
];

export default function DashboardPage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ClientLayout>
      <Box>
        <Typography
          variant="h4"
          fontWeight={600}
          gutterBottom
          textAlign="center"
        >
          Device Categories
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 4 }}
        >
          Overview of all network devices and equipment in your inventory
        </Typography>

        <Grid container component="div" spacing={5} justifyContent="center">
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={category.name}>
              <Box sx={{ px: 3 }}>
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
                  onClick={() =>
                    router.push(`/category/${category.name.toLowerCase()}`)
                  }
                >
                  {category.icon}
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ mt: 1 }}
                  >
                    {category.name}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {category.count} devices
                  </Typography>
                </Paper>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ClientLayout>
  );
}
