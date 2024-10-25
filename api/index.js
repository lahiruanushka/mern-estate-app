import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRotes from "./routes/userRoutes.js";
import authRotes from "./routes/authRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/user", userRotes);
app.use("/api/auth", authRotes);

// Middlewares
app.use(errorHandler);

// Port and Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
