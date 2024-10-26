import { Switch } from "@headlessui/react";

const FeatureToggle = ({ label, enabled, onChange }) => (
  <Switch.Group>
    <div className="flex items-center space-x-4">
      <Switch
        checked={enabled}
        onChange={onChange}
        className={`${
          enabled ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      >
        <span
          className={`${
            enabled ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </Switch>
      <Switch.Label className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </Switch.Label>
    </div>
  </Switch.Group>
);

export default FeatureToggle;
