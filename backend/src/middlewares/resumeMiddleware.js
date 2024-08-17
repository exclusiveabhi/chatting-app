/**
 * Resume middleware
 */
import User from "../models/UserModel.js";
import Resume from "../models/ResumeModel.js";

export const resumeIdExists = async (req, res, next) => {
  const resume = await Resume.findById(req.params.id);
  if (!resume) {
    return res.status(404).json({ error: "Resume not found" });
  }
  req.userResume = resume;
  next();
};

export const isResumeOwner = async (req, res, next) => {
  // Assuming req.user._id contains the current user's ID
  const userId = req.user._id;

  // Retrieve the current user
  const currentUser = await User.findById(userId);

  if (!currentUser) {
    return res.status(404).json({ message: "User not found" });
  }

  // Extract resume ID from req.params
  const requestedResumeId = req.params.id;

  // Check if the requested ID is in the user's resumeIds
  if (currentUser.resumeIds.includes(requestedResumeId)) {
    // ID is present, allow the request to proceed
    next();
  } else {
    // ID is not present, send a 403 Forbidden response
    res.status(403).json({ message: "Permission denied. You do not have access to this resource." });
  }
};
