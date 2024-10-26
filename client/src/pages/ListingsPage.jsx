import { useEffect, useState } from "react";
import { listingService } from "../services/listingService";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaTrash,
  FaPencilAlt,
  FaHome,
  FaExternalLinkAlt,
} from "react-icons/fa";
import Modal from "../components/Modal";
import StatusMessage from "../components/StatusMessage";

const ListingsPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userListings, setUserListings] = useState([]);
  const [errors, setErrors] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [listingToDelete, setListingToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const fetchUserListings = async () => {
    try {
      setLoading(true);
      const listings = await listingService.getUserListings(currentUser._id);
      setUserListings(listings);
    } catch (error) {
      console.error("Error fetching listings:", error);
      setErrors("Failed to fetch listings. Please try again");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserListings();
  }, []);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (successMessage || errors) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
        setErrors(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errors]);

  const handleDeleteClick = (id) => {
    setListingToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await listingService.deleteListing(listingToDelete);
      setUserListings(
        userListings.filter((listing) => listing._id !== listingToDelete)
      );
      setSuccessMessage("Listing deleted successfully");
      setIsDeleteModalOpen(false);
      setListingToDelete(null);
    } catch (error) {
      console.error("Error deleting listing:", error);
      setErrors("Failed to delete listing. Please try again");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 dark:border-indigo-400"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Listings
          </h1>
          <Link
            to="/create-listing"
            className="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-indigo-500 text-white 
                     rounded-lg hover:bg-blue-700 dark:hover:bg-indigo-600 transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
          >
            <FaPlus className="mr-2" />
            Create Listing
          </Link>
        </div>

        {/* Error Message */}
        {errors && <StatusMessage type="error" message={errors} />}

        {/* Success Message */}
        {successMessage && <StatusMessage type="success" message={successMessage} />}
        
      </div>

      {/* Listings Grid */}
      {userListings && userListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <Link to={`/listing/${listing._id}`}>
                <div className="relative h-48 w-full">
                  <img
                    src={listing.imageUrls[0]}
                    alt={listing.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              </Link>

              <div className="p-4">
                <Link to={`/listing/${listing._id}`}>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors duration-200">
                    {listing.name}
                  </h2>
                </Link>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDeleteClick(listing._id)}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-200"
                      title="Delete listing"
                    >
                      <FaTrash />
                    </button>
                    <Link
                      to={`/edit-listing/${listing._id}`}
                      className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors duration-200"
                      title="Edit listing"
                    >
                      <FaPencilAlt />
                    </Link>
                  </div>
                  <Link
                    to={`/listing/${listing._id}`}
                    className="inline-flex items-center text-sm text-blue-600 dark:text-indigo-400 hover:underline"
                  >
                    View Details
                    <FaExternalLinkAlt className="ml-1 w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700">
          <FaHome className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
            No listings
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Get started by creating a new listing
          </p>
          <div className="mt-6">
            <Link
              to="/create-listing"
              className="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-indigo-500 text-white 
                       rounded-lg hover:bg-blue-700 dark:hover:bg-indigo-600 transition-colors duration-200"
            >
              <FaPlus className="mr-2" />
              Create Listing
            </Link>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Confirmation"
        description="Are you sure you want to delete this listing? This action
                      cannot be undone."
        primaryAction={() => handleDelete()}
        primaryActionText="Delete"
        primaryActionStyle="danger"
        secondaryActionText="Cancel"
      ></Modal>
    </div>
  );
};

export default ListingsPage;
