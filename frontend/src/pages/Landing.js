// src/components/LandingPage.js
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
  Divider,
  Grid,
  Tab,
  Tabs,
  Card,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import jobHunt from "../assets/job-hunt.svg";
import api from "../api";
import { localStorageKeyAPIToken } from "../constants/api";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [value, setValue] = useState(0); // Tab index state
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen size is mobile

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(localStorageKeyAPIToken);
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleGuestLogin = () => {
    try {
      const token = process.env.REACT_APP_GUEST_LOGIN_TOKEN;
      localStorage.setItem(localStorageKeyAPIToken, token);
      navigate("/home");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleRegularLogin = async () => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem(localStorageKeyAPIToken, token);
      navigate("/home");
    } catch (error) {
      console.error("Login failed", error);
      setLoginError("Invalid email or password. Please try again.");
    }
  };

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        setPasswordError("Passwords do not match");
        return; // Stop the registration process if passwords do not match
      }
      setPasswordError("");
      const response = await api.post("/auth/register", {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem(localStorageKeyAPIToken, token);
      navigate("/home");
    } catch (error) {
      console.error("Registration failed", error);
      setRegistrationError("Registration failed. Please try again.");
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Grid container alignItems="center" justifyContent="center" pt={6}>
        {/* Logo and Title */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 5,
              width: 1,
              maxWidth: 420,
            }}
          >
            {/* Guest Login Button */}
            <Typography variant="h6" align="center" paragraph>
              Get hired by top product-based companies now!
            </Typography>
            <Box mt={2} textAlign="center">
              <Button variant="contained" color="primary" onClick={handleGuestLogin}>
                Guest Login
              </Button>
            </Box>

            {/* "OR" Divider */}
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                OR
              </Typography>
            </Divider>

            {/* Tabs for Login and Register */}
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>

            {/* Login Tab Content */}
            {value === 0 && (
              <>
                <Box textAlign="center">
                  <TextField
                    label="email"
                    margin="normal"
                    value={email}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Box>

                <Box textAlign="center">
                  <TextField
                    label="Password"
                    type="password"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Box>

                <Box textAlign="center">
                  <Button variant="contained" color="inherit" onClick={handleRegularLogin}>
                    Log In
                  </Button>
                  {/* Display login error */}
                  {loginError && (
                    <Box textAlign="center" mt={2}>
                      <Typography variant="body2" color="error">
                        {loginError}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </>
            )}

            {/* Register Tab Content */}
            {value === 1 && (
              <>
                <Box textAlign="center">
                  <TextField
                    label="email"
                    margin="normal"
                    value={email}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Box>

                <Box textAlign="center">
                  <TextField
                    label="Password"
                    type="password"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Box>

                <Box textAlign="center">
                  <TextField
                    label="Confirm Password"
                    type="password"
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={passwordError !== ""}
                    helperText={passwordError}
                  />
                </Box>

                <Box textAlign="center">
                  <Button variant="contained" color="inherit" onClick={handleRegister}>
                    Register
                  </Button>
                  {/* Display registration error */}
                  {registrationError && (
                    <Box textAlign="center" mt={2}>
                      <Typography variant="body2" color="error">
                        {registrationError}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </>
            )}
          </Card>
        </Grid>
        {/* First Column - Portrait Image */}
        {!isMobileView && (
          <Grid item xs={12} md={6}>
            <Box mt={4} mb={4} textAlign="center">
              <img src={jobHunt} alt="Portrait" style={{ height: "450px" }} />
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default LandingPage;
