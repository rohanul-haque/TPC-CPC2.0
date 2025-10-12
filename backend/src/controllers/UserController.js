import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

import User from "../models/User.js";
import generateToken from "../utils/GenerateToken.js";
import transporter from "../utils/NodeMailer.js";

export const signupUser = async (req, res) => {
  const {
    fullName,
    email,
    mobileNumber,
    rollNumber,
    department,
    shift,
    password,
  } = req.body;

  const profileImage = req.file;

  if (
    !fullName ||
    !email ||
    !mobileNumber ||
    !rollNumber ||
    !department ||
    !shift ||
    !password ||
    !profileImage
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { rollNumber }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email or Roll number already used",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const uploadResult = await cloudinary.uploader.upload(profileImage.path);

    const newUser = new User({
      fullName,
      email,
      mobileNumber,
      rollNumber,
      department,
      shift,
      password: hashedPassword,
      profileImage: uploadResult.secure_url,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "Registration successful!",
      token: generateToken(newUser._id),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Login failed" });
  }
};

export const userData = async (req, res) => {
  const userId = req.id;

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) return res.json({ success: false, message: "User not found" });

    return res.json({ success: true, user });
  } catch (error) {
    return res.json({ success: false, message: "User data not found" });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.id;
  const {
    fullName,
    email,
    rollNumber,
    department,
    shift,
    password,
    mobileNumber,
  } = req.body;

  const profileImage = req.file;

  try {
    let updateData = {};

    if (fullName) updateData.fullName = fullName;
    if (email) updateData.email = email;
    if (rollNumber) updateData.rollNumber = rollNumber;
    if (department) updateData.department = department;
    if (shift) updateData.shift = shift;
    if (mobileNumber) updateData.mobileNumber = mobileNumber;

    if (password && password.trim() !== "") {
      updateData.password = await bcrypt.hash(password, 10);
    }

    if (profileImage) {
      const uploadResult = await cloudinary.uploader.upload(profileImage.path);

      updateData.profileImage = uploadResult.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Update failed",
    });
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
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const otp = Math.floor(10000 + Math.random() * 90000);

    user.otp = otp;
    await user.save();

    await transporter.sendMail({
      from: "tpicpc@gmail.com",
      to: email,
      subject: "🔐 Password Reset OTP - TPI CPC",
      html: `
  <div style="font-family: 'Outfit', Arial, sans-serif; padding: 20px; background: #f3f4f6; color: #333;">
    <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 12px; padding: 30px; box-shadow: 0 6px 18px rgba(0,0,0,0.1);">
      
      <h2 style="color: #1f2937; text-align: center; font-weight: 600; margin-bottom: 15px;">
        Hello ${user.fullName || "User"},
      </h2>
      
      <p style="font-size: 16px; text-align: center; margin-bottom: 20px; color: #374151;">
        We received a request to <strong>reset your password</strong>. Please use the following OTP code to continue:
      </p>

      <!-- OTP Box -->
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
        <strong style="color:#1f2937;">TPI CPC Support Team</strong>
      </p>
    </div>
  </div>
`,
    });

    return res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "OTP sending failed" });
  }
};

export const verifyResetOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.otp !== Number(otp))
      return res.json({ success: false, message: "Invalid OTP" });

    return res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "OTP verification failed" });
  }
};

export const changePassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.otp !== Number(otp)) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.otp = null;
    await user.save();

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
