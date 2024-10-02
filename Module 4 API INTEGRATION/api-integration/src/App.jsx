// App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import Doctors from "./Doctors";
// import Hospitals from "./Hospitals";
import { useEffect, useState } from "react";
import AdminLayout from "./layouts/AdminLayout";
import Users from "./pages/admin/Users";
import { apiRequest } from "./utils/auth/apiRequest";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import DoctorSignupPage from "./pages/auth/DoctorSignupPage";
import HospitalSignupPage from "./pages/auth/HospitalSignupPage";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // To handle loading state

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("doctor_portal_user"));

    if (user) {
      const checkAdminRole = async () => {
        try {
          const response = await apiRequest({
            method: "GET",
            url: "/users/check", // Adjust this endpoint as needed
            token: user.token,
          });

          // Assuming your backend returns user role or authentication status
          if (response.role === "Admin") {
            setIsAdmin(true);
          }
        } catch (error) {
          console.error("Error verifying user role:", error);
          // Optionally handle redirection to login or error page
        } finally {
          setLoading(false); // Set loading to false after check
        }
      };
      checkAdminRole();
    } else {
      setLoading(false); // Set loading to false if no user is found
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading state while checking authentication
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<p>Home</p>} />
        <Route path="/user/signup" element={<SignupPage />} />
        <Route path="/user/login" element={<LoginPage />} />
        <Route path="/doctor/signup" element={<DoctorSignupPage />} />

        <Route path="/hospital/signup" element={<HospitalSignupPage />} />

        <Route
          path="/admin"
          element={isAdmin ? <AdminLayout /> : <Navigate to="/" />}
        >
          <Route path="users" element={<Users />} />
          {/* <Route path="doctors" element={<Doctors />} />
          <Route path="hospitals" element={<Hospitals />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
