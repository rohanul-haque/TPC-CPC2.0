import express from "express";
import {
  changePassword,
  loginUser,
  sendVerificationOtpEmail,
  signupUser,
  updateUser,
  userData,
  verifyResetOtp,
} from "../controllers/UserController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import ImageUploader from "../utils/ImageUploader.js";

const router = express.Router();

router.post("/signup", ImageUploader.single("profileImage"), signupUser);
router.post("/login", loginUser);
router.get("/data", AuthMiddleware, userData);
router.put(
  "/update",
  ImageUploader.single("profileImage"),
  AuthMiddleware,
  updateUser
);
router.post("/send-reset-otp", sendVerificationOtpEmail);
router.post("/verify-reset-otp", verifyResetOtp);
router.put("/change-password", changePassword);

export default router;
