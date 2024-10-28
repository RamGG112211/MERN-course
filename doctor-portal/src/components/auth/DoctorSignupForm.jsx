/* eslint-disable react/prop-types */
// src/components/auth/DoctorSignupForm.jsx
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid2,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { apiRequest } from "../../utils/auth/apiRequest";

const DoctorSignupForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    specialization: "",
    qualification: "",
    experienceYears: "",
    clinicAddress: "",
    hospitalIds: [],
  });

  const specializations = [
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
  ];

  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await apiRequest({
          method: "GET",
          url: "/hospitals",
        });
        console.log("response hospitals: ", response);

        setHospitals(response); // Assuming the response is an array of hospitals
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

    fetchHospitals();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "hospitalIds") {
      console.log("value of hospital id: ", value);

      const currentIndex = formData.hospitalIds.indexOf(value[0]);
      console.log("current index", currentIndex);

      const newHospitalIds = [...value];

      //   if (currentIndex === -1) {
      //     newHospitalIds.push(...value); // Add hospital ID
      //   } else {
      //     newHospitalIds.splice(currentIndex, 1); // Remove hospital ID
      //   }

      // Update the form data state
      setFormData((prevData) => ({
        ...prevData,
        hospitalIds: newHospitalIds,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  useEffect(() => {
    console.log("form data: ", formData);
  }, [formData]);

  return (
    <Grid2 container justifyContent="center" alignItems="center">
      <Grid2 item xs={12} sm={8} md={6} lg={4} maxWidth="sm">
        <Card variant="outlined">
          <CardContent>
            <Box className="text-2xl font-bold mb-6 text-center text-gray-700">
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
                }} // MUI's sx prop for styling
              >
                Doctor Signup
              </Typography>
            </Box>
            <form
              onSubmit={handleSubmit}
              noValidate
              autoComplete="off"
              encType="multipart/form-data"
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel>Specialization</InputLabel>
                <Select
                  label="Specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                >
                  {specializations.map((spec) => (
                    <MenuItem key={spec} value={spec}>
                      {spec}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Hospital Selection */}
              {hospitals.length > 0 && (
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel>Hospitals</InputLabel>
                  <Select
                    label="Hospitals"
                    name="hospitalIds"
                    multiple
                    value={formData.hospitalIds}
                    onChange={handleChange}
                    renderValue={(selected) => {
                      const selectedHospitals = hospitals.filter((hospital) =>
                        selected.includes(hospital._id)
                      );
                      return selectedHospitals
                        .map((hospital) => hospital.hospitalName)
                        .join(", ");
                    }}
                  >
                    {hospitals.map((hospital) => (
                      <MenuItem key={hospital._id} value={hospital._id}>
                        <Checkbox
                          checked={
                            formData.hospitalIds.indexOf(hospital._id) > -1
                          }
                        />
                        <ListItemText primary={hospital.hospitalName} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {/* File Input for Doctor's Profile Image */}
              <input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, profileImage: e.target.files[0] })
                }
                required
              />

              <TextField
                fullWidth
                label="Qualification"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
              />
              <TextField
                fullWidth
                label="Experience Years"
                name="experienceYears"
                type="number"
                value={formData.experienceYears}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
              />
              <TextField
                fullWidth
                label="Clinic Address"
                name="clinicAddress"
                value={formData.clinicAddress}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
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
