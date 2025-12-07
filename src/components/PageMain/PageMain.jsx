import { StudentUI } from "./StudentUI/StudentUI";
import style from "./PageMain.module.css";
import Login from "./Login/Login";

function PageMain() {
  return (
    <main
      className={`${style["page-main"]} ${style["page-main--hide-scroll"]}`}
    >
      {/* <Login /> */}
      <StudentUI />
    </main>
  );
}

export { PageMain };
