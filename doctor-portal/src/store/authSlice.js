import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = {
  loggedIn: false,
  user: undefined,// undefined or null or user object
  loggedInUserRole: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state) => {
      state.loggedIn = true;
    },
    userLoggedOut: (state) => {
      state.loggedIn = false;
      state.user = null;
    },
    updateUser: (state, action) => {
      const userData = action.payload;
      state.user = userData;
    },
    updateUserLoggedInUserRole: (state, action) => {
      state.loggedInUserRole = action.payload;
    },
  },
});

export const {
  userLoggedIn,
  userLoggedOut,
  updateRememberMe,
  updateUser,
  updateUserLoggedInUserRole,
} = authSlice.actions;

export default authSlice.reducer;
