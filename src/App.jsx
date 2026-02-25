import { Outlet, useNavigate } from "react-router-dom";

import { useMenu } from "./context/MenuContext";

import vmcIcon from "./assets/images/vmc-icon.png";
import style from "./App.module.css";
import Icon from "./assets/icons/menu.svg?react";

import { getCurrentUser, updateUser } from "./utils/storage.js";

function App() {
  const { menuButtonVisibility, toggleMenuBody, toggleMenuButton } = useMenu();
  const navigate = useNavigate();

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
        <img className={style["page-header__img"]} src={vmcIcon} alt="" />
        <h1 className={style["page-header__h1"]}>Services</h1>
        <button
          onClick={toggleMenuBody}
          className={`${style["studentUI__menu"]} ${
            style["studentUI__button"]
          } ${menuButtonVisibility ? "" : style["studentUI__menu--hide"]}`}
        >
          <Icon className={style["studentUI__menu-icon"]} />
        </button>
      </header>
      <main
        className={`${style["page-main"]} ${style["page-main--hide-scroll"]}`}
      >
        <Outlet
          context={{
            handleLogin,
            handleLogout,
            loaderObject,
          }}
        />
      </main>
    </>
  );
}

export default App;
