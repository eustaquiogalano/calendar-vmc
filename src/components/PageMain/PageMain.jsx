import { StudentUI } from "./StudentUI/StudentUI";
import style from "./PageMain.module.css";
import Login from "./Login/Login";
import { useState } from "react";
import { useMenu } from "../../context/MenuContext";
import AdminUI from "./AdminUI/AdminUI";

function PageMain() {
  const [student, setStudent] = useState(undefined);
  const [admin, setAdmin] = useState(undefined);
  const { toggleMenuButton } = useMenu();

  function handleLogin(user) {
    if (user.userType === "admin") {
      setAdmin(user);
    } else if (user.userType === "student") {
      setStudent(user);
    }

    if (user) {
      toggleMenuButton();
    }
  }

  function handleMainDisplay() {
    if (student) {
      return <StudentUI student={student} setStudent={setStudent} />;
    } else if (admin) {
      return <AdminUI admin={admin} setAdmin={setAdmin} />;
    } else {
      return <Login onLogin={handleLogin} />;
    }
  }

  return (
    <main
      className={`${style["page-main"]} ${style["page-main--hide-scroll"]}`}
    >
      {handleMainDisplay()}
    </main>
  );
}

export { PageMain };
