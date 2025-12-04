import "./StudentUI.css";
import "./FullCalendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function Calendar() {
  return <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />;
}

function Hour({ time, eventList }) {
  return (
    <div className="hour-container">
      <h3 className="hour">{time}</h3>
      <div className="events-list-container">
        <ul>
          {eventList.map((event) => {
            return <li className="event">{event}</li>;
          })}
        </ul>
      </div>
      <br />
      <hr />
    </div>
  );
}

function StudentInterface() {
  return (
    <>
      <aside className="side-nav-container shadow-effect">
        <nav>
          <a href="">Calendar</a>
          <a href="">Create Request</a>
          <a href="">Pending Request</a>
        </nav>
      </aside>
      <div id="student-interface-container" className="hide-scroll">
        <div id="greeting-container">
          <h2 className="shadow-effect">Hello Student</h2>
        </div>
        <div id="dashboard-container">
          <section>
            <h2>Calendar</h2>
            <div className="calendar-container shadow-effect">
              <Calendar />
            </div>
          </section>
          <section>
            <h2>Events</h2>
            <div className="events-container shadow-effect">
              <Hour
                time="8:00 AM"
                eventList={["Seminar sa CR", "Pizza Party"]}
              />
              <Hour time="10:00 AM" eventList={["Oath Taking", "Disco Time"]} />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export { StudentInterface };
