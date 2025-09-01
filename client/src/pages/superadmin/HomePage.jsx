import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import config from "../../utils/config";
import axios from "axios";

const CREATE_WS_URL = `${config.API_URL}/api/workspaces/create`;
const GET_WS_URL = `${config.API_URL}/api/workspaces/get-workspaces`;
const GET_USERS_URL = `${config.API_URL}/api/workspaces/get-users`;

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [users, setUsers] = useState([]);
  const [wsName, setWsName] = useState("");
  const [adminId, setAdminId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) return;

    const fetchWorkspaces = async () => {
      try {
        const res = await axios.get(GET_WS_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const list = Array.isArray(res.data)
          ? res.data
          : res.data?.workspaces || [];
        setWorkspaces(list);
      } catch (err) {
        console.error("Failed to fetch workspaces", err);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await axios.get(GET_USERS_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const list = Array.isArray(res.data) ? res.data : res.data?.users || [];
        setUsers(list);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };

    fetchWorkspaces();
    fetchUsers();
  }, [token, workspaces]);

  const handleOpen = () => {
    setFormError("");
    setWsName("");
    setAdminId("");
    setOpen(true);
  };

  const handleClose = () => {
    if (!submitting) setOpen(false);
  };

  const handleCreateWorkspace = async () => {
    try {
      setFormError("");
      if (!wsName.trim() || !adminId) {
        setFormError("Please provide both workspace name and admin.");
        return;
      }

      setSubmitting(true);
      const res = await axios.post(
        `${config.API_URL}/api/workspaces/workspaces`,
        { name: wsName.trim(), admin_id: adminId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setWorkspaces((prev) => [res.data, ...prev]);
      setOpen(false);
      setWsName("");
      setAdminId("");
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to create workspace";
      setFormError(msg);
      console.error("Create workspace error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ minheight: "100vh", width: "100vw", display: "flex", overflow: "hidden" }}>
      {/* <Sidebar /> */}

      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Navbar />

        {/* Top-right primary action */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleOpen}
            sx={{
              background: "linear-gradient(135deg, #16a34a 0%, #22c55e 50%)",
              color: "#fff",
              fontWeight: 600,
              textTransform: "none",
              px: 3,
              boxShadow: "0 6px 14px rgba(22,163,74,.35)",
              "&:hover": {
                background: "linear-gradient(135deg, #15803d 0%, #16a34a 50%)",
                boxShadow: "0 8px 18px rgba(22,163,74,.45)",
              },
            }}
          >
            Create Workspace
          </Button>
        </Box>
        <Box>
          <Typography
            variant="h3"
            sx={{
              textAlign: "left",
              marginLeft: 10,
              textDecoration: "underline",
              fontWeight: 800,
              color: "#16a34a",
              mb: 3,
            }}
          >
            Your workspaces
          </Typography>
        </Box>

        <Box sx={{ px: 6 }}>
          {workspaces.length === 0 ? (
            <Box
              sx={{
                textAlign: "center",
                mt: 10,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                p: 6,
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h4"
                sx={{ mb: 2, color: "#16a34a", fontWeight: 600 }}
              >
                No Workspaces to display
              </Typography>
            </Box>
          ) : (
            <Box>
              {workspaces.map((ws) => {
                return (
                  <Box
                    key={ws.id}
                    sx={{
                      mb: 3,
                      p: 3,
                      borderRadius: 2,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      "&:hover": {
                        boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{ color: "#16a34a", fontWeight: 600 }}
                    >
                      {ws.name}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1, fontWeight: 800 }}>
                      Admin : 
                      {users.find((u) => u.id === ws.admin_id)
                        ? ` ${users.find((u) => u.id === ws.admin_id).name}`
                        : ""}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      Created At:{" "}
                      {new Date(ws.created_at).toLocaleDateString()}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{ color: "#16a34a", fontWeight: 500, fontSize: "30px" }}
        >
          Create Workspace
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Workspace Name"
            value={wsName}
            onChange={(e) => setWsName(e.target.value)}
            fullWidth
            required
            sx={{ mb: 3, mt: 3 }}
          />

          <FormControl fullWidth required sx={{ mb: 1.5 }}>
            <InputLabel id="admin-select-label">Admin</InputLabel>
            <Select
              labelId="admin-select-label"
              label="Admin"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
            >
              {users.map((u) => (
                <MenuItem key={u.id} value={u.id}>
                  {u.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {formError && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {formError}
            </Typography>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} disabled={submitting} color="error">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCreateWorkspace}
            disabled={submitting}
            sx={{
              background: "linear-gradient(135deg, #16a34a 0%, #22c55e 50%)",
              color: "#fff",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                background: "linear-gradient(135deg, #15803d 0%, #16a34a 50%)",
              },
            }}
            startIcon={
              submitting ? (
                <CircularProgress size={18} sx={{ color: "#fff" }} />
              ) : null
            }
          >
            {submitting ? "Creating..." : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HomePage;
