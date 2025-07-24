"use client";

import {
  Box,
  Typography,
  Paper,
  Grid,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import { useState } from "react";
import ClientLayout from "@/components/ClientLayout";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [autoBackup, setAutoBackup] = useState(false);

  return (
    <ClientLayout>
      <Typography variant="h4" gutterBottom>
        System Settings
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Configure your system preferences and security options
      </Typography>

      <Grid container spacing={3}>
        {/* General Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              General Settings
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Enable Notifications"
                  secondary="Receive alerts for system events"
                />
                <ListItemSecondaryAction>
                  <Switch
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Dark Mode"
                  secondary="Use dark theme interface"
                />
                <ListItemSecondaryAction>
                  <Switch
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Auto Backup"
                  secondary="Automatically backup system data"
                />
                <ListItemSecondaryAction>
                  <Switch
                    checked={autoBackup}
                    onChange={(e) => setAutoBackup(e.target.checked)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Security Settings
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Button variant="outlined" fullWidth>
                Change Password
              </Button>
              <Button variant="outlined" fullWidth>
                Two-Factor Authentication
              </Button>
              <Button variant="outlined" fullWidth>
                Security Logs
              </Button>
              <Divider sx={{ my: 1 }} />
              <Button variant="contained" color="error" fullWidth>
                Reset System
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* System Information */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              System Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Version
                </Typography>
                <Typography variant="body1">v2.1.0</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Last Updated
                </Typography>
                <Typography variant="body1">Jan 15, 2025</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Database Status
                </Typography>
                <Typography variant="body1" color="success.main">
                  Connected
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Active Users
                </Typography>
                <Typography variant="body1">3</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </ClientLayout>
  );
}