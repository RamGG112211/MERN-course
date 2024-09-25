import express from "express";
import userRoutes from "./routes/users/index.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
// Import Routes
import userRoutes from "./routes/users/index.js"; // User routes
import hospitalRoutes from "./routes/hospitals/index.js"; // Hospital routes
import bookingRoutes from "./routes/bookings/index.js"; // Booking routes
import doctorRoutes from "./routes/doctors/index.js"; // Doctor routes
// Initialize dotenv
dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for PORT, fallback to 3001

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

app.use(express.json()); // Middleware to parse JSON

// Define routes
app.use("/users", userRoutes); // User routes
app.use("/hospitals", hospitalRoutes); // Hospital routes
app.use("/bookings", bookingRoutes); // Booking routes
app.use("/doctors", doctorRoutes); // Doctor routes

// Start the server after DB connection
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
