// src/pages/auth/DoctorSignupPage.jsx
import DoctorSignupForm from "../../components/auth/DoctorSignupForm";
import { Container } from "@mui/material";
import { apiRequest } from "../../utils/auth/apiRequest";

const DoctorSignupPage = () => {
    const onSubmit = async (formData) => {
      try {
        // Create a new FormData object to handle both form data and the file upload
        const formDataToSend = new FormData();
        formDataToSend.append("fullName", formData.fullName);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("specialization", formData.specialization);
        formDataToSend.append("qualification", formData.qualification);
        formDataToSend.append("experienceYears", formData.experienceYears);
        formDataToSend.append("clinicAddress", formData.clinicAddress);

        // Append the hospitalIds array (if available) to FormData
        if (formData.hospitalIds.length > 0) {
          formData.hospitalIds.forEach((id) => {
            formDataToSend.append("hospitalIds[]", id);
          });
        }

        // Append the profile image (file)
        if (formData.profileImage) {
          formDataToSend.append("profileImage", formData.profileImage);
        }

        const response = await apiRequest({
          method: "POST",
          url: "/doctors",
          data: formDataToSend,
          headers: {
            "Content-Type": "multipart/form-data", // Important for handling file uploads
          },
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
