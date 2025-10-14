import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTheme } from "../components/ThemeContext";
import BookForm from "../components/BookForm";
import { userRole } from "../hooks/userRoleHook";
import { getMyBooks, bookStatus } from "../lib/supabase";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Books() {
  const { role } = userRole();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { color } = useTheme();
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [totalPages, setTotalPages] = useState(0);

  const getBookStatus = (book) => {
    if (book.read) {
      return {
        text: "Completed",
        bgColor: "bg-green-100 dark:bg-green-900",
        textColor: "text-green-800 dark:text-green-200",
      };
    } else if (book.reading) {
      return {
        text: "Currently Reading",
        bgColor: "bg-yellow-100 dark:bg-yellow-900",
        textColor: "text-yellow-800 dark:text-yellow-200",
      };
    } else if (book.want_to_read) {
      return {
        text: "Want to Read",
        bgColor: "bg-blue-100 dark:bg-blue-900",
        textColor: "text-blue-800 dark:text-blue-200",
      };
    } else {
      return {
        text: "Not Set",
        bgColor: "bg-gray-100 dark:bg-gray-700",
        textColor: "text-gray-600 dark:text-gray-400",
      };
    }
  };

  const handleStatusChange = async (bookId, newStatus) => {
    try {
      await bookStatus({
        bookId: bookId,
        newStatus: newStatus,
      });

      setBooks((prevBooks) =>
        prevBooks.map((book) => {
          if (book.id === bookId) {
            return {
              ...book,
              read: newStatus === "read",
              reading: newStatus === "reading",
              want_to_read: newStatus === "want_to_read",
            };
          }
          return book;
        })
      );
    } catch (error) {
      console.error("Error updating book status:", error);
      alert("Failed to update book status. Please try again.");
    }
  };

  const filterBooks = () => {
    return []
  }

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const { data, count } = await getMyBooks(page, limit);
        setBooks(data);
        setTotalPages(Math.ceil(count / limit));
        console.log(data);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [page, limit]);

  if (loading)
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Loading books...
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

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />

      {role === "admin" ? <BookForm /> : ""}
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1
            className="text-5xl md:text-6xl font-bold text-center mb-4 tracking-tight"
            style={{ color: color }}
          >
            Books
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-center text-gray-600 dark:text-gray-300 mb-12">
            My Book Collection
          </h2>

          {books.length > 0 ? (
            <ul className="p-6 w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {books.map((book) => (
                <li
                  key={book.id}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transform hover:-translate-y-1 relative"
                >
                  {book.favorite_book === true ? (
                    <button
                      className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md z-10"
                      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
                      aria-label="Favorite Book"
                    >
                      <svg
                        className="text-red-400 w-4 h-4 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
                      </svg>
                    </button>
                  ) : (
                    ""
                  )}
                  <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                    <img
                      src={`${book.cover_image_url}`}
                      alt={`Cover of ${book.name}`}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
                      {book.name}
                    </h3>
                    <p className="text-base text-gray-600 dark:text-gray-300 font-medium mb-2">
                      by {book.author}
                    </p>

                    <div className="mb-4">
                      {role === "admin" ? (
                        <select
                          value={
                            book.read
                              ? "read"
                              : book.reading
                              ? "reading"
                              : book.want_to_read
                              ? "want_to_read"
                              : "not_set"
                          }
                          onChange={(e) =>
                            handleStatusChange(book.id, e.target.value)
                          }
                          className={`w-full px-4 py-2 rounded-lg text-sm font-medium border-2 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                            getBookStatus(book).bgColor
                          } ${getBookStatus(book).textColor}`}
                        >
                          <option value="not_set">Not Set</option>
                          <option value="want_to_read">Want to Read</option>
                          <option value="reading">Currently Reading</option>
                          <option value="read">Completed</option>
                        </select>
                      ) : (
                        <span
                          className={`inline-block w-full text-center px-4 py-2 rounded-lg text-sm font-medium ${
                            getBookStatus(book).bgColor
                          } ${getBookStatus(book).textColor}`}
                        >
                          {getBookStatus(book).text}
                        </span>
                      )}
                      <Link
                        to={`/books/${book.id}`}
                        className="inline-block w-full text-center mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        View Book
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <svg
                  className="w-24 h-24 mx-auto"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                No Books Yet
              </h3>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Your book collection is waiting to be filled
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600 disabled:hover:shadow-none"
          >
            Previous
          </button>

          <span className="text-gray-600 dark:text-gray-300 font-medium">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600 disabled:hover:shadow-none"
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
