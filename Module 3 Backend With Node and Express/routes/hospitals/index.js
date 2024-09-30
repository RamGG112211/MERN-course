// routes/hospitals/index.js

import express from "express";
import {
  createHospital,
  updateHospital,
  deleteHospital,
  getHospitalWithDoctors,
  getHospitals,
} from "../../controllers/hospitals/index.js"; // Adjust the path based on your project structure
import { authMiddleware } from "../../middlewares/auth/index.js";

const router = express.Router();

// Create a new hospital
router.post("/", createHospital);

// Update a hospital
router.put("/:id", authMiddleware(["Admin", "Hospital"]), updateHospital);

// Delete a hospital
router.delete("/:id", authMiddleware(["Admin", "Hospital"]), deleteHospital);

// Get a hospital and their associated doctors
router.get("/:id/doctors", getHospitalWithDoctors);

router.get("/", getHospitals);

export default router;
