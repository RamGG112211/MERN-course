/* eslint-disable react/prop-types */
// import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../utils/auth/apiRequest";
import { useDispatch } from "react-redux";
import {
  updateRoomJoinToken,
  updateRoomName,
} from "../../store/videoCallSlice";
import { useEffect, useRef } from "react";

const VideoCallButton = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const storedUserData = localStorage.getItem("doctor_portal_user");
  // const identity = storedUserData
  //   ? JSON.parse(storedUserData).user.fullName
  //   : null;

  const doctorId = "671e4b19e3e24a32cde80ff6";
  const patientId = storedUserData ? JSON.parse(storedUserData).user._id : null;
  const accessToken = storedUserData ? JSON.parse(storedUserData).token : null;

  const handleVideoCall = async () => {
    try {
      if (accessToken) {
        // Make an API call to initiate the video call
        const response = await apiRequest({
          method: "POST",
          url: "/bookings/video-call", // Your API endpoint
          data: {
            user_id: patientId, // or doctorId based on the role
            doctor_id: doctorId,
            identity: patientId,
          },
          token: accessToken,
        });

        // Assuming your API returns roomName and token
        const { roomName, token } = response;
        dispatch(updateRoomName(roomName));
        dispatch(updateRoomJoinToken(token));

        // Navigate to the video call page with room info
        // navigate(
        //   `/video-call?doctorId=${doctorId}&patientId=${patientId}&roomName=${roomName}&token=${token}`
        // );
      }
    } catch (error) {
      console.error("Error initiating video call:", error);
      // Optionally, show a message to the user
    }
  };

  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection
    socketRef.current = new WebSocket("ws://localhost:3001/websockets");

    // Retrieve the data from localStorage
    const storedUserData = localStorage.getItem("doctor_portal_user");

    // Parse the JSON data (if it exists) and access the token
    const userId = storedUserData ? JSON.parse(storedUserData).user._id : null;

    socketRef.current.onopen = () => {
      console.log("Connected to WebSocket server");

      socketRef.current.send(JSON.stringify({ type: "register", userId }));
    };
  }, []);

  const handleAppointmentCall = () => {
    // Emit appointment-call event to initiate call
    // Retrieve the data from localStorage
    const storedUserData = localStorage.getItem("doctor_portal_user");

    // Parse the JSON data (if it exists) and access the token
    const userId = storedUserData ? JSON.parse(storedUserData).user._id : null;

    const doctorId = "671e4b19e3e24a32cde80ff6"; // Replace with actual doctorId
    socketRef.current.send(
      JSON.stringify({ type: "appointment-call", userId, doctorId })
    );
  };

  return (
    <button
      className="bg-blue-500 text-white p-2 rounded"
      onClick={handleAppointmentCall}
    >
      Start Video Call
    </button>
  );
};

export default VideoCallButton;
