import User from "../models/userModel.js";
import validattor from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import e from "express";

const JWT_SECRET ='your_jwt_secret_key';
const TOKEN_EXPIRY = '24h'; // Token expires in 24 hours

const createteToken = (userId) => 
    jwt.sign({id, userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });


// REGISTER USER
export async function registerUser(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ 
            success: false,
            message: "Please fill all the fields"
         });
    }

    if (!validattor.isEmail(email)) {
        return res.status(400).json({ 
            success: false,
            message: "Please enter a valid email"
         });
    }
    if (password.length < 8) {
        return res.status(400).json({ 
            success: false,
            message: "Password must be at least 8 characters long"
         });
    }
    try {
        if (await User.findOne({ email })) {
            return res.status(400).json({ 
                success: false,
                message: "User already exists"
             });
        }
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashed});
            const token = user.createteToken(user._id);
            res.status(201).json({
                success: true,
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                },
              
            });
    } catch (error) {
        console;error(error);
        res.status(500).json({ 
            success: false,
            message: "Server error"
         });
    }
}


//to login user
export async function loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ 
            success: false,
            message: "Please fill all the fields"
         });
    }   
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid credentials"
             });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid credentials"
             });
        }

        const token = createteToken(user._id);
        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: "Server error"
         });
    }
}

// to get user data
export async function getUserData(req, res) {
    try {
        const user = await User.findById(req.user.Id).select("name email");
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: "User not found"
             });
        }
        res.json({
            success: true,
            user
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: "Server error"
         });
        
    }
}

// to update user data
export async function updateUserData(req, res) {
    const { name, email } = req.body;
    const userId = req.userId;

    if (!name || !email  || !validattor.isEmail(email)) {
        return res.status(400).json({ 
            success: false,
            message: "Please fill all the fields"
         });
    }
    try {
        const exists = await User.findOne({ email, _id: {$ne: req.user} });
        if (exists) {
            return res.status(409).json({ 
                success: false,
                message: "User already exists"
             });
        }
        const user = await User.findByIdAndUpdate(req.user.id, { name, email }, { new: true, runValidators: true, select: "name email" });
        res.json({
            success: true,
            user
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: "Server error"
         });
    }
}


//to change password
export async function updatePassword(req, res) {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword || newPassword.length < 8) {
        return res.status(400).json({ 
            success: false,
            message: "Password is invalid or too short"
         });
    }
    try {
        const user = await User.findById(req.user.id).select("password");
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: "User not found"
             });
        }
        const match = await bcrypt.compare(currentPassword, user.password);
        if (!match) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid credentials"
             });
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.json({
            success: true,
            message: "Password changed successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: "Server error"
         });
    }
}   
