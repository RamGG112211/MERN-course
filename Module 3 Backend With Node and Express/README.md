# MODULE 3 BACKEND WITH NODEJS EXPRESSJS, INTEGRATION WITH MONGODB

# A Introduction to React.js

## 1. MONGODB and MONGOOSE ORM

### Setup mongodb and mongoose

- First, you need to install mongoose and express:

```bash
   npm install express mongoose

```

- Create a new file called server.js or index.js for your Express app.

```bash
        const express = require('express');
        const mongoose = require('mongoose');
        const app = express();
        const PORT = 3000;

        // Middleware to parse incoming requests with JSON payloads
        app.use(express.json());

        // Connect to MongoDB
        const connectDB = async () => {
        try {
            await mongoose.connect('mongodb://localhost:27017/myDatabase', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            });
            console.log('MongoDB connected');
        } catch (error) {
            console.error('MongoDB connection failed:', error);
            process.exit(1);
        }
        };

        // Define a sample route
        app.get('/', (req, res) => {
        res.send('Hello, Express with MongoDB!');
        });

        // Start the server after DB connection
        connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
        });

```

- You can externalize the MongoDB connection URL by using environment variables.

```bash
       MONGO_URI=mongodb://localhost:27017/myDatabase

```

- Then, modify your server.js to use dotenv to load the environment variables:

```bash
        import dotenv from 'dotenv';
        import userRoutes from './routes/users/index.js'; // Note the .js extension

        require('dotenv').config();

        const connectDB = async () => {
        try {
            await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            });
            console.log('MongoDB connected');
        } catch (error) {
            console.error('MongoDB connection failed:', error);
            process.exit(1);
        }
        };

        // Use the user routes
        app.use('/api/users', userRoutes);

```

## 2. Data modeling Visualisation

- link to doctor portal data model

```bash
        https://dbdiagram.io/d/doctor-portal-66efa91fa0828f8aa6a0c2ab
```

## 3. Data modeling in Express JS

### File: models/users/index.js

```bash
      const mongoose = require('mongoose');

    const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['User', 'Doctor', 'Hospital', 'Admin'],
        default: 'User'
    }
    }, { timestamps: true });

    module.exports = mongoose.model('User', userSchema);


```

### File: models/doctors/index.js

```bash
      const mongoose = require('mongoose');

        const doctorSchema = new mongoose.Schema({
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        specialization: {
            type: String,
            required: true
        },
        qualification: {
            type: String,
            required: true
        },
        experienceYears: {
            type: Number,
            required: true
        },
        clinicAddress: {
            type: String
        }
        }, { timestamps: true });

        module.exports = mongoose.model('Doctor', doctorSchema);



```

### File: models/hospitals/index.js

```bash
      const mongoose = require('mongoose');

        const hospitalSchema = new mongoose.Schema({
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        hospitalName: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        departments: {
            type: String
        },
        contactInfo: {
            type: String
        }
        }, { timestamps: true });

        module.exports = mongoose.model('Hospital', hospitalSchema);


```

### File: models/doctorHospitals/index.js

```bash
      const mongoose = require('mongoose');

        const doctorHospitalSchema = new mongoose.Schema({
        doctor_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor',
            required: true
        },
        hospital_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hospital',
            required: true
        }
        }, { timestamps: true });

        module.exports = mongoose.model('DoctorHospital', doctorHospitalSchema);



```

### File: models/bookings/index.js

```bash
        const mongoose = require('mongoose');

        const bookingSchema = new mongoose.Schema({
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        doctor_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor',
            required: true
        },
        appointmentDate: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ['Pending', 'Confirmed', 'Canceled'],
            default: 'Pending'
        }
        }, { timestamps: true });

        module.exports = mongoose.model('Booking', bookingSchema);



```

# JWT authentication, password encryption, and middleware for role-based access control.

1. Install Required Packages
   Make sure you have the following packages installed for password hashing and JWT:

```bash
        npm install bcryptjs jsonwebtoken

```

2. Add controllers in user controller in file controllers/users/index.js as

```bash
        import User from '../../models/users/index.js';
        import bcrypt from 'bcryptjs';
        import jwt from 'jsonwebtoken';

        export const signup = async (req, res) => {
        const { fullName, email, password } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            });

            await newUser.save();
            res.status(201).json({ message: 'User created successfully' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
        };

        export const login = async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ message: 'User not found' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token, user });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
        };

```

3. Add controllers in user controller in file routes/users/index.js as

```bash
        import express from 'express';
        import { signup, login } from '../../controllers/users/index.js';
        import { authMiddleware } from '../../middlewares/auth/index.js';

        const router = express.Router();

        // Signup route
        router.post('/signup', signup);

        // Login route
        router.post('/login', login);

        // Example protected route
        router.get('/protected', authMiddleware(['User', 'Doctor']), (req, res) => {
        res.json({ message: 'Access granted to protected route' });
        });

        export default router;

```

4. Add Middleware for Role-Based Access: middlewares/auth/index.js

```bash
        import jwt from 'jsonwebtoken';

        export const authMiddleware = (allowedRoles) => {
        return (req, res, next) => {
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) return res.status(401).json({ message: 'Unauthorized' });

            try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!allowedRoles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            req.user = decoded;
            next();
            } catch (err) {
            res.status(401).json({ message: 'Invalid token' });
            }
        };
        };

```

# User Controllers in controllers/users/index.js folder

```bash
       import User from '../models/users/index.js'; // Adjust the path based on your project structure
        import bcrypt from 'bcryptjs';
        import jwt from 'jsonwebtoken';

        // Create a new user
        export const createUser = async (req, res) => {
        const { fullName, email, password } = req.body;

        try {
            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) return res.status(400).json({ message: 'User already exists' });

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 12);

            // Create new user
            const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            role: 'User', // Default to 'User' role
            });

            await newUser.save();

            res.status(201).json({ user: newUser });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        };

        // Get all users
        export const getUsers = async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        };

        // Get user by ID
        export const getUserById = async (req, res) => {
        const { id } = req.params;

        try {
            const user = await User.findById(id);
            if (!user) return res.status(404).json({ message: 'User not found' });

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        };

        // Update user (PUT - full update)
        export const updateUser = async (req, res) => {
        const { id } = req.params;
        const { fullName, email, password, role } = req.body;

        try {
            // Find user by ID
            let user = await User.findById(id);
            if (!user) return res.status(404).json({ message: 'User not found' });

            // Hash new password if it's provided
            let hashedPassword = user.password;
            if (password) {
            hashedPassword = await bcrypt.hash(password, 12);
            }

            // Update user details
            user = await User.findByIdAndUpdate(
            id,
            {
                fullName,
                email,
                password: hashedPassword,
                role,
            },
            { new: true }
            );

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        };

        // Patch user (PATCH - partial update)
        export const patchUser = async (req, res) => {
        const { id } = req.params;
        const updates = req.body; // { fullName: 'new name', ... }

        try {
            // If password is included in the updates, hash it
            if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 12);
            }

            // Find user by ID and apply partial update
            const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

            if (!updatedUser) return res.status(404).json({ message: 'User not found' });

            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        };

        // Delete user
        export const deleteUser = async (req, res) => {
        const { id } = req.params;

        try {
            const deletedUser = await User.findByIdAndDelete(id);
            if (!deletedUser) return res.status(404).json({ message: 'User not found' });

            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        };


```

# User routes in routes/users/index.js folder

```bash

// routes/users/index.js

        import express from 'express';
        import {
            createUser,
            getUsers,
            getUserById,
            updateUser,
            patchUser,
            deleteUser
        } from '../../controllers/users'; // Adjust the path based on your project structure

        const router = express.Router();

        // Create a new user
        router.post('/', createUser);

        // Get all users
        router.get('/', authMiddleware(['Admin']), getUsers);

        // Get user by ID
        router.get('/:id', authMiddleware(['Admin', 'Doctor', 'User', 'Hospital']), getUserById);

        // Update user (PUT - full update)
        router.put('/:id', authMiddleware(['Admin', 'Doctor', 'User', 'Hospital']), updateUser);

        // Patch user (PATCH - partial update)
        router.patch('/:id', authMiddleware(['Admin', 'Doctor', 'User', 'Hospital']), patchUser);

        // Delete user
        router.delete('/:id', authMiddleware(['Admin', 'Doctor', 'User', 'Hospital']), deleteUser);

        // Check user role
        router.get('/check', authMiddleware([]), (req, res) => {
            // Assuming `req.user` is set by the authMiddleware after verifying the token
            return res.json({ role: req.user.role }); // Return the user's role
        });

        export default router;


```

# Doctor Controllers in controllers/doctors/index.js folder

```bash
        import Doctor from '../../models/doctors/index.js'; // Doctor model
        import DoctorHospital from '../../models/doctorHospitals/index.js'; // DoctorHospital model
        import Hospital from '../../models/hospitals/index.js'; // Hospital model

        export const createDoctor = async (req, res) => {
        const { fullName, email, password, specialization, qualification, experienceYears, clinicAddress, hospitalIds } = req.body;

        try {
            // Create user
            const newUser = new User({
                fullName,
                email,
                password // Make sure to hash the password before saving in a real application
            });
            const savedUser = await newUser.save();

            // Create doctor using the new user's _id as user_id
            const newDoctor = new Doctor({
                user_id: savedUser._id,
                specialization,
                qualification,
                experienceYears,
                clinicAddress
            });
            const savedDoctor = await newDoctor.save();

            // Handle hospital associations
            if (hospitalIds && hospitalIds.length > 0) {
                const doctorHospitalAssociations = hospitalIds.map((hospitalId) => ({
                    doctor_id: savedDoctor._id,
                    hospital_id: hospitalId,
                }));

                await DoctorHospital.insertMany(doctorHospitalAssociations);
            }

            res.status(201).json({ message: 'Doctor created and associated with hospitals', doctor: savedDoctor });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

        // Update a doctor and their hospital associations
        export const updateDoctor = async (req, res) => {
        const { id } = req.params;
        const { specialization, qualification, experienceYears, clinicAddress, hospitalIds } = req.body;

        try {
            // Update doctor details
            const updatedDoctor = await Doctor.findByIdAndUpdate(
            id,
            { specialization, qualification, experienceYears, clinicAddress },
            { new: true }
            );

            if (!updatedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
            }

            // Update hospital associations
            if (hospitalIds && hospitalIds.length > 0) {
            // Remove old associations
            await DoctorHospital.deleteMany({ doctor_id: id });

            // Add new associations
            const doctorHospitalAssociations = hospitalIds.map((hospitalId) => ({
                doctor_id: id,
                hospital_id: hospitalId,
            }));
            await DoctorHospital.insertMany(doctorHospitalAssociations);
            }

            res.status(200).json({ message: 'Doctor updated and hospital associations updated', doctor: updatedDoctor });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        };

        // Delete a doctor and associated DoctorHospital relationships
        export const deleteDoctor = async (req, res) => {
        const { id } = req.params;

        try {
            const deletedDoctor = await Doctor.findByIdAndDelete(id);

            if (!deletedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
            }

            // Remove all associations with hospitals
            await DoctorHospital.deleteMany({ doctor_id: id });

            res.status(200).json({ message: 'Doctor and associated hospital relations deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        };

        // Get a doctor and their associated hospitals
        export const getDoctorWithHospitals = async (req, res) => {
        const { id } = req.params;

        try {
            const doctor = await Doctor.findById(id);
            if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
            }

            // Get associated hospitals
            const hospitals = await DoctorHospital.find({ doctor_id: id }).populate('hospital_id');

            res.status(200).json({ doctor, hospitals });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        };


        // Get all doctors
        export const getDoctors = async (req, res) => {
        try {
            const doctors = await Doctor.find();
            res.status(200).json(doctors);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        };

```

# Doctor routes in routes/doctors/index.js folder

```bash
       // routes/doctors/index.js

        import express from 'express';
        import {
            createDoctor,
            updateDoctor,
            deleteDoctor,
            getDoctorWithHospitals
        } from '../../controllers/doctors/index.js'; // Adjust the path based on your project structure

        const router = express.Router();

        // Create a new doctor
        router.post('/', createDoctor);

        // Update a doctor
        router.put('/:id', authMiddleware(['Admin', 'Doctor']), updateDoctor);

        // Delete a doctor
        router.delete('/:id', authMiddleware(['Admin', 'Doctor']), deleteDoctor);

        // Get a doctor and their associated hospitals
        router.get('/:id/hospitals', getDoctorWithHospitals);

        router.get("/", getDoctors);


        export default router;

```

# Hospital Controllers in controllers/hospitals/index.js folder

```bash
       import Hospital from '../../models/hospitals/index.js'; // Hospital model
        import DoctorHospital from '../../models/doctorHospitals/index.js'; // DoctorHospital model
        import Doctor from '../../models/doctors/index.js'; // Doctor model

        // Create a new Hospital and associate with doctors
        export const createHospital = async (req, res) => {
        const {
            fullName,
            email,
            password,
            hospitalName,
            location,
            departments,
            contactInfo,
            doctorIds,
        } = req.body;

        try {
            // Create user
            const newUser = new User({
            fullName,
            email,
            password, // Make sure to hash the password before saving it
            });

            const savedUser = await newUser.save();

            // Create hospital with the newly created user's ID
            const newHospital = new Hospital({
            user_id: savedUser._id, // Use the ID of the created user
            hospitalName,
            location,
            departments,
            contactInfo,
            });

            const savedHospital = await newHospital.save();

            // Handle doctor associations
            if (doctorIds && doctorIds.length > 0) {
            const hospitalDoctorAssociations = doctorIds.map((doctorId) => ({
                doctor_id: doctorId,
                hospital_id: savedHospital._id,
            }));

            await DoctorHospital.insertMany(hospitalDoctorAssociations);
            }

            res.status(201).json({
            message: "Hospital created and associated with doctors",
            hospital: savedHospital,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        };

        // Update a hospital and their doctor associations
        export const updateHospital = async (req, res) => {
        const { id } = req.params;
        const { hospitalName, location, departments, contactInfo, doctorIds } = req.body;

        try {
            // Update hospital details
            const updatedHospital = await Hospital.findByIdAndUpdate(
            id,
            { hospitalName, location, departments, contactInfo },
            { new: true }
            );

            if (!updatedHospital) {
            return res.status(404).json({ message: 'Hospital not found' });
            }

            // Update doctor associations
            if (doctorIds && doctorIds.length > 0) {
            // Remove old associations
            await DoctorHospital.deleteMany({ hospital_id: id });

            // Add new associations
            const hospitalDoctorAssociations = doctorIds.map((doctorId) => ({
                doctor_id: doctorId,
                hospital_id: id,
            }));
            await DoctorHospital.insertMany(hospitalDoctorAssociations);
            }

            res.status(200).json({ message: 'Hospital updated and doctor associations updated', hospital: updatedHospital });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        };

        // Delete a hospital and associated DoctorHospital relationships
        export const deleteHospital = async (req, res) => {
        const { id } = req.params;

        try {
            const deletedHospital = await Hospital.findByIdAndDelete(id);

            if (!deletedHospital) {
            return res.status(404).json({ message: 'Hospital not found' });
            }

            // Remove all associations with doctors
            await DoctorHospital.deleteMany({ hospital_id: id });

            res.status(200).json({ message: 'Hospital and associated doctor relations deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        };

        // Get a hospital and their associated doctors
        export const getHospitalWithDoctors = async (req, res) => {
        const { id } = req.params;

        try {
            const hospital = await Hospital.findById(id);
            if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
            }

            // Get associated doctors
            const doctors = await DoctorHospital.find({ hospital_id: id }).populate('doctor_id');

            res.status(200).json({ hospital, doctors });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        };

        // Get all hospitals
        export const getHospitals = async (req, res) => {
        try {
            const hospitals = await Hospital.find();
            res.status(200).json(hospitals);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        };

```

# Hospital Routes in routes/hospitals/index.js folder

```bash
       // routes/hospitals/index.js

        import express from 'express';
        import {
            createHospital,
            updateHospital,
            deleteHospital,
            getHospitalWithDoctors
        } from '../../controllers/hospitals/index.js'; // Adjust the path based on your project structure

        const router = express.Router();

        // Create a new hospital
        router.post('/', createHospital);

        // Update a hospital
        router.put('/:id', authMiddleware(['Admin', 'Hospital']), updateHospital);

        // Delete a hospital
        router.delete('/:id', authMiddleware(['Admin', 'Hospital']),  deleteHospital);

        // Get a hospital and their associated doctors
        router.get('/:id/doctors', getHospitalWithDoctors);

        router.get("/", getHospitals);


        export default router;


```

# Bookings Controllers in controllers/bookings/index.js folder

```bash
        import Booking from '../../models/bookings/index.js'; // Booking model
        import Doctor from '../../models/doctors/index.js'; // Doctor model
        import User from '../../models/users/index.js'; // User model

        // Create a new booking
        export const createBooking = async (req, res) => {
        const { user_id, doctor_id, appointmentDate } = req.body;

        try {
            // Check if the user and doctor exist
            const user = await User.findById(user_id);
            const doctor = await Doctor.findById(doctor_id);

            if (!user) {
            return res.status(404).json({ message: 'User not found' });
            }
            if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
            }

            // Create booking
            const newBooking = new Booking({
            user_id,
            doctor_id,
            appointmentDate
            });
            const savedBooking = await newBooking.save();

            res.status(201).json({ message: 'Booking created', booking: savedBooking });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        };

        // Update a booking
        export const updateBooking = async (req, res) => {
        const { id } = req.params;
        const { appointmentDate, status } = req.body;

        try {
            const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            { appointmentDate, status },
            { new: true }
            );

            if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
            }

            res.status(200).json({ message: 'Booking updated', booking: updatedBooking });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        };

        // Delete a booking
        export const deleteBooking = async (req, res) => {
        const { id } = req.params;

        try {
            const deletedBooking = await Booking.findByIdAndDelete(id);

            if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
            }

            res.status(200).json({ message: 'Booking deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        };

        // Get a booking by ID
        export const getBookingById = async (req, res) => {
        const { id } = req.params;

        try {
            const booking = await Booking.findById(id).populate('user_id').populate('doctor_id');

            if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
            }

            res.status(200).json({ booking });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        };

        // Get all bookings
        export const getAllBookings = async (req, res) => {
        try {
            const bookings = await Booking.find().populate('user_id').populate('doctor_id');
            res.status(200).json({ bookings });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        };

```

# Bookings routes in routes/bookings/index.js folder

```bash
       // routes/bookings/index.js

        import express from 'express';
        import {
            createBooking,
            updateBooking,
            deleteBooking,
            getBookingById,
            getAllBookings
        } from '../../controllers/bookings/index.js'; // Adjust the path as per your project structure

        const router = express.Router();

        // Create a new booking
        router.post('/', authMiddleware(['Admin', 'User', 'Doctor']), createBooking);

        // Update a booking
        router.put('/:id', authMiddleware(['Admin', 'Doctor', 'User']), updateBooking);

        // Delete a booking
        router.delete('/:id', authMiddleware(['Admin', 'Doctor']), deleteBooking);

        // Get a booking by ID
        router.get('/:id', getBookingById);

        // Get all bookings
        router.get('/', authMiddleware(['Admin', 'Doctor']),  getAllBookings);

        export default router;


```

# Server.js

```bash
        import express from "express";
        import mongoose from "mongoose";
        import dotenv from "dotenv";
        // Import Routes
        import userRoutes from "./routes/users/index.js"; // User routes
        import hospitalRoutes from "./routes/hospitals/index.js"; // Hospital routes
        import bookingRoutes from "./routes/bookings/index.js"; // Booking routes
        import doctorRoutes from "./routes/doctors/index.js"; // Doctor routes
        import cors from "cors";

        // Initialize dotenv
        dotenv.config();

        // Enable CORS for all routes

        const app = express();
        const port = process.env.PORT || 3001; // Use environment variable for PORT, fallback to 3001
        app.use(cors());

        // Connect to MongoDB
        const connectDB = async () => {
        try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log("MongoDB connected");
        } catch (error) {
            console.error("MongoDB connection failed:", error);
            process.exit(1);
        }
        };

        app.use(express.json()); // Middleware to parse JSON

        // Define routes
        app.use("/users", userRoutes); // User routes
        app.use("/hospitals", hospitalRoutes); // Hospital routes
        app.use("/bookings", bookingRoutes); // Booking routes
        app.use("/doctors", doctorRoutes); // Doctor routes

        // Start the server after DB connection
        connectDB().then(() => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
        });


```

# Image file handling

### 1. Install Multer

```bash
npm install multer

```

### 2. Set up multer

```bash
import multer from 'multer';
import path from 'path';

// Set up storage with Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name with extension
  },
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, JPG, and PNG files are allowed'), false);
  }
};

// Set up Multer middleware
const upload = multer({
  storage,
  fileFilter,
});

```

### 3. Update Doctor Schema to Include profileImage

```bash
import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    experienceYears: {
      type: Number,
      required: true,
    },
    clinicAddress: {
      type: String,
    },
    profile: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);

```

### 4. update controllers

```bash
export const createDoctor = async (req, res) => {
  const {
    fullName,
    email,
    password,
    specialization,
    qualification,
    experienceYears,
    clinicAddress,
    hospitalIds,
  } = req.body;

  try {
    // Create user
    const newUser = new User({
      fullName,
      email,
      password, // Make sure to hash the password before saving in a real application
    });
    const savedUser = await newUser.save();

    // Create doctor with profile image
    const newDoctor = new Doctor({
      user_id: savedUser._id,
      specialization,
      qualification,
      experienceYears,
      clinicAddress,
      profileImage: req.file ? `/uploads/${req.file.filename}` : '', // Save image path
    });
    const savedDoctor = await newDoctor.save();

    // Handle hospital associations
    if (hospitalIds && hospitalIds.length > 0) {
      const doctorHospitalAssociations = hospitalIds.map((hospitalId) => ({
        doctor_id: savedDoctor._id,
        hospital_id: hospitalId,
      }));

      await DoctorHospital.insertMany(doctorHospitalAssociations);
    }

    res.status(201).json({
      message: "Doctor created and associated with hospitals",
      doctor: savedDoctor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  export const updateDoctor = async (req, res) => {
  const { id } = req.params;
  const {
    specialization,
    qualification,
    experienceYears,
    clinicAddress,
    hospitalIds,
  } = req.body;

  try {
    // Fetch the existing doctor
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Update doctor details
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      {
        specialization,
        qualification,
        experienceYears,
        clinicAddress,
        profileImage: req.file ? `/uploads/${req.file.filename}` : doctor.profileImage, // Update image if uploaded, otherwise retain old one
      },
      { new: true }
    );

    // Update hospital associations
    if (hospitalIds && hospitalIds.length > 0) {
      // Remove old associations
      await DoctorHospital.deleteMany({ doctor_id: id });

      // Add new associations
      const doctorHospitalAssociations = hospitalIds.map((hospitalId) => ({
        doctor_id: id,
        hospital_id: hospitalId,
      }));
      await DoctorHospital.insertMany(doctorHospitalAssociations);
    }

    res.status(200).json({
      message: "Doctor updated and hospital associations updated",
      doctor: updatedDoctor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

```

### 5. update routes

```bash
// Create a new doctor
router.post("/", upload.single('profileImage'),createDoctor);

// Update a doctor
router.put("/:id",upload.single('profileImage'), authMiddleware(["Admin", "Doctor"]), updateDoctor);
```

### 6. serve the static images

```bash
app.use('/uploads', express.static('uploads'));

```

### Video call integration

### 1. install packages

```bash
    npm install socket.io
```

### 2. server.js

```bash

// Start the server after DB connection
connectDB().then(() => {
  const server = http.createServer(app);

  const websocketServer = new WebSocketServer({
    noServer: true,
    path: "/websockets",
  });

  server.on("upgrade", (request, socket, head) => {
    websocketServer.handleUpgrade(request, socket, head, (ws) => {
      websocketServer.emit("connection", ws, request);
    });
  });

  websocketServer.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", async (message) => {
      const data = JSON.parse(message);

      if (data.type === "register") {
        clients[data.userId] = ws; // Register the client
        console.log(`User registered: ${data.userId}`);
      }

      if (data.type === "appointment-call") {
        const { userId, doctorId } = data;

        // Find the booking by userId and doctorId
        const booking = await Booking.findOne({
          user_id: userId,
          doctor_id: doctorId,
        }).exec();

        if (booking) {
          const bookingId = booking._id.toString();

          // Send booking ID to both user and doctor
          if (clients[userId])
            clients[userId].send(
              JSON.stringify({ type: "appointment-call-incoming", bookingId })
            );
          if (clients[doctorId])
            clients[doctorId].send(
              JSON.stringify({ type: "appointment-call-incoming", bookingId })
            );
        } else {
          console.log("Booking not found");
        }
      }
    });

    ws.on("close", () => {
      // Clean up client disconnects if necessary
      console.log("Client disconnected");
    });
  });

  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});

```

### 3. controllers/booking/index.js

```bash
// Get a booking by userId and doctorId
export const getBookingByUserAndDoctor = async (req, res) => {
  const { userId, doctorId } = req.query; // Use req.params if you define them in URL

  try {
    const booking = await Booking.findOne({
      user_id: userId,
      doctor_id: doctorId,
    })
      .populate("user_id")
      .populate("doctor_id");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

### 4. routes/booking/index.js

```bash
router.get("/booking", getBookingByUserAndDoctor); // Using query parameters

```
