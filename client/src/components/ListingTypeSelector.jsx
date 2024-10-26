import { RadioGroup } from "@headlessui/react";
import { HomeIcon, KeyIcon } from "lucide-react";

const ListingTypeSelector = ({ selectedType, onTypeChange }) => {
  const options = [
    {
      value: "sale",
      label: "For Sale",
      icon: HomeIcon,
      description: "Set the monthly price if this property is for sale.",
    },
    {
      value: "rent",
      label: "For Rent",
      icon: KeyIcon,
      description: "Set the monthly price if this property is for rent.",
    },
  ];

  return (
    <RadioGroup value={selectedType} onChange={onTypeChange}>
      <div className="flex flex-col sm:flex-row gap-4">
        {options.map((option) => (
          <RadioGroup.Option
            key={option.value}
            value={option.value}
            className={({ active, checked }) =>
              `flex-1 relative flex cursor-pointer rounded-lg px-5 py-4 border-2 transition-all
              ${
                checked
                  ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200 dark:border-gray-700"
              }
              ${
                active
                  ? "ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-gray-900"
                  : ""
              }
              ${!checked ? "hover:border-blue-300" : ""}`
            }
          >
            {({ checked }) => (
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                  <div className="text-sm">
                    <RadioGroup.Label
                      as="p"
                      className={`font-medium text-lg ${
                        checked
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      {option.label}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className={`inline ${
                        checked
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {option.description}
                    </RadioGroup.Description>
                  </div>
                </div>
                <option.icon
                  className={`h-6 w-6 ${
                    checked
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                  aria-hidden="true"
                />
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export default ListingTypeSelector;
