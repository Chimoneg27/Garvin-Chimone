import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTheme } from "../components/ThemeContext";
import BookForm from "../components/BookForm";
import { userRole } from "../hooks/userRoleHook";

export default function Books() {
  const { role } = userRole()

  const { color } = useTheme();
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <Navbar />

      {role === 'admin' ? (<BookForm />) : ''}
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
        <form className="bg-blue-800">

        </form>
      </div>
      <Footer />
    </div>
  );
}
