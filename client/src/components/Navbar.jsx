// Navbar.jsx
import React, { useState } from "react";
import {
  AppBar, Toolbar, Box, IconButton, Avatar, Menu, MenuItem, Divider
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Logo from "../assets/Logo.png"; // ensure path is correct

export default function Navbar() {
  const [avatarAnchor, setAvatarAnchor] = useState(null);
  const openAvatar = Boolean(avatarAnchor);

  return (
    <AppBar position="sticky" elevation={4}
      sx={{ background: "linear-gradient(135deg, #16a34a 0%, #22c55e 50%)" }}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: 72,
          px: 2,
        }}
      >
        {/* Left: Logo */}
        <Box component={RouterLink} to="/" sx={{ display: "inline-flex", alignItems: "center" }}>
          <Box component="img" src={Logo} alt="Logo" sx={{ height: 36, display: "block" }} />
        </Box>

        {/* Right: Avatar */}
        <IconButton onClick={(e) => setAvatarAnchor(e.currentTarget)}>
          <Avatar sx={{ width: 36, height: 36, border: "2px solid rgba(255,255,255,.6)" }} />
        </IconButton>
      </Toolbar>

      {/* Avatar menu */}
      <Menu
        anchorEl={avatarAnchor}
        open={openAvatar}
        onClose={() => setAvatarAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
      >
        <MenuItem component={RouterLink} to="/profile" onClick={() => setAvatarAnchor(null)}>Profile</MenuItem>
        <MenuItem component={RouterLink} to="/settings" onClick={() => setAvatarAnchor(null)}>Settings</MenuItem>
        <Divider />
        <MenuItem onClick={() => setAvatarAnchor(null)}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
}
