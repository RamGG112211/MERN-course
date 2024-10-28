import Booking from "../../models/bookings/index.js"; // Booking model
import Doctor from "../../models/doctors/index.js"; // Doctor model
import User from "../../models/users/index.js"; // User model
import twilio from "twilio";
import { clients } from "../../server.js";

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

export const videoCall = async (req, res) => {
  const { user_id, doctor_id, identity } = req.body;

  try {
    const booking = await Booking.findOne({
      user_id,
      doctor_id,
      status: "Confirmed",
    });

    if (!booking) {
      return res.status(404).json({ message: "No booking found" });
    }

    // Create a unique room for the call
    const roomName = `room_${booking._id}`;

    // Validate identity
    if (!identity) {
      return res.status(400).json({ message: "Identity is required" });
    }

    // Generate Twilio Access Token for Video
    const token = new twilio.jwt.AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY,
      process.env.TWILIO_API_SECRET,
      { identity }
    );

    token.identity = identity;
    const videoGrant = new twilio.jwt.AccessToken.VideoGrant({
      room: roomName,
    });
    token.addGrant(videoGrant);

    // Notify the doctor/patient of the incoming call via WebSocket
    const recipientId =
      identity === booking.user_id ? booking.doctor_id : booking.user_id;
    if (clients[recipientId]) {
      clients[recipientId].send(
        JSON.stringify({
          type: "incoming_call",
          roomName,
          caller: identity,
          token: token.toJwt(),
        })
      );
    }

    return res.json({ token: token.toJwt(), roomName });
  } catch (error) {
    console.error("Error in video call:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
