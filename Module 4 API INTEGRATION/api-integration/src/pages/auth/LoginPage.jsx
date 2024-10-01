// src/pages/auth/LoginPage.jsx
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";
import { apiRequest } from "../../utils/auth/apiRequest";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      // Make API request to login
      const { token, user } = await apiRequest({
        method: "POST",
        url: "/users/login", // Backend login endpoint
        data: formData,
      });

      const userData = { token, user };
      // Store the token in localStorage under the key 'doctor_portal_user'
      localStorage.setItem("doctor_portal_user", JSON.stringify(userData));

      // Redirect to the desired page (e.g., user dashboard)
      navigate("/dashboard");
    } catch (error) {
      throw new Error(error.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
