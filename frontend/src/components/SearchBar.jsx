const SearchBar = ({ setKeyword }) => {
  return (
    <input
      className="border px-4 py-2 rounded w-64 shadow dark:bg-gray-800 dark:border-gray-700"
      placeholder="Search..."
      onChange={(e) => setKeyword(e.target.value)}
    />
  );
};

export default SearchBar;
