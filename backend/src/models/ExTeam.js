import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  memberProfile: {
    type: String,
    required: true,
  },
});

const ExTeam = mongoose.models.ExTeam || mongoose.model("ExTeam", teamSchema);

export default ExTeam;
