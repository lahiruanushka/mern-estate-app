import { SearchX } from "lucide-react";

const NoResults = ({ handleResetSearch }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 mb-8 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm">
      <SearchX className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" />
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
        No Listings Found
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-center max-w-md">
        Sorry, we couldn&apos;t find any listings matching your criteria. Try
        adjusting your filters or search terms.
      </p>
      <button
        onClick={() => handleResetSearch()}
        className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
      >
        Reset Search
      </button>
    </div>
  );
};

export default NoResults;
