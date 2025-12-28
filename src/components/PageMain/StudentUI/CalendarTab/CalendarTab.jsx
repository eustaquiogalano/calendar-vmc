import style from "./CalendarTab.module.css";
import HourCard from "./Calender/HourCard/HourCard";
import Calendar from "./Calender/Calendar";
import { useRequest } from "../../../../context/RequestContext";

function CalendarTab() {
  const { requestList, selectedDate } = useRequest();

  return (
    <>
      <section className={style["calendar-tab__section"]}>
        <h2>Calendar</h2>
        <div className={`${style["calendar-tab__calendar"]} `}>
          <Calendar requestList={requestList} />
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
          <div className={style["calendar-tab__request-list"]}>
            {requestList.map((request) => {
              if (request.date === selectedDate) {
                return (
                  <div
                    key={request.id}
                    className={style["calendar-tab__request-card"]}
                  >
                    <p>
                      Document: <span>{request.document}</span>
                    </p>
                    <p>
                      Purpose: <span>{request.purpose}</span>
                    </p>
                    <p>
                      Date: <span>{request.date}</span>
                    </p>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default CalendarTab;
