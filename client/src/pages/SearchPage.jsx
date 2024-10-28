import { useState } from "react";
import {
  SearchIcon,
  Home,
  Car,
  Sofa,
  Tag,
  SlidersHorizontal,
  ArrowDownWideNarrow,
  Building2,
  X,
} from "lucide-react";
import { Switch, RadioGroup } from "@headlessui/react";
import { Dialog } from "@headlessui/react";

export default function SearchPage() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    type: "all",
    offer: false,
    parking: false,
    furnished: false,
  });
  const [sortOption, setSortOption] = useState("latest");
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  const sortOptions = [
    { id: "price-desc", name: "Price: High to Low" },
    { id: "price-asc", name: "Price: Low to High" },
    { id: "latest", name: "Latest" },
    { id: "oldest", name: "Oldest" },
  ];

  const propertyTypes = [
    { id: "all", name: "All Properties" },
    { id: "rent", name: "For Rent" },
    { id: "sale", name: "For Sale" },
  ];

  const FilterSwitch = ({ label, icon, checked, onChange }) => (
    <Switch.Group>
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          {icon}
          <Switch.Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </Switch.Label>
        </div>
        <Switch
          checked={checked}
          onChange={onChange}
          className={`${
            checked ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900`}
        >
          <span
            className={`${
              checked ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
      </div>
    </Switch.Group>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="hidden md:block w-80 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 rounded-md m-3">
        <div className="space-y-6">
          {/* Property Type */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
              Property Type
            </h3>
            <RadioGroup
              value={filters.type}
              onChange={(value) => setFilters({ ...filters, type: value })}
            >
              <div className="space-y-2">
                {propertyTypes.map((type) => (
                  <RadioGroup.Option
                    key={type.id}
                    value={type.id}
                    className={({ checked }) =>
                      `${
                        checked
                          ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      }
                      relative flex cursor-pointer rounded-lg px-4 py-3 border focus:outline-none`
                    }
                  >
                    {({ checked }) => (
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              className={`font-medium ${
                                checked
                                  ? "text-blue-900 dark:text-blue-100"
                                  : "text-gray-900 dark:text-gray-100"
                              }`}
                            >
                              {type.name}
                            </RadioGroup.Label>
                          </div>
                        </div>
                        {checked && (
                          <div className="shrink-0 text-blue-500">
                            <Building2 className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
              Features
            </h3>
            <div className="space-y-2">
              <FilterSwitch
                label="Parking"
                icon={<Car className="w-5 h-5 text-gray-500" />}
                checked={filters.parking}
                onChange={(checked) =>
                  setFilters({ ...filters, parking: checked })
                }
              />
              <FilterSwitch
                label="Furnished"
                icon={<Sofa className="w-5 h-5 text-gray-500" />}
                checked={filters.furnished}
                onChange={(checked) =>
                  setFilters({ ...filters, furnished: checked })
                }
              />
              <FilterSwitch
                label="Special Offer"
                icon={<Tag className="w-5 h-5 text-gray-500" />}
                checked={filters.offer}
                onChange={(checked) =>
                  setFilters({ ...filters, offer: checked })
                }
              />
            </div>
          </div>

          {/* Sort */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
              Sort By
            </h3>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full border border-gray-200 dark:border-gray-700 rounded-lg
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                       py-2 px-3 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600
                       focus:border-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg
                     flex items-center justify-center gap-2 transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     dark:focus:ring-offset-gray-900"
          >
            <SearchIcon className="w-5 h-5" />
            Apply Filters
          </button>
        </div>
      </div>

      {/* Mobile Filter Button */}
      <button
        onClick={() => setShowFiltersModal(true)}
        className="md:hidden fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg
                 flex items-center justify-center hover:bg-blue-700 transition-colors duration-200
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <SlidersHorizontal className="w-6 h-6" />
      </button>

      {/* Mobile Filters Modal */}
      <Dialog
        open={showFiltersModal}
        onClose={() => setShowFiltersModal(false)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
            <div className="flex items-center justify-between mb-6">
              <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
                Filters
              </Dialog.Title>
              <button
                onClick={() => setShowFiltersModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Property Type */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                  Property Type
                </h3>
                <RadioGroup
                  value={filters.type}
                  onChange={(value) => setFilters({ ...filters, type: value })}
                >
                  <div className="space-y-2">
                    {propertyTypes.map((type) => (
                      <RadioGroup.Option
                        key={type.id}
                        value={type.id}
                        className={({ checked }) =>
                          `${
                            checked
                              ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                              : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                          }
                        relative flex cursor-pointer rounded-lg px-4 py-3 border focus:outline-none`
                        }
                      >
                        {({ checked }) => (
                          <div className="flex w-full items-center justify-between">
                            <div className="flex items-center">
                              <div className="text-sm">
                                <RadioGroup.Label
                                  className={`font-medium ${
                                    checked
                                      ? "text-blue-900 dark:text-blue-100"
                                      : "text-gray-900 dark:text-gray-100"
                                  }`}
                                >
                                  {type.name}
                                </RadioGroup.Label>
                              </div>
                            </div>
                            {checked && (
                              <div className="shrink-0 text-blue-500">
                                <Building2 className="h-5 w-5" />
                              </div>
                            )}
                          </div>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                  Features
                </h3>
                <div className="space-y-2">
                  <FilterSwitch
                    label="Parking"
                    icon={<Car className="w-5 h-5 text-gray-500" />}
                    checked={filters.parking}
                    onChange={(checked) =>
                      setFilters({ ...filters, parking: checked })
                    }
                  />
                  <FilterSwitch
                    label="Furnished"
                    icon={<Sofa className="w-5 h-5 text-gray-500" />}
                    checked={filters.furnished}
                    onChange={(checked) =>
                      setFilters({ ...filters, furnished: checked })
                    }
                  />
                  <FilterSwitch
                    label="Special Offer"
                    icon={<Tag className="w-5 h-5 text-gray-500" />}
                    checked={filters.offer}
                    onChange={(checked) =>
                      setFilters({ ...filters, offer: checked })
                    }
                  />
                </div>
              </div>

              {/* Sort */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                  Sort By
                </h3>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full border border-gray-200 dark:border-gray-700 rounded-lg
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                         py-2 px-3 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600
                         focus:border-transparent"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setShowFiltersModal(false)}
                  className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 
                         hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Apply filters logic here
                    setShowFiltersModal(false);
                  }}
                  className="flex-1 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Property Listings
          </h1>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            24 results found
          </div>
        </div>

        {/* Results grid would go here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Property cards would go here */}
        </div>
      </div>
    </div>
  );
}
