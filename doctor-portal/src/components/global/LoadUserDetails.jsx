import { useCallback, useEffect } from "react";
import {
  updateUser,
  updateUserLoggedInUserRole,
  userLoggedIn,
  userLoggedOut,
} from "../../store/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function LoadUserDetails() {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  // Retrieve stored user data and validate session expiry
  const getInitialUserState = useCallback(() => {
    const userData = localStorage.getItem("doctor_portal_user");
    const expiryTime = localStorage.getItem("expiry_date");

    if (userData && expiryTime) {
      // Check if current time has exceeded expiry time
      const currentTime = new Date().getTime();
      if (currentTime > JSON.parse(expiryTime)) {
        // Session expired, clear data and log out
        localStorage.removeItem("doctor_portal_user");
        localStorage.removeItem("expiry_date");
        dispatch(updateUser(null));
        dispatch(userLoggedOut());
        dispatch(updateUserLoggedInUserRole(undefined));

        if (pathname != "/signup") navigate("/user/login");
      } else {
        dispatch(updateUser(JSON.parse(userData)));
      }
    } else {
      // No user data found, clear any residual data
      localStorage.removeItem("doctor_portal_user");
      localStorage.removeItem("expiry_date");
      dispatch(updateUser(null));
      dispatch(userLoggedOut());
      dispatch(updateUserLoggedInUserRole(undefined));
      if (pathname != "/signup") navigate("/user/login");
    }
  }, [dispatch, navigate, pathname]);

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

  console.log("pathname: ", pathname);

  return (
    <div className="hidden">
      This component&apos;s purpose is just to load the user details if login
      from Google or Facebook
    </div>
  );
}
