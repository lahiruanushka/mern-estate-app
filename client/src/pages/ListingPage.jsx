import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaBed,
  FaBath,
  FaParking,
  FaChair,
  FaShareAlt,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/bundle";
import Feature from "../components/Feature";
import { listingService } from "../services/listingService";
import LoadingSpinner from "../components/LoadingSpinner";
import StatusMessage from "../components/StatusMessage";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";

const ListingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [listing, setListing] = useState(null);
  const [copied, setCopied] = useState(false);

  const { listingId } = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    async function fetchSingleListing() {
      try {
        setIsLoading(true);
        const data = await listingService.getSingleListing(listingId);
        setListing(data);
      } catch (error) {
        console.error("Listing fetching error:", error);
        setError("Failed to fetch the listing. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchSingleListing();
  }, [listingId]);

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <StatusMessage type="error" message={error} />;
  if (!listing) return null;

  const price = listing.offer
    ? listing.discountPrice.toLocaleString("en-US")
    : listing.regularPrice.toLocaleString("en-US");

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Slider Section */}
        <div className="relative rounded-xl overflow-hidden shadow-lg">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            className="aspect-video"
          >
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div className="aspect-video">
                  <img
                    src={url}
                    alt="Property"
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Share Button */}
          <button
            onClick={handleShareClick}
            className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-200"
          >
            <FaShareAlt className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          </button>

          {copied && (
            <div className="absolute top-20 right-4 z-10 py-2 px-4 rounded-lg bg-black/75 text-white text-sm">
              Link copied!
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {listing.name}
            </h1>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <FaMapMarkerAlt className="w-5 h-5 text-blue-500" />
              <span className="ml-2">{listing.address}</span>
            </div>
          </div>

          {/* Price and Status Tags */}
          <div className="flex flex-wrap gap-4">
            <span className="px-4 py-2 rounded-full text-lg font-semibold bg-blue-500 text-white">
              ${price}
              {listing.type === "rent" ? "/month" : ""}
            </span>
            <span
              className={`px-4 py-2 rounded-full text-lg font-semibold ${
                listing.type === "rent"
                  ? "bg-purple-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {listing.type === "rent" ? "For Rent" : "For Sale"}
            </span>
            {listing.offer && (
              <span className="px-4 py-2 rounded-full text-lg font-semibold bg-red-500 text-white">
                Save ${+listing.regularPrice - +listing.discountPrice}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Description
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {listing.description}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Feature
              icon={FaBed}
              text={`${listing.bedrooms} ${
                listing.bedrooms > 1 ? "Beds" : "Bed"
              }`}
            />
            <Feature
              icon={FaBath}
              text={`${listing.bathrooms} ${
                listing.bathrooms > 1 ? "Baths" : "Bath"
              }`}
            />
            <Feature
              icon={FaParking}
              text={listing.parking ? "Parking Available" : "No Parking"}
            />
            <Feature
              icon={FaChair}
              text={listing.furnished ? "Furnished" : "Unfurnished"}
            />
          </div>
        </div>

        {currentUser && listing.userRef !== currentUser._id && (
          <Contact listing={listing} />
        )}
      </div>
    </main>
  );
};

export default ListingPage;
