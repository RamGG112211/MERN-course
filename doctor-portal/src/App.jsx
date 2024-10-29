import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
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

          {/* <Route path="admin">
            <Route index element={<AdminDashboard />} />
            <Route path="doctors" element={<AdminDoctors />} />
            <Route path="hospitals" element={<AdminHospitals />} />
          </Route> */}
        </Routes>

        <LoadUserDetails />
      </GlobalContextProvider>
    </BrowserRouter>
  );
}

export default App;
