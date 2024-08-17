// src/components/ResumePreview.js
import React, { useState } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Typography,
  Grid,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material";

import { convertToTitleCase } from "../utils/string";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";

import { useSelector, useDispatch } from "react-redux";
import {
  updateBasicDetails,
  updateEducationDetails,
  addEducation,
  deleteEducation,
  updateLanguage,
  updateTool,
  updateFramework,
  updateAwardDetails,
  addAward,
  deleteAward,
  updateExperienceDetails,
  addExperience,
  deleteExperience,
  updateProjectDetails,
  addProject,
  deleteProject,
} from "../reducers/resumeBuilderSlice";

const ResumeAccordion = () => {
  const dispatch = useDispatch();
  const selectedResume = useSelector((state) => state.resumeBuilder.selectedResume);
  const {
    basicDetails,
    educationList,
    languages,
    tools,
    frameworks,
    awardList,
    experienceDetails,
    experienceList,
    educationDetails,
    projectDetails,
    awardDetails,
    projectList,
  } = selectedResume;

  const handleBasicDetailsChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateBasicDetails({ [name]: value }));
  };

  const handleEducationChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateEducationDetails({ [name]: value }));
  };

  const handleAddEducation = () => {
    dispatch(addEducation());
  };

  const handleDeleteEducation = (index) => {
    dispatch(deleteEducation(index));
  };

  const handleLanguageChange = (event) => {
    dispatch(updateLanguage(event.target.value));
  };

  const handleToolChange = (event) => {
    dispatch(updateTool(event.target.value));
  };

  const handleFrameworkChange = (event) => {
    dispatch(updateFramework(event.target.value));
  };

  const handleAwardChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateAwardDetails({ [name]: value }));
  };

  const handleAddAward = () => {
    dispatch(addAward());
  };

  const handleDeleteAward = (index) => {
    dispatch(deleteAward(index));
  };

  const handleExperienceChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateExperienceDetails({ [name]: value }));
  };

  const handleAddExperience = () => {
    dispatch(addExperience());
  };

  const handleDeleteExperience = (index) => {
    dispatch(deleteExperience(index));
  };

  const handleProjectChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateProjectDetails({ [name]: value }));
  };

  const handleAddProject = () => {
    dispatch(addProject());
  };

  const handleDeleteProject = (index) => {
    dispatch(deleteProject(index));
  };

  const [expandedAccordion, setExpandedAccordion] = useState(null);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : null);
  };
  return (
    <Grid item xs={12} md={4}>
      <Accordion expanded={expandedAccordion === "basic-details"} onChange={handleAccordionChange("basic-details")}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="basic-details-content"
          id="basic-details-header"
        >
          <Typography>Basic Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* Basic Details Input Fields */}
          {Object.entries(basicDetails).map(([field, value]) => (
            <TextField
              key={field}
              fullWidth
              label={convertToTitleCase(field)}
              name={field}
              value={value}
              onChange={handleBasicDetailsChange}
              margin="normal"
            />
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expandedAccordion === "experience"} onChange={handleAccordionChange("experience")}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="experience-details-content"
          id="experience-details-header"
        >
          <Typography> Experience</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* Experience Input Fields */}
          <TextField
            fullWidth
            label="Organisation"
            name="organisation"
            value={experienceDetails.organisation}
            onChange={handleExperienceChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={experienceDetails.title}
            onChange={handleExperienceChange}
            margin="normal"
          />
          <TextField
            fullWidth
            type="date"
            label="Start Date"
            name="startDate"
            value={experienceDetails.startDate}
            onChange={handleExperienceChange}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
          <TextField
            fullWidth
            type="date"
            label="End Date"
            name="endDate"
            value={experienceDetails.endDate}
            onChange={handleExperienceChange}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={experienceDetails.description}
            onChange={handleExperienceChange}
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleAddExperience} style={{ marginTop: "16px" }}>
            Add Experience
          </Button>

          {/* Experience Box Display */}
          {experienceList.map((experience, index) => (
            <Box key={index} border={1} borderColor="primary.main" borderRadius={2} p={2} mt={2} position="relative">
              <IconButton
                onClick={() => handleDeleteExperience(index)}
                style={{ position: "absolute", top: 0, right: 0 }}
              >
                <DeleteIcon />
              </IconButton>
              <Typography variant="subtitle1" fontWeight="bold">
                {experience.organisation}
              </Typography>
              <Typography variant="body2">
                {experience.startDate} to {experience.endDate}
              </Typography>
              <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
                {experience.description}
              </Typography>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expandedAccordion === "education"} onChange={handleAccordionChange("education")}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="education-details-content"
          id="education-details-header"
        >
          <Typography>Education</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* Education Section Input Fields */}
          <TextField
            fullWidth
            label="Name of Institute"
            name="institute"
            value={educationDetails.institute}
            onChange={handleEducationChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Degree"
            name="degree"
            value={educationDetails.degree}
            onChange={handleEducationChange}
            margin="normal"
          />
          <TextField
            fullWidth
            type="date"
            label="Start Date"
            name="startDate"
            value={educationDetails.startDate}
            onChange={handleEducationChange}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
          <TextField
            fullWidth
            type="date"
            label="End Date"
            name="endDate"
            value={educationDetails.endDate}
            onChange={handleEducationChange}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Grade"
            name="grade"
            value={educationDetails.grade}
            onChange={handleEducationChange}
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleAddEducation} style={{ marginTop: "16px" }}>
            Add Education
          </Button>

          {/* Education Box Display */}
          {educationList.map((education, index) => (
            <Box key={index} border={1} borderColor="primary.main" borderRadius={2} p={2} mt={2} position="relative">
              <IconButton
                onClick={() => handleDeleteEducation(index)}
                style={{ position: "absolute", top: 0, right: 0 }}
              >
                <DeleteIcon />
              </IconButton>
              <Typography variant="subtitle1" fontWeight="bold">
                {education.institute}
              </Typography>
              <Typography variant="body2">
                {education.degree} - {education.startDate} to {education.endDate}
              </Typography>
              <Typography variant="body2">Grade: {education.grade}</Typography>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
      {/* Projects Accordion */}
      <Accordion expanded={expandedAccordion === "projects"} onChange={handleAccordionChange("projects")}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="projects-details-content"
          id="projects-details-header"
        >
          <Typography>Projects</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* Project Input Fields */}
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={projectDetails.name}
            onChange={handleProjectChange}
            margin="normal"
          />
          <TextField
            fullWidth
            type="date"
            label="Start Date"
            name="startDate"
            value={projectDetails.startDate}
            onChange={handleProjectChange}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
          <TextField
            fullWidth
            type="date"
            label="End Date"
            name="endDate"
            value={projectDetails.endDate}
            onChange={handleProjectChange}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={projectDetails.description}
            onChange={handleProjectChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Link"
            name="link"
            value={projectDetails.link}
            onChange={handleProjectChange}
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleAddProject} style={{ marginTop: "16px" }}>
            Add Project
          </Button>

          {/* Project Box Display */}
          {projectList.map((project, index) => (
            <Box key={index} border={1} borderColor="primary.main" borderRadius={2} p={2} mt={2} position="relative">
              <IconButton onClick={() => handleDeleteProject(index)} style={{ position: "absolute", top: 0, right: 0 }}>
                <DeleteIcon />
              </IconButton>
              <Typography variant="subtitle1" fontWeight="bold">
                {project.name}
              </Typography>
              <Typography variant="body2">{`${project.startDate} to ${project.endDate}`}</Typography>
              <Typography variant="body2">{project.description}</Typography>
              <Typography variant="body2">Link: {project.link}</Typography>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>

      {/* Skills Accordion */}
      <Accordion expanded={expandedAccordion === "skills"} onChange={handleAccordionChange("skills")}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="skills-details-content"
          id="skills-details-header"
        >
          <Typography>Skills</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* Programming Languages Multi-Select */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="languages-label">Programming Languages</InputLabel>
            <Select
              labelId="languages-label"
              id="languages"
              multiple
              value={languages}
              onChange={handleLanguageChange}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {["JavaScript", "Python", "Java", "C++", "Ruby"].map((language) => (
                <MenuItem key={language} value={language}>
                  {language}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Tools Multi-Select */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="tools-label">Tools</InputLabel>
            <Select
              labelId="tools-label"
              id="tools"
              multiple
              value={tools}
              onChange={handleToolChange}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {["Git", "VS Code", "Docker", "JIRA", "Postman"].map((tool) => (
                <MenuItem key={tool} value={tool}>
                  {tool}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Frameworks Multi-Select */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="frameworks-label">Frameworks</InputLabel>
            <Select
              labelId="frameworks-label"
              id="frameworks"
              multiple
              value={frameworks}
              onChange={handleFrameworkChange}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {["React", "Node.js", "Angular", "Spring Boot", "Express.js"].map((framework) => (
                <MenuItem key={framework} value={framework}>
                  {framework}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      {/* Awards Accordion */}
      <Accordion expanded={expandedAccordion === "awards"} onChange={handleAccordionChange("awards")}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="awards-details-content"
          id="awards-details-header"
        >
          <Typography>Awards</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* Awards Input Fields */}
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={awardDetails.name}
            onChange={handleAwardChange}
            margin="normal"
          />
          <TextField
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            label="Year"
            name="year"
            value={awardDetails.year}
            onChange={handleAwardChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Short Description"
            name="shortDescription"
            value={awardDetails.shortDescription}
            onChange={handleAwardChange}
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleAddAward} style={{ marginTop: "16px" }}>
            Add Award
          </Button>

          {/* Awards Box Display */}
          {awardList.map((award, index) => (
            <Box key={index} border={1} borderColor="primary.main" borderRadius={2} p={2} mt={2} position="relative">
              <IconButton onClick={() => handleDeleteAward(index)} style={{ position: "absolute", top: 0, right: 0 }}>
                <DeleteIcon />
              </IconButton>
              <Typography variant="subtitle1" fontWeight="bold">
                {award.name}
              </Typography>
              <Typography variant="body2">
                Year: {award.year}, Short Description: {award.shortDescription}
              </Typography>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default ResumeAccordion;
