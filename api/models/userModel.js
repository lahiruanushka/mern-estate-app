import mongoose from "mongoose";

// define the schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true, // Trims any extra spaces
      minlength: [3, "Username must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"], // Regex to validate email format
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/128/9187/9187604.png",
    },
  },
  { timestamps: true }
);

// Create the model
const User = mongoose.model("User", userSchema);

export default User;
