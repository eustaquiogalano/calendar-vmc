import { Outlet, useNavigate, useOutletContext } from "react-router-dom";

import style from "./StudentUI.module.css";
import { useUser } from "../../../context/UserContext";
import { SidebarTrigger } from "@/components/ui/sidebar";

function StudentUI() {
  const { currentUser } = useUser();
  const navigate = useNavigate();

  return (
    <>
      <div className={style["studentUI__dashboard"]}>
        <div className={style["studentUI__greeting"]}>
          <SidebarTrigger className="md:hidden" />
          <h2
            className={`${style["studentUI__h2--shadow"]} ${style["studentUI__h2"]} text-xl font-bold`}
            onClick={() => navigate("/student/profile")}
          >
            Hello{" "}
            {currentUser?.userType === "student"
              ? currentUser.firstName
              : currentUser?.name}
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
