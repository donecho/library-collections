import { useEffect, useState } from "react";
import api from "../../services/api";
import Table from "../../components/Table";

const SavedBooks = () => {
  const [savedBooks, setSavedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSaved = async () => {
    try {
      const res = await api.get("/users/saved");
      setSavedBooks(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSaved();
  }, []);

  const removeSaved = async (id) => {
    await api.delete(`/users/save/${id}`);
    setSavedBooks(prev => prev.filter(b => b._id !== id));
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">

      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        ⭐ Saved Books
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table
          books={savedBooks}
          showUnsave
          onUnsave={removeSaved}
        />
      )}
    </div>
  );
};

export default SavedBooks;
