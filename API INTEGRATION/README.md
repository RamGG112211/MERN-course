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
        // src/utils/auth/apiRequest.js
        import axios from "axios";

        const API_BASE_URL = "http://localhost:3001"; // Replace with your API base URL

        export const apiRequest = async ({
        method,
        url,
        data = null,
        params = null,
        }) => {
        try {
        const response = await axios({
        method, // HTTP method ('GET', 'POST', 'PUT', 'DELETE')
        url: `${API_BASE_URL}${url}`, // API endpoint
        data, // Data for POST, PUT, PATCH
        params, // Query params for GET requests
        });
        return response.data;
        } catch (error) {
        throw error.response ? error.response.data : { message: error.message };
        }
        };

```

