/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiRequest } from "../../utils/auth/apiRequest";

const DoctorSignupForm2 = ({ onSubmit }) => {
  const [hospitals, setHospitals] = useState([
    { hospitalName: "Hospital1", _id: 1 },
    { hospitalName: "Hospital2", _id: 2 },
  ]);
  const [profilePreview, setProfilePreview] = useState(null);
  const [picturePreviews, setPicturePreviews] = useState([]);
  const [selectedHospitals, setSelectedHospitals] = useState([]);

  const specializations = [
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
  ];

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    specialization: Yup.string().required("Specialization is required"),
    qualification: Yup.string().required("Qualification is required"),
    experienceYears: Yup.number()
      .typeError("Must be a number")
      .required("Experience Years are required"),
    clinicAddress: Yup.string().required("Clinic Address is required"),
    hospitalIds: Yup.array().min(1, "Select at least one hospital"),
    profileImage: Yup.mixed().required("Profile image is required"),
    pictures: Yup.array()
      .min(1, "At least one image is required")
      .of(Yup.mixed().required("Image is required")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      specialization: "",
      qualification: "",
      experienceYears: "",
      clinicAddress: "",
      hospitalIds: [],
      profileImage: null,
      pictures: [],
    },
  });

  const onFormSubmit = (data) => {
    data.hospitalIds = selectedHospitals; // Set selected hospitals
    onSubmit(data);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setValue("profileImage", file);
    setProfilePreview(URL.createObjectURL(file));
    trigger("profileImage"); // Manually trigger validation
  };

  const handlePicturesChange = (e) => {
    const files = Array.from(e.target.files);
    setValue("pictures", files);
    setPicturePreviews(files.map((file) => URL.createObjectURL(file)));
    trigger("pictures"); // Manually trigger validation
  };

  const handleHospitalSelection = (id) => {
    setSelectedHospitals((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((hospitalId) => hospitalId !== id)
        : [...prevSelected, id]
    );
    trigger("hospitalIds");
  };

  useEffect(() => {
    setValue("hospitalIds", selectedHospitals);
  }, [selectedHospitals]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Doctor Signup
        </h2>
        <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
          <input
            {...register("fullName")}
            className="w-full p-3 border border-gray-300 rounded mt-2"
            placeholder="Full Name"
          />
          <p className="text-red-500 text-sm">{errors.fullName?.message}</p>

          <input
            {...register("email")}
            type="email"
            className="w-full p-3 border border-gray-300 rounded mt-2"
            placeholder="Email"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>

          <input
            {...register("password")}
            type="password"
            className="w-full p-3 border border-gray-300 rounded mt-2"
            placeholder="Password"
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>

          <select
            {...register("specialization")}
            className="w-full p-3 border border-gray-300 rounded mt-2"
          >
            <option value="">Select Specialization</option>
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-sm">
            {errors.specialization?.message}
          </p>

          {/* Hospital Selection */}
          <div className="w-full border border-gray-300 rounded mt-2 p-3">
            <p className="font-semibold text-gray-700 mb-2">Select Hospitals</p>
            <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
              {hospitals.map((hospital) => (
                <label
                  key={hospital._id}
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => handleHospitalSelection(hospital._id)}
                >
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    checked={selectedHospitals.includes(hospital._id)}
                    onChange={() => handleHospitalSelection(hospital._id)}
                  />
                  <span className="text-gray-600">{hospital.hospitalName}</span>
                </label>
              ))}
            </div>
          </div>
          <p className="text-red-500 text-sm">{errors.hospitalIds?.message}</p>

          {/* Profile Image with preview */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleProfileImageChange(e);
            }}
          />
          {profilePreview && (
            <img
              src={profilePreview}
              alt="Profile Preview"
              className="w-24 h-24 mt-2 rounded"
            />
          )}
          <p className="text-red-500 text-sm">{errors.profileImage?.message}</p>

          {/* Pictures with previews */}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              handlePicturesChange(e);
            }}
          />
          <div className="flex mt-2 space-x-2">
            {picturePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Preview ${index}`}
                className="w-16 h-16 rounded"
              />
            ))}
          </div>
          <p className="text-red-500 text-sm">{errors.pictures?.message}</p>

          {/* Qualification */}
          <input
            {...register("qualification")}
            className="w-full p-3 border border-gray-300 rounded mt-2"
            placeholder="Qualification"
          />
          <p className="text-red-500 text-sm">
            {errors.qualification?.message}
          </p>

          {/* Experience Years */}
          <input
            {...register("experienceYears")}
            type="number"
            className="w-full p-3 border border-gray-300 rounded mt-2"
            placeholder="Experience Years"
          />
          <p className="text-red-500 text-sm">
            {errors.experienceYears?.message}
          </p>

          {/* Clinic Address */}
          <input
            {...register("clinicAddress")}
            className="w-full p-3 border border-gray-300 rounded mt-2"
            placeholder="Clinic Address"
          />
          <p className="text-red-500 text-sm">
            {errors.clinicAddress?.message}
          </p>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded mt-4"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorSignupForm2;
