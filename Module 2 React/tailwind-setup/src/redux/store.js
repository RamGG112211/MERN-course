// store.js
import { combineReducers, createStore } from "redux";
import { userReducer } from "./reducers/userReducer";
import doctorFilterReducer from "./reducers/doctorFilterReducer";

const rootReducer = combineReducers({
  user: userReducer,
  doctorFilter: doctorFilterReducer,
});

const store = createStore(rootReducer);

export default store;
