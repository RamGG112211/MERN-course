// routes/bookings/index.js

import express from "express";
import {
  createBooking,
  updateBooking,
  deleteBooking,
  getBookingById,
  getAllBookings,
} from "../../controllers/bookings/index.js"; // Adjust the path as per your project structure
import { authMiddleware } from "../../middlewares/auth/index.js";

const router = express.Router();

// Create a new booking
router.post("/", authMiddleware(["Admin", "User", "Doctor"]), createBooking);

// Update a booking
router.put("/:id", authMiddleware(["Admin", "Doctor", "User"]), updateBooking);

// Delete a booking
router.delete("/:id", authMiddleware(["Admin", "Doctor"]), deleteBooking);

// Get a booking by ID
router.get("/:id", getBookingById);

// Get all bookings
router.get("/", authMiddleware(["Admin", "Doctor"]), getAllBookings);

export default router;
