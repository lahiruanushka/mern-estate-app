import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input, Menu } from "@headlessui/react";
import { FaBars, FaSearch } from "react-icons/fa";
import { X } from "lucide-react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/logo.png";
import defaultProfile from "../assets/images/default-profile.png";
import { useEffect, useState } from "react";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    setIsSearchVisible(false);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const isActive = (path) => {
    if (path === "/" && location.pathname !== "/") {
      return false;
    }
    return location.pathname.startsWith(path);
  };

  const getLinkStyles = (path) => {
    return clsx(
      "text-slate-700 dark:text-white hover:underline transition-colors duration-200",
      {
        "font-semibold text-blue-600 dark:text-blue-400 underline":
          isActive(path),
      }
    );
  };

  const getMobileMenuStyles = (active, path) => {
    return clsx(
      "block px-4 py-2 text-sm text-gray-700 dark:text-white transition-colors duration-200",
      {
        "bg-gray-100 dark:bg-gray-600": active,
        "font-semibold text-blue-600 dark:text-blue-400": isActive(path),
      }
    );
  };

  return (
    <header className="shadow-md bg-slate-200 dark:bg-gray-800 sticky top-0 z-50">
      <div className="flex flex-col w-full">
        {/* Main header content */}
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3 w-full">
          <Link to="/" className="flex-shrink-0">
            <h1 className="font-bold text-sm sm:text-xl flex items-center">
              <img src={logo} alt="EstateLink Logo" className="h-8 w-8 mr-2" />
              <span className="text-slate-700 dark:text-white xs:block">
                EstateLink
              </span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/">
              <span className={getLinkStyles("/")}>Home</span>
            </Link>
            <Link to="/about">
              <span className={getLinkStyles("/about")}>About</span>
            </Link>
            {currentUser && (
              <Link to="/listings">
                <span className={getLinkStyles("/listings")}>Listings</span>
              </Link>
            )}
          </nav>

          {/* Desktop Search and Actions */}
          <div className="hidden md:flex items-center gap-4">
            <form
              className="relative flex items-center bg-slate-100 dark:bg-gray-700 rounded-lg"
              onSubmit={handleSubmit}
            >
              <Input
                type="text"
                placeholder="Search..."
                className="w-64 py-2 px-4 rounded-lg border-none bg-transparent text-sm text-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 text-slate-600 dark:text-gray-400"
              >
                <FaSearch className="h-4 w-4" />
              </button>
            </form>

            {currentUser ? (
              <Link to="/profile">
                <div
                  className={clsx("flex items-center", {
                    "ring-2 ring-blue-500 rounded-full": isActive("/profile"),
                  })}
                >
                  <img
                    className="rounded-full h-8 w-8 object-cover"
                    src={currentUser.avatar || defaultProfile}
                    alt="Profile"
                  />
                </div>
              </Link>
            ) : (
              <Link to="/sign-in">
                <span className={getLinkStyles("/sign-in")}>Sign in</span>
              </Link>
            )}
            <ThemeToggle />
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setIsSearchVisible(!isSearchVisible)}
              className="p-2 text-slate-700 dark:text-white"
              aria-label="Toggle search"
            >
              <FaSearch className="h-5 w-5" />
            </button>

            <Menu as="div" className="relative">
              {({ open }) => (
                <>
                  <Menu.Button className="p-2 text-slate-700 dark:text-white focus:outline-none">
                    {open ? (
                      <X className="h-5 w-5" aria-label="Close menu" />
                    ) : (
                      <FaBars className="h-5 w-5" aria-label="Open menu" />
                    )}
                  </Menu.Button>

                  <Menu.Items className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/"
                            className={getMobileMenuStyles(active, "/")}
                          >
                            Home
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/about"
                            className={getMobileMenuStyles(active, "/about")}
                          >
                            About
                          </Link>
                        )}
                      </Menu.Item>
                      {currentUser && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/listings"
                              className={getMobileMenuStyles(
                                active,
                                "/listings"
                              )}
                            >
                              Listings
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={currentUser ? "/profile" : "/sign-in"}
                            className={getMobileMenuStyles(
                              active,
                              currentUser ? "/profile" : "/sign-in"
                            )}
                          >
                            <div className="flex items-center">
                              {currentUser && (
                                <img
                                  className="rounded-full h-6 w-6 mr-2 object-cover"
                                  src={currentUser.avatar || defaultProfile}
                                  alt="Profile"
                                />
                              )}
                              <span>{currentUser ? "Profile" : "Sign in"}</span>
                            </div>
                          </Link>
                        )}
                      </Menu.Item>
                      <div className="px-4 py-2">
                        <ThemeToggle />
                      </div>
                    </div>
                  </Menu.Items>
                </>
              )}
            </Menu>
          </div>
        </div>

        {/* Mobile Search Bar - Slides down when active */}
        <div
          className={clsx(
            "md:hidden bg-slate-200 dark:bg-gray-800 transition-all duration-300 overflow-hidden",
            {
              "max-h-16 py-2": isSearchVisible,
              "max-h-0": !isSearchVisible,
            }
          )}
        >
          <form
            className="px-3 flex items-center gap-2"
            onSubmit={handleSubmit}
          >
            <Input
              type="text"
              placeholder="Search..."
              className="w-full py-2 px-4 rounded-lg border-none bg-slate-100 dark:bg-gray-700 text-sm text-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="p-2 text-slate-600 dark:text-gray-400"
              aria-label="Submit search"
            >
              <FaSearch className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
