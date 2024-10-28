const Feature = ({ icon: Icon, text }) => (
  <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
    <Icon className="w-5 h-5 text-blue-500" />
    <span className="ml-3 text-gray-700 dark:text-gray-200">{text}</span>
  </div>
);

export default Feature;