import closedFolder from "../assets/closedFolder.png";
import openFolder from "../assets/openFolder.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from '../components/Footer'
import Navbar from "../components/Navbar";
import { useTheme } from "../components/ThemeContext";

const Home = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const { color } = useTheme()

  return (
    <>
    <Navbar />
      <div className="w-full flex justify-center mt-80 mb-6">
        <ul className="w-4/6 flex flex-row justify-between items-center p-4" style={{ color: color }}>
          <li
            onMouseEnter={() => setHoveredId("dev")} // hover id is set to ensure each folder opens when hovered on
            onMouseLeave={() => setHoveredId(null)}
            onFocus={() => setHoveredId("dev")}
            onBlur={() => setHoveredId(null)}
            tabIndex={0}
            className="text-lg font-semibold flex flex-col justify-between items-center"
          >
            <Link
              to="/Dev"
              className="flex flex-col justify-between items-center"
            >
              <img
                src={hoveredId === "dev" ? openFolder : closedFolder}
                height={250}
                width={250}
                alt="Dev folder"
              />
              <h2>Dev</h2>
            </Link>
          </li>
          <li
            onMouseEnter={() => setHoveredId("music")}
            onMouseLeave={() => setHoveredId(null)}
            onFocus={() => setHoveredId("music")}
            onBlur={() => setHoveredId(null)}
            tabIndex={0}
            className="text-lg font-semibold flex flex-col justify-between items-center"
          >
            <Link
              to="/MusicLibrary"
              className="flex flex-col justify-between items-center"
            >
              <img
                src={hoveredId === "music" ? openFolder : closedFolder}
                height={250}
                width={250}
                alt="Music folder"
              />
              <h2>Music</h2>
            </Link>
          </li>
          <li
            onMouseEnter={() => setHoveredId("books")}
            onMouseLeave={() => setHoveredId(null)}
            onFocus={() => setHoveredId("books")}
            onBlur={() => setHoveredId(null)}
            tabIndex={0}
            className="text-lg font-semibold flex flex-col justify-between items-center"
          >
            <Link
              to="/Books"
              className="flex flex-col justify-between items-center"
            >
              <img
                src={hoveredId === "books" ? openFolder : closedFolder}
                height={250}
                width={250}
                alt="Books folder"
              />
              <h2>Books</h2>
            </Link>
          </li>
          <li
            onMouseEnter={() => setHoveredId("movies")}
            onMouseLeave={() => setHoveredId(null)}
            onFocus={() => setHoveredId("movies")}
            onBlur={() => setHoveredId(null)}
            tabIndex={0}
            className="text-lg font-semibold flex flex-col justify-between items-center"
          >
            <Link
              to="/Movies&TV"
              className="flex flex-col justify-between items-center"
            >
              <img
                src={hoveredId === "movies" ? openFolder : closedFolder}
                height={250}
                width={250}
                alt="Movies and series folder"
              />
              <h2>Movies & Series</h2>
            </Link>
          </li>
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default Home;
