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
  });

  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const handleImagesChange = (newImages, newImageUrls) => {
    setImages(newImages);
    setImageUrls(newImageUrls);
  };
  
  const handleImageRemove = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
    setImageUrls(prevUrls => prevUrls.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <main className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-10">
          Create New Listing
        </h1>

        <form className="space-y-8">
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
              maxSizeInMB={5}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Create Listing
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateListingPage;
