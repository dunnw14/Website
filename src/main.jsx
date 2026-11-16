import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// Global styles load before App so each page's own stylesheet can override them.
import "./styles/fonts.css";
import "./styles/tokens.css";
import "./styles/base.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* basename tracks vite.config.js's base, so routing stays correct wherever the site is served from */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
