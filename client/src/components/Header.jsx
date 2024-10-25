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
  const darkMode = useSelector((state) => state.theme.darkMode);

  console.log(currentUser);

  return (
    <header
      className={clsx("shadow-md", darkMode ? "bg-gray-800" : "bg-slate-200")}
    >
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex items-center">
            <img src={logo} alt="EstateLink Logo" className="mr-2 h-8 w-8" />
            <span className={clsx(darkMode ? "text-white" : "text-slate-700")}>
              EstateLink
            </span>
          </h1>
        </Link>

        <form
          className={clsx(
            "p-3 rounded-lg flex items-center",
            darkMode ? "bg-gray-700" : "bg-slate-100"
          )}
        >
          <Input
            placeholder="Search..."
            className={clsx(
              "block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm",
              darkMode ? "text-white" : "text-dark",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-white/25"
            )}
          />
          <button type="submit" aria-label="Search" className="ml-3">
            <FaSearch
              className={clsx(
                "mr-3",
                darkMode ? "text-gray-400" : "text-slate-600"
              )}
            />
          </button>
        </form>

        <nav className="hidden sm:flex gap-4 items-center">
          <Link to="/">
            <span
              className={clsx(
                "hover:underline",
                darkMode ? "text-white" : "text-slate-700"
              )}
            >
              Home
            </span>
          </Link>
          <Link to="/about">
            <span
              className={clsx(
                "hover:underline",
                darkMode ? "text-white" : "text-slate-700"
              )}
            >
              About
            </span>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar || defaultProfile}
                alt="profile"
              />
            ) : (
              <li className=" text-slate-700 hover:underline"> Sign in</li>
            )}
          </Link>
          <ThemeToggle />
        </nav>

        {/* Mobile menu button */}
        <div className="sm:hidden">
          <Menu>
            {({ open }) => (
              <>
                <Menu.Button className="focus:outline-none">
                  <FaBars
                    className={clsx(darkMode ? "text-white" : "text-slate-700")}
                    aria-label="Menu"
                  />
                </Menu.Button>
                <Menu.Items
                  className={clsx(
                    "absolute right-0 mt-2 w-48 border rounded-md shadow-lg",
                    darkMode ? "bg-gray-700" : "bg-white",
                    open ? "" : "hidden"
                  )}
                >
                  {/* Menu Items */}
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/"
                        className={clsx(
                          "block px-4 py-2 text-sm",
                          {
                            "bg-gray-600": active && darkMode,
                            "bg-gray-100": active && !darkMode,
                          },
                          darkMode ? "text-white" : "text-gray-700"
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
                          "block px-4 py-2 text-sm",
                          {
                            "bg-gray-600": active && darkMode,
                            "bg-gray-100": active && ! darkMode,
                          },
                          darkMode ? "text-white" : "text-gray-700"
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
                          "block px-4 py-2 text-sm flex items-center",
                          {
                            "bg-gray-600": active && darkMode,
                            "bg-gray-100": active && !darkMode,
                          },
                          darkMode ? "text-white" : "text-gray-700"
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
                          "block px-4 py-2 text-sm",
                          {
                            "bg-gray-600": active && darkMode,
                            "bg-gray-100": active && !darkMode,
                          },
                          darkMode ? "text-white" : "text-gray-700"
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
