// jobSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initialJobOpening } from "../constants/jobs";
import api from "../api";

// Async Thunks
export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const response = await api.get("/jobs");
  return response.data;
});

export const fetchJobById = createAsyncThunk("jobs/fetchJobById", async (id) => {
  if (id === "new") return { ...initialJobOpening };
  const response = await api.get(`/jobs/${id}`);
  return response.data;
});

export const updateLocalJob = createAsyncThunk("jobs/updateLocalJob", (job) => {
  return job;
});

export const updateJob = createAsyncThunk("jobs/updateJob", async (job) => {
  const response = await api.patch(`/jobs/${job._id}`, job);
  return response.data;
});

export const deleteJob = createAsyncThunk("jobs/deleteJob", async (id) => {
  await api.delete(`/jobs/${id}`);
  return id;
});

export const addJob = createAsyncThunk("jobs/addJob", async (job) => {
  const response = await api.post("/jobs", job);
  return response.data;
});

// Slice
const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    selectedJob: initialJobOpening,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.loading = false;
      })
      .addCase(fetchJobs.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.selectedJob = action.payload;
      })
      .addCase(updateLocalJob.fulfilled, (state, action) => {
        state.selectedJob = action.payload;
        // Update the job in the local state without making a request
        const updatedJob = action.payload;
        const index = state.jobs.findIndex((job) => job._id === updatedJob._id);
        if (index !== -1) {
          state.jobs[index] = updatedJob;
        }
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.selectedJob = action.payload;
        // Update the job in the local state after making a patch request
        const updatedJob = action.payload;
        const index = state.jobs.findIndex((job) => job._id === updatedJob._id);
        if (index !== -1) {
          state.jobs[index] = updatedJob;
        }
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        // Remove the job from the local state after making a delete request
        const deletedJobId = action.payload;
        state.jobs = state.jobs.filter((job) => job._id !== deletedJobId);
      })
      .addCase(addJob.fulfilled, (state, action) => {
        // Add the new job to the local state after making a post request
        state.jobs.push(action.payload);
      });
  },
});

export const { updateSelectedJob } = jobSlice.actions;
export default jobSlice.reducer;
