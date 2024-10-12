import { useSelector } from "react-redux";

const ThemeProvider = ({ children }) => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {children}
    </div>
  );
};

export default ThemeProvider;
