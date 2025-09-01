import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Divider,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import PushPinIcon from "@mui/icons-material/PushPin";
import { NavLink, useLocation } from "react-router-dom";

const DRAWER_WIDTH_OPEN = 240;
const DRAWER_WIDTH_CLOSED = 72;

const DrawerStyled = styled(Drawer)(({ theme }) => ({
  whiteSpace: "nowrap",
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    borderRight: "none",
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
  },
}));

const navItems = [
  { to: "/superadmin/home", label: "Home", icon: <HomeIcon /> },
  { to: "/about", label: "About", icon: <InfoIcon /> },
  { to: "/dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  { to: "/assigned", label: "Assigned Task", icon: <AssignmentTurnedInIcon /> },
  { to: "/settings", label: "Settings", icon: <SettingsIcon /> },
];

export default function Sidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(false); // expands on hover
  const [pinned, setPinned] = useState(false); // stays expanded if pinned

  const width = open || pinned ? DRAWER_WIDTH_OPEN : DRAWER_WIDTH_CLOSED;

  return (
    <Box
      onMouseEnter={() => !pinned && setOpen(true)}
      onMouseLeave={() => !pinned && setOpen(false)}
      sx={{ height: "100vh", position: "sticky", top: 0 }}
    >
      <DrawerStyled
        variant="permanent"
        open
        PaperProps={{ sx: { width } }}
        sx={{ width }}
      >
        {/* Top spacer (aligns under AppBar) */}
        <Box sx={{ height: 72 }} />

        <List sx={{ px: 1 }}>
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            const button = (
              <ListItemButton
                component={NavLink}
                to={item.to}
                selected={active}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  px: 1.25,
                  py: 1.5,
                  color: "#16a34a",
                  "& .MuiListItemIcon-root": {
                    color: "#16a34a",
                    fontSize: "2rem",
                    minWidth: 0,
                    mr: open || pinned ? 2 : 0,
                    justifyContent: "center",
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: "2rem", 
                  },
                  "& .MuiListItemText-primary": {
                    fontSize: "1.1rem",
                    fontWeight: 600,
                  },
                  "&:hover": {
                    backgroundColor: "#16a34a",
                    color: "#fff",
                    "& .MuiListItemIcon-root": { color: "#fff" },
                  },
                  "&.Mui-selected": {
                    backgroundColor: "#16a34a",
                    color: "#fff",
                    "& .MuiListItemIcon-root": { color: "#fff" },
                    "&:hover": { backgroundColor: "#15803d" },
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    opacity: open || pinned ? 1 : 0,
                    transition: "opacity .2s",
                    whiteSpace: "nowrap",
                  }}
                />
              </ListItemButton>
            );

            return open || pinned ? (
              <Box key={item.to}>{button}</Box>
            ) : (
              <Tooltip key={item.to} title={item.label} placement="right">
                <Box>{button}</Box>
              </Tooltip>
            );
          })}
        </List>

        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        {/* Pin / Unpin */}
        <Box
          sx={{
            display: "flex",
            justifyContent: open || pinned ? "flex-end" : "center",
            p: 1,
          }}
        >
          <Tooltip title={pinned ? "Unpin" : "Pin"}>
            <IconButton onClick={() => setPinned((v) => !v)}>
              {pinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </DrawerStyled>
    </Box>
  );
}
