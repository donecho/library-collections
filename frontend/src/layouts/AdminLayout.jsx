import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
