import { Link } from "react-router-dom";
import { Input, Menu } from "@headlessui/react";
import { FaSearch } from "react-icons/fa";
import clsx from "clsx";

export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-700">EstateLink</span>
          </h1>
        </Link>

        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <Input
            placeholder="Search..."
            className={clsx(
              "block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm text-dark",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-white/25"
            )}
          />
          <button type="submit" aria-label="Search">
            <FaSearch className="text-slate-600" />
          </button>
        </form>

        <nav className="hidden sm:flex gap-4">
          <Link to="/">
            <span className="text-slate-700 hover:underline">Home</span>
          </Link>
          <Link to="/about">
            <span className="text-slate-700 hover:underline">About</span>
          </Link>
          <Link to="/profile">
            <span className="text-slate-700 hover:underline">Sign in</span>
          </Link>
        </nav>

        {/* Mobile menu button */}
        <div className="sm:hidden">
          <Menu>
            {({ open }) => (
              <>
                <Menu.Button className="focus:outline-none">
                  <span className="text-slate-700">Menu</span>
                </Menu.Button>
                <Menu.Items
                  className={`absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg ${open ? "" : "hidden"}`}
                >
                  {/** Menu Items */}
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/"
                        className={clsx("block px-4 py-2 text-sm", {
                          "bg-gray-100": active,
                        })}
                      >
                        Home
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/about"
                        className={clsx("block px-4 py-2 text-sm", {
                          "bg-gray-100": active,
                        })}
                      >
                        About
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={clsx("block px-4 py-2 text-sm", {
                          "bg-gray-100": active,
                        })}
                      >
                        Sign in
                      </Link>
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
