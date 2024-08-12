/**
 * Job middleware
 */
import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";

export const jobIdExists = async (req, res, next) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    return res.status(404).json({ error: "Job application not found" });
  }
  req.job = job;
  next();
};

export const isJobOwner = async (req, res, next) => {
  // Assuming req.user._id contains the current user's ID
  const userId = req.user._id;

  // Retrieve the current user
  const currentUser = await User.findById(userId);

  if (!currentUser) {
    return res.status(404).json({ message: "User not found" });
  }

  // Extract job ID from req.params
  const requestedJobId = req.params.id;

  // Check if the requested ID is in the user's jobIds
  if (currentUser.jobIds.includes(requestedJobId)) {
    // ID is present, allow the request to proceed
    next();
  } else {
    // ID is not present, send a 403 Forbidden response
    res.status(403).json({ message: "Permission denied. You do not have access to this resource." });
  }
};
