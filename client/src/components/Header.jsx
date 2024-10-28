import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input, Menu } from "@headlessui/react";
import { FaBars, FaSearch } from "react-icons/fa";
import clsx from "clsx";
import { useSelector } from "react-redux";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/logo.png";
import defaultProfile from "../assets/images/default-profile.png";
import { useEffect, useState } from "react";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  // Function to check if a link is active
  const isActive = (path) => {
    if (path === "/" && location.pathname !== "/") {
      return false;
    }
    return location.pathname.startsWith(path);
  };

  // Reusable link style function
  const getLinkStyles = (path) => {
    return clsx(
      "text-slate-700 dark:text-white hover:underline transition-colors duration-200",
      {
        "font-semibold text-blue-600 dark:text-blue-400 underline":
          isActive(path),
      }
    );
  };

  // Reusable mobile menu item style function
  const getMobileMenuStyles = (active, path) => {
    return clsx("block px-4 py-2 text-sm text-gray-700 dark:text-white", {
      "bg-gray-100 dark:bg-gray-600": active,
      "font-semibold text-blue-600 dark:text-blue-400": isActive(path),
    });
  };

  return (
    <header className="shadow-md bg-slate-200 dark:bg-gray-800">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex items-center">
            <img src={logo} alt="EstateLink Logo" className="mr-2 h-8 w-8" />
            <span className="text-slate-700 dark:text-white">EstateLink</span>
          </h1>
        </Link>

        <form className="p-3 rounded-lg flex items-center bg-slate-100 dark:bg-gray-700"     onSubmit={handleSubmit}>
          <Input
            placeholder="Search..."
            className="block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm text-dark dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-white/25"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" aria-label="Search" className="ml-3">
            <FaSearch className="text-slate-600 dark:text-gray-400" />
          </button>
        </form>

        <nav className="hidden sm:flex gap-4 items-center">
          <Link to="/">
            <span className={getLinkStyles("/")}>Home</span>
          </Link>

          <Link to="/about">
            <span className={getLinkStyles("/about")}>About</span>
          </Link>

          {currentUser ? (
            <>
              <Link to="/listings">
                <span className={getLinkStyles("/listings")}>Listings</span>
              </Link>

              <Link to="/profile">
                <div
                  className={clsx("flex items-center", {
                    "ring-2 ring-blue-500 rounded-full": isActive("/profile"),
                  })}
                >
                  <img
                    className="rounded-full h-7 w-7 object-cover"
                    src={currentUser.avatar || defaultProfile}
                    alt="Profile"
                  />
                </div>
              </Link>
            </>
          ) : (
            <Link to="/sign-in">
              <span className={getLinkStyles("/sign-in")}>Sign in</span>
            </Link>
          )}

          <ThemeToggle />
        </nav>

        {/* Mobile menu button */}
        <div className="sm:hidden">
          <Menu>
            {({ open }) => (
              <>
                <Menu.Button className="focus:outline-none">
                  <FaBars
                    className="text-slate-700 dark:text-white"
                    aria-label="Menu"
                  />
                </Menu.Button>
                <Menu.Items
                  className={clsx(
                    "absolute right-0 mt-2 w-48 border rounded-md shadow-lg bg-white dark:bg-gray-700",
                    open ? "" : "hidden"
                  )}
                >
                  <Menu.Item>
                    {({ active }) => (
                      <Link to="/" className={getMobileMenuStyles(active, "/")}>
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
                  {/* only shown when user is logged in */}
                  {currentUser && (
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/listings"
                          className={getMobileMenuStyles(active, "/listings")}
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
                        className={clsx(
                          "block px-4 py-2 text-sm flex items-center",
                          getMobileMenuStyles(
                            active,
                            currentUser ? "/profile" : "/sign-in"
                          )
                        )}
                      >
                        {currentUser ? (
                          <>
                            <div
                              className={clsx("flex items-center", {
                                "ring-2 ring-blue-500 rounded-full":
                                  isActive("/profile"),
                              })}
                            >
                              <img
                                className="rounded-full h-7 w-7 object-cover mr-2"
                                src={currentUser.avatar || defaultProfile}
                                alt="profile"
                              />
                            </div>
                            <span>Profile</span>
                          </>
                        ) : (
                          <span>Sign in</span>
                        )}
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={clsx(
                          "block px-4 py-2 text-sm text-gray-700 dark:text-white",
                          { "bg-gray-100 dark:bg-gray-600": active }
                        )}
                      >
                        <ThemeToggle />
                      </div>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}