import closedFolder from "../assets/closedFolder.png";
import openFolder from "../assets/openFolder.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTheme } from "../components/ThemeContext";

const Home = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const { color } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full flex justify-center mt-20 mb-6">
        <ul className="w-4/5 flex flex-col md:flex-row justify-between items-center gap-8 p-4" style={{ color: color }}>
          {[
            { id: "dev", label: "Dev", to: "/Dev" },
            { id: "music", label: "Music", to: "/MusicLibrary" },
            { id: "books", label: "Books", to: "/Books" },
            { id: "movies", label: "Movies & Series", to: "/Movies&TV" },
          ].map(({ id, label, to }) => (
            <li
              key={id}
              onMouseEnter={() => setHoveredId(id)}
              onMouseLeave={() => setHoveredId(null)}
              className="text-lg font-semibold flex flex-col justify-between items-center"
            >
              <Link to={to} className="flex flex-col justify-between items-center">
                <img
                  src={hoveredId === id ? openFolder : closedFolder}
                  className="w-32 h-32 md:w-64 md:h-64"
                  alt={`${label} folder`}
                />
                <h2>{label}</h2>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
