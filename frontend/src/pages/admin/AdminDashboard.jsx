import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/admin/stats")
      .then(res => setStats(res.data))
      .catch(() =>
        setStats({ books: 0, users: 0, mostSavedBook: "None" })
      )
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { title: "Total Books", value: stats?.books },
    { title: "Total Users", value: stats?.users },
  ];

  return (
    
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading statistics...</p>
      ) : (
        <>
          {/* normal cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className="p-6 bg-white shadow-md rounded-xl"
              >
                <h2 className="text-gray-500 text-sm uppercase">
                  {card.title}
                </h2>
                <p className="text-3xl font-bold mt-2">
                  {card.value}
                </p>
              </div>
            ))}
          </div>

          {/* MOST SAVED BOOK */}
          <div className="p-6 bg-white shadow-md rounded-xl">
            <h2 className="text-gray-500 text-sm uppercase">
              Most Saved Book
            </h2>

            <p className="text-xl font-semibold mt-2">
              {stats?.mostSavedBook || "No saves yet"}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
