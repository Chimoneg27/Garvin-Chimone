import { getMyBooks } from "../lib/supabase";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const id = useParams().id

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const booksData = await getMyBooks();
        setBooks(booksData);
        console.log(booksData);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading)
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Loading book...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-red-200 dark:border-red-800">
          <div className="text-red-500 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Error Loading Books
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  
  const book = books.find(b => b.id === id)
  return (
    <div>
      <h1>{book.name}</h1>
    </div>
  )
}
