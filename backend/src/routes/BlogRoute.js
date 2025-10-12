import express from "express";
import {
  postBlog,
  blogDelete,
  blogList,
  blogFindById,
} from "../controllers/BlogController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import ImageUploader from "../utils/ImageUploader.js";
const router = express.Router();

router.post("/post", AuthMiddleware, ImageUploader.single("image"), postBlog);
router.get("/list", blogList);
router.get("/:id", blogFindById);
router.delete("/:id", AuthMiddleware, blogDelete);

export default router;
