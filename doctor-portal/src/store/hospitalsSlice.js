import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = {
  hospitals: [],
  hospitalOptions: [],
  totalPage: undefined,
  currentlyViewedPageNum: 1,
  numOfHospitalsPerPage: 6,
  cityChosenHospital: "",
  filteredHospitals: undefined,
  sort: "Name",
  order: "A-Z",
  totalHospitals: undefined,
};

export const hospitalsSlice = createSlice({
  name: "hospitals",
  initialState,
  reducers: {
    updateHospitals: (state, action) => {
      state.hospitals = action.payload;
    },
    updateHospitalOptions: (state, action) => {
      state.hospitalOptions = action.payload;
    },
    updateCityChosenHospital: (state, action) => {
      state.cityChosen = action.payload;
    },
    updateFilteredHospitals: (state, action) => {
      state.filteredHospitals = action.payload;
    },
    updateHospitalsSort: (state, action) => {
      state.sort = action.payload;
    },
    updateHospitalsOrder: (state, action) => {
      state.order = action.payload;
    },
    updateHospitalsCurrentlyViewedPageNum: (state, action) => {
      state.currentlyViewedPageNum = action.payload;
    },

    updateTotalHospitals: (state, action) => {
      state.totalHospitals = action.payload;
    },

    updateNumOfHospitalsPerPage: (state, action) => {
      state.numOfHospitalsPerPage = action.payload;
    },
    updateHospitalsTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },
  },
});

export const {
  updateHospitals,
  updateHospitalOptions,
  updateCityChosenHospital,
  updateFilteredHospitals,
  updateHospitalsCurrentlyViewedPageNum,
  updateHospitalsOrder,
  updateHospitalsSort,
  updateTotalHospitals,
  updateHospitalsTotalPage,
  updateNumOfHospitalsPerPage,
} = hospitalsSlice.actions;

export default hospitalsSlice.reducer;
