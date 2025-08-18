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
    origin: "http://localhost:5173",
    credentials: true
};
app.use(cors(corsOptions));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application",applicationRoute)

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.status(200).send("Server is running up");
});

app.listen(port, () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("MongoDB is successfully connected");
        })
        .catch((error) => {
            console.log("Connection error", error.message);
        });
    console.log(`Server is listening on port: ${port}`);
});
