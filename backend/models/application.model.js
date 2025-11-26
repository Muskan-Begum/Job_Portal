import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["applied", "reviewing", "shortlisted", "interview", "offered", "accepted", "rejected"],
        default: "applied"
    },
    coverLetter: {
        type: String
    },
    notes: {
        type: String
    },
    timeline: [{
        status: String,
        date: { type: Date, default: Date.now },
        note: String,
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    }],
    interviewDate: {
        type: Date
    },
    feedback: {
        type: String
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    }
}, { timestamps: true })

const applicantModel = mongoose.model("Application", applicationSchema)

export default applicantModel;