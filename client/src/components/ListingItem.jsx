import { Link } from "react-router-dom";
import { MapPin, Bed, Bath, ArrowUpRight, Heart } from "lucide-react";
import { useState } from "react";

export default function ListingItem({ listing }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-gray-800/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/listing/${listing._id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={listing.imageUrls[0] || "/api/placeholder/400/300"}
            alt={listing.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Price Tag */}
          <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              $
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && (
                <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                  /mo
                </span>
              )}
            </p>
          </div>

          {/* Save Button */}
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
            onClick={(e) => {
              e.preventDefault();
              // Add save functionality here
            }}
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title and Location */}
          <div className="space-y-2 mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
              {listing.name}
            </h3>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <p className="text-sm truncate">{listing.address}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-200">
            {listing.description}
          </p>

          {/* Features */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Bed className="w-4 h-4" />
              <span className="text-sm font-medium">
                {listing.bedrooms} {listing.bedrooms > 1 ? "beds" : "bed"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Bath className="w-4 h-4" />
              <span className="text-sm font-medium">
                {listing.bathrooms} {listing.bathrooms > 1 ? "baths" : "bath"}
              </span>
            </div>
          </div>

          {/* View Details Button - Appears on Hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          >
            <div className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full transition-colors duration-200">
              <span className="text-sm font-medium">View Details</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
