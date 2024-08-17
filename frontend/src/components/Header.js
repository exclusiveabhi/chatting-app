// src/components/ResumeCard.js
import React from "react";
import { Box, Button, Grid, Container, useMediaQuery } from "@mui/material";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { localStorageKeyAPIToken } from "../constants/api";
import { useTheme } from "@mui/material/styles";

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isTokenPresent = localStorage.getItem(localStorageKeyAPIToken); // Replace "yourToken" with the actual token key
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen size is mobile

  // Access the pathname property of the URLSearchParams object to get the current path
  const handleLogout = () => {
    localStorage.removeItem(localStorageKeyAPIToken);
    navigate("/");
  };

  return (
    <Container maxWidth="lg">
      <Grid container justifyContent={isTokenPresent ? "space-between" : "center"} alignItems="center" pt={2} pb={4}>
        <Grid item>
          <Box
            onClick={() => navigate("/home")}
            component="img"
            alt="logo"
            src={logo}
            style={{
              maxWidth: isMobileView ? theme.spacing(28) : theme.spacing(42),
              maxHeight: isMobileView ? theme.spacing(28) : theme.spacing(42),
              cursor: "pointer", // Change cursor to pointer
            }}
          />
        </Grid>
        {isTokenPresent && (
          <Grid item>
            <Button
              variant="contained"
              color="inherit"
              onClick={handleLogout}
              sx={{
                [theme.breakpoints.down("sm")]: {
                  fontSize: theme.typography.pxToRem(10), // Adjust font size if necessary
                },
              }}
            >
              Logout
            </Button>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Header;
