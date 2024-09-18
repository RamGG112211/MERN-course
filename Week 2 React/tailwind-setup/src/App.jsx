import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Hospitals from "./pages/Hospitals";
import HealthPackages from "./pages/HealthPackages";
import ContactUs from "./pages/ContactUs";
import Navbar from "./components/global/Navbar";
import Booking from "./pages/Booking";

function App() {
  return (
    <main className=" overflow-hidden">
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/hospitals" element={<Hospitals />} />
            <Route path={"/booking/:id"} element={<Booking />}></Route>
            <Route path="/health-packages" element={<HealthPackages />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
        </div>
      </BrowserRouter>
    </main>
  );
}

export default App;
