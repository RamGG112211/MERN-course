// src/pages/auth/DoctorSignupPage.jsx
import DoctorSignupForm from "../../components/auth/DoctorSignupForm";
import { Container } from "@mui/material";
import { apiRequest } from "../../utils/auth/apiRequest";

const DoctorSignupPage = () => {
    const onSubmit = async (formData) => {
      try {
        const response = await apiRequest({
          method: "POST",
          url: "/doctors",
          data: formData,
        });
        console.log("Doctor signup successful:", response);
        // Handle successful signup (e.g., show a success message, redirect, etc.)
      } catch (error) {
        console.error("Error signing up doctor:", error);
        // Handle error (e.g., show an error message)
      }
    };
  return (
    <Container
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "50px 20px",
      }}
    >
      <DoctorSignupForm onSubmit={onSubmit} />
    </Container>
  );
};

export default DoctorSignupPage;
