import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // ✅ get logged-in admin info
  const token = localStorage.getItem("token");
  const currentUser = token ? jwtDecode(token) : null;

  const fetchUsers = () => {
    api.get("/admin/users")
      .then(res => setUsers(res.data))
      .catch(() => toast.error("Failed to load users"));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const changeRole = async (id, role) => {
    try {
      await api.put(`/admin/users/role/${id}`, { role });
      toast.success("Role updated");
      fetchUsers();
    } catch {
      toast.error("Failed to update role");
    }
  };

  const blockUser = async (id) => {
    try {
      await api.put(`/admin/users/block/${id}`);
      toast.success("User status updated");
      fetchUsers();
    } catch {
      toast.error("Failed");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await api.delete(`/admin/users/${id}`);
      toast.success("User deleted");
      fetchUsers();
    } catch {
      toast.error("Delete failed");
    }
  };

  // ✅ filter users + hide current admin
  const filteredUsers = users
    .filter(u => u._id !== currentUser?.id && u._id !== currentUser?._id)
    .filter(u =>
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="p-4 md:p-8">

      {/* TITLE */}
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
        User Control
      </h1>

      {/* SEARCH */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by email or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* USERS */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {filteredUsers.map((u) => (
          <div
            key={u._id}
            className="bg-white rounded-2xl shadow-md p-5 border hover:shadow-lg transition"
          >
            {/* EMAIL */}
            <p className="font-semibold text-gray-700 break-all">
              {u.email}
            </p>

            {/* BLOCKED BADGE */}
            {u.isBlocked && (
              <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-red-100 text-red-600 rounded">
                BLOCKED
              </span>
            )}

            {/* ROLE */}
            <span className={`inline-block mt-2 px-3 py-1 text-xs rounded-full font-medium
              ${u.role === "admin"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
              }`}>
              {u.role}
            </span>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-2 mt-4">

              {u.role !== "admin" && (
                <button
                  onClick={() => changeRole(u._id, "admin")}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Make Admin
                </button>
              )}

              <button
                onClick={() => !u.isBlocked && blockUser(u._id)}
                className={`px-3 py-1 text-sm rounded-lg text-white transition
                  ${u.isBlocked
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-yellow-600"
                  }`}
              >
                {u.isBlocked ? "Blocked" : "Block"}
              </button>

              <button
                onClick={() => deleteUser(u._id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {filteredUsers.length === 0 && (
        <p className="text-gray-500 mt-10 text-center">
          No users match your search.
        </p>
      )}
    </div>
  );
};

export default AdminUsers;
