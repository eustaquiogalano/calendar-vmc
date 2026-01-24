import { useState } from "react";
import { useMenu } from "../../../context/MenuContext";
import style from "./AdminUI.module.css";
import IncomingRequestTab from "./IncomingRequestTab/IncomingRequestTab";
import ManageRequestTab from "./ManageRequestTab/ManageRequestTab";
import CreateEvent from "./CreateEventTab/CreateEventTab";

function AdminUI() {
  const { menuBodyVisibility } = useMenu();
  const [tabSelected, setTabSelected] = useState(0);

  function currentTab() {
    switch (tabSelected) {
      case 0:
        return <IncomingRequestTab />;
      case 1:
        return <ManageRequestTab />;
      case 2:
        return <CreateEvent />;
      default:
        return <IncomingRequestTab />;
    }
  }

  return (
    <>
      <aside
        className={`${style["adminUI__aside"]} ${
          menuBodyVisibility ? style["adminUI__aside--show"] : ""
        }`}
      >
        <nav className={style["adminUI__nav"]}>
          <button
            onClick={() => setTabSelected(0)}
            className={style["adminUI__button"]}
          >
            Incoming Request
          </button>
          <button
            className={style["adminUI__button"]}
            onClick={() => setTabSelected(1)}
          >
            Manage Requests
          </button>
          <button
            className={`${style["adminUI__button"]} ${style["adminUI__button--logout"]} `}
          >
            Logout
          </button>
        </nav>
      </aside>
      <div className={style["adminUI__dashboard"]}>
        <div className={style["adminUI__greeting"]}>
          <h2 className={`${style["adminUI__h2"]}`}>Hello Admin</h2>
        </div>
        <div className={style["adminUI__panel"]}>{currentTab()}</div>
      </div>
    </>
  );
}

export default AdminUI;
