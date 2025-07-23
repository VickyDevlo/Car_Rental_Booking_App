import express from "express";
import { protect } from "../middleware/auth.js";
import {
  addCars,
  changeRoleToOWner,
  deleteCar,
  getDashboardData,
  getOwnerCars,
  toggleCarAvailability,
  updateUserImage,
} from "../controllers/ownerController.js";
import { upload } from "../middleware/multer.js";

export const ownerRouter = express.Router();

ownerRouter.post("/change-role", protect, changeRoleToOWner);
ownerRouter.post("/add-car", upload.single("image"), protect, addCars);
ownerRouter.post("/toggle-car", protect, toggleCarAvailability);
ownerRouter.post(
  "/update-image",
  upload.single("image"),
  protect,
  updateUserImage
);

ownerRouter.get("/dashboard", protect, getDashboardData);
ownerRouter.get("/cars", protect, getOwnerCars);

ownerRouter.post("/delete-car", protect, deleteCar);
