// src/components/ResumePreview.js
import React, { forwardRef } from "react";
import { Paper, Box, Avatar, Typography, Grid, Chip, Divider, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

const EntryLevelResumePreview = (props, ref) => {
  const selectedResume = useSelector((state) => state.resumeBuilder.selectedResume);
  const { basicDetails, educationList, languages, tools, frameworks, awardList, experienceList, projectList } =
    selectedResume;

  const basicDetailsMobile = (
    <>
      <Typography variant="body1">
        <a href={`mailto:${basicDetails.email}`}>{basicDetails.email}</a>
      </Typography>
      <Typography variant="body1">
        {basicDetails.website ? <a href={basicDetails.website}>{basicDetails.website}</a> : null}
      </Typography>
      <Typography variant="body1">{basicDetails.phoneNumber}</Typography>
      <Typography variant="body1">{basicDetails.location}</Typography>
    </>
  );

  const basicDetailsDesktop = (
    <>
      <Typography variant="body1">
        <a href={`mailto:${basicDetails.email}`}>{basicDetails.email}</a>{" "}
        {basicDetails.website ? <a href={basicDetails.website}>{basicDetails.website}</a> : null}{" "}
      </Typography>

      <Typography variant="body1">
        {basicDetails.phoneNumber} {basicDetails.location}
      </Typography>
    </>
  );

  const isMobile = useMediaQuery("(max-width:600px)");
  const basicDetailComponent = isMobile ? basicDetailsMobile : basicDetailsDesktop;

  return (
    <Grid item md={8} ref={ref} component={Paper} mt={3} p={2}>
      {/* First Row */}
      <Grid container spacing={3}>
        {/* First Column */}
        <Grid item md={9} xs={9}>
          <Box textAlign="left">
            <Typography variant="h5">{basicDetails.name}</Typography>
            <Typography variant="subtitle1" color="primary">
              {basicDetails.currentJobTitle}
            </Typography>
            {basicDetailComponent}
          </Box>
        </Grid>

        {/* Second Column */}
        <Grid item md={3} xs={3} container justifyContent="left">
          <Box textAlign="left">
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
                {/* First Row - Company Name */}
                <Typography variant="subtitle1" fontWeight="bold">
                  {experience.organisation}
                </Typography>
                {/* Second Row - Job Title and Dates */}
                <Grid container spacing={3}>
                  {/* First Column - Job Title */}
                  <Grid item md={6}>
                    <Typography variant="subtitle1" color="primary">
                      {experience.title}
                    </Typography>
                  </Grid>
                  {/* Second Column - Dates (Right Aligned) */}
                  <Grid item md={6}>
                    <Typography variant="body2" style={{ textAlign: "right" }}>
                      {`${experience.startDate} - ${experience.endDate}`}
                    </Typography>
                  </Grid>
                </Grid>
                {/* Third Row - Description */}
                <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
                  {experience.description}
                </Typography>
              </Box>
            ))}

            {/* Awards Section */}
            <Typography variant="h6" style={{ marginTop: "16px" }}>
              Awards
            </Typography>

            <Divider style={{ backgroundColor: "#f0f0f0" }} />
            {awardList.map((award, index) => (
              <Box key={index} mt={2}>
                {/* First Row - Award Name and Year (Right Aligned) */}
                <Grid container spacing={3}>
                  {/* First Column - Award Name in Bold */}
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
                  {/* Second Column - Year (Right Aligned) */}
                  <Grid item md={2}>
                    <Typography variant="body2" style={{ textAlign: "right" }}>
                      {award.year}
                    </Typography>
                  </Grid>
                </Grid>
                {/* Second Row - Short Description */}
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
          {/* Projects Section */}
          <Box textAlign="left" style={{ marginTop: "16px" }}>
            <Typography variant="h6">Projects</Typography>
            <Divider style={{ backgroundColor: "#f0f0f0" }} />
            {projectList.map((project, index) => (
              <Box key={index} mt={2}>
                {/* First Row - Project Name, Start Date, and End Date */}
                <Grid container spacing={3} style={{ alignItems: "center" }}>
                  {/* First Column - Project Name */}
                  <Grid item md={6}>
                    <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                      {project.name}
                    </Typography>
                  </Grid>
                  {/* Second Column - Dates (Right Aligned) */}
                  <Grid item md={6}>
                    <Typography variant="body2" style={{ textAlign: "right" }}>
                      {`${project.startDate.slice(5, 7)}/${project.startDate.slice(2, 4)} - ${project.endDate.slice(
                        5,
                        7
                      )}/${project.endDate.slice(2, 4)}`}
                    </Typography>
                  </Grid>
                </Grid>
                {/* Second Row - Description */}
                <Typography variant="body2">{project.description}</Typography>
                {/* Third Row - Link */}
                <Typography variant="body2">Link: {project.link}</Typography>
              </Box>
            ))}
          </Box>

          <Box textAlign="left" style={{ marginTop: "16px" }}>
            <Typography variant="h6">Education</Typography>

            <Divider style={{ backgroundColor: "#f0f0f0" }} />
            {educationList.map((education, index) => (
              <Box key={index} mt={2}>
                {/* First Row - College Name in Bold */}
                <Typography variant="subtitle1" fontWeight="bold">
                  {education.institute}
                </Typography>
                {/* Second Row - Degree, Start Date, End Date (Right Aligned) */}
                <Grid container spacing={3}>
                  {/* First Column - Degree */}
                  <Grid item md={6}>
                    <Typography variant="body2">{education.degree}</Typography>
                  </Grid>
                  {/* Second Column - Dates (Right Aligned) */}
                  <Grid item md={6}>
                    <Typography variant="body2" style={{ textAlign: "right" }}>
                      {`${education.startDate} - ${education.endDate}`}
                    </Typography>
                  </Grid>
                </Grid>
                {/* Third Row - Grade */}
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
