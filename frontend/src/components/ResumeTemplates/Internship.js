import React, { forwardRef } from "react";
import {
  Table,
  TableCell,
  TableRow,
  TableContainer,
  TableBody,
  Paper,
  Box,
  Avatar,
  Typography,
  Grid,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { useSelector } from "react-redux";

const InternshipResumePreview = (props, ref) => {
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
  const educationTable = (
    <TableContainer>
      <Table>
        <TableBody>
          {educationList.map((education, index) => (
            <TableRow
              key={index}
              sx={
                index === educationList.length - 1
                  ? {
                      [`& .${tableCellClasses.root}`]: {
                        borderBottom: "none",
                      },
                    }
                  : null
              }
            >
              <TableCell>{education.institute}</TableCell>
              <TableCell>{education.degree}</TableCell>
              <TableCell>{education.startDate}</TableCell>
              <TableCell>{education.endDate}</TableCell>
              <TableCell>{education.grade}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

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
          <Box>
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
      <Grid container justifyContent="center" direction="column" pt={1}>
        <Grid container justifyContent="center">
          <Grid item>
            <Typography variant="h6">Education</Typography>
          </Grid>
        </Grid>

        {/* Education Table */}
        <Grid container justifyContent="center">
          <Grid item>{educationTable}</Grid>
        </Grid>
      </Grid>
      {/* Third Row */}
      <Grid container spacing={3}>
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
            <List>
              {awardList.map((award, index) => (
                <ListItem key={index}>
                  <ListItemText primary={award.name} secondary={`${award.year} - ${award.shortDescription}`} />
                </ListItem>
              ))}
            </List>
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
        </Grid>
      </Grid>
    </Grid>
  );
};

export default forwardRef(InternshipResumePreview);
