import style from "./CalendarTab.module.css";
import HourCard from "./Calender/HourCard/HourCard";
import Calendar from "./Calender/Calendar";

function CalendarTab() {
  return (
    <>
      <section className={style["calendar-tab__section"]}>
        <h2>Calendar</h2>
        <div
          className={`${style["calendar-tab__calendar"]} ${style["calendar-tab__calendar--shadow"]}`}
        >
          <Calendar />
        </div>
      </section>

      <section className={style["calendar-tab__section"]}>
        <h2>Events</h2>
        <div className={`${style["calendar-tab__events"]} `}>
          <HourCard
            time="8:00 AM"
            eventList={["Seminar sa CR", "Pizza Party"]}
          />
          <HourCard time="10:00 AM" eventList={["Oath Taking", "Disco Time"]} />
        </div>
      </section>
    </>
  );
}

export default CalendarTab;
