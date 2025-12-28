import style from "./StudentUI.module.css";
import CalendarTab from "./CalendarTab/CalendarTab";
import DocumentRequestTab from "./DocumentRequestTab/DocumentRequestTab";
import { useState } from "react";
import { useMenu } from "../../../context/MenuContext";
import EnrollmentFormTab from "./EnrollmentFormTab/EnrollmentFormTab";

function StudentUI({ student }) {
  const [tabSelected, setTabSelected] = useState(0);
  const { menuBodyVisibility, toggleMenuBody } = useMenu();

  function currentTab() {
    switch (tabSelected) {
      case 0:
        return <CalendarTab />;
      case 1:
        return <DocumentRequestTab />;
      case 2:
        return <EnrollmentFormTab />;
      default:
        return <CalendarTab />;
    }
  }

  function handleClick(tab) {
    setTabSelected(tab);
    currentTab();
    toggleMenuBody();
  }

  return (
    <>
      <aside
        className={`${style["studentUI__aside"]} ${
          menuBodyVisibility ? style["studentUI__aside--show"] : ""
        }`}
      >
        <nav className={`${style["studentUI__nav"]}`}>
          <button
            className={style["studentUI__button"]}
            onClick={() => handleClick(0)}
          >
            Calendar
          </button>
          <button
            className={style["studentUI__button"]}
            onClick={() => handleClick(1)}
          >
            Document Request
          </button>
          <button
            className={style["studentUI__button"]}
            onClick={() => handleClick(2)}
          >
            Enrollment Form
          </button>
          <button
            className={`${style["studentUI__button"]} ${style["studentUI__button--logout"]} `}
          >
            Logout
          </button>
        </nav>
      </aside>
      <div className={style["studentUI"]}>
        <div className={style["studentUI__greeting"]}>
          <h2
            className={`${style["studentUI__h2--shadow"]} ${style["studentUI__h2"]}`}
          >
            Hello {student.name}
          </h2>
        </div>
        <div className={style["studentUI__dashboard"]}>{currentTab()}</div>
      </div>
    </>
  );
}

export { StudentUI };
