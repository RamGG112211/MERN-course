import { createSlice } from "@reduxjs/toolkit";
import { doctors_data } from "../utils/data";

const initialState = {
  doctors: doctors_data,
};

export const doctors2Slice = createSlice({
  name: "doctors2",
  initialState,
  reducers: {
    updateDoctors: (state, action) => {
      const doctors = action.payload;
      state.doctors = doctors;
    },
  },
});

export const { updateDoctors } = doctors2Slice.actions;

export default doctors2Slice.reducer;
