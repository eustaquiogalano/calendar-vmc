import { Outlet, useOutletContext } from "react-router-dom";

import style from "./AdminUI.module.css";
import { useUser } from "../../../context/UserContext";
import { SidebarTrigger } from "@/components/ui/sidebar";

function AdminUI() {
  const { currentUser } = useUser();

  return (
    <>
      <div className={style["adminUI__dashboard"]}>
        <div className={style["adminUI__greeting"]}>
          <SidebarTrigger className="md:hidden" />
          <h2 className={`${style["adminUI__h2"]} text-xl font-bold`}>
            Hello{" "}
            {currentUser?.userType === "student"
              ? currentUser.firstName
              : currentUser?.name}
            !
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
