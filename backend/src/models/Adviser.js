import mongoose from "mongoose";

const advisorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  advisorProfile: {
    type: String,
    required: true,
  },
});

const Advisor =
  mongoose.models.Advisor || mongoose.model("Advisor", advisorSchema);

export default Advisor;
