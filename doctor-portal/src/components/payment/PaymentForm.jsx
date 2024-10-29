import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../utils/auth/apiRequest";

// Define the secret key for HMAC SHA-256 (from eSewa test instructions)
const SECRET_KEY = "8gBm/:&EnhH.1/q(";

// Define the Yup validation schema
const schema = yup.object().shape({
  total_amount: yup
    .number()
    .typeError("Total amount must be a number")
    .positive("Total amount must be positive")
    .required("Total amount is required"),
});

const PaymentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  // Function to generate HMAC SHA-256 signature
  const generateSignature = (total_amount, transaction_uuid, product_code) => {
    const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const signature = CryptoJS.HmacSHA256(message, SECRET_KEY).toString(
      CryptoJS.enc.Base64
    );
    return signature;
  };

  const onSubmit = async (data) => {
    // Additional required parameters
    const transaction_uuid = uuidv4().replace(/[^a-zA-Z0-9-]/g, ""); // Alphanumeric + hyphen
    const product_code = "EPAYTEST";
    const tax_amount = 10; // Replace as needed
    const product_service_charge = 0;
    const product_delivery_charge = 0;
    const total_amount = Number(data.total_amount) + tax_amount;

    // Generate the signature
    const signature = generateSignature(
      total_amount,
      transaction_uuid,
      product_code
    );

    // Prepare data for the request
    const payload = {
      total_amount,
      tax_amount,
      product_service_charge,
      product_delivery_charge,
      transaction_uuid,
      product_code,
      signature,
      amount: data.total_amount,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      success_url: "https://esewa.com.np",
      failure_url: "https://google.com",
    };

    console.log("payload", payload);
    

    try {
      // Make API request to login
      const response = await apiRequest({
        method: "POST",
        url: "/payment", // Backend login endpoint
        data: JSON.stringify({ payload }),
      });
      const result = await response;

      if (result.success) {
        navigate("/success");
      } else {
        navigate("/failure");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      navigate("/failure");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">eSewa Payment</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Total Amount Input */}
        <div className="mb-4">
          <label
            htmlFor="total_amount"
            className="block text-gray-700 font-bold mb-2"
          >
            Total Amount
          </label>
          <input
            type="text"
            id="total_amount"
            className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-green-300"
            {...register("total_amount")}
          />
          {errors.total_amount && (
            <p className="text-red-500 text-sm mt-1">
              {errors.total_amount.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded font-semibold hover:bg-green-600 transition duration-300"
        >
          Pay with eSewa
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
