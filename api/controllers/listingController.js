import Listing from "../models/listingModel.js";
import { createError } from "../utils/customError.js";

// Create a new listing
export const createListing = async (req, res, next) => {
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
      regularPrice === undefined ||
      bathrooms === undefined ||
      bedrooms === undefined ||
      type === undefined ||
      userRef === undefined ||
      imageUrls.length === 0
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
    console.log(error);
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

// Get all listings created by a specific user
export const getUserListings = async (req, res, next) => {
  const { userId } = req.params;

  try {
    // Check if the authenticated user is the owner
    if (userId !== req.user.id) {
      return next(createError(403, "Unauthorized access to listings."));
    }

    const listings = await Listing.find({ userRef: userId });

    res.status(200).json(listings);
  } catch (error) {
    console.error(error);
    next(createError(500, "An error occurred while retrieving user listings."));
  }
};

// Update a specific listing
export const updateListing = async (req, res, next) => {
  const { listingId } = req.params;
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
  } = req.body;

  try {
    // Find the listing by ID
    const listing = await Listing.findById(listingId);

    // Check if the listing exists
    if (!listing) {
      return next(createError(404, "Listing not found."));
    }

    // Check if the user is the owner of the listing
    if (listing.userRef !== req.user.id) {
      return next(createError(403, "Unauthorized access."));
    }

    // Update listing with provided fields
    listing.name = name || listing.name;
    listing.description = description || listing.description;
    listing.address = address || listing.address;
    listing.regularPrice = regularPrice ?? listing.regularPrice;
    listing.discountPrice = discountPrice ?? listing.discountPrice;
    listing.bathrooms = bathrooms ?? listing.bathrooms;
    listing.bedrooms = bedrooms ?? listing.bedrooms;
    listing.furnished = furnished ?? listing.furnished;
    listing.parking = parking ?? listing.parking;
    listing.type = type || listing.type;
    listing.offer = offer ?? listing.offer;
    listing.imageUrls = imageUrls || listing.imageUrls;

    // Save the updated listing
    const updatedListing = await listing.save();
    res.status(200).json(updatedListing);
  } catch (error) {
    console.error(error);
    next(createError(500, "An error occurred while updating the listing."));
  }
};

// Delete a specific listing
export const deleteListing = async (req, res, next) => {
  const { listingId } = req.params;

  try {
    // Find the listing by ID
    const listing = await Listing.findById(listingId);

    // Check if the listing exists
    if (!listing) {
      return next(createError(404, "Listing not found."));
    }

    // Check if the user is the owner of the listing
    if (listing.userRef !== req.user.id) {
      return next(createError(403, "Unauthorized access."));
    }

    // Delete the listing
    await Listing.findByIdAndDelete(listingId);
    res.status(200).json({ message: "Listing deleted successfully." });
  } catch (error) {
    console.error(error);
    next(createError(500, "An error occurred while deleting the listing."));
  }
};

// Get a single listing by ID
export const getSingleListing = async (req, res, next) => {
  const { listingId } = req.params;

  try {
    // Find the listing by ID
    const listing = await Listing.findById(listingId);

    // Check if the listing exists
    if (!listing) {
      return next(createError(404, "Listing not found."));
    }

    res.status(200).json(listing);
  } catch (error) {
    console.error(error);
    next(createError(500, "An error occurred while retrieving the listing."));
  }
};

// Get the all listings and search
export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
