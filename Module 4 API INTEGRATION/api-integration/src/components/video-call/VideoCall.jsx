/* eslint-disable react/prop-types */
import { useEffect, useState, useRef, useCallback } from "react";
import { connect, createLocalTracks } from "twilio-video";
import { apiRequest } from "../../utils/auth/apiRequest";
import { useLocation } from "react-router-dom";
import {
  BsFillMicMuteFill,
  BsFillMicFill,
  BsCameraVideo,
  BsCameraVideoOff,
} from "react-icons/bs";
import { FaPhoneSlash } from "react-icons/fa";
import VideoCallButton from "./VideoCallButton";

const VideoCall = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const doctorId = query.get("doctorId"); // Get doctorId from the URL
  const userId = query.get("patientId"); // Get patientId from the URL
  const roomName = query.get("roomName"); // Extract roomName from URL
  const token = query.get("token"); // Extract token from URL
  const [room, setRoom] = useState(null);
  const [remoteParticipants, setRemoteParticipants] = useState([]);
  const [inCall, setInCall] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const ws = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [isWebSocketOpen, setWebSocketOpen] = useState(false);
  const [isCaller, setIsCaller] = useState(false);

  // Retrieve the data from localStorage
  const storedUserData = localStorage.getItem("doctor_portal_user");

  // Parse the JSON data (if it exists) and access the token
  const identity = storedUserData
    ? JSON.parse(storedUserData).user.fullName
    : null;

  const sendMessage = (message) => {
    if (ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    } else {
      console.warn(
        "WebSocket is not open. Ready state is:",
        ws.current.readyState
      );
    }
  };

  const setupWebSocket = () => {
    ws.current = new WebSocket("ws://localhost:3001/websockets");

    ws.current.onopen = () => {
      sendMessage(JSON.stringify({ type: "register", userId }));
    };
    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "incoming_call") {
        setInCall(true);
        joinRoom(message.roomName, message.token);
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
      setWebSocketOpen(false);
    };
    ws.current.onerror = (error) => console.error("WebSocket error:", error);
  };

  useEffect(() => {
    setupWebSocket();

    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };
  }, [userId]);

  useEffect(() => {
    if (roomName && token) {
      setIsCaller(true);
      joinRoom(roomName, token);
    }
  }, [location.search]); // Re-run when URL changes

  const joinRoom = useCallback(
    async (roomName, token) => {
      try {
        const room = await connect(token, { name: roomName });

        const localTracks = await createLocalTracks({
          video: true,
          audio: true,
        });

        console.log("localTracks", localTracks);

        console.log("localVideoRef", localVideoRef);

        // Only run if localTracks and ref are ready
        if (localTracks && localVideoRef.current) {
          localTracks.forEach((track) => {
            if (track.kind === "video") {
              localVideoRef.current.appendChild(track.attach());
            }
          });
        }

        setRoom(room);
        room.participants.forEach(handleParticipantConnected);
        room.on("participantConnected", handleParticipantConnected);
        room.on("participantDisconnected", handleParticipantDisconnected);
      } catch (error) {
        console.error("Error joining the room:", error);
      }
    },
    [localVideoRef]
  );

  const handleParticipantConnected = (participant) => {
    setRemoteParticipants((prev) => [...prev, participant]);
    participant.tracks.forEach((publication) => {
      if (publication.isSubscribed) {
        const trackElement = publication.track.attach();
        remoteVideoRef.current.appendChild(trackElement);
      }
    });
  };

  const handleParticipantDisconnected = (participant) => {
    setRemoteParticipants((prev) => prev.filter((p) => p !== participant));
    participant.tracks.forEach((publication) => {
      if (publication.isSubscribed) {
        const trackElement = publication.track.detach();
        trackElement.forEach((el) => el.remove());
      }
    });
  };

  const toggleVideo = () => {
    if (room && room.localParticipant) {
      room.localParticipant.videoTracks.forEach((trackPub) => {
        if (trackPub.track.isEnabled) {
          trackPub.track.disable();
        } else {
          trackPub.track.enable();
        }
      });
      setVideoEnabled(!videoEnabled);
    } else {
      console.error("No local participant or room not found.");
    }
  };

  const toggleAudio = () => {
    if (room && room.localParticipant) {
      room.localParticipant.audioTracks.forEach((trackPub) => {
        if (trackPub.track.isEnabled) {
          trackPub.track.disable();
        } else {
          trackPub.track.enable();
        }
      });
      setAudioEnabled(!audioEnabled);
    } else {
      console.error("No local participant or room not found.");
    }
  };

  const handleEndCall = () => {
    try {
      if (room) {
        room.disconnect();
        console.log("Disconnected from Twilio room.");
        // Clean up local video track
        if (localVideoRef.current) {
          localVideoRef.current.innerHTML = ""; // Clear the local video
        }
      } else {
        console.warn("No room to disconnect.");
      }

      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
        console.log("WebSocket connection closed.");
      }

      setRoom(null);
      setRemoteParticipants([]);
      setIsCaller(false);
      setInCall(false);
      setVideoEnabled(true);
      setAudioEnabled(true);
    } catch (error) {
      console.error("Error ending the call:", error);
    }
  };

  return (
    <div className="relative w-full h-screen bg-gray-900">
      {inCall ||
        (isCaller && (
          <>
            {/* Remote video full-screen */}
            <div ref={remoteVideoRef} className="w-full h-full bg-black"></div>

            {/* Local video small square */}
            <div
              ref={localVideoRef}
              className="absolute bottom-20 right-5 w-40 h-40 bg-gray-800 rounded-md overflow-hidden"
            ></div>

            {/* Call controls at the bottom center */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
              {/* End Call Button */}
              <button
                onClick={handleEndCall}
                className="bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg"
              >
                <FaPhoneSlash className="w-6 h-6" />
              </button>

              {/* Mute/Unmute Button */}
              <button
                onClick={toggleAudio}
                className="bg-gray-800 hover:bg-gray-700 text-white rounded-full p-3 shadow-lg"
              >
                {!audioEnabled ? (
                  <BsFillMicMuteFill className="w-6 h-6" />
                ) : (
                  <BsFillMicFill className="w-6 h-6" />
                )}
              </button>

              {/* Video On/Off Button */}
              <button
                onClick={toggleVideo}
                className="bg-gray-800 hover:bg-gray-700 text-white rounded-full p-3 shadow-lg"
              >
                {videoEnabled ? (
                  <BsCameraVideo className="w-6 h-6" />
                ) : (
                  <BsCameraVideoOff className="w-6 h-6" />
                )}
              </button>
            </div>
          </>
        ))}

      <VideoCallButton />
    </div>
  );
};

export default VideoCall;
