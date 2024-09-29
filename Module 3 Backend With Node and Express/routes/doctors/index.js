// routes/doctors/index.js

import express from "express";
import {
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorWithHospitals,
} from "../../controllers/doctors/index.js"; // Adjust the path based on your project structure
import { authMiddleware } from "../../middlewares/auth/index.js";

const router = express.Router();

// Create a new doctor
router.post("/", createDoctor);

// Update a doctor
router.put("/:id", authMiddleware(["Admin", "Doctor"]), updateDoctor);

// Delete a doctor
router.delete("/:id", authMiddleware(["Admin", "Doctor"]), deleteDoctor);

// Get a doctor and their associated hospitals
router.get("/:id/hospitals", getDoctorWithHospitals);

export default router;
