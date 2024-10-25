import { Link } from "react-router-dom";
import { Input, Menu } from "@headlessui/react";
import { FaBars, FaSearch } from "react-icons/fa";
import clsx from "clsx";
import { useSelector } from "react-redux";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/logo.png";
import defaultProfile from "../assets/images/default-profile.png";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="shadow-md bg-slate-200 dark:bg-gray-800">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex items-center">
            <img src={logo} alt="EstateLink Logo" className="mr-2 h-8 w-8" />
            <span className="text-slate-700 dark:text-white">EstateLink</span>
          </h1>
        </Link>

        <form className="p-3 rounded-lg flex items-center bg-slate-100 dark:bg-gray-700">
          <Input
            placeholder="Search..."
            className="block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm text-dark dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-white/25"
          />
          <button type="submit" aria-label="Search" className="ml-3">
            <FaSearch className="text-slate-600 dark:text-gray-400" />
          </button>
        </form>

        <nav className="hidden sm:flex gap-4 items-center">
          <Link to="/">
            <span className="text-slate-700 dark:text-white hover:underline">
              Home
            </span>
          </Link>

          <Link to="/about">
            <span className="text-slate-700 dark:text-white hover:underline">
              About
            </span>
          </Link>

          {currentUser ? (
            <Link to="/profile">
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar || defaultProfile}
                alt="Profile"
              />
            </Link>
          ) : (
            <Link to="/sign-in">
              <span className="text-slate-700 dark:text-white hover:underline">
                Sign in
              </span>
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
                      <Link
                        to="/"
                        className={clsx(
                          "block px-4 py-2 text-sm text-gray-700 dark:text-white",
                          { "bg-gray-100 dark:bg-gray-600": active }
                        )}
                      >
                        Home
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/about"
                        className={clsx(
                          "block px-4 py-2 text-sm text-gray-700 dark:text-white",
                          { "bg-gray-100 dark:bg-gray-600": active }
                        )}
                      >
                        About
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={clsx(
                          "block px-4 py-2 text-sm flex items-center text-gray-700 dark:text-white",
                          { "bg-gray-100 dark:bg-gray-600": active }
                        )}
                      >
                        {currentUser ? (
                          <>
                            <img
                              className="rounded-full h-7 w-7 object-cover mr-2"
                              src={currentUser.avatar || defaultProfile}
                              alt="profile"
                            />
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
