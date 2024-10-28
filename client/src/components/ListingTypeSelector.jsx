import { RadioGroup } from "@headlessui/react";
import { HomeIcon, KeyIcon } from "lucide-react";

const ListingTypeSelector = ({ selectedType, onTypeChange }) => {
  const options = [
    {
      value: "sale",
      label: "For Sale",
      icon: HomeIcon,
      description:
        "List your property for potential buyers and set your ideal selling price",
      accessibilityLabel: "Select to list property for sale",
    },
    {
      value: "rent",
      label: "For Rent",
      icon: KeyIcon,
      description:
        "Advertise your rental property and specify the monthly rental amount",
      accessibilityLabel: "Select to list property for rent",
    },
  ];

  return (
    <div className="space-y-2">
      <RadioGroup
        value={selectedType}
        onChange={onTypeChange}
        className="w-full"
        aria-label="Select listing type"
      >
        <RadioGroup.Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          How would you like to list your property?
        </RadioGroup.Label>
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
                ${
                  !checked
                    ? "hover:border-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    : ""
                }`
              }
              aria-label={option.accessibilityLabel}
            >
              {({ checked }) => (
                <>
                  <div className="flex w-full items-center justify-between gap-4">
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={`font-medium text-lg mb-1 ${
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
                      className={`h-6 w-6 shrink-0 ${
                        checked
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                  <div
                    className={`absolute inset-0 rounded-lg border-2 border-transparent ${
                      checked ? "border-blue-600" : ""
                    }`}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default ListingTypeSelector;
