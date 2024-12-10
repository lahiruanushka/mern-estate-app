import React from "react";
import { AlertTriangle, Clock } from "lucide-react";

const MaintenanceMessage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-8 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-2xl dark:shadow-2xl dark:shadow-blue-900/20 rounded-2xl p-8 text-center border border-gray-100 dark:border-gray-700 transition-all duration-300">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <AlertTriangle
              className="text-yellow-500 dark:text-yellow-400 w-16 h-16 animate-pulse"
              strokeWidth={1.5}
            />
            <div className="absolute -bottom-2 -right-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full p-1 animate-bounce">
              <Clock
                className="w-5 h-5 text-yellow-600 dark:text-yellow-300 opacity-70"
                strokeWidth={2}
              />
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-colors">
          Service Under Maintenance
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-6 transition-colors">
          We apologize for the inconvenience. Our service is currently
          undergoing essential updates.
        </p>

        <div className="bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-400 dark:border-yellow-600 p-4 rounded-r-lg">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-full">
              <AlertTriangle
                className="w-5 h-5 text-yellow-600 dark:text-yellow-300"
                strokeWidth={2}
              />
            </div>
            <p className="text-yellow-700 dark:text-yellow-300 text-base flex-grow text-left">
              We're working diligently to enhance your experience.
            </p>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
          <Clock
            className="w-4 h-4 text-gray-400 dark:text-gray-500"
            strokeWidth={2}
          />
          <span>Estimated Return: Soon</span>
        </div>

        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Need assistance? Contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceMessage;
