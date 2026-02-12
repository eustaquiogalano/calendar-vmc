import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useMenu } from "./context/MenuContext";

import vmcIcon from "./assets/images/vmc-icon.png";
import style from "./App.module.css";
import Icon from "./assets/icons/menu.svg?react";

import { setCurrentUser, updateUser } from "./utils/storage.js";

// ADDED
export async function loader() {
  let user = (await setCurrentUser()) || {};
  if (!user) return;
  console.log(user);

  return { user };
}
// ADDED

function App() {
  const { menuButtonVisibility, toggleMenuBody, toggleMenuButton } = useMenu();
  const navigate = useNavigate();
  const { user } = useLoaderData();

  const [student, setStudent] = useState(
    user?.userType === "student" ? user : undefined
  );
  const [admin, setAdmin] = useState(
    user?.userType === "admin" ? user : undefined
  );

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
    // updates the users isLoggedIn: true
    await updateUser(user.idNumber, user);

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

  async function handleLogout(user) {
    await updateUser(user.idNumber, { ...user, isLoggedIn: false });

    setStudent(undefined);
    setAdmin(undefined);
    toggleMenuButton();
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
            admin,
            setAdmin,
            student,
            setStudent,
            loaderObject,
          }}
        />
      </main>
    </>
  );
}

export default App;
