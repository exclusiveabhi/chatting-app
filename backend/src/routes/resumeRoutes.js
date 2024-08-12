// routes/resumeRoutes.js
import express from "express";
import {
  createResume,
  getResumeById,
  updateResumeById,
  getAllResumes,
  deleteResumeById,
  updateResumeWithGPT,
} from "../controllers/resumeController.js";

import { isResumeOwner, resumeIdExists } from "../middlewares/resumeMiddleware.js";

const router = express.Router();

router.post("/", createResume);
router.get("/", getAllResumes);
router.post("/improve", updateResumeWithGPT);
router.get("/:id", resumeIdExists, isResumeOwner, getResumeById);
router.patch("/:id", resumeIdExists, isResumeOwner, updateResumeById);
router.delete("/:id", resumeIdExists, isResumeOwner, deleteResumeById);

export default router;
