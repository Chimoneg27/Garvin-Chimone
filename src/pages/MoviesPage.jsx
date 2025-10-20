import { getMovieShowById, favMovieShow } from "../lib/supabase";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTheme } from "../components/ThemeContext";
import { useUserRole } from "../hooks/useUserRoleHook";

export default function MoviesPage() {
  const [moviesShows, setMoviesShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { color } = useTheme();
  const { role } = useUserRole();

  const { id } = useParams();

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

  useEffect(() => {
    const fetchMoviesShows = async () => {
      try {
        setLoading(true);
        const data = await getMovieShowById(id);
        setMoviesShows(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching movies and shows");
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesShows();
  }, [id]);

  const getFavMovieShow = (movieShow) => {
    if (movieShow.favorite === true) {
      return {
        text: "Favorite",
        bgColor: "bg-red-500 dark:bg-red-900",
        textColor: "text-white font-bold",
      };
    } else {
      return {
        text: "Not Set",
        bgColor: "bg-gray-100 dark:bg-gray-700",
        textColor: "text-gray-600 dark:text-gray-400",
      };
    }
  };

  const makeFavorite = async (showMovieId, newFavorite) => {
    try {
      await favMovieShow({
        showMovieId: showMovieId,
        newFavorite: newFavorite,
      });

      setMoviesShows((prevMovieShow) => ({
        ...prevMovieShow,
        favorite: newFavorite === "favorite",
      }));
    } catch (error) {
      console.error("Error making this movie or show your favorite", error);
      alert("Failed to update favorite book, try again");
    }
  };

  if (loading)
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading movies or show...</p>
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
            Error Loading Movie or Show
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );

  if (!moviesShows && !loading) {
    return (
      <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="pt-24 pb-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <svg
                className="w-24 h-24 mx-auto"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-4">
              Movie or show not found
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
              The movie or show you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              to="/Movies&TV"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Back to Movies&TV
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link
              to="/Movies&TV"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Movies&TV
            </Link>
          </div>

          {moviesShows && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:block hidden col-span-full">
                <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src={moviesShows.banner_url}
                    alt={`cover of ${moviesShows.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <div className="aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl overflow-hidden shadow-2xl">
                    <img
                      src={moviesShows.poster_url}
                      alt={`cover of ${moviesShows.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-6">
                    <span
                      className={`inline-block w-full text-center px-4 py-3 rounded-xl text-sm font-medium ${
                        getMovieShowStatus(moviesShows).bgColor
                      } ${getMovieShowStatus(moviesShows).textColor}`}
                    >
                      {getMovieShowStatus(moviesShows).text}
                    </span>
                  </div>
                  <div className="mt-6">
                    {role === "admin" ? (
                      <select
                        value={moviesShows.favorite ? "favorite" : "not_set"}
                        onChange={(e) =>
                          makeFavorite(moviesShows.id, e.target.value)
                        }
                        className={`w-full px-4 py-2 rounded-lg text-sm font-medium border-2 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                          getFavMovieShow(moviesShows).bgColor
                        } ${getFavMovieShow(moviesShows).textColor}`}
                      >
                        <option value="favorite">Favorite</option>
                        <option value="not_set">Not Set</option>
                      </select>
                    ) : moviesShows.favorite === true ? (
                      <p
                        className={`w-full px-4 py-2 rounded-lg text-sm font-medium border-2 text-center ${
                          getFavMovieShow(moviesShows).bgColor
                        } ${getFavMovieShow(moviesShows).textColor} `}
                      >
                        Favorite
                      </p>
                    ) : (
                      <p>Not Set</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="space-y-8">
                  <div>
                    <h1
                      className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
                      style={{ color: color }}
                    >
                      {moviesShows.name}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium">
                      Directed by {moviesShows.director}
                    </p>
                  </div>

                  {moviesShows.year_released_date && (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 max-w-sm">
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                        Release Date
                      </h3>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">
                        {new Date(
                          moviesShows.year_released_date
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  )}

                  {moviesShows.genres && (
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        Genres
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {moviesShows.genres.map((genre, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-red-600"
                          >
                            {genre.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {moviesShows.starring && (
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        Starring
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {moviesShows.starring.map((genre, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-600 text-white"
                          >
                            {genre.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {moviesShows.description && (
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Description
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                        {moviesShows.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
