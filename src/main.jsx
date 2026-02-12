import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MenuProvider } from "./context/MenuContext.jsx";
import { RequestProvider } from "./context/RequestContext.jsx";
import { StudentListProvider } from "./context/StudentListContext.jsx";
import { EventsProvider } from "./context/EventsContext.jsx";

import App, { loader as appLoader } from "./App.jsx";
import { StudentUI } from "./components/PageMain/StudentUI/StudentUI.jsx";
import Login from "./components/PageMain/Login/Login.jsx";
import AdminUI from "./components/PageMain/AdminUI/AdminUI.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import IncomingRequestTab from "./components/PageMain/AdminUI/IncomingRequestTab/IncomingRequestTab.jsx";
import ManageRequestTab from "./components/PageMain/AdminUI/ManageRequestTab/ManageRequestTab.jsx";
import CreateEvent from "./components/PageMain/AdminUI/CreateEventTab/CreateEventTab.jsx";
import CalendarTab from "./components/PageMain/StudentUI/CalendarTab/CalendarTab.jsx";
import DocumentRequestTab from "./components/PageMain/StudentUI/DocumentRequestTab/DocumentRequestTab.jsx";

import "./global.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: appLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Login />,
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
