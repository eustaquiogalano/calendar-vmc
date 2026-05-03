import { Outlet, useOutletContext } from "react-router-dom";

import style from "./AdminUI.module.css";
import { useUser } from "../../../context/UserContext";
import { SidebarTrigger } from "@/components/ui/sidebar";

function AdminUI() {
  const { loaderObject } = useOutletContext();
  const { currentUser } = useUser();

  return (
    <>
      <div className={style["adminUI__dashboard"]}>
        <div className={style["adminUI__greeting"]}>
          <SidebarTrigger className="md:hidden" />
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
