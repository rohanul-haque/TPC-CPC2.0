import { v2 as cloudinary } from "cloudinary";
import Advisor from "../models/Adviser.js";

export const addAdvisor = async (req, res) => {
  const { name, position } = req.body;
  const advisorProfile = req.file;

  if (!name || !position || !advisorProfile) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const uploadResult = await cloudinary.uploader.upload(advisorProfile.path);

    const newAdvisor = new Advisor({
      name,
      position,
      advisorProfile: uploadResult.secure_url,
    });

    await newAdvisor.save();

    res.status(201).json({
      success: true,
      message: "Advisor added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add advisor",
    });
  }
};

export const advisorList = async (req, res) => {
  try {
    const advisors = await Advisor.find();

    res.status(200).json({
      success: true,
      advisors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Advisor data not found",
    });
  }
};

export const deleteAdvisor = async (req, res) => {
  const { id } = req.params;

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
