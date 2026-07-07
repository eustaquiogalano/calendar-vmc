import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { EventsProvider } from "./context/EventsContext.jsx";
import { UserProvider } from "./context/UserContext.js";

import App from "./App.js";
import { StudentUI } from "./components/PageMain/StudentUI/StudentUI.jsx";
import AdminUI from "./components/PageMain/AdminUI/AdminUI.js";
import ErrorPage from "./components/ErrorPage.jsx";
import IncomingRequestTab from "./components/PageMain/AdminUI/IncomingRequestTab/IncomingRequestTab.jsx";
import ManageRequestTab from "./components/PageMain/AdminUI/ManageRequestTab/ManageRequestTab.jsx";
import CreateEvent from "./components/PageMain/AdminUI/CreateEventTab/CreateEventTab.jsx";
import CalendarTab from "./components/PageMain/StudentUI/CalendarTab/CalendarTab.jsx";
import DocumentRequestTab from "./components/PageMain/StudentUI/DocumentRequestTab/DocumentRequestTab.jsx";

import "./global.css";
import { AuthForm } from "./components/PageMain/AuthForm/AuthForm.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <AuthForm />,
          },
          {
            path: "student",
            element: <StudentUI />,
            children: [
              {
                path: "calendar",
                element: <CalendarTab />,
              },
              {
                path: "document-request",
                element: <DocumentRequestTab />,
              },
            ],
          },
          {
            path: "admin",
            element: <AdminUI />,
            children: [
              {
                // index: true,
                path: "incoming-request",
                element: <IncomingRequestTab />,
              },
              {
                path: "manage-request",
                element: <ManageRequestTab />,
              },
              {
                path: "create-event",
                element: <CreateEvent />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <EventsProvider>
        <RouterProvider router={router} />
      </EventsProvider>
    </UserProvider>
  </StrictMode>,
);
