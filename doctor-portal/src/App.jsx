import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/global/Navbar";
import Home from "./components/pages/Home";
import Hospitals from "./components/pages/Hospitals";
import Doctors from "./components/pages/Doctors";
import Contact from "./components/pages/Contact";
import Button from "./components/global/Button";
import Navbar2 from "./components/global2/Navbar";
import AdminDoctors from "./components/pages/admin/AdminDoctors";
import AdminHospitals from "./components/pages/admin/AdminHospitals";
import AdminDashboard from "./components/pages/admin/AdminDashboard";
import GlobalContextProvider from "./context/GlobalContextProvider";

function App() {
  return (
    <BrowserRouter>
      <GlobalContextProvider>
        <Navbar />
        {/* <Navbar2 /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="admin">
            <Route index element={<AdminDashboard />} />
            <Route path="doctors" element={<AdminDoctors />} />
            <Route path="hospitals" element={<AdminHospitals />} />
          </Route>
        </Routes>
      </GlobalContextProvider>
      
      <Button
        className={"px-6"}
        variant="secondary"
        onClickFn={() => {
          console.log("button");
        }}
      >
        <span>Text</span>
      </Button>
    </BrowserRouter>
  );
}

export default App;
