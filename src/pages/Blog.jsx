import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../auth/AuthProvider"
import { userRole } from "../hooks/userRoleHook"
import { useTheme } from "../components/ThemeContext";
import { getMyBlogs } from "../lib/supabase";
import { useState, useEffect } from "react";

export default function Blog() {
  const { color } = useTheme();
  const { role } = userRole()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  return (
    <div>
      <Navbar />
      <h1
        className="text-5xl md:text-6xl font-bold text-center mb-4 tracking-tight"
        style={{ color: color }}
      >
        Garvin&apos;s Blog
      </h1>

      <h2>A place to view my latest ideas and notes</h2>
      <Footer />
    </div>
  );
}
