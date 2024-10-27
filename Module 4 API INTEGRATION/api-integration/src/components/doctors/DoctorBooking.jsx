import { useParams } from "react-router-dom";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import styles for DatePicker
import { Button, TextField } from "@mui/material"; // Optional Material UI styling
import { apiRequest } from "../../utils/auth/apiRequest";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Yup validation schema
const validationSchema = Yup.object().shape({
  appointmentDate: Yup.date().required(
    "Appointment date and time are required"
  ),
});

export default function DoctorBooking() {
  const { id: doctor_id } = useParams();
  const user_id = "66fa404c667b2af72b3b47a2";
  const [appointmentDate, setAppointmentDate] = useState(null);

  // Retrieve the data from localStorage
  const storedUserData = localStorage.getItem("doctor_portal_user");

  // Parse the JSON data (if it exists) and access the token
  const token = storedUserData ? JSON.parse(storedUserData).token : null;

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Form submit handler
  const onSubmit = async (data) => {
    try {
      if (token) {
        const response = await apiRequest({
          method: "POST",
          url: "/bookings",
          data: {
            user_id,
            doctor_id,
            appointmentDate: data.appointmentDate,
          },
          token,
        });

        toast.success("Appointment successfully booked!");
        reset(); // Clear form fields
        setAppointmentDate(null); // Reset appointment date in the state
      }
    } catch (error) {
      toast.error(error.message || "Failed to book the appointment.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <ToastContainer /> {/* Toast notification container */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        Book Your Appointment
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-6 space-y-6 max-w-lg w-full"
      >
        {/* Date Picker Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date & Time
          </label>
          <Controller
            name="appointmentDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date) => {
                  field.onChange(date);
                  setAppointmentDate(date);
                }}
                showTimeSelect
                minDate={new Date()}
                dateFormat="Pp"
                placeholderText="Select date and time"
                className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500"
              />
            )}
          />
          {errors.appointmentDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.appointmentDate.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="w-full"
          disabled={!appointmentDate}
        >
          Book Appointment
        </Button>
      </form>
    </div>
  );
}
