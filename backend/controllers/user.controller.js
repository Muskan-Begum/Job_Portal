import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

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
}
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
                message: "Incorrect email or password", 
                success: false 
            });
        }
        
        // Handle users without password (Google OAuth users)
        if (!user.password) {
            return res.status(401).json({ 
                message: "Please use Google login", 
                success: false 
            });
        }
        
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ 
                message: "Incorrect email or password", 
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
}
export const logout = async (req, res) => {
    try {
        // Clear the token cookie using the same cookie options used when setting it
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
        return res.status(500).json({ message: 'Server error', success: false });
    }
}
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;

        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        if (!fullname || !email || !phoneNumber || !bio || !skills) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const skillsArray = skills.split(",");
        const userId = req.id; // Assume req.id contains the user's ID

        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }

        // Updating the profile
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        // Update the resume URL and original file name
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url; // Save the Cloudinary URL
            user.profile.resumeOriginalName = file.originalname; // Save the original file name
        }

        await user.save();

        // Prepare the user data to send in the response
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

export const googleAuth = async (req, res) => {
    try {
        const { token, role } = req.body;
        
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        
        const payload = ticket.getPayload();
        const { sub: googleId, email, name: fullname, picture } = payload;
        
        let user = await User.findOne({ $or: [{ email }, { googleId }] });
        
        if (!user) {
            user = await User.create({
                fullname,
                email,
                googleId,
                role: role || 'student',
                isVerified: true,
                profile: {
                    profilePhoto: picture
                }
            });
        } else if (!user.googleId) {
            user.googleId = googleId;
            user.isVerified = true;
            await user.save();
        }
        
        const tokenData = { userId: user._id };
        const jwtToken = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '7d' });
        
        const userResponse = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };
        
        return res.status(200)
            .cookie("token", jwtToken, { 
                maxAge: 7 * 24 * 60 * 60 * 1000, 
                httpOnly: true, 
                sameSite: 'strict' 
            })
            .json({
                message: `Welcome ${user.fullname}`,
                user: userResponse,
                success: true
            });
    } catch (error) {
        console.error('Google auth error:', error);
        return res.status(400).json({ message: "Google authentication failed", success: false });
    }
};

export const getRecommendations = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        
        const recommendations = await getJobRecommendations(userId, user.profile);
        
        return res.status(200).json({
            recommendations,
            success: true
        });
    } catch (error) {
        console.error('Recommendations error:', error);
        return res.status(500).json({ message: "Failed to get recommendations", success: false });
    }
};

export const updatePreferences = async (req, res) => {
    try {
        const userId = req.id;
        const { emailNotifications, jobRecommendations, theme } = req.body;
        
        const user = await User.findByIdAndUpdate(
            userId,
            {
                'preferences.emailNotifications': emailNotifications,
                'preferences.jobRecommendations': jobRecommendations,
                'preferences.theme': theme
            },
            { new: true }
        );
        
        return res.status(200).json({
            message: "Preferences updated successfully",
            preferences: user.preferences,
            success: true
        });
    } catch (error) {
        console.error('Update preferences error:', error);
        return res.status(500).json({ message: "Failed to update preferences", success: false });
    }
};