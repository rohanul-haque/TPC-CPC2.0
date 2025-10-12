import express from "express";
import {
  AddEvent,
  DeleteEvent,
  EventList,
  UpdateEvent,
} from "../controllers/EventController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import ImageUploader from "../utils/ImageUploader.js";

const router = express.Router();

router.post(
  "/add",
  AuthMiddleware,
  ImageUploader.single("eventImage"),
  AddEvent
);
router.get("/list", EventList);
router.put(
  "/update",
  AuthMiddleware,
  ImageUploader.single("eventImage"),
  UpdateEvent
);
router.delete("/:id", AuthMiddleware, DeleteEvent);

export default router;
