import mongoose from "mongoose";

const doctorHospitalSchema = new mongoose.Schema(
  {
    doctor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    hospital_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("DoctorHospital", doctorHospitalSchema);
