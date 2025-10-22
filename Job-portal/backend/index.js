import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
        ? [process.env.FRONTEND_URL, 'https://your-frontend-domain.vercel.app']
        : true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application",applicationRoute)

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is running up", status: "OK" });
});

app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", message: "Backend is healthy" });
});

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "OK", message: "Backend is healthy" });
});

app.listen(port, () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("✅ MongoDB is successfully connected");
            console.log("✅ Database: jobportal");
        })
        .catch((error) => {
            console.log("❌ MongoDB Connection error:", error.message);
        });
    console.log(`🚀 Server is listening on port: ${port}`);
    console.log(`🌐 API Base URL: http://localhost:${port}`);
    console.log(`📊 Health Check: http://localhost:${port}`);
});
