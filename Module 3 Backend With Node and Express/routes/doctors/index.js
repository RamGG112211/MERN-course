// routes/doctors/index.js

import express from "express";
import {
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorWithHospitals,
  getDoctors,
} from "../../controllers/doctors/index.js"; // Adjust the path based on your project structure
import { authMiddleware } from "../../middlewares/auth/index.js";
import multer from "multer";
import path from "path";

// Set up storage with Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name with extension
  },
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, JPG, and PNG files are allowed"), false);
  }
};

// Set up Multer middleware
const upload = multer({
  storage,
  fileFilter,
});

const router = express.Router();

// Create a new doctor
router.post("/", upload.single("profileImage"), createDoctor);

// Update a doctor
router.put(
  "/:id",
  upload.single("profileImage"),
  authMiddleware(["Admin", "Doctor"]),
  updateDoctor
);

// Delete a doctor
router.delete("/:id", authMiddleware(["Admin", "Doctor"]), deleteDoctor);

// Get a doctor and their associated hospitals
router.get("/:id/hospitals", getDoctorWithHospitals);

router.get("/", getDoctors);

export default router;
