import express from "express";
import { registerUser, loginUser, getCurrentUser } from "../controllers/authController.js";
import { auth } from "../middlewares/auth.js";

const authRouter = express.Router();

// Register a new user
authRouter.post("/register", registerUser);

// Login a user
authRouter.post("/login", loginUser);

// Get current user
authRouter.get("/current", auth, getCurrentUser); //protected route

export default authRouter;
