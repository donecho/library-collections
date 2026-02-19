import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ThemeToggle from "../components/ThemeToggle";

const DashboardLayout = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">

      {/* HEADER */}
      <header className="
        flex justify-end items-center
        px-4 py-3
        bg-white dark:bg-gray-800
        border-b border-indigo-500
        shadow
        shrink-0
      ">
        <ThemeToggle />
      </header>

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <Sidebar />

        {/* MAIN CONTENT SCROLL AREA */}
        <main
          className="
            flex-1
            overflow-y-auto
            p-6
            bg-gray-100 dark:bg-gray-900
            text-gray-900 dark:text-gray-100
          "
        >
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;
