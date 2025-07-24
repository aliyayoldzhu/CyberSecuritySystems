"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import {
  Edit,
  Email,
  Phone,
  Business,
  Person,
  Add,
  Work,
  ExitToApp,
} from "@mui/icons-material";
import { supabase, UserProfile, Project, UserProject } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import ClientLayout from "@/components/ClientLayout";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [projects, setProjects] = useState<UserProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: "",
    phone: "",
    department: "",
  });
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
  });
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/auth/login");
        return;
      }

      await fetchProfile();
      await fetchProjects();
    } catch (error) {
      console.error("Error checking user:", error);
      router.push("/auth/login");
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (data) {
      setProfile(data);
      setEditForm({
        full_name: data.full_name || "",
        phone: data.phone || "",
        department: data.department || "",
      });
    }
  };

  const fetchProjects = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("user_projects")
      .select(`
        *,
        project:projects(*)
      `)
      .eq("user_id", user.id);

    if (data) {
      setProjects(data);
    }
  };

  const handleUpdateProfile = async () => {
    if (!profile) return;

    const { error } = await supabase
      .from("user_profiles")
      .update(editForm)
      .eq("id", profile.id);

    if (!error) {
      await fetchProfile();
      setEditDialogOpen(false);
    }
  };

  const handleCreateProject = async () => {
    if (!profile) return;

    const { data: project, error: projectError } = await supabase
      .from("projects")
      .insert({
        name: newProject.name,
        description: newProject.description,
        created_by: profile.id,
      })
      .select()
      .single();

    if (project && !projectError) {
      // Add user to project
      await supabase
        .from("user_projects")
        .insert({
          user_id: profile.id,
          project_id: project.id,
          role: "owner",
        });

      await fetchProjects();
      setProjectDialogOpen(false);
      setNewProject({ name: "", description: "" });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <ClientLayout>
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <Typography>Loading...</Typography>
        </Box>
      </ClientLayout>
    );
  }

  if (!profile) {
    return (
      <ClientLayout>
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h6">Profile not found</Typography>
          <Button onClick={() => router.push("/auth/login")} sx={{ mt: 2 }}>
            Go to Login
          </Button>
        </Box>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Typography variant="h4" fontWeight={600}>
            Profile Details
          </Typography>
          <Button
            variant="outlined"
            startIcon={<ExitToApp />}
            onClick={handleSignOut}
            color="error"
          >
            Sign Out
          </Button>
        </Box>

        <Grid container spacing={3}>
          {/* Profile Information */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mx: "auto",
                  mb: 2,
                  background: "linear-gradient(135deg, #9160cdff 0%, #3d3adaff 100%)",
                  fontSize: "3rem",
                }}
              >
                {profile.full_name?.charAt(0) || profile.email.charAt(0)}
              </Avatar>
              
              <Typography variant="h5" fontWeight={600} gutterBottom>
                {profile.full_name || "User"}
              </Typography>
              
              <Chip
                label={profile.role}
                color="primary"
                sx={{ mb: 2, textTransform: "capitalize" }}
              />

              <Button
                variant="outlined"
                startIcon={<Edit />}
                fullWidth
                onClick={() => setEditDialogOpen(true)}
              >
                Edit Profile
              </Button>
            </Paper>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Contact Information
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Email color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email"
                    secondary={profile.email}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Phone color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Phone"
                    secondary={profile.phone || "Not provided"}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Business color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Department"
                    secondary={profile.department || "Not specified"}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Person color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Member Since"
                    secondary={new Date(profile.created_at).toLocaleDateString()}
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Projects Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h6" fontWeight={600}>
                  My Projects
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => setProjectDialogOpen(true)}
                  sx={{
                    background: "linear-gradient(135deg, #9160cdff 0%, #3d3adaff 100%)",
                  }}
                >
                  New Project
                </Button>
              </Box>

              {projects.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <Typography color="text.secondary">
                    No projects yet. Create your first project!
                  </Typography>
                </Box>
              ) : (
                <Grid container spacing={2}>
                  {projects.map((userProject) => (
                    <Grid item xs={12} sm={6} md={4} key={userProject.id}>
                      <Card
                        sx={{
                          height: "100%",
                          background: "linear-gradient(135deg, #9160cd20 0%, #3d3ada20 100%)",
                          border: "1px solid #9160cd30",
                        }}
                      >
                        <CardContent>
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 2 }}>
                            <Typography variant="h6" fontWeight={600}>
                              {userProject.project?.name}
                            </Typography>
                            <Chip
                              label={userProject.role}
                              size="small"
                              color="primary"
                              sx={{ textTransform: "capitalize" }}
                            />
                          </Box>
                          
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {userProject.project?.description || "No description"}
                          </Typography>
                          
                          <Divider sx={{ my: 1 }} />
                          
                          <Typography variant="caption" color="text.secondary">
                            Joined: {new Date(userProject.joined_at).toLocaleDateString()}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* Edit Profile Dialog */}
        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Full Name"
              value={editForm.full_name}
              onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
              sx={{ mb: 2, mt: 1 }}
            />
            <TextField
              fullWidth
              label="Phone"
              value={editForm.phone}
              onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Department"
              value={editForm.department}
              onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateProfile} variant="contained">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>

        {/* New Project Dialog */}
        <Dialog open={projectDialogOpen} onClose={() => setProjectDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Project Name"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              sx={{ mb: 2, mt: 1 }}
              required
            />
            <TextField
              fullWidth
              label="Description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              multiline
              rows={3}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setProjectDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleCreateProject} 
              variant="contained"
              disabled={!newProject.name.trim()}
            >
              Create Project
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ClientLayout>
  );
}