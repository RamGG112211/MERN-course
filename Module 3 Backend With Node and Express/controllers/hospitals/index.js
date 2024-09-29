import Hospital from "../../models/hospitals/index.js"; // Hospital model
import DoctorHospital from "../../models/doctorHospitals/index.js"; // DoctorHospital model
import Doctor from "../../models/doctors/index.js"; // Doctor model

// Create a new Hospital and associate with doctors
export const createHospital = async (req, res) => {
  const {
    user_id,
    hospitalName,
    location,
    departments,
    contactInfo,
    doctorIds,
  } = req.body;

  try {
    // Create hospital
    const newHospital = new Hospital({
      user_id,
      hospitalName,
      location,
      departments,
      contactInfo,
    });
    const savedHospital = await newHospital.save();

    // Handle doctor associations
    if (doctorIds && doctorIds.length > 0) {
      const hospitalDoctorAssociations = doctorIds.map((doctorId) => ({
        doctor_id: doctorId,
        hospital_id: savedHospital._id,
      }));

      await DoctorHospital.insertMany(hospitalDoctorAssociations);
    }

    res
      .status(201)
      .json({
        message: "Hospital created and associated with doctors",
        hospital: savedHospital,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a hospital and their doctor associations
export const updateHospital = async (req, res) => {
  const { id } = req.params;
  const { hospitalName, location, departments, contactInfo, doctorIds } =
    req.body;

  try {
    // Update hospital details
    const updatedHospital = await Hospital.findByIdAndUpdate(
      id,
      { hospitalName, location, departments, contactInfo },
      { new: true }
    );

    if (!updatedHospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    // Update doctor associations
    if (doctorIds && doctorIds.length > 0) {
      // Remove old associations
      await DoctorHospital.deleteMany({ hospital_id: id });

      // Add new associations
      const hospitalDoctorAssociations = doctorIds.map((doctorId) => ({
        doctor_id: doctorId,
        hospital_id: id,
      }));
      await DoctorHospital.insertMany(hospitalDoctorAssociations);
    }

    res
      .status(200)
      .json({
        message: "Hospital updated and doctor associations updated",
        hospital: updatedHospital,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a hospital and associated DoctorHospital relationships
export const deleteHospital = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedHospital = await Hospital.findByIdAndDelete(id);

    if (!deletedHospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    // Remove all associations with doctors
    await DoctorHospital.deleteMany({ hospital_id: id });

    res
      .status(200)
      .json({ message: "Hospital and associated doctor relations deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a hospital and their associated doctors
export const getHospitalWithDoctors = async (req, res) => {
  const { id } = req.params;

  try {
    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    // Get associated doctors
    const doctors = await DoctorHospital.find({ hospital_id: id }).populate(
      "doctor_id"
    );

    res.status(200).json({ hospital, doctors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
