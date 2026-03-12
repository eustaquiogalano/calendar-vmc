import style from "./CalendarTab.module.css";
import HourCard from "./Calender/HourCard/HourCard";
import Calendar from "./Calender/Calendar";
import { useUser } from "../../../../context/UserContext";
import { useState } from "react";
import { useEvent } from "../../../../context/EventsContext";

function CalendarTab() {
  const [selectedDate, setSelectedDate] = useState();
  const { currentUser } = useUser();
  const { events } = useEvent();
  const requests = currentUser.requestedDocuments;
  const announcements = [...requests, ...events];

  return (
    <>
      <section className={style["calendar-tab__section"]}>
        <h2>Calendar</h2>
        <div className={`${style["calendar-tab__calendar"]} `}>
          <Calendar requests={requests} setSelectedDate={setSelectedDate} />
        </div>
      </section>

      <section className={style["calendar-tab__section"]}>
        <h2>Events</h2>
        <div className={`${style["calendar-tab__events"]} `}>
          <div className={style["calendar-tab__request-list"]}>
            {announcements &&
              announcements.map((announcement) => {
                if (announcement.date === selectedDate) {
                  return (
                    <div
                      key={announcement.id}
                      className={style["calendar-tab__request-card"]}
                    >
                      <p>
                        Document:{" "}
                        <span>
                          {announcement.document || announcement.name}
                        </span>
                      </p>
                      <p>
                        Purpose: <span>{announcement.purpose}</span>
                      </p>
                      <p>
                        Date: <span>{announcement.date}</span>
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
