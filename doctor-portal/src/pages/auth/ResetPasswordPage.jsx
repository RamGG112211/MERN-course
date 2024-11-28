import { useParams } from "react-router-dom";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm";
import { apiRequest } from "../../utils/auth/apiRequest";

export default function ResetPasswordPage() {
  const { token } = useParams();

  const handleResetPassword = async (formData) => {
    await apiRequest({
      method: "POST",
      url: "/users/reset-password",
      data: formData,
    });
  };

  return <ResetPasswordForm onSubmit={handleResetPassword} token={token} />;
}
