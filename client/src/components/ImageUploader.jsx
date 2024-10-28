import { useState } from "react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import StatusMessage from "./StatusMessage";

const ImageUploader = ({
  images,
  imageUrls,
  onImagesChange,
  onImageRemove,
  maxImages = 6,
  maxSizeInMB = 5,
  uploadProgress = {},
  existingImages = [], // New prop to track existing images separately
}) => {
  const [error, setError] = useState("");

  const SUPPORTED_FORMATS = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/heic",
  ];

  const validateImage = (file) => {
    if (!SUPPORTED_FORMATS.includes(file.type)) {
      throw new Error(`${file.name} is not a supported image format`);
    }

    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      throw new Error(`${file.name} exceeds ${maxSizeInMB}MB size limit`);
    }

    return true;
  };

  const handleImageChange = async (e) => {
    try {
      const files = Array.from(e.target.files);
      setError("");

      // Calculate total images including existing ones
      const totalImages = files.length + imageUrls.length;
      if (totalImages > maxImages) {
        throw new Error(`You can only upload up to ${maxImages} images total`);
      }

      const validFiles = [];
      const validUrls = [];

      for (const file of files) {
        try {
          await validateImage(file);
          validFiles.push(file);
          validUrls.push(URL.createObjectURL(file));
        } catch (error) {
          validUrls.forEach((url) => URL.revokeObjectURL(url));
          throw error;
        }
      }

      const newImages = [...images, ...validFiles];
      const newImageUrls = [...imageUrls, ...validUrls];

      onImagesChange(newImages, newImageUrls);
    } catch (error) {
      setError(error.message);
    } finally {
      e.target.value = ""; // Reset input
    }
  };

  const handleRemoveImage = (index) => {
    // Check if the image is from existing images or newly added
    const isExistingImage = index < existingImages.length;

    if (!isExistingImage) {
      // For newly added images, revoke the object URL
      URL.revokeObjectURL(imageUrls[index]);
    }

    onImageRemove(index, isExistingImage);
    setError("");
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("border-blue-500");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-blue-500");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-blue-500");
    const droppedFiles = Array.from(e.dataTransfer.files);
    const dataTransfer = new DataTransfer();
    droppedFiles.forEach((file) => dataTransfer.items.add(file));

    handleImageChange({ target: { files: dataTransfer.files } });
  };

  const ProgressBar = ({ progress }) => (
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
      <div
        className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );

  const remainingSlots = maxImages - imageUrls.length;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          The first image will be used as the cover ({imageUrls.length}/
          {maxImages} images)
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Max size: {maxSizeInMB}MB
        </p>
      </div>

      {error && <StatusMessage type="error" message={error} />}

      {/* Only show upload area if there's room for more images */}
      {remainingSlots > 0 && (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label
              className="flex items-center justify-center w-full h-32 px-4 transition bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg appearance-none cursor-pointer hover:border-blue-500 focus:outline-none"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center space-y-2">
                <PhotoIcon className="w-8 h-8 text-gray-400 dark:text-gray-300" />
                <span className="text-sm text-gray-500 dark:text-gray-300">
                  Drop files or click to upload
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {remainingSlots} slot{remainingSlots !== 1 ? "s" : ""}{" "}
                  remaining
                </span>
              </div>
              <input
                type="file"
                className="hidden"
                multiple
                accept={SUPPORTED_FORMATS.join(",")}
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>
      )}

      {/* Image Preview Section */}
      {imageUrls.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Image Preview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {imageUrls.map((url, index) => (
              <div key={url} className="relative group">
                <div className="relative">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  {uploadProgress[index] !== undefined &&
                    uploadProgress[index] < 100 && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                        <div className="text-white text-sm font-medium">
                          {uploadProgress[index]}%
                        </div>
                      </div>
                    )}
                  <ProgressBar progress={uploadProgress[index] || 0} />
                </div>

                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove image"
                    disabled={
                      uploadProgress[index] !== undefined &&
                      uploadProgress[index] < 100
                    }
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>

                {index === 0 && (
                  <span className="absolute top-2 left-2 px-2 py-1 bg-blue-500 text-white text-xs rounded-md">
                    Cover
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
