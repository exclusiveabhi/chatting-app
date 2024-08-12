// controllers/jobController.js
import Job from "../models/JobModel.js";
import Resume from "../models/ResumeModel.js";
import User from "../models/UserModel.js";

// Create a new job application
export const createJob = async (req, res) => {
  const { resume, ...newJobDetails } = req.body;
  const newJob = await Job.create(newJobDetails);

  // Assuming req.user._id contains the current user's ID
  const userId = req.user._id;

  // Update the current user to add the new job application ID
  await User.findByIdAndUpdate(userId, { $push: { jobIds: newJob._id } }, { new: true });

  res.status(201).json(newJob);
};

// Get all job applications
export const getAllJobs = async (req, res) => {
  // Retrieve jobs based on jobIds
  const jobIds = req.user.jobIds;
  const userJobs = await Job.find({ _id: { $in: jobIds } });
  res.status(200).json(userJobs);
};

// Get a specific job application by ID
export const getJobById = async (req, res) => {
  res.status(200).json(req.job);
};

// Update a job application by ID
export const updateJobById = async (req, res) => {
  let updateJobDetails = { ...req.body };
  const { resume: resumeDetails } = req.body;
  if (resumeDetails) {
    const { id } = resumeDetails;
    if (!req.user.resumeIds.includes(id)) {
      return res.status(403).json({ error: "Unauthorized - Resume does not belong to the current user" });
    }
    const resumeObject = await Resume.findById(id);
    updateJobDetails.resume = resumeObject;
  }
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, updateJobDetails);
  res.status(200).json(updatedJob);
};

// Delete a job application by ID
export const deleteJobById = async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  // Update the current user to remove the deleted job application ID
  await User.findByIdAndUpdate(req.user._id, { $pull: { jobIds: req.params.id } }, { new: true });
  res.status(204).end();
};
