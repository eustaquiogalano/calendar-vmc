import style from "./StudentUI.module.css";
import HourCard from "./HourCard/HourCard";
import Calendar from "./FullCalender/FullCalendar";

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
          <section className={style["studentUI__section"]}>
            <h2>Calendar</h2>
            <div
              className={`${style["studentUI__calendar"]} ${style["studentUI__calendar--shadow"]}`}
            >
              <Calendar />
            </div>
          </section>

          <section className={style["studentUI__section"]}>
            <h2>Events</h2>
            <div
              className={`${style["studentUI__events"]} ${style["studentUI__events--shadow"]}`}
            >
              <HourCard
                time="8:00 AM"
                eventList={["Seminar sa CR", "Pizza Party"]}
              />
              <HourCard
                time="10:00 AM"
                eventList={["Oath Taking", "Disco Time"]}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export { StudentUI };
