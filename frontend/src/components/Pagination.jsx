const Pagination = ({ page, setPage, books }) => {
  return (
    <div className="flex justify-center gap-4 mt-6">

      {/* Prev */}
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span className="font-semibold">
        Page {page}
      </span>

      {/* Next */}
      <button
        onClick={() => setPage(page + 1)}
        disabled={books.length < 6}
        className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;
