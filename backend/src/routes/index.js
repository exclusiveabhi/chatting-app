import express from "express";
import resumeRouter from "./resumeRoutes.js";
import jobRouter from "./jobRoutes.js";
import authRouter from "./authRoutes.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/resumes", isAuthenticated, resumeRouter);
router.use("/jobs", isAuthenticated, jobRouter);

export default router;
