import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  SearchIcon,
  Car,
  Sofa,
  Tag,
  SlidersHorizontal,
  Building2,
  X,
} from "lucide-react";
import { Switch, RadioGroup, Dialog } from "@headlessui/react";
import { listingService } from "../services/listingService";
import LoadingSpinner from "../components/LoadingSpinner";

export default function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  const [filters, setFilters] = useState({
    searchTerm: "",
    type: "all",
    offer: false,
    parking: false,
    furnished: false,
    sort: "createdAt",
    order: "desc",
  });

  const [showFiltersModal, setShowFiltersModal] = useState(false);

  // Add a temporary filters state for the modal
  const [tempFilters, setTempFilters] = useState(filters);

  useEffect(() => {
    // Get URL parameters
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    // filters if URL parameters exist
    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      const newFilters = {
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true",
        furnished: furnishedFromUrl === "true",
        offer: offerFromUrl === "true",
        sort: sortFromUrl || "createdAt",
        order: orderFromUrl || "desc",
      };
      setFilters(newFilters);
      setTempFilters(newFilters);
    }

    // Fetch listings
    const fetchListings = async () => {
      try {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const data = await listingService.getAllListings(searchQuery);
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [location.search]);

  // Update tempFilters when modal opens
  useEffect(() => {
    setTempFilters(filters);
  }, [showFiltersModal]);

  const handleChange = (field, value) => {
    if (field === "sort") {
      // Find the sort option and extract its values
      const sortOption = sortOptions.find((option) => option.id === value);
      if (sortOption) {
        setFilters({
          ...filters,
          sort: sortOption.value.sort,
          order: sortOption.value.order,
        });
      }
    } else {
      setFilters({ ...filters, [field]: value });
    }
  };

  const handleModalChange = (field, value) => {
    if (field === "sort") {
      // Find the sort option and extract its values
      const sortOption = sortOptions.find((option) => option.id === value);
      if (sortOption) {
        setTempFilters({
          ...tempFilters,
          sort: sortOption.value.sort,
          order: sortOption.value.order,
        });
      }
    } else {
      setTempFilters({ ...tempFilters, [field]: value });
    }
  };

  const handleSubmit = () => {
    const urlParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      urlParams.set(key, value);
    });
    navigate(`/search?${urlParams.toString()}`);
    setShowFiltersModal(false);
  };

  const handleModalSubmit = () => {
    // Apply temp filters to main filters
    setFilters(tempFilters);

    // Update URL with new filters
    const urlParams = new URLSearchParams();
    Object.entries(tempFilters).forEach(([key, value]) => {
      urlParams.set(key, value);
    });
    navigate(`/search?${urlParams.toString()}`);
    setShowFiltersModal(false);
  };

  const sortOptions = [
    {
      id: "price_desc",
      name: "Price: High to Low",
      value: { sort: "price", order: "desc" },
    },
    {
      id: "price_asc",
      name: "Price: Low to High",
      value: { sort: "price", order: "asc" },
    },
    {
      id: "createdAt_desc",
      name: "Latest",
      value: { sort: "createdAt", order: "desc" },
    },
    {
      id: "createdAt_asc",
      name: "Oldest",
      value: { sort: "createdAt", order: "asc" },
    },
  ];

  const propertyTypes = [
    { id: "all", name: "All Properties" },
    { id: "rent", name: "For Rent" },
    { id: "sale", name: "For Sale" },
  ];

  const getSortValue = (filters) => {
    const { sort, order } = filters;
    return (
      sortOptions.find(
        (option) => option.value.sort === sort && option.value.order === order
      )?.id || "createdAt_desc"
    );
  };

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
          {/* Search Input */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search properties..."
              value={filters.searchTerm}
              onChange={(e) => handleChange("searchTerm", e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          {/* Property Type */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
              Property Type
            </h3>
            <RadioGroup
              value={filters.type}
              onChange={(value) => handleChange("type", value)}
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
                      <>
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
                      </>
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
                onChange={(checked) => handleChange("parking", checked)}
              />
              <FilterSwitch
                label="Furnished"
                icon={<Sofa className="w-5 h-5 text-gray-500" />}
                checked={filters.furnished}
                onChange={(checked) => handleChange("furnished", checked)}
              />
              <FilterSwitch
                label="Special Offer"
                icon={<Tag className="w-5 h-5 text-gray-500" />}
                checked={filters.offer}
                onChange={(checked) => handleChange("offer", checked)}
              />
            </div>
          </div>

          {/* Sort */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
              Sort By
            </h3>
            <select
              value={getSortValue(filters)}
              onChange={(e) => handleChange("sort", e.target.value)}
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
            onClick={handleSubmit}
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
              {/* Search Input */}
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={tempFilters.searchTerm}
                  onChange={(e) =>
                    handleModalChange("searchTerm", e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              {/* Property Type */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                  Property Type
                </h3>
                <RadioGroup
                  value={tempFilters.type}
                  onChange={(value) => handleModalChange("type", value)}
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
                          <>
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
                          </>
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
                    checked={tempFilters.parking}
                    onChange={(checked) =>
                      handleModalChange("parking", checked)
                    }
                  />
                  <FilterSwitch
                    label="Furnished"
                    icon={<Sofa className="w-5 h-5 text-gray-500" />}
                    checked={tempFilters.furnished}
                    onChange={(checked) =>
                      handleModalChange("furnished", checked)
                    }
                  />
                  <FilterSwitch
                    label="Special Offer"
                    icon={<Tag className="w-5 h-5 text-gray-500" />}
                    checked={tempFilters.offer}
                    onChange={(checked) => handleModalChange("offer", checked)}
                  />
                </div>
              </div>

              {/* Sort */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                  Sort By
                </h3>
                <select
                  value={getSortValue(tempFilters)}
                  onChange={(e) => handleModalChange("sort", e.target.value)}
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
                  onClick={handleModalSubmit}
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
            {loading ? 0 : `${listings.length}`} results found
          </div>
        </div>

        {/* Results grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <LoadingSpinner />
          ) : listings.length === 0 ? (
            <div>No listings found</div>
          ) : (
            listings.map((listing) => (
              <div
                key={listing._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-4">
                  <h3 className="text-lg font-semibold dark:text-white">
                    {listing.name}
                  </h3>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
