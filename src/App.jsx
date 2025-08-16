import "./styles/index.css";
import Home from "./pages/Home";
import Dev from "./pages/Dev";
import Books from './pages/Books'
import Music from './pages/Music'
import MoviesTV from "./pages/Movies";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dev" element={<Dev />} />
        <Route path="/MusicLibrary" element={<Music />} />
        <Route path="/Movies&TV" element={<MoviesTV />} />
        <Route path="/Books" element={<Books />} />
      </Routes>
    </>
  );
}

export default App;
