import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRotes from "./routes/userRoutes.js";
import authRotes from "./routes/authRoutes.js";

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

app.use(express.json());

// Routes
app.use("/api/user", userRotes);
app.use("/api/auth", authRotes);

// Port and Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
