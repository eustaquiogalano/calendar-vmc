import "./StudentUI.css";
import "./FullCalendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function Calendar() {
  return <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />;
}

function StudentInterface() {
  return (
    <div id="student-interface-container">
      <aside>
        <nav>
          <a href="">Calendar</a>
          <a href="">Create Request</a>
          <a href="">Pending Request</a>
        </nav>
      </aside>
      <div id="greeting-container">
        <h2>Hello Student</h2>
      </div>
      <div id="dashboard-container">
        <section>
          <h2>Calendar</h2>
          <div className="calendar-container">
            <Calendar />
          </div>
        </section>
      </div>
    </div>
  );
}

export { StudentInterface };
