import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRotes from "./routes/userRoutes.js";
import authRotes from "./routes/authRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// Workaround for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use("/api/listings", listingRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Handle undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Middlewares
app.use(errorHandler);

// Port and Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
