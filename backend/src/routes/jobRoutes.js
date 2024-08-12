// routes/jobRoutes.js
import express from "express";
import { createJob, getAllJobs, getJobById, updateJobById, deleteJobById } from "../controllers/jobControllers.js";
import { isJobOwner, jobIdExists } from "../middlewares/jobMiddleware.js";

const router = express.Router();

router.post("/", createJob);
router.get("/", getAllJobs);
router.get("/:id", jobIdExists, isJobOwner, getJobById);
router.patch("/:id", jobIdExists, isJobOwner, updateJobById);
router.delete("/:id", jobIdExists, isJobOwner, deleteJobById);

export default router;
