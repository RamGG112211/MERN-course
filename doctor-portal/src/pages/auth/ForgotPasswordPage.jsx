import { apiRequest } from "../../utils/auth/apiRequest";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  const handleForgotPassword = async (formData) => {
    await apiRequest({
      method: "POST",
      url: "/users/forgot-password",
      data: formData,
    });
  };

  return <ForgotPasswordForm onSubmit={handleForgotPassword} />;
}
