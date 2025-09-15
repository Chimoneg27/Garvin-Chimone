import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MovieShowForm from "../components/MovieShowFrom";
import { userRole } from "../hooks/userRoleHook";
import { useState, useEffect } from "react";
import { getMovieShows, movieShowStatus } from "../lib/supabase";
import { useTheme } from "../components/ThemeContext";
import { Link } from "react-router-dom";

export default function MoviesTV() {
  const { role } = userRole();
  const { color } = useTheme();
  const [moviesShows, setMoviesShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const moviesShowsData = await getMovieShows();
        setMoviesShows(moviesShowsData);
        console.log(moviesShowsData);
      } catch (err) {
        console.error("Error fetchign books:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleStatusChange = async (movieShowId, newStatus) => {
    try {
      await movieShowStatus({
        movieShowId: movieShowId,
        newStatus: newStatus,
      });

      setMoviesShows((prevMoviesShows) =>
        prevMoviesShows.map((movieShow) => {
          if (movieShow.id === movieShowId) {
            return {
              ...movieShow,
              watched: newStatus === "watched",
              watching: newStatus === "watching",
              want_to_watch: newStatus === "want_to_watch",
            };
          }
          return movieShow;
        })
      );
    } catch (error) {
      console.error("Error updating movie|show status:", error);
      alert("Failed to update movie|show status. Try again");
    }
  };

  const getMovieShowStatus = (movieShow) => {
    if (movieShow.watched) {
      return {
        text: "Completed",
        bgColor: "bg-green-100 dark:bg-green-900",
        textColor: "text-green-800 dark:text-green-200",
      };
    } else if (movieShow.watching) {
      return {
        text: "Currently Watching",
        bgColor: "bg-yellow-100 dark:bg-yellow-900",
        textColor: "text-yellow-800 dark:text-yellow-200",
      };
    } else if (movieShow.want_to_watch) {
      return {
        text: "Want to Watch",
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

  if (loading)
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            ...Loading movies and shows
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
            Error Loading Movies & Shows
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />

      {role === "admin" ? <MovieShowForm /> : ""}
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1
            className="text-5xl md:text-6xl font-bold text-center mb-4 tracking-tight"
            style={{ color: color }}
          >
            Movies & Shows
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-center text-gray-600 dark:text-gray-300 mb-12">
            My movies and shows library
          </h2>

          {moviesShows.length > 0 ? (
            <ul className="p-6 w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {moviesShows.map((movieShow) => (
                <li
                  key={movieShow.id}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transform hover:-translate-y-1"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                    <img
                      src={`${movieShow.poster_url}`}
                      alt={`Cover of ${movieShow.name}`}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
                      {movieShow.name}
                    </h3>
                    <p className="text-base text-gray-600 dark:text-gray-300 font-medium mb-2">
                      Directed by {movieShow.director}
                    </p>

                    <div className="mb-4">
                      {role === "admin" ? (
                        <select
                          value={
                            movieShow.watched
                              ? "watched"
                              : movieShow.want_to_watch
                              ? "want_to_watch"
                              : movieShow.watching
                              ? "watching"
                              : "not_set"
                          }
                          onChange={(e) => handleStatusChange(movieShow.id, e.target.value)}
                          className={`w-full px-4 py-2 rounded-lg text-sm font-medium border-2 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                            getMovieShowStatus(movieShow).bgColor
                          } ${getMovieShowStatus(movieShow).textColor}`}
                        >
                          <option value="not_set">Not Set</option>
                          <option value="want_to_watch">Want to Watch</option>
                          <option value="watching">Currently Watching</option>
                          <option value="watched">Completed</option>
                        </select>
                      ) : (
                        <span
                          className={`inline-block w-full text-center px-4 py-2 rounded-lg text-sm font-medium ${
                            getMovieShowStatus(movieShow).bgColor
                          } ${getMovieShowStatus(movieShow).textColor}`}
                        >
                          {getMovieShowStatus(movieShow).text}
                        </span>
                      )}
                      <Link
                        to={`/movies/${movieShow.id}`}
                        className="inline-block w-full text-center mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 dark:textgray-500 mb-4">
                <svg
                  className="w-24 h-24 mx-auto"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                No Movies or Shows Yet
              </h3>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Log in to see my movies and shows
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
