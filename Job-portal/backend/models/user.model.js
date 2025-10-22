import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: function() { return !this.googleId; }
    },
    password: {
        type: String,
        required: function() { return !this.googleId; }
    },
    googleId: {
        type: String,
        sparse: true
    },
    role: {
        type: String,
        enum: ['student', 'recruiter', 'admin'],
        required: true
    },
    profile: {
        bio: { type: String },
        skills: [{ type: String }],
        resume: { type: String },
        resumeOriginalName: { type: String },
        company: { type: mongoose.Schema.Types.ObjectId, ref: "company" },
        profilePhoto: {
            type: String,
            default: ""
        },
        location: { type: String },
        experience: { type: Number, default: 0 },
        expectedSalary: { type: Number },
        preferredJobTypes: [{ type: String }],
        preferredLocations: [{ type: String }]
    },
    preferences: {
        emailNotifications: { type: Boolean, default: true },
        jobRecommendations: { type: Boolean, default: true },
        theme: { type: String, enum: ['light', 'dark'], default: 'light' }
    },
    lastActive: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false }
}, { timestamps: true })

const userModel =mongoose.model("User", userSchema);

export default userModel;

