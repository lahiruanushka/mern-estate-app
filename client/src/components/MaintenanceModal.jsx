import React from "react";
import { MonitorIcon, WrenchIcon } from "lucide-react";
import { LuAlertCircle, LuClock } from "react-icons/lu";

const MaintenanceModal = ({
  isOpen,
  onClose,
  title = "System Maintenance",
  type = "scheduled",
  estimatedTime = "2 hours",
  showCloseButton = true,
}) => {
  // Early return if modal is not open
  if (!isOpen) return null;

  const messages = {
    scheduled: {
      icon: LuClock,
      title: "Scheduled Maintenance",
      description: `We'll be performing scheduled maintenance to improve our services. 
        Expected duration: ${estimatedTime}. We appreciate your patience!`,
      additionalInfo:
        "Don't worry, we'll be back soon with improved features and better performance.",
      alertStyle:
        "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800",
    },
    emergency: {
      icon: LuAlertCircle,
      title: "Emergency Maintenance",
      description:
        "We're currently addressing an urgent system issue. Our team is working to resolve this as quickly as possible.",
      additionalInfo:
        "We understand this is inconvenient and we're doing our best to minimize downtime.",
      alertStyle:
        "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800",
    },
    upgrade: {
      icon: MonitorIcon,
      title: "System Upgrade",
      description:
        "We're upgrading our system to bring you new features and improvements.",
      additionalInfo:
        "When we're back, you'll enjoy better performance and new capabilities.",
      alertStyle:
        "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800",
    },
    repairs: {
      icon: WrenchIcon,
      title: "Technical Repairs",
      description:
        "We're making some technical repairs to ensure everything runs smoothly.",
      additionalInfo:
        "This maintenance will help prevent future issues and improve reliability.",
      alertStyle:
        "bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800",
    },
  };

  const currentMessage = messages[type];
  const Icon = currentMessage.icon;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full transform transition-all">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
              <Icon className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-4">
            {title || currentMessage.title}
          </h2>

          {/* Alert Message */}
          <div
            className={`border rounded-lg p-4 mb-4 ${currentMessage.alertStyle}`}
          >
            <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
              Status Update
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-200">
              {currentMessage.description}
            </div>
          </div>

          {/* Additional Information */}
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-6">
            {currentMessage.additionalInfo}
          </p>

          {/* Alternative Actions */}
          <div className="space-y-4">
            {showCloseButton && (
              <button
                onClick={onClose}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg
                  text-sm font-medium transition-colors duration-200"
              >
                I Understand
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceModal;

{
  /* <MaintenanceModal
  isOpen={isMaintenanceModalOpen}
  onClose={() => setIsMaintenanceModalOpen(false)}
  type="scheduled"  // or "emergency", "upgrade", "repairs"
  estimatedTime="2 hours"
/> */
}
