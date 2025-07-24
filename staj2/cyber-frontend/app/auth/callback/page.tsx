"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Auth callback error:", error);
          router.push("/auth/login?error=callback_error");
          return;
        }

        if (data.session) {
          // User is authenticated, redirect to profile
          router.push("/profile");
        } else {
          // No session, redirect to login
          router.push("/auth/login");
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        router.push("/auth/login?error=unexpected_error");
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="h6" color="text.secondary">
        Verifying your account...
      </Typography>
    </Box>
  );
}