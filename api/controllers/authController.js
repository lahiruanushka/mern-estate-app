import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { createError } from "../utils/customError.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Validate input
    if (!username || !email || !password) {
      return next(
        createError(400, "Username, email, and password are required.")
      );
    }

    // Check if the email and username already exist
    const [existingEmail, existingUsername] = await Promise.all([
      User.findOne({ email }),
      User.findOne({ username }),
    ]);

    if (existingEmail) {
      return next(createError(400, "A user with this email already exists."));
    }

    if (existingUsername) {
      return next(createError(400, "Username already exists."));
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 12);

    // Create and save the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Respond with success message
    res.status(201).json({
      success: true,
      message: "User registered successfully!",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      next(
        createError(400, "Invalid input. Please check your data and try again.")
      );
    } else {
      next(
        createError(
          500,
          "An unexpected error occurred. Please try again later."
        )
      );
    }
  }
};
