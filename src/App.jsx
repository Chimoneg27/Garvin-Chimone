import "./styles/index.css";
import Home from "./pages/Home";
import Dev from "./pages/Dev";
import Books from './pages/Books'
import Music from './pages/Music'
import MoviesTV from "./pages/Movies";
import Signup from "./auth/Signup";
import { Routes, Route } from "react-router-dom";
import SignIn from "./auth/SignIn";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dev" element={<Dev />} />
        <Route path="/MusicLibrary" element={<Music />} />
        <Route path="/Movies&TV" element={<MoviesTV />} />
        <Route path="/Books" element={<Books />} />
        <Route path="/SignUp" element={<Signup />} />
        <Route path="/SignIn" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
