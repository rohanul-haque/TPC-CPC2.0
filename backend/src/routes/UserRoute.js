import express from "express";
import {
    changePassword,
    loginUser,
    registerUser,
    sendVerificationOtpEmail,
    updateUser,
    userData,
} from "../controllers/UserController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import ImageUploader from "../utils/ImageUploader.js";

const router = express.Router();

router.post("/register", ImageUploader.single("profileImage"), registerUser);
router.post("/login", loginUser);
router.get("/data", AuthMiddleware, userData);
router.put("/update", ImageUploader.single("profileImage") ,AuthMiddleware, updateUser);
router.post("/reset-otp", sendVerificationOtpEmail);
router.put("/change-password", changePassword);

export default router;
