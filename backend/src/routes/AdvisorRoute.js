import express from "express";
import {
  createAdvisor,
  deleteAdvisor,
  getAllAdvisor,
} from "../controllers/AdvisorController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import ImageUploader from "../utils/ImageUploader.js";

const router = express.Router();

router.post(
  "/add",
  AuthMiddleware,
  ImageUploader.single("advisorProfile"),
  createAdvisor
);
router.get("/list", getAllAdvisor);
router.delete("/delete", AuthMiddleware, deleteAdvisor);

export default router;
