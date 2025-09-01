import React, { useState } from "react";
import {
  Grid,
  Paper,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RegisterImage from "../../assets/Register.png";
import { toast } from "react-toastify";
import config from "../../utils/config";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      console.log(username, email, password);
      const response = await axios.post(`${config.API_URL}/api/auth/register`, {
        name: username,
        email,
        password,
      });
      toast.success("Registered successfully! Please verify your email.");
      setStep(2);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${config.API_URL}/api/auth/verify-otp`, {
        email: formData.email,
        otp,
      });
      toast.success("Email verified successfully! You can now log in.");

      // On success, redirect to login
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "OTP verification failed");
    }
  }

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        display: "flex",
      }}
    >
      {/* Left half image */}
      <Box
        sx={{
          height: "100%",
          width: "50%",
          display: { xs: "none", md: "block" },
        }}
      >
        <Box
          component={"img"}
          src={RegisterImage}
          alt="Auth side"
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          loading="lazy"
          crossorigin="anonymous"
        />
      </Box>

      {/* Right half form */}
      {step==1 ? (
        <Box
        sx={{
          height: "100%",
          width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "80%", maxWidth: 400 }}>
          <Typography
            variant="h2"
            align="center"
            sx={{ mb: 6, fontWeight: 700 }}
          >
            Welcome to <span style={{ color: "#16a34a" }}>Ticket Flow</span>
          </Typography>
          <Typography variant="h5" align="center" sx={{ mb: 2 }}>
            Create your account
          </Typography>

          {error ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          ) : null}

          <Box component="form" noValidate onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                // gradient
                background:
                  "linear-gradient(135deg, #16a34a 0%, #22c55e 50%, #86efac 100%)",
                color: "#fff",
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "0 6px 14px rgba(22,163,74,.35)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #15803d 0%, #16a34a 50%, #22c55e 100%)",
                  boxShadow: "0 8px 18px rgba(22,163,74,.45)",
                },
                "&:active": {
                  boxShadow: "0 4px 10px rgba(22,163,74,.35)",
                  transform: "translateY(1px)",
                },
                "&:disabled": {
                  background:
                    "linear-gradient(135deg, #9ee6b6 0%, #b7f3cb 100%)",
                  color: "#fff",
                },
              }}
            >
              Register
            </Button>
            <Typography align="center" sx={{ mt: 2 }}>
              Already have an account?{" "}
              <button
                style={{ fontWeight: 600, color: "#16a34a", cursor: "pointer", border: "none", background: "none" }}
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </Typography>
          </Box>
        </Box>
      </Box>
      ):(
        <Box
        sx={{
          height: "100%",
          width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "80%", maxWidth: 400 }}>
          <Typography
            variant="h2"
            align="center"
            sx={{ mb: 6, fontWeight: 700 }}
          >
            Welcome to <span style={{ color: "#16a34a" }}>Ticket Flow</span>
          </Typography>
          <Typography variant="h5" align="center" sx={{ mb: 2 }}>
            Verify your email
          </Typography>

          {error ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          ) : null}

          <Box component="form" noValidate onSubmit={verifyOTP}>
            <TextField
              label="Enter OTP"
              name="enterOTP"
              type="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              fullWidth
              required
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                // gradient
                background:
                  "linear-gradient(135deg, #16a34a 0%, #22c55e 50%, #86efac 100%)",
                color: "#fff",
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "0 6px 14px rgba(22,163,74,.35)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #15803d 0%, #16a34a 50%, #22c55e 100%)",
                  boxShadow: "0 8px 18px rgba(22,163,74,.45)",
                },
                "&:active": {
                  boxShadow: "0 4px 10px rgba(22,163,74,.35)",
                  transform: "translateY(1px)",
                },
                "&:disabled": {
                  background:
                    "linear-gradient(135deg, #9ee6b6 0%, #b7f3cb 100%)",
                  color: "#fff",
                },
              }}
            >
              Verify
            </Button>
            <Typography align="center" sx={{ mt: 2 }}>
              Already have an account?{" "}
              <button
                style={{ fontWeight: 600, color: "#16a34a", cursor: "pointer", border: "none", background: "none" }}
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </Typography>
          </Box>
        </Box>
      </Box>
      )}
    </Grid>
  );
};

export default Register;
