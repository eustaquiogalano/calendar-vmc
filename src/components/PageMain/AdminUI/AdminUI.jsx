import { Link, Outlet, useOutletContext } from "react-router-dom";

import { useMenu } from "../../../context/MenuContext";

import style from "./AdminUI.module.css";
import { useUser } from "../../../context/UserContext";

function AdminUI() {
  const { menuBodyVisibility, toggleMenuBody } = useMenu();
  const { loaderObject, handleLogout } = useOutletContext();
  const { currentUser } = useUser();

  return (
    <>
      <aside
        className={`${style["adminUI__aside"]} ${
          menuBodyVisibility ? style["adminUI__aside--show"] : ""
        }`}
      >
        <nav className={style["adminUI__nav"]}>
          <button onClick={toggleMenuBody} className={style["adminUI__button"]}>
            <Link to={`incoming-request`}>Incoming Request</Link>
          </button>
          <button onClick={toggleMenuBody} className={style["adminUI__button"]}>
            <Link to={`manage-request`}>Manage Requests</Link>
          </button>
          <button onClick={toggleMenuBody} className={style["adminUI__button"]}>
            <Link to={`create-event`}> Create Event</Link>
          </button>
          <button
            onClick={() => handleLogout(currentUser)}
            className={`${style["adminUI__button"]} ${style["adminUI__button--logout"]} `}
          >
            Logout
          </button>
        </nav>
      </aside>
      <div className={style["adminUI__dashboard"]}>
        <div className={style["adminUI__greeting"]}>
          <h2 className={`${style["adminUI__h2"]}`}>
            Hello {currentUser?.name || loaderObject?.name}
          </h2>
        </div>
        <div className={style["adminUI__panel"]}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AdminUI;
