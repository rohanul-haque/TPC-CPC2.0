import { v2 as cloudinary } from "cloudinary";

import Team from "../models/Team.js";

export const createTeam = async (req, res) => {
  const { name, role } = req.body;
  const memberProfile = req.file;

  if (!name || !role || !memberProfile) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(memberProfile.path);

    // Save new team member
    const newTeam = new Team({
      name,
      role,
      memberProfile: uploadResult.secure_url,
    });

    await newTeam.save();

    res.status(201).json({
      success: true,
      message: "Team member added successfully",
      data: newTeam,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Team member added failed",
    });
  }
};

export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();

    res.status(200).json({
      success: true,
      message: "Team data fetched successfully",
      teamList: teams,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Team data fetch failed",
    });
  }
};

export const deleteTeamMember = async (req, res) => {
  const { id } = req.body;

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
