import { useState, useRef, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function ProfilePage() {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [filePerc, setFilePerc] = useState(0);
  const [uploadStatus, setUploadStatus] = useState({
    error: false,
    message: "",
    type: "idle", // 'idle' | 'success' | 'error' | 'uploading'
  });
  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    password: "",
    avatar: currentUser?.avatar || "",
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const fileRef = useRef(null);

  const validateFile = (file) => {
    if (!file) return { isValid: false, error: "No file selected" };
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return {
        isValid: false,
        error: "Invalid file type. Please upload a JPEG, PNG, or WebP image.",
      };
    }
    if (file.size > MAX_FILE_SIZE) {
      return { isValid: false, error: "File size must be less than 2MB" };
    }
    return { isValid: true, error: null };
  };

  const handleFileUpload = async (file) => {
    const validation = validateFile(file);
    if (!validation.isValid) {
      setUploadStatus({
        error: true,
        message: validation.error,
        type: "error",
      });
      return;
    }

    setUploadStatus({ error: false, message: "", type: "uploading" });
    const storage = getStorage(app);
    const fileName = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `/avatars/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.error("Upload error:", error);
        setUploadStatus({
          error: true,
          message: "Failed to upload image. Please try again.",
          type: "error",
        });
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setFormData((prev) => ({ ...prev, avatar: downloadURL }));
          setUploadStatus({
            error: false,
            message: "Image uploaded successfully!",
            type: "success",
          });
        } catch (error) {
          setUploadStatus({
            error: true,
            message: "Failed to get download URL",
            type: "error",
          });
        }
      }
    );
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Here you would typically make your API call to update the profile
    } catch (error) {
      // Error handling
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (uploadStatus.type !== "idle") {
      const timer = setTimeout(() => {
        if (uploadStatus.type === "success") {
          setUploadStatus({ error: false, message: "", type: "idle" });
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [uploadStatus]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-200">
          {/* Header */}
          <div className="px-4 py-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center transition-colors">
              Profile Settings
            </h1>
            <p className="mt-1 text-center text-gray-500 dark:text-gray-400 transition-colors">
              Update your profile information and preferences
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 px-4 py-5 sm:p-6">
            {/* Profile Image Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <input
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                  type="file"
                  ref={fileRef}
                  hidden
                  accept="image/*"
                />
                <div className="relative">
                  <img
                    src={formData.avatar || "/default-avatar.png"}
                    alt="Profile"
                    className="h-32 w-32 rounded-full object-cover ring-4 ring-white dark:ring-gray-700"
                  />
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 border border-gray-200 dark:border-gray-600"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600 dark:text-gray-300"
                      fill="none"
                      strokeWidth="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Upload Status */}
              {uploadStatus.type !== "idle" && (
                <div
                  className={`text-sm font-medium ${
                    uploadStatus.type === "error"
                      ? "text-red-600 dark:text-red-400"
                      : uploadStatus.type === "success"
                      ? "text-green-600 dark:text-green-400"
                      : "text-blue-600 dark:text-blue-400"
                  }`}
                >
                  {uploadStatus.type === "uploading"
                    ? `Uploading: ${filePerc}%`
                    : uploadStatus.message}
                </div>
              )}
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Leave blank to keep current password"
                  className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
            </div>

            {/* Update Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Updating...</span>
                </div>
              ) : (
                "Update Profile"
              )}
            </button>
          </form>

          {/* Footer Actions */}
          <div className="px-4 py-4 sm:px-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(true)}
                className="text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
              >
                Delete Account
              </button>
              <button
                type="button"
                className="text-sm font-medium text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-200"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      <Transition appear show={isDeleteModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsDeleteModalOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete Account
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete your account? This action
                      cannot be undone. All of your data will be permanently
                      removed.
                    </p>
                  </div>

                  <div className="mt-4 space-x-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={() => setIsDeleteModalOpen(false)}
                    >
                      Delete Account
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setIsDeleteModalOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
