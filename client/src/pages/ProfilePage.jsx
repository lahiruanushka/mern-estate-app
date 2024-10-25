import { useState } from "react";
import { useSelector } from "react-redux";
import { FaCamera } from "react-icons/fa";

export default function ProfilePage() {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Handle form submission
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          {/* Header */}
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
              Profile Settings
            </h1>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="space-y-6 px-4 py-5 sm:p-6">
            {/* Profile Image */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt="profile"
                  className="h-32 w-32 rounded-full object-cover ring-4 ring-white dark:ring-gray-700"
                />
                <button
                  type="button"
                  className="absolute bottom-0 right-0 rounded-full bg-white dark:bg-gray-700 p-2 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <FaCamera className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Click to update profile picture
              </span>
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
                  defaultValue={currentUser.username}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 px-2" 
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
                  defaultValue={currentUser.email}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 px-2" 
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 px-2"
                />
              </div>
            </div>

            {/* Update Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>

          {/* Footer Actions */}
          <div className="px-4 py-4 sm:px-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between">
              <button
                type="button"
                className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-500"
              >
                Delete Account
              </button>
              <button
                type="button"
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-500"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
