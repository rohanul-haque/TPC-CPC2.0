import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

import Admin from "../models/Admin.js";
import generateToken from "../utils/GenerateToken.js";
import transporter from "../utils/NodeMailer.js";

export const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const adminProfile = req.file;

  if (!name || !email || !password || !adminProfile) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res
        .status(400)
        .json({ success: false, message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const uploadResult = await cloudinary.uploader.upload(adminProfile.path);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      adminProfile: uploadResult.secure_url,
    });

    await newAdmin.save();

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      token: generateToken(newAdmin._id),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Registration failed" });
  }
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const existingAdmin = await Admin.findOne({ email });

    if (!existingAdmin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, existingAdmin.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: generateToken(existingAdmin._id),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Login failed" });
  }
};

export const getAdminProfile = async (req, res) => {
  const userId = req.id;

  try {
    const admin = await Admin.findById(userId).select("-password");

    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    return res.json({ success: true, adminData: admin });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch profile" });
  }
};

export const updateAdmin = async (req, res) => {
  const userId = req.id;
  const { name, email, password } = req.body;
  const adminProfile = req.file;

  try {
    let updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;

    if (password && password.trim() !== "") {
      updateData.password = await bcrypt.hash(password, 10);
    }

    if (adminProfile) {
      const uploadResult = await cloudinary.uploader.upload(adminProfile.path);
      updateData.adminProfile = uploadResult.secure_url;
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedAdmin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    return res.json({
      success: true,
      message: "Update successful",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Update failed" });
  }
};

export const sendVerificationOtpEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    const otp = String(Math.floor(1000 + Math.random() * 9000));

    admin.otp = otp;
    await admin.save();

    const mailOptions = {
      from: "tpicpc@gmail.com",
      to: email,
      subject: "🔐 Password Reset OTP - Admin Panel",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f3f4f6; color: #333;">
          <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 12px; padding: 30px; box-shadow: 0 6px 18px rgba(0,0,0,0.1);">
            
            <h2 style="color: #1f2937; text-align: center; font-weight: 600; margin-bottom: 15px;">
              Hello ${admin.name || "Admin"},
            </h2>
            
            <p style="font-size: 16px; text-align: center; margin-bottom: 20px; color: #374151;">
              We received a request to <strong>reset your password</strong>. Please use the following OTP code to continue:
            </p>

            <div style="background: #6366f1; color: #fff; text-align: center; font-size: 30px; font-weight: 700; letter-spacing: 8px; padding: 18px 0; border-radius: 10px; margin: 25px auto; max-width: 260px; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">
              ${otp}
            </div>

            <p style="font-size: 14px; text-align: center; color: #6b7280; margin-top: 20px;">
              ⚠️ If you did not request a password reset, please ignore this email. <br/>
              Do not share this OTP with anyone for security reasons.
            </p>

            <br/>

            <p style="text-align: center; font-size: 14px; color: #9ca3af;">
              Best regards, <br/>
              <strong style="color:#1f2937;">Admin Panel Support Team</strong>
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ success: false, message: "OTP sending failed" });
  }
};

export const checkValidOtp = async (req, res) => {
  const { otp, email } = req.body;

  if (!otp || !email) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    if (admin.otp !== Number(otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    return res.status(200).json({ success: true, message: "OTP is valid" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to check OTP" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    if (admin.otp !== Number(otp)) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    admin.password = hashedPassword;
    admin.otp = null;
    await admin.save();

    return res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Password change failed" });
  }
};
