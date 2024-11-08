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

  const handlePayment = async (payment_method) => {
    // const url = "http://localhost:3001/bookings";
    // const data = {
    //   amount: 100,
    //   products: [{ product: "test", amount: 100, quantity: 1 }],
    //   payment_method,
    // };

    try {
      // const response = await fetch(url, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     // Add any other headers as needed
      //   },
      //   body: JSON.stringify(data),
      // });

      // Retrieve the data from localStorage
      const storedUserData = localStorage.getItem("doctor_portal_user");

      // Parse the JSON data (if it exists) and access the token
      const token = storedUserData ? JSON.parse(storedUserData).token : null;
      const user_id = storedUserData
        ? JSON.parse(storedUserData).user._id
        : null;

      const doctor_id = "671e4b19e3e24a32cde80ff6";

      if (token) {
        const response = await apiRequest({
          method: "POST",
          url: "/bookings",
          data: {
            user_id,
            doctor_id,
            // appointmentDate: data.appointmentDate,
            appointmentDate: "2024-10-24",
            amount: 100,
            payment_method,
          },
          token,
        });

        // Check if the request was successful (status code 2xx)
        // if (response.ok) {
        // const responseData = await response.json();
        console.log("responsedata: ", response);

        console.log(response);
        if (response.payment_method === "esewa") {
          esewaCall(response.formData);
        } else if (response.payment_method === "khalti") {
          khaltiCall(response.data);
        }
        // } else {
        //   console.error("Failed to fetch:", response);
        // }
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  const khaltiCall = (data) => {
    window.location.href = data.payment_url;
  };

  const esewaCall = (formData) => {
    console.log(formData);
    var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in formData) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", formData[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white rounded shadow-md">
      {/* <h2 className="text-2xl font-semibold text-center mb-4">eSewa Payment</h2>
      <form onSubmit={handleSubmit(onSubmit)}> */}
      {/* Total Amount Input */}
      {/* <div className="mb-4">
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
        </div> */}

      {/* Submit Button */}
      {/* <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded font-semibold hover:bg-green-600 transition duration-300"
        >
          Pay with eSewa
        </button>
      </form> */}

      <button
        style={{ background: "#55aa33", margin: 10 }}
        onClick={() => handlePayment("esewa")}
      >
        Handle Esewa Payment
      </button>
      <button
        style={{ background: "#55aa33", margin: 10 }}
        onClick={() => handlePayment("khalti")}
      >
        Handle Khalti Payment
      </button>
    </div>
  );
};

export default PaymentForm;
