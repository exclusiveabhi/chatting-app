// src/components/HomeScreen.js
import React from "react";
import { Container, Paper, Tab, Tabs, Fab, Box } from "@mui/material";
import ResumeCardList from "../components/ResumeCardList";
import JobsScreen from "../components/JobTab";
import { useNavigate, useParams } from "react-router-dom";
import { Add } from "@mui/icons-material";

const HomeScreen = () => {
  const { tab: tabType } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = React.useState(tabType === "job" ? 1 : 0);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
    const urlToNavigate = newValue === 0 ? "/home/resume" : "/home/job";
    navigate(urlToNavigate);
  };

  const handleAddClick = () => {
    const urlToNavigate = tabValue === 0 ? "/resume/new" : "/job/new";
    navigate(urlToNavigate);
  };

  return (
    <Container maxWidth="lg">
      <Box mb={4} textAlign="center">
        {/* Tab Layout */}
        <Paper>
          <Tabs value={tabValue} onChange={handleChange} centered>
            <Tab label="Resumes" />
            <Tab label="Jobs" />
          </Tabs>
        </Paper>

        {/* Content based on selected tab */}
        {tabValue === 0 && <ResumeCardList />}
        {tabValue === 1 && <JobsScreen />}
      </Box>
      {/* Floating Action Button */}
      <Fab
        onClick={handleAddClick}
        color="primary"
        aria-label="add"
        size="large"
        style={{
          position: "fixed",
          bottom: "48px",
          right: "184px",
        }}
      >
        <Add fontSize="large" />
      </Fab>
    </Container>
  );
};

export default HomeScreen;
