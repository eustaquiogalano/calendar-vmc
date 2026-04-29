import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MenuProvider } from "./context/MenuContext.jsx";
import { EventsProvider } from "./context/EventsContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";

import App from "./App.jsx";
import { StudentUI } from "./components/PageMain/StudentUI/StudentUI.jsx";
import Login from "./trash/Login.jsx";
import AdminUI from "./components/PageMain/AdminUI/AdminUI.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import IncomingRequestTab from "./components/PageMain/AdminUI/IncomingRequestTab/IncomingRequestTab.jsx";
import ManageRequestTab from "./components/PageMain/AdminUI/ManageRequestTab/ManageRequestTab.jsx";
import CreateEvent from "./components/PageMain/AdminUI/CreateEventTab/CreateEventTab.jsx";
import CalendarTab from "./components/PageMain/StudentUI/CalendarTab/CalendarTab.jsx";
import DocumentRequestTab from "./components/PageMain/StudentUI/DocumentRequestTab/DocumentRequestTab.jsx";

import "./global.css";
import { LoginForm } from "./components/PageMain/AuthForm/AuthForm.jsx";

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
            element: <LoginForm />,
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
        <MenuProvider>
          <RouterProvider router={router} />
        </MenuProvider>
      </EventsProvider>
    </UserProvider>
  </StrictMode>,
);
