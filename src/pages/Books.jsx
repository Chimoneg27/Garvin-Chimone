import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTheme } from "../components/ThemeContext";

export default function Books() {
  const { color } = useTheme();
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <Navbar />
      <div className="w-auto mt-20">
        <h1
          className="text-4xl font-bold text-center md:text-5xl"
          style={{ color: color }}
        >
          Books
        </h1>
        <p className="text-lg font-semibold text-center p-2 sm:text-xl md:text-2xl">
          My Book Collection
        </p>
      </div>
      <Footer />
    </div>
  );
}
