import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hospitalName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    departments: {
      type: String,
    },
    contactInfo: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Hospital", hospitalSchema);
