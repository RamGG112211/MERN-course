import Doctor from "../../models/doctors/index.js"; // Doctor model
import DoctorHospital from "../../models/doctorHospitals/index.js"; // DoctorHospital model
import Hospital from "../../models/hospitals/index.js"; // Hospital model
import User from "../../models/users/index.js";
import bcrypt from "bcryptjs";

export const createDoctor = async (req, res) => {
  const {
    fullName,
    email,
    password,
    specialization,
    qualification,
    experienceYears,
    clinicAddress,
    hospitalIds,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role: "Doctor",
    });
    const savedUser = await newUser.save();

    // Create doctor with profile image
    const newDoctor = new Doctor({
      user_id: savedUser._id,
      specialization,
      qualification,
      experienceYears,
      clinicAddress,
      profileImage: req.file ? `/uploads/${req.file.filename}` : "", // Save image path
    });
    const savedDoctor = await newDoctor.save();

    // Handle hospital associations
    if (hospitalIds && hospitalIds.length > 0) {
      const doctorHospitalAssociations = hospitalIds.map((hospitalId) => ({
        doctor_id: savedDoctor._id,
        hospital_id: hospitalId,
      }));

      await DoctorHospital.insertMany(doctorHospitalAssociations);
    }

    res.status(201).json({
      message: "Doctor created and associated with hospitals",
      doctor: savedDoctor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDoctor = async (req, res) => {
  const { id } = req.params;
  const {
    specialization,
    qualification,
    experienceYears,
    clinicAddress,
    hospitalIds,
  } = req.body;

  try {
    // Fetch the existing doctor
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Update doctor details
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      {
        specialization,
        qualification,
        experienceYears,
        clinicAddress,
        profileImage: req.file
          ? `/uploads/${req.file.filename}`
          : doctor.profileImage, // Update image if uploaded, otherwise retain old one
      },
      { new: true }
    );

    // Update hospital associations
    if (hospitalIds && hospitalIds.length > 0) {
      // Remove old associations
      await DoctorHospital.deleteMany({ doctor_id: id });

      // Add new associations
      const doctorHospitalAssociations = hospitalIds.map((hospitalId) => ({
        doctor_id: id,
        hospital_id: hospitalId,
      }));
      await DoctorHospital.insertMany(doctorHospitalAssociations);
    }

    res.status(200).json({
      message: "Doctor updated and hospital associations updated",
      doctor: updatedDoctor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a doctor and associated DoctorHospital relationships
export const deleteDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(id);

    if (!deletedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Remove all associations with hospitals
    await DoctorHospital.deleteMany({ doctor_id: id });

    res
      .status(200)
      .json({ message: "Doctor and associated hospital relations deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a doctor and their associated hospitals
export const getDoctorWithHospitals = async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Get associated hospitals
    const hospitals = await DoctorHospital.find({ doctor_id: id }).populate(
      "hospital_id"
    );

    res.status(200).json({ doctor, hospitals });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all doctors
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
