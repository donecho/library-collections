import { useEffect, useState } from "react";
import api from "../services/api";
import Table from "../components/Table";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ pagination
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 4;

  const loadBooks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/books");
      setBooks(res.data.books || []);
    } finally {
      setLoading(false);
    }
  };

  const loadSaved = async () => {
    const res = await api.get("/users/saved");
    setSavedIds(res.data.map(b => b._id));
  };

  useEffect(() => {
    loadBooks();
    loadSaved();
  }, []);

  const toggleSave = async (bookId) => {
    if (savedIds.includes(bookId)) {
      await api.delete(`/users/save/${bookId}`);
      setSavedIds(prev => prev.filter(id => id !== bookId));
    } else {
      await api.post(`/users/save/${bookId}`);
      setSavedIds(prev => [...prev, bookId]);
    }
  };

  // ✅ search filter
  const filteredBooks = books.filter(book =>
    book.title?.toLowerCase().includes(search.toLowerCase()) ||
    book.author?.toLowerCase().includes(search.toLowerCase()) ||
    book.category?.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ pagination logic
  const indexOfLast = currentPage * booksPerPage;
  const indexOfFirst = indexOfLast - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div className="p-4 md:p-8 bg-gray-100 dark:bg-gray-900 min-h-screen ">

      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        📚 Library Books
      </h1>

      {/* 🔍 SEARCH */}
      <input
        placeholder="Search..."
        value={search}
        onChange={(e)=>{
          setSearch(e.target.value);
          setCurrentPage(1);   // reset page when searching
        }}
        className="mb-6 px-4 py-2 border rounded w-full max-w-md bg-white dark:bg-gray-800
      text-gray-900 dark:text-gray-100
      border-gray-200 dark:border-gray-700"
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Table
            books={currentBooks}
            savedIds={savedIds}
            toggleSave={toggleSave}
          />

          {/* ✅ PAGINATION */}
          <div className="flex justify-center mt-8 gap-2 flex-wrap bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            border-gray-200 dark:border-gray-700  ">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              className="px-3 py-1 border rounded dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              border-gray-200 dark:border-gray-700"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-grey"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              className="px-3 py-1 border rounded bg-white  dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              border-gray-200 dark:border-gray-700 px-3 py-1 border rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Books;
