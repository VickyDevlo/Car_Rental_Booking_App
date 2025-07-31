import express from "express";
import {
  changePassword,
  getCars,
  getUserData,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import { authenticateUser, protect } from "../middleware/auth.js";

export const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.put("/change-password", authenticateUser, changePassword);
userRouter.get("/data", protect, getUserData);
userRouter.get("/cars", getCars);
