import { Link, Outlet, useOutletContext } from "react-router-dom";

import { useMenu } from "../../../context/MenuContext";

import style from "./StudentUI.module.css";

function StudentUI() {
  const { menuBodyVisibility, toggleMenuBody } = useMenu();
  const { student, loaderObject, handleLogout } = useOutletContext();

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
            <Link to={`calendar`}>Calendar</Link>
          </button>
          <button
            onClick={toggleMenuBody}
            className={style["studentUI__button"]}
          >
            <Link to={`document-request`}>Document Request</Link>
          </button>
          <button
            className={`${style["studentUI__button"]} ${style["studentUI__button--logout"]} `}
            onClick={() => handleLogout(student)}
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
            Hello {student?.name || loaderObject?.name}
          </h2>
        </div>
        <div className={style["studentUI__panel"]}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export { StudentUI };
