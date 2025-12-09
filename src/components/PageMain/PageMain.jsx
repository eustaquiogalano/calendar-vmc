import { StudentUI } from "./StudentUI/StudentUI";
import style from "./PageMain.module.css";
import Login from "./Login/Login";
import { useState } from "react";

function PageMain() {
  const [student, setStudent] = useState(undefined);

  function handleLogin(user) {
    setStudent(user);
  }

  return (
    <main
      className={`${style["page-main"]} ${style["page-main--hide-scroll"]}`}
    >
      {student ? (
        <StudentUI student={student} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </main>
  );
}

export { PageMain };
