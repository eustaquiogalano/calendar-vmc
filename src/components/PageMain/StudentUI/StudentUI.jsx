import { Outlet, useOutletContext } from "react-router-dom";

import style from "./StudentUI.module.css";
import { useUser } from "../../../context/UserContext";
import { SidebarTrigger } from "@/components/ui/sidebar";

function StudentUI() {
  const { loaderObject } = useOutletContext();
  const { currentUser } = useUser();

  return (
    <>
      <div className={style["studentUI__dashboard"]}>
        <div className={style["studentUI__greeting"]}>
          <SidebarTrigger className="md:hidden" />
          <h2
            className={`${style["studentUI__h2--shadow"]} ${style["studentUI__h2"]} text-xl font-bold`}
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
