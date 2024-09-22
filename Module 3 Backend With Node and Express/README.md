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
        },
        hospital_ids: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hospital'
        }]
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
            res.json({ token });
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
