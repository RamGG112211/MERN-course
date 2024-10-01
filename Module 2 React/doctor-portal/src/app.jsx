import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Hospitals from "./pages/Hospitals";
import SingleDoctor from "./pages/SingleDoctor";
import SingleHospital from "./pages/SingleHospital";
import ContactUs from "./pages/ContactUs";
import Header from "./components/global/Header";
import Footer from "./components/global/Footer";

export function App() {
  return (
    <main>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/doctors/:id" element={<SingleDoctor />} />
          <Route path="/hospital/:id" element={<SingleHospital />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </main>
  );
}
