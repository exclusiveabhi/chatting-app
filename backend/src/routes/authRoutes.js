import express from "express";
import login from "../controllers/authController.js";
import register from "../controllers/authController.js"

const router = express.Router();

/**
 * @route   POST /auth/login
 * @desc    Login a user
 * @access  Public
 */
router.post("/login", login);

/**
 * @route   POST /auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/register", register);

export default router;
