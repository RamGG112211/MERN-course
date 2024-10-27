import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = {
  hospitalChosen: "",
  specialityChosen: "",
  cityChosenDoctor: "",
  doctors: [],
  filteredDoctors: [],
  sort: "Name",
  order: "A-Z",
  currentlyViewedPageNum: 1,
  numOfDoctorsPerPage: 6,
  totalDoctors: undefined,
  totalPage: undefined,
};

export const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    updateHospitalChosen: (state, action) => {
      state.hospitalChosen = action.payload;
    },
    updateSpecialityChosen: (state, action) => {
      state.specialityChosen = action.payload;
    },
    updateCityChosenDoctor: (state, action) => {
      state.cityChosenDoctor = action.payload;
    },
    updateFilteredDoctors: (state, action) => {
      state.filteredDoctors = action.payload;
    },
    updateDoctorsSort: (state, action) => {
      state.sort = action.payload;
    },
    updateDoctorsOrder: (state, action) => {
      state.order = action.payload;
    },

    updateDoctorsCurrentlyViewedPageNum: (state, action) => {
      state.currentlyViewedPageNum = action.payload;
    },

    updateTotalDoctors: (state, action) => {
      state.totalDoctors = action.payload;
    },

    updateNumOfDoctorsPerPage: (state, action) => {
      state.numOfDoctorsPerPage = action.payload;
    },
    updateDoctors: (state, action) => {
      state.doctors = action.payload;
    },
    updateDoctorsTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },
  },
});

export const {
  updateCityChosenDoctor,
  updateDoctors,
  updateDoctorsCurrentlyViewedPageNum,
  updateDoctorsOrder,
  updateDoctorsSort,
  updateFilteredDoctors,
  updateHospitalChosen,
  updateNumOfDoctorsPerPage,
  updateSpecialityChosen,
  updateTotalDoctors,
  updateDoctorsTotalPage,
} = doctorsSlice.actions;

export default doctorsSlice.reducer;
