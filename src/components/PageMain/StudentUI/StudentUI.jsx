import { NavLink, Outlet, useOutletContext } from "react-router-dom";

import { useMenu } from "../../../context/MenuContext";

import style from "./StudentUI.module.css";
import { useUser } from "../../../context/UserContext";
import { SidebarTrigger } from "@/components/ui/sidebar";

function StudentUI() {
  const { menuBodyVisibility, toggleMenuBody } = useMenu();
  const { loaderObject, handleLogout } = useOutletContext();
  const { currentUser } = useUser();

  return (
    <>
      {/* <aside
        className={`${style["studentUI__aside"]} ${
          menuBodyVisibility ? style["studentUI__aside--show"] : ""
        }`}
      >
        <nav className={`${style["studentUI__nav"]}`}>
          <NavLink
            to={`calendar`}
            onClick={toggleMenuBody}
            className={({ isActive }) =>
              `${style["studentUI__button"]} ${
                isActive ? style["studentUI__button--active"] : ""
              }`
            }
          >
            Calendar
          </NavLink>

          <NavLink
            to={`document-request`}
            onClick={toggleMenuBody}
            className={({ isActive }) =>
              `${style["studentUI__button"]} ${
                isActive ? style["studentUI__button--active"] : ""
              }`
            }
          >
            Document Request
          </NavLink>

          <button
            className={`${style["studentUI__button"]} ${style["studentUI__button--logout"]} `}
            onClick={() => handleLogout(currentUser)}
          >
            Logout
          </button>
        </nav>
      </aside> */}
      <div className={style["studentUI__dashboard"]}>
        <div className={style["studentUI__greeting"]}>
          <SidebarTrigger className="md:hidden" />
          <h2
            className={`${style["studentUI__h2--shadow"]} ${style["studentUI__h2"]}`}
          >
            Hello {currentUser?.firstName || loaderObject?.name}
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
