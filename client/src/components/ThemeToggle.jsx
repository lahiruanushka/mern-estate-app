import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className={`
        p-2 rounded-full transition-colors duration-200
        ${
          darkMode
            ? "bg-gray-800 text-yellow-300 hover:bg-gray-700"
            : "bg-yellow-100 text-gray-800 hover:bg-yellow-200"
        }
      `}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? (
        <Sun size={24} className="transition-transform duration-200 rotate-0" />
      ) : (
        <Moon
          size={24}
          className="transition-transform duration-200 rotate-0"
        />
      )}
    </button>
  );
}
