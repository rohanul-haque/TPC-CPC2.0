import express from "express";
import {
  changePassword,
  getAdminProfile,
  loginAdmin,
  registerAdmin,
  sendVerificationOtpEmail,
  updateAdmin,
} from "../controllers/AdminController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import ImageUploader from "../utils/ImageUploader.js";

const router = express.Router();

router.post("/register", ImageUploader.single("adminProfile"), registerAdmin);
router.post("/login", loginAdmin);
router.get("/data", AuthMiddleware, getAdminProfile);
router.get(
  "/update",
  AuthMiddleware,
  ImageUploader.single("adminProfile"),
  updateAdmin
);
router.post("/send-otp", sendVerificationOtpEmail);
router.post("/change-password", changePassword);

export default router;
