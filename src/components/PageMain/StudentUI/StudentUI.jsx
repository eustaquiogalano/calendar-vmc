import { Link, NavLink, Outlet, useOutletContext } from "react-router-dom";

import { useMenu } from "../../../context/MenuContext";

import style from "./StudentUI.module.css";
import { useUser } from "../../../context/UserContext";

function StudentUI() {
  const { menuBodyVisibility, toggleMenuBody } = useMenu();
  const { loaderObject, handleLogout } = useOutletContext();
  const { currentUser } = useUser();

  return (
    <>
      <aside
        className={`${style["studentUI__aside"]} ${
          menuBodyVisibility ? style["studentUI__aside--show"] : ""
        }`}
      >
        <nav className={`${style["studentUI__nav"]}`}>
          <button
            onClick={toggleMenuBody}
            className={style["studentUI__button"]}
          >
            <NavLink to={`calendar`}>Calendar</NavLink>
          </button>
          <button
            onClick={toggleMenuBody}
            className={style["studentUI__button"]}
          >
            <NavLink to={`document-request`}>Document Request</NavLink>
          </button>
          <button
            className={`${style["studentUI__button"]} ${style["studentUI__button--logout"]} `}
            onClick={() => handleLogout(currentUser)}
          >
            Logout
          </button>
        </nav>
      </aside>
      <div className={style["studentUI__dashboard"]}>
        <div className={style["studentUI__greeting"]}>
          <h2
            className={`${style["studentUI__h2--shadow"]} ${style["studentUI__h2"]}`}
          >
            Hello {currentUser?.name || loaderObject?.name}
          </h2>
        </div>
        <div className={style["studentUI__panel"]}>
          <Outlet context={{ currentUser }} />
        </div>
      </div>
    </>
  );
}

export { StudentUI };
