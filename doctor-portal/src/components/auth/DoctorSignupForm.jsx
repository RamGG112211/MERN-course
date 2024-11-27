/* eslint-disable react/prop-types */
// src/components/auth/DoctorSignupForm.jsx
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Grid2,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiRequest } from "../../utils/auth/apiRequest";

const DoctorSignupForm = ({ onSubmit }) => {
  const [hospitals, setHospitals] = useState([]);

  const specializations = [
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
  ];

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await apiRequest({
          method: "GET",
          url: "/hospitals",
        });
        setHospitals(response); // Assuming the response is an array of hospitals
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };
    fetchHospitals();
  }, []);

  // Validation schema with Yup
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
    handleSubmit,
    control,
    formState: { errors },
    setValue,
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
    console.log("Form Data:", data);
    onSubmit(data);
  };

  return (
    <Grid2 container justifyContent="center" alignItems="center">
      <Grid2 item xs={12} sm={8} md={6} lg={4} maxWidth="sm">
        <Card variant="outlined">
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              align="center"
              gutterBottom
              sx={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "gray.700",
                marginBottom: "1.5rem",
              }}
            >
              Doctor Signup
            </Typography>
            <form onSubmit={handleSubmit(onFormSubmit)} noValidate >
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Full Name"
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Email"
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />

              <FormControl
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!errors.specialization}
              >
                <InputLabel>Specialization</InputLabel>
                <Controller
                  name="specialization"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Specialization">
                      {specializations.map((spec) => (
                        <MenuItem key={spec} value={spec}>
                          {spec}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <Typography variant="body2" color="error">
                  {errors.specialization?.message}
                </Typography>
              </FormControl>

              <FormControl
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!errors.hospitalIds}
              >
                <InputLabel>Hospitals</InputLabel>
                <Controller
                  name="hospitalIds"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      multiple
                      renderValue={(selected) =>
                        hospitals
                          .filter((hospital) => selected.includes(hospital._id))
                          .map((hospital) => hospital.hospitalName)
                          .join(", ")
                      }
                    >
                      {hospitals.map((hospital) => (
                        <MenuItem key={hospital._id} value={hospital._id}>
                          <Checkbox
                            checked={field.value.includes(hospital._id)}
                          />
                          <ListItemText primary={hospital.hospitalName} />
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <Typography variant="body2" color="error">
                  {errors.hospitalIds?.message}
                </Typography>
              </FormControl>

              <Controller
                name="profileImage"
                control={control}
                render={({ field }) => (
                  <input
                    type="file"
                    onChange={(e) => field.onChange(e.target.files[0])}
                    required
                  />
                )}
              />
              <Typography variant="body2" color="error">
                {errors.profileImage?.message}
              </Typography>
              
              <Controller
                name="pictures"
                control={control}
                render={({ field }) => (
                  <input
                    type="file"
                    multiple
                    onChange={(e) => {
                      // Convert FileList to an array and set it in the form state
                      field.onChange(Array.from(e.target.files));
                    }}
                    required
                  />
                )}
              />

              <Typography variant="body2" color="error">
                {errors.pictures?.message}
              </Typography>

              <Controller
                name="qualification"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Qualification"
                    error={!!errors.qualification}
                    helperText={errors.qualification?.message}
                  />
                )}
              />

              <Controller
                name="experienceYears"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Experience Years"
                    type="number"
                    error={!!errors.experienceYears}
                    helperText={errors.experienceYears?.message}
                  />
                )}
              />

              <Controller
                name="clinicAddress"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Clinic Address"
                    error={!!errors.clinicAddress}
                    helperText={errors.clinicAddress?.message}
                  />
                )}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "16px" }}
              >
                Sign Up
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
};

export default DoctorSignupForm;
