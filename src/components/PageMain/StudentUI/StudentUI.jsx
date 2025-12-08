import style from "./StudentUI.module.css";
import CalendarTab from "./CalendarTab/CalendarTab";
import DocumentRequestTab from "./DocumentRequestTab/DocumentRequestTab";

function StudentUI() {
  return (
    <>
      <aside
        className={`${style["studentUI__aside"]} ${style["studentUI__aside--shadow"]}`}
      >
        <nav className={`${style["studentUI__nav"]}`}>
          <a href="">Calendar</a>
          <a href="">Create Request</a>
          <a href="">Pending Request</a>
        </nav>
      </aside>
      <div className={style["studentUI"]}>
        <div className={style["studentUI__greeting"]}>
          <h2
            className={`${style["studentUI__h2--shadow"]} ${style["studentUI__h2"]}`}
          >
            Hello Student
          </h2>
        </div>
        <div className={style["studentUI__dashboard"]}>
          {/* <CalendarTab /> */}
          <DocumentRequestTab />
        </div>
      </div>
    </>
  );
}

export { StudentUI };
