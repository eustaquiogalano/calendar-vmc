import style from "./StudentUI.module.css";
import CalendarTab from "./CalendarTab/CalendarTab";
import DocumentRequestTab from "./DocumentRequestTab/DocumentRequestTab";
import { useState } from "react";
import Icon from "./../../../assets/icons/menu.svg?react";

function StudentUI({ student }) {
  const [tabSelected, setTabSelected] = useState(0);

  function currentTab() {
    switch (tabSelected) {
      case 0:
        return <CalendarTab />;
      case 1:
        return <DocumentRequestTab />;
      default:
        return <CalendarTab />;
    }
  }

  return (
    <>
      <button
        className={`${style["studentUI__menu"]} ${style["studentUI__button"]}`}
      >
        <Icon className={style["studentUI__menu-icon"]} />
      </button>
      <aside
        className={`${style["studentUI__aside"]} ${style["studentUI__aside--shadow"]}`}
      >
        <nav className={`${style["studentUI__nav"]}`}>
          <button onClick={() => setTabSelected(0)}>Calendar</button>
          <button onClick={() => setTabSelected(1)}>Document Request</button>
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
