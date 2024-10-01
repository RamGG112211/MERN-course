// reducers.js
import { LOGIN, LOGOUT, UPDATE_USER } from "../actions/userActionTypes";

const initialState = {
  user: JSON.parse(localStorage.getItem("userInfo")) ?? {},
  cvDetails: JSON.parse(localStorage.getItem("cvDetails")) ?? {},
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
