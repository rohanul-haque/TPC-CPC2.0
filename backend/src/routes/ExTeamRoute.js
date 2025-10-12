import express from "express";
import {
  addExTeamMember,
  deleteExTeamMember,
  exTeamMemberList,
} from "../controllers/ExTeamController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import ImageUploader from "../utils/ImageUploader.js";

const router = express.Router();

router.post(
  "/ex-add",
  AuthMiddleware,
  ImageUploader.single("memberProfile"),
  addExTeamMember
);

router.get("/list", exTeamMemberList);

router.delete("/:id", AuthMiddleware, deleteExTeamMember);

export default router;
