import express from "express";
import { AddReview, reviewList } from "../controllers/ReviewController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import ImageUploader from "../utils/ImageUploader.js";

const router = express.Router();

router.post(
  "/add",
  AuthMiddleware,
  ImageUploader.single("profileImage"),
  AddReview
);

router.get("/list", reviewList);

export default router;
