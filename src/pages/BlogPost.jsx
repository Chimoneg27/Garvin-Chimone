import ReactMarkdown from "react-markdown";
import { getBlogsById } from "../lib/supabase";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BlogPost() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const data = await getBlogsById(id);
        setBlog(data);
      } catch (err) {
        console.error("error fetching blog:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading)
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Loading blog...
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
            Error Loading Blog
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );

  if (!blog && !loading) {
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
              Blog Not Found
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
              The blog you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              to="/Blog"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Back to Blog List
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />

      {/* Main content wrapper */}
      <main className="flex-1 w-full px-4 md:px-0">
        <article className="prose dark:prose-invert prose-lg md:prose-xl max-w-3xl mx-auto py-12">
          <div className="mb-8">
            <Link
              to="/blogs"
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
              Back to Blogs
            </Link>
          </div>
          <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>

          <div className="mb-10 text-left space-y-1 text-lg font-medium max-w-md">
            <p className="text-3xl">
              <span className="font-semibold">Author:</span> {blog.author}
            </p>
            <p className="text-xl">
              <span className="font-semibold">Date:</span>{" "}
              {new Date(blog.date_published).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="text-xl">
              <span className="font-semibold">Tags:</span>{" "}
              {blog.tags?.join(", ")}
            </p>
          </div>

          <img
            src={blog.banner}
            alt={blog.title}
            className="rounded-xl w-full mb-12 shadow-md"
          />

          <ReactMarkdown>{blog.main_body}</ReactMarkdown>
        </article>
      </main>

      <Footer />
    </div>
  );
}
