import { configureStore } from "@reduxjs/toolkit";
import doctorsReducer from "./doctorsSlice";
import hospitalsReducer from "./hospitalsSlice";
import providersSearchReducer from "./providersSearchSlice";
import videoCallReducer from "./videoCallSlice";
import authReducer from "./authSlice";
import doctors2Reducer from "./doctors2Slice";

export const store = configureStore({
  reducer: {
    doctors: doctorsReducer,
    hospitals: hospitalsReducer,
    providersSearch: providersSearchReducer,
    videoCall: videoCallReducer,
    auth: authReducer,
    doctors2: doctors2Reducer,
  },
});

export default store;
