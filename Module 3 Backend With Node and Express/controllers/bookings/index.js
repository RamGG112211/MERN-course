import Booking from "../../models/bookings/index.js"; // Booking model
import Doctor from "../../models/doctors/index.js"; // Doctor model
import User from "../../models/users/index.js"; // User model
import twilio from "twilio";
import { clients } from "../../server.js";
import dotenv from "dotenv";
import axios from "axios";
import crypto from "crypto";
import { callKhalti } from "../payment/index.js";

dotenv.config();

const twilioClient = twilio(
  process.env.TWILIO_API_KEY,
  process.env.TWILIO_API_SECRET,
  { accountSid: process.env.TWILIO_ACCOUNT_SID }
);

// Initialize Twilio Access Token
const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

// Create a new booking
export const createBooking = async (req, res) => {
  const { user_id, doctor_id, appointmentDate, amount, payment_method } =
    req.body;

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

    const signature = createSignature(
      `total_amount=${amount},transaction_uuid=${savedBooking._id},product_code=EPAYTEST`
    );

    if (payment_method === "esewa") {
      const formData = {
        amount: amount,
        failure_url: "http://localhost:5173/failure",
        product_delivery_charge: "0",
        product_service_charge: "0",
        product_code: "EPAYTEST",
        signature: signature,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        success_url: "http://localhost:3001/payment/esewa-success",
        tax_amount: "0",
        total_amount: amount,
        transaction_uuid: savedBooking._id,
      };
      res.json({
        message: "Booking done Sucessfully",
        payment_method: "esewa",
        formData,
      });
    } else if (payment_method === "khalti") {
      const formData = {
        return_url: "http://localhost:3001/payment/khalti-callback",
        website_url: "http://localhost:3001",
        amount: amount * 100, //paisa
        purchase_order_id: savedBooking._id,
        purchase_order_name: "test",
      };

      await callKhalti(formData, req, res);
    }

    // return res
    //   .status(201)
    //   .json({ message: "Booking created", booking: savedBooking });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createSignature = (message) => {
  const secret = "8gBm/:&EnhH.1/q";
  // Create an HMAC-SHA256 hash
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(message);

  // Get the digest in base64 format
  const hashInBase64 = hmac.digest("base64");
  return hashInBase64;
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

const findOrCreateRoom = async (roomName) => {
  try {
    // see if the room exists already. If it doesn't, this will throw
    // error 20404.
    await twilioClient.video.v1.rooms(roomName).fetch();
  } catch (error) {
    // the room was not found, so create it
    if (error.code == 20404) {
      await twilioClient.video.v1.rooms.create({
        uniqueName: roomName,
        type: "go",
      });
    } else {
      // let other errors bubble up
      throw error;
    }
  }
};

const getAccessToken = (roomName, identity) => {
  // create an access token
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET,
    // generate a random unique identity for this participant
    { identity }
  );
  // create a video grant for this specific room
  const videoGrant = new VideoGrant({
    room: roomName,
  });

  // add the video grant
  token.addGrant(videoGrant);
  // serialize the token and return it
  return token.toJwt();
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

    // find or create a room with the given roomName
    findOrCreateRoom(roomName);

    // generate an Access Token for a participant in this room
    const token = getAccessToken(roomName, identity);

    console.log(
      " caller id: ",
      user_id,
      " callee id: ",
      doctor_id,
      "identity",
      identity
    );

    console.log("booking", booking);

    // Notify the doctor/patient of the incoming call via WebSocket
    const recipientId =
      identity.toString() === booking.user_id.toString()
        ? booking.doctor_id.toString()
        : booking.user_id.toString();

    console.log("recipientId", recipientId);

    console.log("clients", clients);

    if (clients[recipientId]) {
      clients[recipientId].send(
        JSON.stringify({
          type: "incoming_call",
          roomName,
          caller: identity,
          token: token,
        })
      );
    }

    return res.json({ token: token, roomName });
  } catch (error) {
    console.error("Error in video call:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get a booking by userId and doctorId
export const getBookingByUserAndDoctor = async (req, res) => {
  const { userId, doctorId } = req.query; // Use req.params if you define them in URL

  try {
    const booking = await Booking.findOne({
      user_id: userId,
      doctor_id: doctorId,
    })
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
