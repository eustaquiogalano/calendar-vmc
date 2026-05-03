import { Outlet, useNavigate } from "react-router-dom";

import style from "./App.module.css";

import { getCurrentUser, updateUser } from "./utils/storage.js";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { useUser } from "./context/UserContext";

function App() {
  const navigate = useNavigate();
  const { currentUser, logoutCurrentUser } = useUser();

  const loaderObject = {
    userType: "loading...",
    username: "loading...",
    password: "loading...",
    email: "loading...",
    name: "loading...",
    idNumber: "loading...",
    isLoggedIn: false,
  };

  async function handleLogin(user) {
    await updateUser(user.idNumber, user);
    await getCurrentUser();

    return user;
  }

  async function handleLogout() {
    await updateUser(currentUser.idNumber, {
      ...currentUser,
      isLoggedIn: false,
    });
    logoutCurrentUser();
    await getCurrentUser();
    navigate("/");
  }

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
          {currentUser && (
            <AppSidebar
              variant="floating"
              collapsible="icon"
              handleLogout={handleLogout}
              currentUser={currentUser}
            />
          )}
          <SidebarInset
            className={`flex flex-col justify-center items-center  ${currentUser ? "md:ml-[3.5rem]" : ""} lg:ml-0`}
          >
            <Outlet
              context={{
                handleLogin,
                handleLogout,
                loaderObject,
              }}
            />
          </SidebarInset>
        </SidebarProvider>
      </main>
    </>
  );
}

export default App;
