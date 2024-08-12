import mongoose from "mongoose";
import { initialResumeThumbnailURL } from "../constants/resume.js";

const educationSchema = new mongoose.Schema({
  institute: String,
  degree: String,
  startDate: String,
  endDate: String,
  grade: String,
});

const projectSchema = new mongoose.Schema({
  name: String,
  startDate: String,
  endDate: String,
  description: String,
  link: String,
});

const awardSchema = new mongoose.Schema({
  name: String,
  year: String,
  shortDescription: String,
});

const experienceSchema = new mongoose.Schema({
  organisation: String,
  title: String,
  startDate: String,
  endDate: String,
  description: String,
});

const resumeSchema = new mongoose.Schema({
  id: String,
  name: String,
  template: String,
  thumbnail: {
    type: String,
    default: initialResumeThumbnailURL,
  },
  basicDetails: {
    name: String,
    profilePicture: String,
    currentJobTitle: String,
    email: String,
    website: String,
    phoneNumber: String,
    location: String,
  },
  experienceList: [experienceSchema],
  educationList: [educationSchema],
  languages: [String],
  tools: [String],
  frameworks: [String],
  projectList: [projectSchema],
  awardList: [awardSchema],
  visibility: {
    type: String,
    enum: ["public", "private"],
    default: "private",
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;
