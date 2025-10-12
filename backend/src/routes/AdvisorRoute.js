import express from "express";
import {
  addAdvisor,
  advisorList,
  deleteAdvisor
} from "../controllers/AdvisorController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import ImageUploader from "../utils/ImageUploader.js";

const router = express.Router();

router.post(
  "/add",
  AuthMiddleware,
  ImageUploader.single("advisorProfile"),
  addAdvisor
);
router.get("/list", advisorList);
router.delete("/:id", AuthMiddleware, deleteAdvisor);

export default router;
