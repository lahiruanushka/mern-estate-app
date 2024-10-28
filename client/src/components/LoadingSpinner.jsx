const LoadingSpinner = ({ size = "16", color = "blue-600" }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        className={`animate-spin rounded-full h-${size} w-${size} border-b-2 border-${color}`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
