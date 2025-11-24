import "./styles/index.css";
import Home from "./pages/Home";
import Dev from "./pages/Dev";
import Books from "./pages/Books";
import Music from "./pages/Music";
import Signup from "./auth/Signup";
import { Routes, Route } from "react-router-dom";
import SignIn from "./auth/SignIn";
import BooksPage from "./pages/BookPage";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import EditorPage from "./pages/EditorPage";
import ProtectedRoute from "./components/ProtectedRoutes";
import BlogPost from "./pages/BlogPost";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dev" element={<Dev />} />
        <Route path="/MusicLibrary" element={<Music />} />
        <Route path="/Books" element={<Books />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/Blogs/:id" element={<BlogPost />} />
        <Route path="/Books/:id" element={<BooksPage />} />
        <Route path="/SignUp" element={<Signup />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route
          path="/Blogwriter"
          element={
            <ProtectedRoute requiredRole="admin">
              <EditorPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
