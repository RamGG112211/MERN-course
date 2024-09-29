import Booking from "../../models/bookings/index.js"; // Booking model
import Doctor from "../../models/doctors/index.js"; // Doctor model
import User from "../../models/users/index.js"; // User model

// Create a new booking
export const createBooking = async (req, res) => {
  const { user_id, doctor_id, appointmentDate } = req.body;

  try {
    // Check if the user and doctor exist
    const user = await User.findById(user_id);
    const doctor = await Doctor.findById(doctor_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Create booking
    const newBooking = new Booking({
      user_id,
      doctor_id,
      appointmentDate,
    });
    const savedBooking = await newBooking.save();

    res.status(201).json({ message: "Booking created", booking: savedBooking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a booking
export const updateBooking = async (req, res) => {
  const { id } = req.params;
  const { appointmentDate, status } = req.body;

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { appointmentDate, status },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res
      .status(200)
      .json({ message: "Booking updated", booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a booking
export const deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a booking by ID
export const getBookingById = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id)
      .populate("user_id")
      .populate("doctor_id");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user_id")
      .populate("doctor_id");
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
