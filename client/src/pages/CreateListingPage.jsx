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

const CreateListingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    regularPrice: "",
    discountedPrice: "",
    sale: false,
    rent: false,
    parking: false,
    furnished: false,
    offer: false,
    firebaseImageUrls: [],
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
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    setError(null);
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Property name is required";
    if (!formData.address.trim()) return "Address is required";
    if (!images.length) return "At least one image is required";
    if (!formData.sale && !formData.rent)
      return "Select either For Sale or For Rent";
    if (
      formData.offer &&
      Number(formData.discountedPrice) >= Number(formData.regularPrice)
    ) {
      return "Discounted price must be less than regular price";
    }
    return null;
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
        firebaseImageUrls: uploadedUrls,
      };

      console.log(finalFormData);

      // API call to create listing
      // const response = await createListing(finalFormData);
      // const listingId = response.data.id;

      // Simulated success
      alert("Listing created successfully!");
      navigate(`/listings/${Math.random()}`);
    } catch (err) {
      console.error("Submission error:", err);
      setError(err.message || "Failed to create listing. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
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
                label="For Sale"
                enabled={formData.sale}
                onChange={(checked) =>
                  setFormData({ ...formData, sale: checked })
                }
              />
              <FeatureToggle
                label="For Rent"
                enabled={formData.rent}
                onChange={(checked) =>
                  setFormData({ ...formData, rent: checked })
                }
              />
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
              <FeatureToggle
                label="Special Offer"
                enabled={formData.offer}
                onChange={(checked) =>
                  setFormData({ ...formData, offer: checked })
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

              <FormInput
                label="Discounted Price"
                id="discountedPrice"
                type="number"
                value={formData.discountedPrice}
                onChange={handleChange}
                min="1"
                required
                icon={TagIcon}
                suffix="$/month"
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
    </main>
  );
};

export default CreateListingPage;
