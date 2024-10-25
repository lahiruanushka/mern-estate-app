import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Camera, LogOut, Trash2, Loader2 } from "lucide-react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../features/user/userSlice";
import { userService } from "../services/userService";
import StatusMessage from "../components/StatusMessage";
import FormInput from "../components/FormInput";
import { authService } from "../services/authService";
import Modal from "../components/Modal";

// Constants
const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Main Component
export default function ProfilePage() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [filePerc, setFilePerc] = useState(0);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const [uploadStatus, setUploadStatus] = useState({
    error: false,
    message: "",
    type: "idle",
  });
  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    password: "",
    avatar: currentUser?.avatar || "",
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fileRef = useRef(null);

  // Validate the file input
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

  // File Upload Handler
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
            message:
              "Image uploaded successfully! Click Update profile to save",
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

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const data = await userService.updateUser(currentUser._id, formData);
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);

      // Reset success message after delay
      setTimeout(() => {
        setUpdateSuccess(false)
        setUploadStatus({
          error: false,
          message:"",
          type: "idle",
        });
      }, 3000);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      setUpdateSuccess(false);
    }
  };

  // Delete User Handler
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      await userService.deleteUser(currentUser._id);
      dispatch(deleteUserSuccess());
      setIsDeleteModalOpen(false);
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  // Signout User Handler
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const data = await authService.signOut();
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-2xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl transition-all duration-200">
          {/* Header */}
          <div className="px-6 py-8 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center transition-colors">
              Profile Settings
            </h1>
            <p className="mt-2 text-center text-gray-600 dark:text-gray-400 transition-colors">
              Manage your account settings and preferences
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 px-6 py-8">
            {/* Avatar Section */}
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
                    className="h-36 w-36 rounded-full object-cover ring-4 ring-white dark:ring-gray-700 transition-all duration-200 hover:ring-blue-500 dark:hover:ring-blue-400"
                  />
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-3 shadow-lg 
                      hover:bg-blue-600 transition-all duration-200 text-white"
                    aria-label="Upload new photo"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Upload Status */}
              {uploadStatus.type !== "idle" && (
                <div className="flex items-center space-x-2">
                  {uploadStatus.type === "uploading" && (
                    <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm font-medium">
                        Uploading: {filePerc}%
                      </span>
                    </div>
                  )}
                  {uploadStatus.type === "success" && (
                    <StatusMessage
                      type="success"
                      message={uploadStatus.message}
                    />
                  )}
                  {uploadStatus.type === "error" && (
                    <StatusMessage
                      type="error"
                      message={uploadStatus.message}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              <FormInput
                label="Username"
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, username: e.target.value }))
                }
              />

              <FormInput
                label="Email"
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
              />

              <FormInput
                label="New Password"
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                placeholder="Leave blank to keep current password"
              />
            </div>

            {/* Error Messages */}
            {error && <StatusMessage type="error" message={error} />}

            {/* Update Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent 
                rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 
                dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 
                focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 
                disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Updating...
                </>
              ) : (
                "Update Profile"
              )}
            </button>

            {/* Footer Actions */}
            <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(true)}
                className="flex items-center text-sm font-medium text-red-600 hover:text-red-500 
                  dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </button>
              <button
                type="button"
                onClick={handleSignOut}
                className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-800 
                  dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>
          </form>
        </div>
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Account"
        description="Are you sure you want to delete your account? This action cannot be undone. All of your data will be permanently removed."
        primaryAction={() => handleDeleteUser()}
        primaryActionText="Delete Account"
        primaryActionStyle="danger"
      />

      <Modal
        isOpen={updateSuccess}
        onClose={() => setUpdateSuccess(false)}
        title="Update Successful"
        description="Your profile has been updated successfully!"
        primaryAction={() => setUpdateSuccess(false)}
        primaryActionText="Ok"
        primaryActionStyle="success"
        showSecondaryAction={false}
      />
    </div>
  );
}
