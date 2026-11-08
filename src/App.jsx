import "./styles/index.css";
import Home from "./pages/Home";
import Books from "./pages/Books"
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
    </>
  );
}

export default App;
