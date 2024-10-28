import { useState } from "react";
import {
  HomeIcon,
  MapPinIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import FormInput from "../components/FormInput";
import FeatureToggle from "../components/FeatureToggle";
import { LuBed } from "react-icons/lu";
import { MdOutlineBathroom } from "react-icons/md";
import ImageUploader from "../components/ImageUploader";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import StatusMessage from "../components/StatusMessage";
import ListingTypeSelector from "../components/ListingTypeSelector";
import { listingService } from "../services/listingService";
import { useSelector } from "react-redux";

const CreateListingPage = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountPrice: 0,
    parking: false,
    furnished: false,
    offer: false,
    type: "rent",
    imageUrls: [],
  });

  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleImagesChange = (newImages, newImageUrls) => {
    setImages(newImages);
    setImageUrls(newImageUrls);
    setError(null);
  };

  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    setUploadProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[index];
      return newProgress;
    });
  };

  const handleChange = (e) => {
    const { id, value, type } = e.target;

    // Handle number inputs
    if (type === "number") {
      setFormData((prev) => ({
        ...prev,
        [id]: value === "" ? "" : Number(value),
      }));
      return;
    }

    // Handle text inputs and textareas
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    setError(null);
  };

  const handleTypeChange = (newType) => {
    setFormData((prev) => ({
      ...prev,
      type: newType,
    }));
    setError(null);
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.name.trim()) errors.push("Property name is required");
    if (!formData.address.trim()) errors.push("Address is required");
    if (!images.length) errors.push("At least one image is required");

    if (formData.regularPrice && formData.discountPrice) {
      if (Number(formData.discountPrice) >= Number(formData.regularPrice)) {
        errors.push("Discounted price must be less than regular price");
      }
    }

    if (
      formData.bedrooms &&
      (formData.bedrooms < 1 || formData.bedrooms > 10)
    ) {
      errors.push("Bedrooms must be between 1 and 10");
    }

    if (
      formData.bathrooms &&
      (formData.bathrooms < 1 || formData.bathrooms > 10)
    ) {
      errors.push("Bathrooms must be between 1 and 10");
    }

    return errors.length ? errors.join(". ") : null;
  };

  const storeImage = async (file, index) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = `${Date.now()}_${file.name.replace(
        /[^a-zA-Z0-9.]/g,
        "_"
      )}`;
      const storageRef = ref(storage, `/listings/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress((prev) => ({
            ...prev,
            [index]: Math.round(progress),
          }));
        },
        (error) => {
          console.error("Upload error:", error);
          reject(new Error(`Failed to upload ${file.name}`));
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            console.error("Get URL error:", error);
            reject(new Error(`Failed to get download URL for ${file.name}`));
          }
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      const uploadPromises = images.map((image, index) =>
        storeImage(image, index)
      );
      const uploadedUrls = await Promise.all(uploadPromises);

      const finalFormData = {
        ...formData,
        imageUrls: uploadedUrls,
      };

      // API call to create listing
      const data = await listingService.createListing(
        finalFormData,
        currentUser._id
      );

      navigate(`/listing/${data._id}`);
    } catch (err) {
      console.error("Submission error:", err);
      setError(err.message || "Failed to create listing. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-10">
          Create New Listing
        </h1>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              Basic Information
            </h2>
            <div className="space-y-6">
              <FormInput
                label="Property Name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter property name"
                icon={HomeIcon}
              />

              <FormInput
                label="Description"
                id="description"
                type="textarea"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your property"
                icon={DocumentTextIcon}
                rows={4}
              />

              <FormInput
                label="Address"
                id="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter property address"
                icon={MapPinIcon}
              />
            </div>
          </div>

          {/* Features */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Property Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureToggle
                label="Parking Available"
                enabled={formData.parking}
                onChange={(checked) =>
                  setFormData({ ...formData, parking: checked })
                }
              />
              <FeatureToggle
                label="Furnished"
                enabled={formData.furnished}
                onChange={(checked) =>
                  setFormData({ ...formData, furnished: checked })
                }
              />
            </div>
          </div>

          {/* Property Details */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Property Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FormInput
                label="Bedrooms"
                id="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={handleChange}
                min="1"
                max="10"
                required
                icon={LuBed}
              />

              <FormInput
                label="Bathrooms"
                id="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={handleChange}
                min="1"
                max="10"
                required
                icon={MdOutlineBathroom}
              />
            </div>
          </div>

          {/* Images */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Property Images
            </h2>

            <ImageUploader
              images={images}
              imageUrls={imageUrls}
              onImagesChange={handleImagesChange}
              onImageRemove={handleImageRemove}
              maxImages={6}
              maxSizeInMB={2}
              uploadProgress={uploadProgress}
            />
          </div>

          {/* Listing Type Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Listing Type
            </h2>

            <ListingTypeSelector
              selectedType={formData.type}
              onTypeChange={handleTypeChange}
            />
          </div>

          {/* Property Prizing */}
          {formData.type === "rent" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Monthly Prize
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <FeatureToggle
                  label="Special Offer"
                  enabled={formData.offer}
                  onChange={(checked) =>
                    setFormData({ ...formData, offer: checked })
                  }
                />

                <FormInput
                  label="Regular Price"
                  id="regularPrice"
                  type="number"
                  value={formData.regularPrice}
                  onChange={handleChange}
                  min="1"
                  required
                  icon={CurrencyDollarIcon}
                  suffix="$/month"
                />

                {formData.offer && (
                  <FormInput
                    label="Discounted Price"
                    id="discountPrice"
                    type="number"
                    value={formData.discountPrice}
                    onChange={handleChange}
                    min="1"
                    required
                    icon={TagIcon}
                    suffix="$/month"
                  />
                )}
              </div>
            </div>
          )}

          {error && <StatusMessage type="error" message={error} />}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isUploading}
              className={`px-8 py-4 bg-blue-600 text-white rounded-lg font-medium 
                ${
                  isUploading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                } transition-colors`}
            >
              {isUploading ? "Creating Listing..." : "Create Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListingPage;
