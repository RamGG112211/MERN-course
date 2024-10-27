import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = {
  provider: undefined,
  specialitySearched: undefined,
  citySearched: undefined,
};

export const providersSearchSlice = createSlice({
  name: "providersSearch",
  initialState,
  reducers: {
    updateProvider: (state, action) => {
      state.provider = action.payload;
    },
    updateSpecialitySearched: (state, action) => {
      state.specialitySearched = action.payload;
    },
    updateCitySearched: (state, action) => {
      state.citySearched = action.payload;
    },
  },
});

export const { updateCitySearched, updateProvider, updateSpecialitySearched } =
  providersSearchSlice.actions;

export default providersSearchSlice.reducer;
