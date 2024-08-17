import React, { forwardRef } from "react";
import { Paper, Box, Avatar, Typography, Grid, Chip, Divider, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

const EntryLevelResumePreview = (props, ref) => {
  const selectedResume = useSelector((state) => state.resumeBuilder.selectedResume);
  const { basicDetails, educationList, languages, tools, frameworks, awardList, experienceList, projectList } =
    selectedResume;

  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Grid item md={8} ref={ref} component={Paper} mt={3} p={2}>
      {/* First Row */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box textAlign="center">
            <Typography variant="h3" fontWeight="bold">
              {basicDetails.name}
            </Typography>
            <Box mt={1}>
              <Typography variant="body1">
                {basicDetails.phoneNumber} | <a href={`mailto:${basicDetails.email}`}>{basicDetails.email}</a> | {basicDetails.location}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Second Column */}
        <Grid item md={3} xs={12} container justifyContent="center">
          <Box textAlign="center">
            {basicDetails.profilePicture ? (
              <Avatar
                alt={basicDetails.name}
                src={basicDetails.profilePicture}
                sx={{ width: 100, height: 100, mb: 2 }}
              />
            ) : null}
          </Box>
        </Grid>
      </Grid>

      {/* Second Row */}
      <Grid container spacing={3} pt={1}>
        {/* First Column */}
        <Grid item md={6}>
          <Box textAlign="left">
            <Typography variant="h6">Experience</Typography>
            <Divider style={{ backgroundColor: "#f0f0f0" }} />
            {experienceList.map((experience, index) => (
              <Box key={index} mt={1}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {experience.organisation}
                </Typography>
                <Grid container spacing={3}>
                  <Grid item md={6}>
                    <Typography variant="subtitle1" color="primary">
                      {experience.title}
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography variant="body2" style={{ textAlign: "right" }}>
                      {`${experience.startDate} - ${experience.endDate}`}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
                  {experience.description}
                </Typography>
              </Box>
            ))}

            <Typography variant="h6" style={{ marginTop: "16px" }}>
              Awards
            </Typography>
            <Divider style={{ backgroundColor: "#f0f0f0" }} />
            {awardList.map((award, index) => (
              <Box key={index} mt={2}>
                <Grid container spacing={3}>
                  <Grid item md={10}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {award.name}
                    </Typography>
                  </Grid>
                  <Grid item md={2}>
                    <Typography variant="body2" style={{ textAlign: "right" }}>
                      {award.year}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant="body2">{award.shortDescription}</Typography>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Second Column */}
        <Grid item md={6}>
          <Box textAlign="left">
            <Typography variant="h6">Skills</Typography>
            <Divider style={{ backgroundColor: "#f0f0f0" }} />
            <Typography variant="subtitle1">Programming Languages</Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {languages.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>

            <Typography variant="subtitle1" style={{ marginTop: "16px" }}>
              Tools
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {tools.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>

            <Typography variant="subtitle1" style={{ marginTop: "16px" }}>
              Frameworks
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {frameworks.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          </Box>

          {/* Projects Section */}
          <Box textAlign="left" style={{ marginTop: "16px" }}>
            <Typography variant="h6">Projects</Typography>
            <Divider style={{ backgroundColor: "#f0f0f0" }} />
            {projectList.map((project, index) => (
              <Box key={index} mt={2}>
                <Grid container spacing={3} style={{ alignItems: "center" }}>
                  <Grid item md={6}>
                    <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                      {project.name}
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography variant="body2" style={{ textAlign: "right" }}>
                      {`${project.startDate.slice(5, 7)}/${project.startDate.slice(2, 4)} - ${project.endDate.slice(
                        5,
                        7
                      )}/${project.endDate.slice(2, 4)}`}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant="body2">{project.description}</Typography>
                <Typography variant="body2">Link: {project.link}</Typography>
              </Box>
            ))}
          </Box>

          <Box textAlign="left" style={{ marginTop: "16px" }}>
            <Typography variant="h6">Education</Typography>
            <Divider style={{ backgroundColor: "#f0f0f0" }} />
            {educationList.map((education, index) => (
              <Box key={index} mt={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {education.institute}
                </Typography>
                <Grid container spacing={3}>
                  <Grid item md={6}>
                    <Typography variant="body2">{education.degree}</Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography variant="body2" style={{ textAlign: "right" }}>
                      {`${education.startDate} - ${education.endDate}`}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant="body2">Grade: {education.grade}</Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default forwardRef(EntryLevelResumePreview);