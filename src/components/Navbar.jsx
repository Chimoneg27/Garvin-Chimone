import { useState } from "react";
import { useTheme } from "./ThemeContext";
import { Link } from "react-router-dom";
import { 
  HouseOutlined, MusicNoteOutlined, Book, 
  LiveTvOutlined, GitHub, ComputerOutlined, Menu, Close 
} from "@mui/icons-material";

export default function Navbar() {
  const { color } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="p-4 flex justify-between items-center w-11/12 mx-auto relative navbar">
      {/* Logo */}
      <Link to='/'>
        <h1 className="text-3xl font-bold navbar" style={{ color: color }}>
          GARVIN
        </h1>
      </Link>

      {/* Desktop Menu */}
      <ul
        className="hidden md:flex gap-6 text-2xl"
        style={{ color: color }}
      >
        <Link to="/"><li><HouseOutlined fontSize="inherit" /></li></Link>
        <Link to="/MusicLibrary"><li><MusicNoteOutlined fontSize="inherit" /></li></Link>
        <Link to="/Books"><li><Book fontSize="inherit" /></li></Link>
        <Link to="/Movies&TV"><li><LiveTvOutlined fontSize="inherit" /></li></Link>
        <Link to="/Dev"><li><ComputerOutlined fontSize="inherit" /></li></Link>
      </ul>

      {/* GitHub (desktop only) */}
      <a href="https://github.com/Chimoneg27" target="_blank" className="hidden md:block">
        <GitHub style={{ color: color }} fontSize="large" />
      </a>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <Close style={{ color: color }} fontSize="large" />
        ) : (
          <Menu style={{ color: color }} fontSize="large" />
        )}
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg rounded-lg p-6 flex flex-col items-center gap-6 md:hidden z-50"
             style={{ color: color }}>
          <Link to="/" onClick={() => setIsOpen(false)}>
            <HouseOutlined fontSize="large" /> Home
          </Link>
          <Link to="/MusicLibrary" onClick={() => setIsOpen(false)}>
            <MusicNoteOutlined fontSize="large" /> Music
          </Link>
          <Link to="/Books" onClick={() => setIsOpen(false)}>
            <Book fontSize="large" /> Books
          </Link>
          <Link to="/Movies&TV" onClick={() => setIsOpen(false)}>
            <LiveTvOutlined fontSize="large" /> Movies
          </Link>
          <Link to="/Dev" onClick={() => setIsOpen(false)}>
            <ComputerOutlined fontSize="large" /> Dev
          </Link>
          <a href="https://github.com/Chimoneg27" target="_blank" onClick={() => setIsOpen(false)}>
            <GitHub fontSize="large" /> GitHub
          </a>
        </div>
      )}
    </nav>
  );
}
