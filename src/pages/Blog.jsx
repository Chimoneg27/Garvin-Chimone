import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../auth/AuthProvider";
import { useTheme } from "../components/ThemeContext";
import { useState, useEffect } from "react";
import { getMyBlogs } from "../lib/supabase";
import Signup from "../auth/Signup";
import { Link } from "react-router";

export default function Blog() {
  const { color } = useTheme();
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await getMyBlogs();
      setBlogs(data);
      console.log(data);
    };

    fetchBlogs();
  }, []);

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <div>
      <Navbar />
      <h1
        className="text-5xl md:text-6xl font-bold text-center mb-4 tracking-tight"
        style={{ color: color }}
      >
        Garvin&apos;s Blog
      </h1>

      <h2 className="text-xl md:text-2xl font-medium text-center text-gray-600 dark:text-gray-300 mb-12">
        A place to view my latest ideas and notes
      </h2>

      {!user ? (
        <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-gradient-to-b from-gray-50 to-gray-100 rounded-2xl shadow-md max-w-2xl mx-auto mt-10">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-800">
            Sign up to view my blog posts
          </h2>
          <p className="text-gray-600 mb-8 max-w-md">
            Join to access my latest thoughts, ideas, and notes.
          </p>
          <div className="w-full max-w-sm">
            <Signup />
          </div>
        </div>
      ) : (
        <div className="px-4 sm:px-6 lg:px-0 max-w-5xl mx-auto">
          <ul className="space-y-8">
            {blogs.map((blog) => (
              <li key={blog.id}>
                <div
                  className="
            flex flex-col md:flex-row 
            bg-white dark:bg-gray-900
            rounded-2xl shadow-lg hover:shadow-2xl 
            transition-all duration-300 
            overflow-hidden
            border border-gray-200 dark:border-gray-700
          "
                >
                  <div className="w-full md:w-1/2 h-60 md:h-auto overflow-hidden">
                    <img
                      src={blog.banner}
                      alt={blog.title}
                      className="
                w-full h-full object-cover 
                hover:scale-105 
                transition-transform duration-500
              "
                    />
                  </div>

                  <div className="flex-1 p-6 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {blog.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                      {formatDate(blog.date_published)}
                    </p>

                    <Link
                      to={`/blogs/${blog.id}`}
                      className="
                text-white px-5 py-2.5 rounded-lg 
                font-medium shadow-md
                transition-transform duration-300 
                hover:scale-105
                w-fit
                bg-black
              "
                    >
                      View Blog
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Footer />
    </div>
  );
}
