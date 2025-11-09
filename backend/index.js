import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";

dotenv.config();

const __dirname = path.resolve();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
};
app.use(cors(corsOptions));

// API Routes
app.use("/api/user", userRoute);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute);
app.use("/api/application", applicationRoute);

// Serve static files from frontend
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// Catch-all handler for client-side routing (SPA)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
const port = process.env.PORT || 5000; // Fixed: use PORT (uppercase)

app.listen(port, () => {
    connectDB();
    console.log(`Server is listening at port ${port}`);
});