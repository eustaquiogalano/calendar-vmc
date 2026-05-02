import { Outlet, useNavigate } from "react-router-dom";

import { useMenu } from "./context/MenuContext";

import style from "./App.module.css";
import Icon from "./assets/icons/menu.svg?react";

import { getCurrentUser, updateUser } from "./utils/storage.js";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";

import { useUser } from "./context/UserContext";

function App() {
  const { menuButtonVisibility, toggleMenuBody, toggleMenuButton } = useMenu();
  const navigate = useNavigate();
  const { currentUser } = useUser();

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

    if (user) {
      toggleMenuButton();
    }

    return user;
  }

  async function handleLogout(user) {
    await updateUser(user.idNumber, { ...user, isLoggedIn: false });

    toggleMenuButton();
    await getCurrentUser();
    navigate("/");
  }

  return (
    <>
      <header className={style["page-header"]}>
        {/* <img className={style["page-header__img"]} src={} alt="" /> */}
        <h1 className="text-2xl md:text-3xl lg:text-5xl">SCHOOL LOGO</h1>
        <h1 className={style["page-header__h1"]}>Services</h1>
        <button
          onClick={toggleMenuBody}
          className={`${style["studentUI__menu"]} ${
            style["studentUI__button"]
          } ${menuButtonVisibility ? "" : style["studentUI__menu--hide"]}`}
        >
          {/* <Icon fill="#e8f4fb" className={style["studentUI__menu-icon"]} /> */}
        </button>
      </header>

      <main
        className={`${style["page-main"]} ${style["page-main--hide-scroll"]} relative overflow-hidden`}
      >
        <SidebarProvider
          style={{ minHeight: "unset" }}
          className="h-full bg-transparent"
        >
          <div className={`${currentUser ? "" : "hidden"} `}>
            <AppSidebar
              variant="floating"
              collapsible="icon"
              handleLogout={handleLogout}
            />
          </div>
          <SidebarInset className="flex flex-col justify-center items-center">
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
