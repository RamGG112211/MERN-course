import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/global/Navbar";
import GlobalContextProvider from "./context/GlobalContextProvider";
import Home from "./pages/Home";
import Hospitals from "./pages/Hospitals";
import ContactUs from "./pages/ContactUs";
import DoctorBooking from "./pages/DoctorBooking";
import Doctors from "./pages/Doctors";
import LoadUserDetails from "./components/global/LoadUserDetails";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import DoctorSignupPage from "./pages/auth/DoctorSignupPage";
import HospitalSignupPage from "./pages/auth/HospitalSignupPage";
import Success from "./components/payment/Success";
import Failure from "./components/payment/Failure";
import PaymentForm from "./components/payment/PaymentForm";
import Doctors2 from "./pages/Doctors2";
import VideoCall from "./pages/VideoCall";
import { useEffect, useRef, useState } from "react";
import { apiRequest } from "./utils/auth/apiRequest";
import AdminLayout from "../../Module 4 API INTEGRATION/api-integration/src/layouts/AdminLayout";
import Users from "./pages/admin/Users";

function App() {
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

  const socketRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize WebSocket connection
    socketRef.current = new WebSocket("ws://localhost:3001/websockets");

    // Retrieve the data from localStorage
    const storedUserData = localStorage.getItem("doctor_portal_user");

    // Parse the JSON data (if it exists) and access the token
    const userId = storedUserData ? JSON.parse(storedUserData).user._id : null;

    socketRef.current.onopen = () => {
      console.log("Connected to WebSocket server");

      socketRef.current.send(JSON.stringify({ type: "register", userId }));
    };

    // Listen for incoming appointment calls
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "appointment-call-incoming") {
        const { bookingId } = data;
        console.log(`Incoming appointment call, booking ID: ${bookingId}`);

        // Handle the incoming call (e.g., show notification or modal)
        navigate(`/room/${bookingId}`);
      }
    };

    socketRef.current.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    return () => {
      // Cleanup WebSocket on component unmount
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading state while checking authentication
  }

  return (
    <GlobalContextProvider>
      <Navbar />
      {/* <Navbar2 /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/signup" element={<SignupPage />} />
        <Route path="/user/login" element={<LoginPage />} />
        <Route path="/doctor/:id" element={<DoctorBooking />} />
        <Route path="/doctor/signup" element={<DoctorSignupPage />} />
        <Route path="/hospital/signup" element={<HospitalSignupPage />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/booking/:id" element={<DoctorBooking />} />

        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/success" element={<Success />} />
        <Route path="/failure" element={<Failure />} />

        <Route path="/doctors2" element={<Doctors2 />} />

        <Route path="/room/:roomid" element={<VideoCall />} />

        {/* <Route path="admin">
            <Route index element={<AdminDashboard />} />
            <Route path="doctors" element={<AdminDoctors />} />
            <Route path="hospitals" element={<AdminHospitals />} />
          </Route> */}

        <Route
          path="/admin"
          element={isAdmin ? <AdminLayout /> : <Navigate to="/" />}
        >
          <Route path="users" element={<Users />} />
          {/* <Route path="doctors" element={<Doctors />} />
          <Route path="hospitals" element={<Hospitals />} /> */}
        </Route>
      </Routes>

      <LoadUserDetails />
    </GlobalContextProvider>
  );
}

export default App;
