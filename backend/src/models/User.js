import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  shift: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profileImage: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    default: null,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
