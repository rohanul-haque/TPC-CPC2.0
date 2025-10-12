import express from "express";
import {
  changePassword,
  getAdminProfile,
  loginAdmin,
  sendVerificationOtpEmail,
  signupAdmin,
  updateAdmin,
  verifyAdminOtp,
} from "../controllers/AdminController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import ImageUploader from "../utils/ImageUploader.js";

const router = express.Router();

router.post("/signup", ImageUploader.single("adminProfile"), signupAdmin);
router.post("/login", loginAdmin);
router.get("/data", AuthMiddleware, getAdminProfile);
router.put(
  "/update",
  AuthMiddleware,
  ImageUploader.single("adminProfile"),
  updateAdmin
);
router.post("/send-reset-otp", sendVerificationOtpEmail);
router.post("/verify-reset-otp", verifyAdminOtp);
router.put("/change-password", changePassword);
export default router;
