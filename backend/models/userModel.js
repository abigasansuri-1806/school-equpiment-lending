// This file defines a User model for MongoDB using Mongoose.
// It handles user registration, password hashing, and login authentication securely.

import mongoose from "mongoose"; //Used to define schemas and interact with MongoDB.
import bcrypt from "bcryptjs"; //Used to hash and compare passwords (so plain text passwords are never stored in the database).

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "warden", "staff"], default: "student" }
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); //checks if the password field was changed (e.g. when registering or changing password).If not changed → skip hashing (important when updating other fields).
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password on login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema); //This creates and exports the User model, which you can use elsewhere in your app
