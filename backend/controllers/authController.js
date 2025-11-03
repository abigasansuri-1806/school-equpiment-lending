//This code handles user registration and login in a Node.js + Express app.
//It works with the User model you showed earlier and issues a JWT token for authenticated access.

import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

//JWTs are used for securely transmitting information as a JSON object between parties, most commonly for API authentication and authorization. They function as a stateless authentication method, meaning the server doesn't need to store session data because the token itself contains user identity and permissions
//Creates a JWT token containing the user’s id and role. Uses a secret key (process.env.JWT_SECRET) to sign the token — stored in your .env file for security. Sets the token to expire in 7 days. Why include role? Because later, you can easily restrict access based on role (e.g. “only wardens can approve requests”).
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Signup
// await - Used inside an async function to pause its execution until a Promise resolves or rejects.
// async - An async function implicitly returns a Promise
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password, role });
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id, user.role);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
