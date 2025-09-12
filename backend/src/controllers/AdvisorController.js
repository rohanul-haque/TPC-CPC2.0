import { v2 as cloudinary } from "cloudinary";
import Advisor from "../models/Adviser.js";

export const createAdvisor = async (req, res) => {
  const { name, role } = req.body;
  const advisorProfile = req.file;

  if (!name || !role || !advisorProfile) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const uploadResult = await cloudinary.uploader.upload(advisorProfile.path, {
      folder: "advisors",
    });

    const newAdvisor = new Advisor({
      name,
      role,
      advisorProfile: uploadResult.secure_url,
    });

    await newAdvisor.save();

    res.status(201).json({
      success: true,
      message: "Advisor added successfully",
      data: newAdvisor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add advisor",
    });
  }
};

// Get All Advisors
export const getAllAdvisor = async (req, res) => {
  try {
    const advisors = await Advisor.find();

    res.status(200).json({
      success: true,
      message: "Advisor data fetched successfully",
      advisorList: advisors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Advisor data fetch failed",
    });
  }
};

export const deleteAdvisor = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ success: false, message: "ID is required" });
  }

  try {
    const advisorMember = await Advisor.findById(id);

    if (!advisorMember) {
      return res.status(404).json({
        success: false,
        message: "Advisor not found",
      });
    }

    await Advisor.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Advisor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete advisor",
    });
  }
};
