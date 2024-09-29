import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user/signup" element={<SignupPage />} />
        <Route path="/user/login" element={<LoginPage />} />

        {/* Other routes like login can go here */}
      </Routes>
    </Router>
  );
}

export default App;
