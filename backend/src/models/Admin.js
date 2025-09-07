import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  adminProfile: {
    type: String,
    required: true,
  },
  otp: { type: Number, default: null },
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

export default Admin;
