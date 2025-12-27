import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";
import { useRequest } from "../../../../../context/RequestContext";

function Calendar({ requestList }) {
  const { setSelectedDate } = useRequest();

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
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
    />
  );
}

export default Calendar;
