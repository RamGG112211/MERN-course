import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import DoctorSignupPage from "./pages/auth/DoctorSignupPage";
import HospitalSignupPage from "./pages/auth/HospitalSignupPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user/signup" element={<SignupPage />} />
        <Route path="/user/login" element={<LoginPage />} />
        <Route path="/doctor/signup" element={<DoctorSignupPage />} />

        <Route path="/hospital/signup" element={<HospitalSignupPage />} />

        {/* Other routes like login can go here */}
      </Routes>
    </Router>
  );
}

export default App;
