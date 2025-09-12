import express from "express";
import {
  blogDelete,
  blogFindById,
  blogList,
  createBlog,
} from "../controllers/BlogController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import ImageUploader from "../utils/ImageUploader.js";

const router = express.Router();

router.post("/post", AuthMiddleware, ImageUploader.single("image"), createBlog);
router.get("/list", blogList);
router.post("/find", blogFindById);
router.delete("/delete", AuthMiddleware, blogDelete);

export default router;
