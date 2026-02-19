import { useEffect } from "react";
import { getTheme, setTheme } from "./utils/theme";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Public Pages
import Register from "./pages/Register";
import Login from "./pages/Login";
// User Pages
import Books from "./pages/Books";
import Profile from "./pages/Profile";
import UserDashboard from "./pages/user/Dashboard";
// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
// Layout
import DashboardLayout from "./layouts/DashboardLayout";
// Route Protection
import AdminRoute from "./components/AdminRoute";
import AdminBooks from "./pages/admin/AdminBooks";
import AdminUsers from "./pages/admin/AdminUsers";
import SavedBooks from "./pages/user/SavedBooks";


function App() {
  useEffect(() => {
    const saved = getTheme();
    setTheme(saved);
  }, []);

  return (
    <>
      <Toaster position="top-right" />

      <Routes>

        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ========== USER ROUTES ========== */}
        <Route path="/" element={<Navigate to="/books" />} />
        <Route element={<DashboardLayout />}>
          <Route path="/books" element={<Books />} />
          <Route path="/saved" element={<SavedBooks />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* ========== ADMIN ROUTE ========== */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <DashboardLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="books" element={<AdminBooks />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </>
  );
}

export default App;
