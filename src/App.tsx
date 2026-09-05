import { Outlet, useLocation, useNavigate } from "react-router-dom";

import style from "./App.module.css";

import { SidebarInset, SidebarProvider } from "./components/ui/sidebar.jsx";
import { AppSidebar } from "./components/app-sidebar.js";
import { useUser } from "./context/UserContext.js";

function App() {
  const { currentUser } = useUser();
  const location = useLocation();

  const showSidebar = currentUser && location.pathname !== "/reset-password";

  return (
    <>
      <header className={style["page-header"]}>
        <h1 className="text-2xl md:text-3xl lg:text-5xl">SCHOOL LOGO</h1>
        <h1 className={style["page-header__h1"]}>Services</h1>
      </header>

      <main
        className={`${style["page-main"]} ${style["page-main--hide-scroll"]} relative overflow-hidden`}
      >
        <SidebarProvider
          style={{ minHeight: "unset" }}
          className="h-full bg-transparent"
        >
          {showSidebar && <AppSidebar variant="floating" collapsible="icon" />}
          <SidebarInset
            className={`flex flex-col justify-center items-center  ${showSidebar ? "md:ml-[3.5rem]" : ""} lg:ml-0`}
          >
            <Outlet />
          </SidebarInset>
        </SidebarProvider>
      </main>
    </>
  );
}

export default App;
