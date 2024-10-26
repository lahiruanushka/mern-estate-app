import Listing from "../models/listingModel.js";
import { createError } from "../utils/customError.js";

// Create a new listing
export const createListing = async (req, res) => {
  try {
    const {
      name,
      description,
      address,
      regularPrice,
      discountPrice,
      bathrooms,
      bedrooms,
      furnished,
      parking,
      type,
      offer,
      imageUrls,
      userRef,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !description ||
      !address ||
      !regularPrice ||
      !discountPrice ||
      bathrooms == null ||
      bedrooms == null ||
      furnished == null ||
      parking == null ||
      !type ||
      offer == null ||
      !imageUrls ||
      !userRef
    ) {
      return next(createError(400, "All fields are required."));
    }

    // Create a new Listing document
    const newListing = new Listing({
      name,
      description,
      address,
      regularPrice,
      discountPrice,
      bathrooms,
      bedrooms,
      furnished,
      parking,
      type,
      offer,
      imageUrls,
      userRef,
    });

    // Save the listing to the database
    const savedListing = await newListing.save();
    res.status(201).json(savedListing);
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
