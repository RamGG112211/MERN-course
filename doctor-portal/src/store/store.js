import { configureStore } from "@reduxjs/toolkit";
import doctorsReducer from "./doctorsSlice";
import hospitalsReducer from "./hospitalsSlice";
import providersSearchReducer from "./providersSearchSlice";

export const store = configureStore({
  reducer: {
    doctors: doctorsReducer,
    hospitals: hospitalsReducer,
    providersSearch: providersSearchReducer,
  },
});

export default store;
