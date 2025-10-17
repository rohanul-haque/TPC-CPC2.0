import express from "express";
import { getAllHomePageData } from "../controllers/HomePageController.js";

const router = express.Router();

router.get("/data", getAllHomePageData);

export default router;
