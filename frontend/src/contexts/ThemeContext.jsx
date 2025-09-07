import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext("darkMode");

export const ThemeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem("darkMode");
    return storedMode ? storedMode === "true" : true;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const value = { darkMode, setDarkMode };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
