"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const CustomHeader = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="max-sm:px-6 px-12 py-6">
      <header className="flex items-center justify-between">
        <h1
          className={`text-xl ${
            theme === "dark" ? "text-white" : "text-gray-900"
          } font-inter font-semibold`}
        >
          My digital garden 🌱
        </h1>
        <button className="text-xl" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </header>
    </div>
  );
};

export default CustomHeader;
