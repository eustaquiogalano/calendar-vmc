import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { MenuProvider } from "./context/MenuContext.jsx";
import { RequestProvider } from "./context/RequestContext.jsx";
import { StudentListProvider } from "./context/StudentListContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StudentListProvider>
      <RequestProvider>
        <MenuProvider>
          <App />
        </MenuProvider>
      </RequestProvider>
    </StudentListProvider>
  </StrictMode>
);
