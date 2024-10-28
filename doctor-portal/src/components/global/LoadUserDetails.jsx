import React, { useCallback, useEffect } from "react";
import {
  updateUser,
  updateUserLoggedInUserRole,
  userLoggedIn,
  userLoggedOut,
} from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function LoadUserDetails() {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Retrieve stored user data and validate session expiry
  const getInitialUserState = useCallback(() => {
    const userData = localStorage.getItem("doctor_portal_user");

    if (userData) {
      dispatch(updateUser(JSON.parse(userData)));
    } else {
      localStorage.removeItem("doctor_portal_user");
      dispatch(updateUser(null));
      dispatch(userLoggedOut());
      dispatch(updateUserLoggedInUserRole(undefined));
      navigate("/user/login");
    }
  }, [dispatch]);

  useEffect(() => {
    getInitialUserState();

    if (user) {
      dispatch(userLoggedIn());
      dispatch(updateUserLoggedInUserRole(user.role));
    }
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(userLoggedIn());
      dispatch(updateUserLoggedInUserRole(user.role));
    }
  }, [user]);

  return (
    <div className="hidden">
      This components purpose is just to load the user details if login from
      google or fb
    </div>
  );
}
