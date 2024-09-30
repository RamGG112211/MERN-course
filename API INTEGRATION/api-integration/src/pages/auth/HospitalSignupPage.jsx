import HospitalSignupForm from "../../components/auth/HospitalSignupForm";

const HospitalSignupPage = () => {
  const handleSubmit = (data) => {
    console.log("Hospital signup data:", data);
    // Handle the response data as needed (e.g., redirect, display message, etc.)
  };

  return (
    <div>
      <HospitalSignupForm onSubmit={handleSubmit} />
    </div>
  );
};

export default HospitalSignupPage;
