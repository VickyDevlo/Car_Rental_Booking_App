import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Car from "../models/Cars.js";

//Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET);
};

//register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Fill all the fields" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be 8 characters",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role: "user",
    });

    const token = generateToken(user._id.toString());

    res.json({
      success: true,
      token,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id.toString());
    res.json({
      success: true,
      token,
      user,
      message: "User login successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};


// Change Password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user?._id;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.json({
        success: false,
        message: "Please provide both current and new passwords.",
      });
    }

    if (newPassword.length < 8) {
      return res.json({
        success: false,
        message: "New password must be at least 8 characters.",
      });
    }

    // Fetch user
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found." });
    }

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect current password." });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: "Password updated successfully." });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


// get user data using token (JWT)
export const getUserData = (req, res) => {
  try {
    const { user } = req;
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//get all cars for the frontend
export const getCars = async (req, res) => {
  try {
    const cars = await Car.find({ isAvailable: true });
    res.json({
      success: true,
      cars,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
