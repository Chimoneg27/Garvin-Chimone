import "./styles/index.css";
import Home from "./pages/Home";
import Books from "./pages/Books"
import Projects from "./pages/Projects";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </>
  );
}

export default App;
