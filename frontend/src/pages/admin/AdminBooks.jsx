import { useEffect, useState, useRef } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

// const AdminBooks = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [search, setSearch] = useState("");

//   const [editingBook, setEditingBook] = useState(null);

//   const [form, setForm] = useState({
//     title: "",
//     author: "",
//     category: "",
//   });

//   const [pdf, setPdf] = useState(null);
//   const [cover, setCover] = useState(null);

//   const pdfRef = useRef(null);
//   const coverRef = useRef(null);

//   /* ================= PAGINATION ================= */

//   const [currentPage, setCurrentPage] = useState(1);
//   const booksPerPage = 5; // change → 3 / 6 / 9

//   /* ================= LOAD BOOKS ================= */

//   const loadBooks = () => {
//     setLoading(true);
//     api.get("/books")
//       .then(res => {
//         const data = Array.isArray(res.data)
//           ? res.data
//           : res.data.books || [];
//         setBooks(data);
//       })
//       .catch(() => toast.error("Failed to load books"))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     loadBooks();
//   }, []);

  

//   /* ================= RESET FORM ================= */

//   const resetForm = () => {
//     setForm({ title: "", author: "", category: "" });
//     setPdf(null);
//     setCover(null);
//     setEditingBook(null);

//     if (pdfRef.current) pdfRef.current.value = "";
//     if (coverRef.current) coverRef.current.value = "";

//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   /* ================= SUBMIT ================= */

//   const submit = async () => {
//     if (!form.title) {
//       toast.error("Title required");
//       return;
//     }

//     const fd = new FormData();
//     Object.keys(form).forEach(k => fd.append(k, form[k]));
//     if (pdf) fd.append("pdf", pdf);
//     if (cover) fd.append("cover", cover);

//     try {
//       if (editingBook) {
//         await api.put(`/books/${editingBook._id}`, fd);
//         toast.success("Updated");
//       } else {
//         if (!pdf || !cover) {
//           toast.error("PDF & Cover required");
//           return;
//         }
//         await api.post("/books/add", fd);
//         toast.success("Added");
//       }

//       resetForm();
//       loadBooks();

//     } catch {
//       toast.error("Save failed");
//     }
//   };

//   const editBook = (b) => {
//     setEditingBook(b);
//     setForm({
//       title: b.title || "",
//       author: b.author || "",
//       category: b.category || "",
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const deleteBook = async (id) => {
//     if (!window.confirm("Delete this book?")) return;
//     try {
//       await api.delete("/books/" + id);
//       toast.success("Deleted");
//       loadBooks();
//     } catch {
//       toast.error("Delete failed");
//     }
//   };

//   /* ================= SEARCH FILTER ================= */

//   const filteredBooks = books.filter(b =>
//     b.title?.toLowerCase().includes(search.toLowerCase()) ||
//     b.author?.toLowerCase().includes(search.toLowerCase()) ||
//     b.category?.toLowerCase().includes(search.toLowerCase())
//   );

//   /* ================= PAGINATION LOGIC ================= */

//   const indexOfLast = currentPage * booksPerPage;
//   const indexOfFirst = indexOfLast - booksPerPage;
//   const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredBooks.length / booksPerPage) || 1;

//   /* ================= UI ================= */

//   return (
//     <div className="min-h-screen bg-gray-100 px-4 py-6">

//       <h1 className="text-2xl font-bold mb-6">
//         📚 Library Management
//       </h1>

//       {/* 🔍 SEARCH */}
//       <input
//         type="text"
//         placeholder="Search by title, author, category..."
//         value={search}
//         onChange={(e) => {
//           setSearch(e.target.value);
//           setCurrentPage(1); // reset page
//         }}
//         className="mb-6 px-4 py-2 border rounded w-full max-w-md"
//       />

//       {/* ================= BOOK GRID ================= */}

//       {loading ? (
//         <p className="text-center">Loading...</p>
//       ) : currentBooks.length === 0 ? (
//         <p className="text-center text-gray-500">No books found.</p>
//       ) : (
//         <>
//           <div
//             className="
//               grid gap-6
//               grid-cols-1
//               sm:grid-cols-2
//               md:grid-cols-3
//               lg:grid-cols-4
//               xl:grid-cols-5
//             "
//           >
//             {currentBooks.map((b) => (
//               <div
//                 key={b._id}
//                 className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden"
//               >
//                 <img
//                   src={
//                     b.cover
//                       ? `http://localhost:5000/uploads/covers/${b.cover}`
//                       : "/no-image.png"
//                   }
//                   alt={b.title}
//                   className="w-full aspect-[3/4] object-cover"
//                 />

//                 <div className="p-4">
//                   <h3 className="font-semibold line-clamp-1">{b.title}</h3>
//                   <p className="text-sm text-gray-500">{b.author}</p>
//                   <p className="text-indigo-600 text-sm">{b.category}</p>

//                   <div className="flex justify-between mt-3 text-sm">
//                     <button
//                       onClick={() => editBook(b)}
//                       className="text-blue-600"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => deleteBook(b._id)}
//                       className="text-red-600"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* ================= PAGINATION ================= */}

//           <div className="flex justify-center gap-2 mt-8 flex-wrap">
//             <button
//               onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
//               className="px-3 py-1 border rounded bg-white"
//             >
//               Prev
//             </button>

//             {[...Array(totalPages)].map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`px-3 py-1 border rounded ${
//                   currentPage === i + 1
//                     ? "bg-indigo-600 text-white"
//                     : "bg-white"
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}

//             <button
//               onClick={() =>
//                 setCurrentPage(p => Math.min(p + 1, totalPages))
//               }
//               className="px-3 py-1 border rounded bg-white"
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

const AdminBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [editingBook, setEditingBook] = useState(null);

  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
  });

  const [pdf, setPdf] = useState(null);
  const [cover, setCover] = useState(null);

  const pdfRef = useRef(null);
  const coverRef = useRef(null);

  /* ================= LOAD BOOKS ================= */

  const loadBooks = () => {
    setLoading(true);
    api.get("/books")
      .then(res => {
        const data = res.data.books || [];
        setBooks(data);
      })
      .catch(() => toast.error("Failed to load books"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadBooks();
  }, []);

  /* ================= RESET FORM ================= */

  const resetForm = () => {
    setForm({ title: "", author: "", category: "" });
    setPdf(null);
    setCover(null);
    setEditingBook(null);
    if (pdfRef.current) pdfRef.current.value = "";
    if (coverRef.current) coverRef.current.value = "";
  };

  /* ================= SUBMIT ================= */

  const submit = async () => {
    if (!form.title) return toast.error("Title required");

    const fd = new FormData();
    Object.keys(form).forEach(k => fd.append(k, form[k]));
    if (pdf) fd.append("pdf", pdf);
    if (cover) fd.append("cover", cover);

    try {
      if (editingBook) {
        await api.put(`/books/${editingBook._id}`, fd);
        toast.success("Updated");
      } else {
        if (!pdf || !cover) {
          toast.error("PDF & Cover required");
          return;
        }
        await api.post("/books/add", fd);
        toast.success("Added");
      }

      resetForm();
      loadBooks();

    } catch {
      toast.error("Save failed");
    }
  };

  const editBook = (b) => {
    setEditingBook(b);
    setForm({
      title: b.title || "",
      author: b.author || "",
      category: b.category || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteBook = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    try {
      await api.delete("/books/" + id);
      toast.success("Deleted");
      loadBooks();
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ================= SEARCH ================= */

  const filteredBooks = books.filter(b =>
    b.title?.toLowerCase().includes(search.toLowerCase()) ||
    b.author?.toLowerCase().includes(search.toLowerCase()) ||
    b.category?.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-6">

      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        📚 Library Management
      </h1>

      {/* ================= FORM ================= */}

      {/* ================= FORM ================= */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 rounded-2xl shadow-lg mb-10 max-w-2xl ml-30">

        <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
          {editingBook ? "✏️ Edit Book" : "➕ Add New Book"}
        </h2>

        <div className="grid gap-5">

          {/* TITLE */}
          <div>
            <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
              Book Title
            </label>
            <input
              placeholder="Enter book title"
              value={form.title}
              onChange={(e)=>setForm({...form,title:e.target.value})}
              className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg
                         focus:ring-2 focus:ring-indigo-500 focus:outline-none
                         dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* AUTHOR */}
          <div>
            <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
              Author
            </label>
            <input
              placeholder="Enter author name"
              value={form.author}
              onChange={(e)=>setForm({...form,author:e.target.value})}
              className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg
                         focus:ring-2 focus:ring-indigo-500 focus:outline-none
                         dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
              Category
            </label>
            <input
              placeholder="Eg. Education, Novel, Technology"
              value={form.category}
              onChange={(e)=>setForm({...form,category:e.target.value})}
              className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg
                         focus:ring-2 focus:ring-indigo-500 focus:outline-none
                         dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* FILE UPLOAD */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
                Upload PDF
              </label>
              <input
                type="file"
                accept="application/pdf"
                ref={pdfRef}
                onChange={(e)=>setPdf(e.target.files[0])}
                className="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-lg
                           file:mr-3 file:px-4 file:py-2 file:border-0
                           file:bg-indigo-600 file:text-white file:rounded-lg
                           hover:file:bg-indigo-700 cursor-pointer
                           dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
                Upload Cover
              </label>
              <input
                type="file"
                accept="image/*"
                ref={coverRef}
                onChange={(e)=>setCover(e.target.files[0])}
                className="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-lg
                           file:mr-3 file:px-4 file:py-2 file:border-0
                           file:bg-indigo-600 file:text-white file:rounded-lg
                           hover:file:bg-indigo-700 cursor-pointer
                           dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4 pt-4">

            <button
              onClick={submit}
              className="flex-1 sm:flex-none px-6 py-2 rounded-lg
                         bg-indigo-600 text-white font-medium
                         hover:bg-indigo-700 active:scale-95 transition shadow-md"
            >
              {editingBook ? "Update Book" : "Add Book"}
            </button>

            {editingBook && (
              <button
                onClick={resetForm}
                className="flex-1 sm:flex-none px-6 py-2 rounded-lg
                           border border-gray-300 dark:border-gray-600
                           hover:bg-gray-100 dark:hover:bg-gray-700
                           transition"
              >
                Cancel
              </button>
            )}

          </div>

        </div>
      </div>


      {/* SEARCH */}
      <input
        placeholder="Search..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className="mb-6 px-4 py-2 border rounded w-full max-w-md"
      />

      {/* BOOK GRID */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map(b => (
            <div key={b._id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <img
                src={`http://localhost:5000/uploads/covers/${b.cover}`}
                alt=""
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="font-semibold mt-2 text-gray-800 dark:text-white">{b.title}</h3>
              <p className="text-sm text-gray-500">{b.author}</p>
              <p className="text-indigo-600 text-sm">{b.category}</p>

              <div className="flex justify-between mt-3 text-sm">
                <button onClick={()=>editBook(b)} className="text-blue-600">Edit</button>
                <button onClick={()=>deleteBook(b._id)} className="text-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBooks;
