// src/pages/auth/SignupPage.jsx
import SignupForm from "../../components/auth/SignupForm";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../utils/auth/apiRequest";

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = async (formData) => {
    // try {
    //   const user = await apiRequest({
    //     method: "POST",
    //     url: "/users",
    //     data: formData,
    //   });
    //   console.log("User created:", user);
    //   navigate("/user/login"); // Redirect to login after successful signup
    // } catch (error) {
    //   console.error("Error creating user:", error.message || "Unknown error");
    // }

    console.log("formData: ", formData);
    
  };

  return <SignupForm onSubmit={handleSignup} />;
};

export default SignupPage;
