import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { createError } from "../utils/customError.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return next(createError(400, "Email and password are required."));
    }

    // Find the user by email
    const validUser = await User.findOne({ email });

    // If user does not exist
    if (!validUser) {
      return next(createError(401, "Invalid email or password."));
    }

    // Validate password
    const validPassword = await bcryptjs.compare(password, validUser.password);

    if (!validPassword) {
      return next(createError(401, "Invalid email or password."));
    }

    // Generate a JWT token with user ID and a secure expiration
    const token = jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" } // Token expires in 24 hours
    );

    // Set the JWT as an HttpOnly cookie for security
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensure secure cookies in production
      sameSite: "Strict", // Helps prevent CSRF attacks
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    });

    // Respond with user info (excluding password)
    const { password: _, ...userWithoutPassword } = validUser._doc;

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    // Handle unexpected errors
    next(
      createError(500, "An unexpected error occurred. Please try again later.")
    );
  }
};

export const google = async (req, res, next) => {
  const { email, name, photo } = req.body;

  try {
    // Validate input
    if (!email || !name) {
      return next(createError(400, "Email and name are required."));
    }

    let user = await User.findOne({ email });

    if (user) {
      // User exists, create JWT and send response
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d", // Token expires in 7 days
      });
      const { password: pass, ...userWithoutPassword } = user._doc;

      return res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Cookie expires in 7 days
        })
        .status(200)
        .json(userWithoutPassword);
    } else {
      // User does not exist, create new user
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email,
        password: hashedPassword,
        avatar: photo,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "7d", // Token expires in 7 days
      });

      const { password: pass, ...userWithoutPassword } = newUser._doc;
      return res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Cookie expires in 7 days
        })
        .status(200)
        .json(userWithoutPassword);
    }
  } catch (error) {
    // Catch any errors
    return next(
      createError(500, "An unexpected error occurred. Please try again later.")
    );
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User signed out successfully.');
  } catch (error) {
    next(error);
  }
};