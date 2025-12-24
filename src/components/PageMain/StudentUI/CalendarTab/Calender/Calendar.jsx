import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./Calendar.css";

function Calendar({ requestedDate }) {
  const events = requestedDate.map((date) => {
    return {
      start: date,
      allDay: true,
      display: "background",
      backgroundColor: "gray",
    };
  });

  return (
    <FullCalendar
      events={events}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
    />
  );
}

export default Calendar;
