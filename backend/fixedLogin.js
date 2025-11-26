import User from "./models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({ 
                message: "All fields are required", 
                success: false 
            });
        }
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ 
                message: "User not found", 
                success: false 
            });
        }
        
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ 
                message: "Invalid password", 
                success: false 
            });
        }

        if (role !== user.role) {
            return res.status(400).json({ 
                message: "Role mismatch", 
                success: false 
            });
        }
        
        const token = jwt.sign(
            { userId: user._id }, 
            process.env.SECRET_KEY, 
            { expiresIn: '1d' }
        );

        const userResponse = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };
        
        return res.status(200)
            .cookie("token", token, { 
                maxAge: 24 * 60 * 60 * 1000, 
                httpOnly: true, 
                sameSite: 'strict' 
            })
            .json({
                message: `Welcome back ${user.fullname}`,
                user: userResponse,
                success: true
            });
            
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ 
            message: "Server error", 
            success: false 
        });
    }
};

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        
        if (!fullname || !email || !password || !role) {
            return res.status(400).json({ 
                message: "All fields are required", 
                success: false 
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                message: "User already exists", 
                success: false 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {}
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        });
        
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ 
            message: "Server error", 
            success: false 
        });
    }
};

export const logout = async (req, res) => {
    try {
        const cookieOptions = {
            httpOnly: true,
            sameSite: 'strict',
            path: '/',
            secure: process.env.NODE_ENV === 'production'
        };
        res.clearCookie('token', cookieOptions);
        return res.status(200).json({
            message: "Logged out successfully",
            success: true
        });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({ 
            message: "Server error", 
            success: false 
        });
    }
};