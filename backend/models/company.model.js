import mongoose, { Schema, model } from "mongoose";

const companySchema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,

    },
    website: {
        type: String,

    },
    location: {
        type: String,

    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    logo: {
        type: String
    }
}, { timestamps: true })

const companyModel = model("Company", companySchema)

export default companyModel;