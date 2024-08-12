// src/components/JobOpeningPage.js
import { useDispatch, useSelector } from "react-redux";
import { addJob, fetchJobById, updateLocalJob, deleteJob, updateJob } from "../reducers/jobSlice";
import { fetchAllResumes } from "../reducers/resumeBuilderSlice";
import React, { useEffect } from "react";
import { Container, Box, TextField, Button, MenuItem, Select, FormControl, InputLabel, Paper } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const JobOpeningPage = () => {
  const { id: jobId } = useParams();
  const isCreateMode = jobId === "new";
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      // If the job is being created, dispatch the addJob action
      // Otherwise, dispatch the updateJob action
      if (isCreateMode) {
        await dispatch(addJob(job)); // Implement addJob logic in your jobSlice
      } else {
        await dispatch(updateJob(job));
      }
      navigate("/home/job");
      // If the dispatch is successful, navigate to the "/home" route
    } catch (error) {
      // If the dispatch fails, handle the error appropriately
      console.error("Failed to save job:", error);
    }
  };
  let job = useSelector((state) => state.jobs.selectedJob);

  const resumesCreatedByUser = useSelector((state) => state.resumeBuilder.resumes);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch jobs when the component mounts using the jobId from the URL
    const fetchData = async () => {
      await dispatch(fetchJobById(jobId));
      await dispatch(fetchAllResumes());
    };
    fetchData();
  }, [jobId, dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(
      updateLocalJob({
        ...job,
        [name]: value,
      })
    );
  };
  const updateSelectedResume = async (event) => {
    dispatch(
      updateLocalJob({
        ...job,
        resume: {
          ...job.resume,
          id: event.target.value,
        },
      })
    );
  };
  const handleDelete = async () => {
    // Implement your delete logic here
    await dispatch(deleteJob(job._id));
    navigate("/home/job");
  };

  const isLinkValid = () => {
    // Implement your URL validation logic here
    // Example: Simple check for "https://" prefix
    return job.jobLink.startsWith("https://");
  };

  // possibly the case when invalid job id is provided in the url
  if (!job._id && !isCreateMode) return null;

  return (
    <Container maxWidth="lg" component={Paper}>
      <Box p={2}>
        {/* ... (previous form fields) */}
        <TextField
          fullWidth
          label="Organisation"
          name="organisation"
          value={job.organisation}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Designation"
          name="designation"
          value={job.designation}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Job Link"
          name="jobLink"
          value={job.jobLink}
          onChange={handleChange}
          error={!isLinkValid()}
          helperText={!isLinkValid() && "Invalid URL"}
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <Select labelId="status-label" id="status" name="status" value={job.status} onChange={handleChange}>
            <MenuItem value="APPLIED">APPLIED</MenuItem>
            <MenuItem value="PENDING">PENDING</MenuItem>
          </Select>
        </FormControl>

        {job.status === "APPLIED" && (
          <FormControl fullWidth margin="normal">
            <InputLabel id="referral-label">Referral Status</InputLabel>
            <Select
              labelId="referral-label"
              id="referralStatus"
              name="referralStatus"
              value={job.referralStatus}
              onChange={handleChange}
            >
              <MenuItem key={1} value="NOT_TAKEN">
                Not Taken
              </MenuItem>
              <MenuItem key={2} value="TAKEN">
                Taken
              </MenuItem>
            </Select>
          </FormControl>
        )}

        {job.status === "APPLIED" && job.referralStatus === "TAKEN" && (
          <TextField
            fullWidth
            label="Referral Name"
            name="referralName"
            value={job.referralName}
            onChange={handleChange}
            margin="normal"
          />
        )}

        <TextField
          multiline
          minRows={3}
          maxRows={10}
          placeholder="Description"
          style={{
            width: "100%",
            marginTop: "16px",
            border: "0px",
          }}
          name="description"
          value={job.description}
          onChange={handleChange}
        />
        {/* Other form fields */}
        {resumesCreatedByUser.length === 0 ? (
          <p>You don't have any resumes, create your first resume for this role!</p>
        ) : (
          <FormControl fullWidth margin="normal">
            <InputLabel>Resume</InputLabel>
            <Select
              labelId="resume-label"
              label="Resume"
              id="resume"
              name="resume"
              value={job.resume.id}
              onChange={updateSelectedResume}
            >
              {resumesCreatedByUser.map((resume) => (
                <MenuItem key={resume._id} value={resume._id}>
                  {resume.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <Box mt={4}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          {!isCreateMode ? (
            <Button variant="contained" color="inherit" onClick={handleDelete} style={{ marginLeft: "8px" }}>
              Delete
            </Button>
          ) : null}
        </Box>
      </Box>
    </Container>
  );
};

export default JobOpeningPage;
