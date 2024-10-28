import User from "../../models/users/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  const { fullName, email, password } = req.body;

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
