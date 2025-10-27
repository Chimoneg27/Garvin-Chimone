import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../auth/AuthProvider";
import { useTheme } from "../components/ThemeContext";
import { useState, useEffect } from "react";
import { getMyBlogs } from "../lib/supabase";
import Signup from "../auth/Signup";

export default function Blog() {
  const { color } = useTheme();
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState(null)

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
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id}>
              <div className="flex flex-col md:flex-row bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden max-w-4xl mx-auto mb-6">
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-500 mb-4">{formatDate(blog.date_published)}</p>
                  <button className="text-white px-4 py-2 rounded-lg transition-colors w-fit" style={{ backgroundColor: color }}>
                    View Blog
                  </button>
                </div>
                <div className="md:w-1/2 w-full">
                  <img
                    src={blog.banner}
                    alt={blog.title}
                    className="w-full h-56 md:h-full object-cover rounded-t-2xl md:rounded-none md:rounded-r-2xl"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Footer />
    </div>
  );
}
