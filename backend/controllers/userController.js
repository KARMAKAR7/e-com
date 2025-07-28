import express from 'express';
import userModel from '../models/userModel.js'; // Assuming you have a user model defined in models/userModel.js
import bcrypt from 'bcrypt'; // Assuming you are using bcrypt for password hashing
import jwt from 'jsonwebtoken'; // Assuming you are using JWT for authentication
import mongoose from 'mongoose';
import validator from 'validator'; // Assuming you are using validator for input validation
//route for user login

const CreateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '3d' // Token expiration time
    });
}

// route for user registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please Enetr a Valid Email" });
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please Enter a Strong Password" });
        }

        // Hash password

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new userModel({ name, email, password: hashedPassword });
        await newUser.save();
        // Generate JWT token (optional, if you want to return a token)
        const token = CreateToken(newUser._id);

        res.status(201).json({ succes: true, token, message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ succes: false, message: "Internal server error" });
    }
}
// route for user login
const loggedInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Check if user exists
        // Assuming userModel is imported from the user model file
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Check password (assuming passwords are hashed)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = CreateToken(user._id);
        res.status(200).json({ sucess: true, token, message: "Login successful", user });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ succes: true, token });
        } else {
            res.json({ succes: false, message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export { loggedInUser, registerUser, adminLogin };