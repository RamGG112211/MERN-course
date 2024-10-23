# API INTEGRATION

## Signup form

### components/auth/SignupForm.jsx

```bash
        /* eslint-disable react/prop-types */
        // src/components/auth/SignupForm.jsx
        import { useState } from "react";

        const SignupForm = ({ onSubmit }) => {
        const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        });

        const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
        };

        const handleSubmit = (e) => {
        e.preventDefault();
        // Pass form data to the parent component or API call
        onSubmit(formData);
        };

        return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
                Create Account
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
                >
                Full Name
                </label>
                <input
                type="text"
                name="fullName"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="John Doe"
                required
                />
                </div>
                <div>
                <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
                >
                Email
                </label>
                <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="johndoe@example.com"
                required
                />
                </div>
                <div>
                <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
                >
                Password
                </label>
                <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="••••••••"
                required
                />
                </div>
                <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                Sign Up
                </button>
                </form>
                <p className="mt-6 text-center text-gray-500 text-sm">
                Already have an account?{" "}
                <a href="/user/login" className="text-blue-600 hover:underline">
                Log In
                </a>
                </p>
        </div>
        </div>
        );
        };

        export default SignupForm;


```

## Signup page

### File: pages/auth/SignuPage.jsx

```bash
        // src/pages/auth/SignupPage.jsx
        import SignupForm from "../../components/auth/SignupForm";
        import { useNavigate } from "react-router-dom";
        import { apiRequest } from "../../utils/auth/apiRequest";

        const SignupPage = () => {
        const navigate = useNavigate();

        const handleSignup = async (formData) => {
        try {
        const user = await apiRequest({
                method: "POST",
                url: "/users",
                data: formData,
        });
        console.log("User created:", user);
        navigate("/user/login"); // Redirect to login after successful signup
        } catch (error) {
        console.error("Error creating user:", error.message || "Unknown error");
        }
        };

        return <SignupForm onSubmit={handleSignup} />;
        };

        export default SignupPage;

```

## Login Form

### File: components/auth/LoginForm.jsx

```bash
       /* eslint-disable react/prop-types */
        // src/components/auth/LoginForm.jsx
        import { useState } from "react";

        const LoginForm = ({ onSubmit }) => {
        const [formData, setFormData] = useState({
        email: "",
        password: "",
        });

        const [error, setError] = useState("");
        const [isSubmitting, setIsSubmitting] = useState(false);

        const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
        };

        const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
        await onSubmit(formData);
        } catch (err) {
        setError(err.message || "An error occurred. Please try again.");
        } finally {
        setIsSubmitting(false);
        }
        };

        return (
        <div className="max-w-md mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                <label className="block text-gray-700">Email</label>
                <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                required
                />
                </div>

                <div>
                <label className="block text-gray-700">Password</label>
                <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                required
                />
                </div>

                <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300"
                disabled={isSubmitting}
                >
                {isSubmitting ? "Logging in..." : "Login"}
                </button>
        </form>
        </div>
        );
        };

        export default LoginForm;


```

## Login Page

### File: pages/auth/LoginPage.jsx

```bash
        // src/pages/auth/LoginPage.jsx
        import { useNavigate } from "react-router-dom";
        import LoginForm from "../../components/auth/LoginForm";
        import { apiRequest } from "../../utils/auth/apiRequest";

        const LoginPage = () => {
        const navigate = useNavigate();

        const handleLogin = async (formData) => {
        try {
        // Make API request to login
        const { token, user } = await apiRequest({
                method: "POST",
                url: "/users/login", // Backend login endpoint
                data: formData,
        });

        const userData = { token, user };
        // Store the token in localStorage under the key 'doctor_portal_user'
        localStorage.setItem("doctor_portal_user", JSON.stringify(userData));

        // Redirect to the desired page (e.g., user dashboard)
        navigate("/dashboard");
        } catch (error) {
        throw new Error(error.message || "Login failed");
        }
        };

        return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <LoginForm onSubmit={handleLogin} />
        </div>
        );
        };

        export default LoginPage;

```

## App main

### File: App.jsx

```bash
        import "./App.css";
        import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
        import SignupPage from "./pages/auth/SignupPage";
        import LoginPage from "./pages/auth/LoginPage";

        function App() {
        return (
        <Router>
        <Routes>
        <Route path="/user/signup" element={<SignupPage />} />
        <Route path="/user/login" element={<LoginPage />} />

        {/* Other routes like login can go here */}
        </Routes>
        </Router>
        );
        }

        export default App;


```

.

## api request utitlity function

### File: utils/auth/apiRequest.js

```bash
        import axios from "axios";

        const API_BASE_URL = "http://localhost:3001"; // Replace with your API base URL

        export const apiRequest = async ({
        method,
        url,
        data = null,
        params = null,
        token = null, // Token passed from the frontend
        }) => {
        try {
        const response = await axios({
        method, // HTTP method ('GET', 'POST', 'PUT', 'DELETE')
        url: `${API_BASE_URL}${url}`, // API endpoint
        data, // Data for POST, PUT, PATCH
        params, // Query params for GET requests
        headers: token ? { authorization: `Bearer ${token}` } : {}, // Add the token if it exists
        });
        return response.data;
        } catch (error) {
        throw error.response ? error.response.data : { message: error.message };
        }
        };


```

## Install MUI Core

```bash
        npm install @mui/material @emotion/react @emotion/styled

```

## Doctor signup form

### File: components/auth/DoctorSignupForm.jsx

```bash
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

```

## Doctor signup page

### File: pages/auth/DoctorSignupPage.jsx

```bash
        // src/pages/auth/DoctorSignupPage.jsx
        import DoctorSignupForm from "../../components/auth/DoctorSignupForm";
        import { Container } from "@mui/material";
        import { apiRequest } from "../../utils/auth/apiRequest";

        const DoctorSignupPage = () => {
        const onSubmit = async (formData) => {
        try {
                const response = await apiRequest({
                method: "POST",
                url: "/doctors",
                data: formData,
                });
                console.log("Doctor signup successful:", response);
                // Handle successful signup (e.g., show a success message, redirect, etc.)
        } catch (error) {
                console.error("Error signing up doctor:", error);
                // Handle error (e.g., show an error message)
        }
        };
        return (
        <Container
        style={{
                minHeight: "100vh",
                backgroundColor: "#f5f5f5",
                padding: "50px 20px",
        }}
        >
        <DoctorSignupForm onSubmit={onSubmit} />
        </Container>
        );
        };

        export default DoctorSignupPage;

```

## Hospital signup form

### File: components/auth/HospitalSignupForm.jsx

```bash

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

```

## Hospital signup page

### File: pages/auth/HospitalSignupForm.jsx

```bash
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

```

## update App.jsx

```bash
        import "./App.css";
        import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
        import SignupPage from "./pages/auth/SignupPage";
        import LoginPage from "./pages/auth/LoginPage";
        import DoctorSignupPage from "./pages/auth/DoctorSignupPage";
        import HospitalSignupPage from "./pages/auth/HospitalSignupPage";

        function App() {
        return (
        <Router>
        <Routes>
                <Route path="/user/signup" element={<SignupPage />} />
                <Route path="/user/login" element={<LoginPage />} />
                <Route path="/doctor/signup" element={<DoctorSignupPage />} />

                <Route path="/hospital/signup" element={<HospitalSignupPage />} />

                {/* Other routes like login can go here */}
        </Routes>
        </Router>
        );
        }

        export default App;

```


### update doctor signup form for doctor profile upload
```bash
<form onSubmit={handleSubmit} noValidate autoComplete="off" encType="multipart/form-data">
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
    onChange={(e) => setFormData({ ...formData, profileImage: e.target.files[0] })}
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


```

### update onSubmit function doctorSignupPage
```bash
const onSubmit = async (formData) => {
  try {
    // Create a new FormData object to handle both form data and the file upload
    const formDataToSend = new FormData();
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("specialization", formData.specialization);
    formDataToSend.append("qualification", formData.qualification);
    formDataToSend.append("experienceYears", formData.experienceYears);
    formDataToSend.append("clinicAddress", formData.clinicAddress);

    // Append the hospitalIds array (if available) to FormData
    if (formData.hospitalIds.length > 0) {
      formData.hospitalIds.forEach((id) => {
        formDataToSend.append("hospitalIds[]", id);
      });
    }

    // Append the profile image (file)
    if (formData.profileImage) {
      formDataToSend.append("profileImage", formData.profileImage);
    }

    const response = await apiRequest({
      method: "POST",
      url: "/doctors",
      data: formDataToSend,
      headers: {
        "Content-Type": "multipart/form-data", // Important for handling file uploads
      },
    });

    console.log("Doctor signup successful:", response);
    // Handle successful signup (e.g., show a success message, redirect, etc.)
  } catch (error) {
    console.error("Error signing up doctor:", error);
    // Handle error (e.g., show an error message)
  }
};

```