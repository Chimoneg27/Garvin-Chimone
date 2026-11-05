import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { trailingCursor } from "cursor-effects";
import './styles/index.css'

new trailingCursor({
  particles: 8,
  rate: 0.6,
  baseImageSrc: "",
  cursor: "none"
})

createRoot(document.getElementById("root")).render(
  <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
  </StrictMode>
);
