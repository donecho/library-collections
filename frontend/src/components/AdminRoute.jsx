import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);

    if (decoded.role !== "admin") {
      // eslint-disable-next-line react-hooks/error-boundaries
      return <Navigate to="/dashboard" />;
    }

    return children;

  } catch {
    return <Navigate to="/login" />;
  }
};

export default AdminRoute;
