// controllers/resumeController.js
import Resume from "../models/ResumeModel.js";
import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";
import { improveResumeWithGPT as improveResumeWithGPT } from "../services/improveWithAI.js";
import { deleteResumeThumbail, getResumeThumbnail } from "../utils/cloudinary.js";

// Create a new resume
export const createResume = async (req, res) => {
  if (!req.body.imgData && !req.body.thumbnail) {
    return res.status(400).json({ error: "Either 'imgData' or 'thumbnail' must be provided." });
  }
  let thumbnail;
  if (req.body.imgData) {
    thumbnail = await getResumeThumbnail(req.body.imgData);
  } else {
    // we want to create thumbnail copy so that if original is deleted we have this one
    thumbnail = await getResumeThumbnail(req.body.thumbnail);
  }
  const newResume = await Resume.create({ ...req.body, thumbnail });
  // Update the current user with the new resume
  await User.findOneAndUpdate({ _id: req.user._id }, { $push: { resumeIds: newResume._id } }, { new: true });
  res.status(201).json(newResume);
};

// Get a specific resume by ID
export const getResumeById = async (req, res) => {
  res.status(200).json(req.userResume);
};

// Get all resumes
export const getAllResumes = async (req, res) => {
  const resumeIds = req.user.resumeIds;
  const userResumes = await Resume.find({ _id: { $in: resumeIds } });
  res.status(200).json(userResumes);
};

// Update a resume by ID
export const updateResumeById = async (req, res) => {
  const oldResume = req.userResume;
  const oldThumbnail = oldResume?.thumbnail;
  await deleteResumeThumbail(oldThumbnail);
  const thumbnail = await getResumeThumbnail(req.body.imgData);
  const updatedResume = await Resume.findByIdAndUpdate(req.params.id, {
    ...req.body,
    thumbnail,
    lastModified: Date.now(),
  });
  res.status(200).json(updatedResume);
};

// Delete a resume by ID
export const deleteResumeById = async (req, res) => {
  // Find and delete the resume

  const oldResume = req.userResume;
  const oldThumbnail = oldResume?.thumbnail;
  await deleteResumeThumbail(oldThumbnail);
  await Resume.findByIdAndDelete(req.params.id);

  await User.findByIdAndUpdate(req.user._id, { $pull: { resumeIds: req.params.id } }, { new: true });
  await Job.updateMany({ resume: req.params.id }, { $set: { resume: null } });
  res.status(204).end();
};

// Improve a resume by ID with GPT
export const updateResumeWithGPT = async (req, res) => {
  try {
    const improvedResumeJSON = await improveResumeWithGPT(req.body);
    // We wont update the resume here, because that is upto the user
    res.status(200).json(improvedResumeJSON);
  } catch (err) {
    res.status(400).json({ error: "try again after sometime", errorCode: "RATE_LIMIT_REACHED" });
  }
};
