import { v2 as cloudinary } from "cloudinary";
import ExTeam from "../models/ExTeam.js";

export const addExTeamMember = async (req, res) => {
  const { name, position } = req.body;
  const memberProfile = req.file;

  if (!name || !position || !memberProfile) {
    return res.status(400).json({
      success: false,
      message: "All fields are required for ExTeam member",
    });
  }

  try {
    const uploadResult = await cloudinary.uploader.upload(memberProfile.path);

    const newExTeamMember = new ExTeam({
      name,
      position,
      memberProfile: uploadResult.secure_url,
    });

    await newExTeamMember.save();

    return res.status(201).json({
      success: true,
      message: "ExTeam member added successfully!",
    });
  } catch (error) {
    console.error("❌ Add ExTeam Member Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to add ExTeam member. Please try again later.",
    });
  }
};

export const exTeamMemberList = async (req, res) => {
  try {
    const members = await ExTeam.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      members,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch ExTeam members. Please try again later.",
    });
  }
};

export const deleteExTeamMember = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "ExTeam member ID is required" });
  }

  try {
    const member = await ExTeam.findById(id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "ExTeam member not found",
      });
    }

    await ExTeam.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "ExTeam member deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete ExTeam member. Please try again later.",
    });
  }
};
