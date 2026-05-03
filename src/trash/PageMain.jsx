import { StudentUI } from "../components/PageMain/StudentUI/StudentUI";
import style from "./PageMain.module.css";
import Login from "./Login";
import { useState } from "react";
import { useMenu } from "./MenuContext";
import AdminUI from "../components/PageMain/AdminUI/AdminUI";
import { Outlet } from "react-router-dom";

function PageMain() {
  const [student, setStudent] = useState(undefined);
  const [admin, setAdmin] = useState(undefined);
  const { toggleMenuButton } = useMenu();

  // function handleLogin(user) {
  //   if (user.userType === "admin") {
  //     setAdmin(user);
  //   } else if (user.userType === "student") {
  //     setStudent(user);
  //   }

  //   if (user) {
  //     toggleMenuButton();
  //   }
  // }

  // function handleMainDisplay() {
  //   if (student) {
  //     return <StudentUI student={student} setStudent={setStudent} />;
  //   } else if (admin) {
  //     return <AdminUI admin={admin} setAdmin={setAdmin} />;
  //   } else {
  //     return <Login onLogin={handleLogin} />;
  //   }
  // }

  // return (
  //   <main
  //     className={`${style["page-main"]} ${style["page-main--hide-scroll"]}`}
  //   >
  //     {/* {handleMainDisplay()} */}
  //     <Outlet />
  //   </main>
  // );
}

export { PageMain };
