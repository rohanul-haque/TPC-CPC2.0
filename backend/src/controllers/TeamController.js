import { v2 as cloudinary } from "cloudinary";

import Team from "../models/Team.js";

export const addTeamMember = async (req, res) => {
  const { name, position } = req.body;
  const memberProfile = req.file;

  if (!name || !position || !memberProfile) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const uploadResult = await cloudinary.uploader.upload(memberProfile.path);

    const newTeamMember = new Team({
      name,
      position,
      memberProfile: uploadResult.secure_url,
    });

    await newTeamMember.save();

    return res.status(201).json({
      success: true,
      message: "Team member added successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add team member. Please try again later.",
    });
  }
};

export const teamMemberList = async (req, res) => {
  try {
    const teams = await Team.find();

    return res.status(200).json({
      success: true,
      teams,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Team list not found",
    });
  }
};

export const deleteTeamMember = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, message: "ID is required" });
  }

  try {
    const teamMember = await Team.findById(id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    await Team.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Team member deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete team member",
    });
  }
};
