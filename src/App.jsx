import { Outlet } from "react-router-dom";
import { useState } from "react";

import { useMenu } from "./context/MenuContext";

import vmcIcon from "./assets/images/vmc-icon.png";
import style from "./App.module.css";
import Icon from "./assets/icons/menu.svg?react";

function App() {
  const { menuButtonVisibility, toggleMenuBody, toggleMenuButton } = useMenu();
  const [student, setStudent] = useState(undefined);
  const [admin, setAdmin] = useState(undefined);

  function handleLogin(user) {
    if (user.userType === "admin") {
      setAdmin(user);
    } else if (user.userType === "student") {
      setStudent(user);
    }

    if (user) {
      toggleMenuButton();
    }

    return user;
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
          context={{ handleLogin, admin, setAdmin, student, setStudent }}
        />
      </main>
    </>
  );
}

export default App;
