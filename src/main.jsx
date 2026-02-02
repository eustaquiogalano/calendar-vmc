import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./App.css";
import { MenuProvider } from "./context/MenuContext.jsx";
import { RequestProvider } from "./context/RequestContext.jsx";
import { StudentListProvider } from "./context/StudentListContext.jsx";
import { EventsProvider } from "./context/EventsContext.jsx";
import ErrorPage from "./components/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <EventsProvider>
      <StudentListProvider>
        <RequestProvider>
          <MenuProvider>
            <RouterProvider router={router} />
          </MenuProvider>
        </RequestProvider>
      </StudentListProvider>
    </EventsProvider>
  </StrictMode>
);
