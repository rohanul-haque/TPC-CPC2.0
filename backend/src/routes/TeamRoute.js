import express from "express";
import {
  createTeam,
  deleteTeamMember,
  getAllTeams,
} from "../controllers/TeamController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import ImageUploader from "../utils/ImageUploader.js";

const router = express.Router();

router.post(
  "/add",
  ImageUploader.single("memberProfile"),
  AuthMiddleware,
  createTeam
);
router.get("/list", getAllTeams);
router.delete("/delete", AuthMiddleware, deleteTeamMember);

export default router;
