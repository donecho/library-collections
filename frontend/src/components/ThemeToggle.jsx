import { useEffect, useState } from "react";
import { getTheme, setTheme } from "../utils/theme";

const ThemeToggle = () => {
  const [theme, setThemeState] = useState("light");

  useEffect(() => {
    const saved = getTheme();
    setTheme(saved);
    setThemeState(saved);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    setThemeState(next);
  };

  return (
    <button
      onClick={toggle}
      className="
        flex items-center gap-2
        px-2 py-2
        rounded-lg border
        bg-white dark:bg-gray-800
        transition-colors duration-300
      "
    >
      {theme === "dark" ? "🌙" : "☀️"}
      <span className="dark:text-white">
        {theme === "dark" ? "Dark" : "Light"}
      </span>
    </button>
  );
};

export default ThemeToggle;
