
import { Schema, model } from "mongoose"

const jobSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    requirements: {
        type: String,

    },
    salary: {
        type: Number,
        require: true,
    },
    experienceLevel: {
        type: Number,
        require: true,


    },
    location: {
        type: String,
        require: true
    },
    jobType: {
        type: String,
        require: true
    },
    position: {
        type: Number,
        require: true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        require: true
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    application: [{

        type: Schema.Types.ObjectId,
        ref: "Application"
    }]
}, { timestamps: true })

const jobModel = model("Job", jobSchema);
export default jobModel;