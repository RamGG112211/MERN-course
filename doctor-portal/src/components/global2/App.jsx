import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Doctors from "../pages/Doctors";
import Hospitals from "../pages/Hospitals";
import ContactUs from "../../pages/ContactUs";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminDoctors from "../pages/admin/AdminDoctors";
import AdminHospitals from "../pages/admin/AdminHospitals";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/contact-us" element={<ContactUs />} />

        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="/doctors" element={<AdminDoctors />} />
          <Route path="/hospitals" element={<AdminHospitals />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
