/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid2,
  Box,
} from "@mui/material";
import { apiRequest } from "../../utils/auth/apiRequest";

const HospitalSignupForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    hospitalName: "",
    location: "",
    departments: "",
    contactInfo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiRequest({
        method: "POST",
        url: "/hospitals", // Assuming you have a POST endpoint for creating hospitals
        data: formData,
      });
      if (response) {
        onSubmit(response); // Handle the response as needed
      }
    } catch (error) {
      console.error("Error creating hospital:", error);
    }
  };

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
                }}
              >
                Hospital Signup
              </Typography>
            </Box>
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
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
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Hospital Name"
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Departments"
                name="departments"
                value={formData.departments}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Contact Info"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
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

export default HospitalSignupForm;
