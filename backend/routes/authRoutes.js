//This file sets up API endpoints:
// Routes call controller functions that you defined in your authController.js.
import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

//express → The web framework used to define routes and handle HTTP requests.
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
