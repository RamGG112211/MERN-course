import User from "../../models/users/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Doctor from "../../models/doctors/index.js";
import nodemailer from "nodemailer";

export const signup = async (req, res, next) => {
  const { fullName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    // Check if the role is Doctor and populate the doctor object
    if (user.role === "Doctor") {
      const doctor = await Doctor.findOne({ user_id: user._id }).populate(
        "user_id"
      );
      if (!doctor) return res.status(404).json({ message: "Doctor not found" });
      return res.json({ token, user: doctor }); // Return the doctor object
    }

    // If the role is not Doctor, return the user object
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  // /api/doctors/:id
  // req.params.id
  // req.body

  ///api/doctors?name=j438743
  //req.query.name

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role: "User", // Default to 'User' role
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
    if (!user) return res.status(404).json({ message: "User not found" });

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
    if (!user) return res.status(404).json({ message: "User not found" });

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
    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

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
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const token = jwt.sign({ email, otp }, process.env.JWT_SECRET, {
      expiresIn: "5m", // OTP valid for 5 minutes
    });

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP sent to email", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const verifyOtp = (req, res) => {
  const { token, otp } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(400).json({ message: "OTP expired" });
    }
    res.status(500).json({ message: err.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate reset token
    const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1d", // Token valid for 1 day
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const resetLink = `${req.protocol}://${req.get(
      "host"
    )}/reset-password/${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset Request",
      text: `You requested to reset your password. Use the following link: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset link sent to email" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email: decoded.email });
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found or invalid token" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(400).json({ message: "Reset link expired" });
    }
    res.status(500).json({ message: err.message });
  }
};
