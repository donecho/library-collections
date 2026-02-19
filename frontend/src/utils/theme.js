export const setTheme = (mode) => {
  localStorage.setItem("theme", mode);

  const root = document.documentElement;

  if (mode === "dark") {
    root.classList.remove("light");
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
    root.classList.add("light");
  }
};

export const getTheme = () => {
  return localStorage.getItem("theme") || "light";
};
