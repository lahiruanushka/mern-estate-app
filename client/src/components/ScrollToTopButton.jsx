import React, { useState, useEffect } from "react";
import { HiArrowUp } from "react-icons/hi";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-teal-500 text-white shadow-lg hover:bg-teal-600 focus:outline-none"
          aria-label="Scroll to top"
        >
          <HiArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
