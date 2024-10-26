import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 px-6">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <ExclamationTriangleIcon className="h-24 w-24 text-red-600 dark:text-red-500" />
        </div>
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="text-lg max-w-md mx-auto text-gray-600 dark:text-gray-400">
          Oops! The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <button
          onClick={handleGoHome}
          className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
        >
          <FaHome className="mr-2 h-5 w-5" />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
