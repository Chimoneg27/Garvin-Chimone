import "../styles/index.css";
import { useTheme } from "./ThemeContext";
import { Link } from "react-router-dom";
import { HouseOutlined } from "@mui/icons-material";
import { MusicNoteOutlined } from "@mui/icons-material";
import { Book } from "@mui/icons-material";
import { LiveTvOutlined } from "@mui/icons-material";
import { GitHub } from "@mui/icons-material";
import { ComputerOutlined } from "@mui/icons-material";

export default function Navbar() {
  const { color } = useTheme();
  return (
    <div className="navbar p-4 flex justify-between w-4/5 items-center ml-auto mr-auto">
      <Link to='/'>
        <h1 className="navbar text-4xl" style={{ color: color }}>
          GARVIN
        </h1>
      </Link>

      <ul
        className="flex w-1/6 justify-between items-center text-3xl"
        style={{ color: color }}
      >
        <Link to="/" className="flex flex-col justify-between items-center">
          <li>
            <HouseOutlined fontSize="inherit" />
          </li>
        </Link>
        <Link
          to="/MusicLibrary"
          className="flex flex-col justify-between items-center"
        >
          <li>
            <MusicNoteOutlined fontSize="inherit" />
          </li>
        </Link>
        <Link
          to="/Books"
          className="flex flex-col justify-between items-center"
        >
          <li>
            <Book fontSize="inherit" />
          </li>
        </Link>
        <Link
          to="/Movies&TV"
          className="flex flex-col justify-between items-center"
        >
          <li>
            <LiveTvOutlined fontSize="inherit" />
          </li>
        </Link>
        <Link to="/DEV" className="flex flex-col justify-between items-center">
          <li>
            <ComputerOutlined fontSize="inherit" />
          </li>
        </Link>
      </ul>

      <a href="https://github.com/Chimoneg27" target="_blank">
        <GitHub style={{ color: color }} fontSize="large" />
      </a>
    </div>
  );
}
