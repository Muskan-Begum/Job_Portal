
import { Schema, model } from "mongoose"

const jobSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    requirements: {
        type: String,
    },
    skills: [{
        type: String,
        required: true
    }],
    salary: {
        min: { type: Number, required: true },
        max: { type: Number, required: true },
        currency: { type: String, default: 'USD' }
    },
    experienceLevel: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    isRemote: {
        type: Boolean,
        default: false
    },
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'contract', 'internship'],
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    application: [{
        type: Schema.Types.ObjectId,
        ref: "Application"
    }],
    status: {
        type: String,
        enum: ['active', 'closed', 'draft'],
        default: 'active'
    },
    deadline: {
        type: Date
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const jobModel = model("Job", jobSchema);
export default jobModel;