import express from "express";
import http from "http";
import mongoose from "mongoose";
import WebSocket, { WebSocketServer } from "ws";
import dotenv from "dotenv";
// Import Routes
import userRoutes from "./routes/users/index.js"; // User routes
import hospitalRoutes from "./routes/hospitals/index.js"; // Hospital routes
import bookingRoutes from "./routes/bookings/index.js"; // Booking routes
import doctorRoutes from "./routes/doctors/index.js"; // Doctor routes
import cors from "cors";
import Twilio from "twilio";

// Initialize dotenv
dotenv.config();

// Enable CORS for all routes

const app = express();
const port = process.env.PORT || 3001; // Use environment variable for PORT, fallback to 3001
app.use(cors());

// const twilioClient = new Twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// WebSocket Connections
export const clients = {}; // Map to hold connected clients by userId

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
  const server = http.createServer(app);

  const websocketServer = new WebSocketServer({
    noServer: true,
    path: "/websockets",
  });

  server.on("upgrade", (request, socket, head) => {
    websocketServer.handleUpgrade(request, socket, head, (ws) => {
      websocketServer.emit("connection", ws, request);
    });
  });

  websocketServer.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (message) => {
      const data = JSON.parse(message);

      if (data.type === "register") {
        clients[data.userId] = ws; // Register the client
        console.log(`User registered: ${data.userId}`);
      }

      // Handle other message types as needed
    });

    ws.on("close", () => {
      // Clean up client disconnects if necessary
      console.log("Client disconnected");
    });
  });

  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
