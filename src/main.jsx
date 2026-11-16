import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { followingDotCursor } from "cursor-effects";
import './styles/index.css'
// trailingCursor
new followingDotCursor({
  particles: 8,
  rate: 0.1,
  baseImageSrc: "",
  color: "#7E22CE",
  size: 3
})

createRoot(document.getElementById("root")).render(
  <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
  </StrictMode>
);
