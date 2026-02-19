import { useEffect, useState } from "react";
import api from "../../services/api";
import { setTheme } from "../../utils/theme";

const Dashboard = () => {
  const [status, setStatus] = useState({
    totalBooks: 0,
    borrowed: 0,
    users: 0
  });

  useEffect(() => {
    api.get("/status").then((res) => {
      setStatus(res.data);
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Welcome to Library Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="p-6 bg-white dark:bg-gray-800 shadow rounded">
          <h2 className="font-semibold">Total Books</h2>
          <p className="text-xl">{status.totalBooks}</p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 shadow rounded">
          <h2 className="font-semibold">Borrowed</h2>
          <p className="text-xl">{status.borrowed}</p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 shadow rounded">
          <h2 className="font-semibold">Users</h2>
          <p className="text-xl">{status.users}</p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
