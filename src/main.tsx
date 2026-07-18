import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { EventsProvider } from "./context/EventsContext.js";
import { UserProvider } from "./context/UserContext.js";

import App from "./App.js";
import { StudentUI } from "./components/PageMain/StudentUI/StudentUI.js";
import AdminUI from "./components/PageMain/AdminUI/AdminUI.js";
import ErrorPage from "./components/ErrorPage.js";
import IncomingRequestTab from "./components/PageMain/AdminUI/IncomingRequestTab/IncomingRequestTab.js";
import ManageRequestTab from "./components/PageMain/AdminUI/ManageRequestTab/ManageRequestTab.js";
import CreateEvent from "./components/PageMain/AdminUI/CreateEventTab/CreateEventTab.js";
import CalendarTab from "./components/PageMain/StudentUI/CalendarTab/CalendarTab.js";
import DocumentRequestTab from "./components/PageMain/StudentUI/DocumentRequestTab/DocumentRequestTab.js";

import "./global.css";
import { AuthForm } from "./components/PageMain/AuthForm/AuthForm.js";
import { DocumentRequestProvider } from "./context/DocumentRequestContext.js";
import ProfileTab from "./components/Pages/ProfileTab.js";

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
              {
                path: "profile",
                element: <ProfileTab />,
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <DocumentRequestProvider>
        <EventsProvider>
          <RouterProvider router={router} />
        </EventsProvider>
      </DocumentRequestProvider>
    </UserProvider>
  </StrictMode>,
);
