import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { MenuProvider } from "./context/MenuContext.jsx";
import { RequestProvider } from "./context/RequestContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RequestProvider>
      <MenuProvider>
        <App />
      </MenuProvider>
    </RequestProvider>
  </StrictMode>
);
