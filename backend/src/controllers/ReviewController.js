import { v2 as cloudinary } from "cloudinary";
import Review from "../models/Review.js";

export const AddReview = async (req, res) => {
  try {
    const { fullName, shift, semester, department, reviewMessage } = req.body;
    const profileImage = req.file;

    if (
      !fullName ||
      !shift ||
      !semester ||
      !reviewMessage ||
      !profileImage ||
      !department
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const profileImageUpload = await cloudinary.uploader.upload(
      profileImage.path
    );

    const review = new Review({
      fullName,
      shift,
      semester,
      reviewMessage,
      department,
      profileImage: profileImageUpload.secure_url,
    });

    await review.save();

    return res.status(201).json({
      success: true,
      message: "Review added successfully",
    });
  } catch (error) {
    console.error("AddReview error:", error);
    return res.status(500).json({
      success: false,
      message: "Review add failed",
    });
  }
};

export const reviewList = async (req, res) => {
  try {
    const reviews = await Review.find({});

    return res.status(200).json({
      success: true,
      message: "Review list fetched successfully",
      reviewList: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Review list fetch failed",
    });
  }
};
