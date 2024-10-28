import { AlertCircle, CheckCircle } from "lucide-react";

const StatusMessage = ({ type, message }) => {
  if (!message) return null;
  
  const styles = {
    success: "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200",
    error: "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200",
    info: "bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200",
  };

  const icons = {
    success: <CheckCircle className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />,
    info: <AlertCircle className="h-5 w-5" />,
  };

  return (
    <div className={`rounded-lg p-4 mb-4 flex items-center gap-2 ${styles[type]}`}>
      {icons[type]}
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default StatusMessage;

