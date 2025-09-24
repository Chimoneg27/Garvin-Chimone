import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import { useAuth } from "../auth/AuthProvider"
import { useTheme } from "../components/ThemeContext";

export default function Blog() {
  const { color } = useTheme();
  return (
    <div>
      <Navbar />
      <h1
        className="text-5xl md:text-6xl font-bold text-center mb-4 tracking-tight"
        style={{ color: color }}
      >
        Blog Page Coming Soon
      </h1>
      <Footer />
    </div>
  );
}
