import bcrypt from "bcryptjs";
import User from "../../models/users/index.js";

const getUser = (req, res) => {
  const userId = req.params.id;
  return res.send(`Got user of ${userId} details`);
};

const getAllUsers = (req, res) => {
  return res.send("Got all user");
};

const updateUser = (req, res) => {
  return res.send("Got all user");
};

const deleteUser = (req, res) => {
  return res.send("Got all user");
};

const patchUser = (req, res) => {
  return res.send("Got all user");
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

export { getUser, getAllUsers, updateUser, deleteUser, patchUser, createUser };
