// models/JobModel.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const jobSchema = new mongoose.Schema({
  organisation: String,
  designation: String,
  lastModified: Date,
  lastDate: Date,
  jobLink: String,
  status: String,
  description: String,
  referralStatus: String,
  referralName: String,
  resume: {
    type: Schema.Types.ObjectId,
    ref: "Resume",
  },
});

const Job = mongoose.model("Job", jobSchema);

// Override the toJSON method to customize serialization
jobSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.resume = ret.resume ? { id: ret.resume._id, name: ret.resume.name } : { id: null, name: null };
    return ret;
  },
});

export default Job;
