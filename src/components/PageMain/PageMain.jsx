import { StudentUI } from "./StudentUI/StudentUI";
import style from "./PageMain.module.css";
import Login from "./Login/Login";
import { useState } from "react";
import { useMenu } from "../../context/MenuContext";

function PageMain() {
  const [student, setStudent] = useState(undefined);
  const { toggleMenuButton } = useMenu();

  function handleLogin(user) {
    setStudent(user);
    if (user) {
      toggleMenuButton();
    }
  }

  return (
    <main
      className={`${style["page-main"]} ${style["page-main--hide-scroll"]}`}
    >
      {student ? (
        <StudentUI student={student} setStudent={setStudent} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </main>
  );
}

export { PageMain };
