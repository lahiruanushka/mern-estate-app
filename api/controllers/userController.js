import User from "../models/userModel.js";
import { createError } from "../utils/customError.js";
import bcryptjs from "bcryptjs";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(createError(401, "Unauthorized"));
  }

  try {
    const { username, email, avatar, password } = req.body;

    // Check if username or email already exists (excluding the current user)
    const existingUserByUsername = await User.findOne({
      username,
      _id: { $ne: req.params.id },
    });
    if (existingUserByUsername) {
      return next(
        createError(400, "Username already exists. Please choose another.")
      );
    }

    const existingUserByEmail = await User.findOne({
      email,
      _id: { $ne: req.params.id },
    });
    if (existingUserByEmail) {
      return next(
        createError(400, "Email already exists. Please use a different email.")
      );
    }

    // Prepare data for update
    const updatedData = {
      username,
      email,
      avatar,
    };

    // Hash password if provided
    if (password) {
      updatedData.password = bcryptjs.hashSync(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedUser) {
      return next(createError(404, "User not found"));
    }

    const { password: pass, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  // Check if the user is authorized to delete the account
  if (req.user.id !== req.params.id) {
    return next(
      createError(
        401,
        "Unauthorized action. You can only delete your own account."
      )
    );
  }

  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return next(createError(404, "User not found."));
    }

    // Clear the authentication token cookie
    res.clearCookie("access_token");
    res.status(200).json({ message: "User has been successfully deleted." });
  } catch (error) {
    next(error);
  }
};
