import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = {
  isCalling: false,
  incomingCall: false,
  roomName: undefined,
  roomJoinToken: undefined,
};

export const videoCallSlice = createSlice({
  name: "video-call",
  initialState,
  reducers: {
    updateIsCalling: (state, action) => {
      state.isCalling = action.payload;
    },
    updateIncomingCall: (state, action) => {
      state.incomingCall = action.payload;
    },
    updateRoomName: (state, action) => {
      state.roomName = action.payload;
    },
    updateRoomJoinToken: (state, action) => {
      state.roomJoinToken = action.payload;
    },
  },
});

export const {
  updateIsCalling,
  updateIncomingCall,
  updateRoomJoinToken,
  updateRoomName,
} = videoCallSlice.actions;

export default videoCallSlice.reducer;
