import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";
import { useRequest } from "../../../../../context/RequestContext";

function Calendar({ requestList }) {
  const { setSelectedDate } = useRequest();

  const events = requestList.map((request) => {
    return {
      title: request.document,
      start: request.date,
      allDay: true,
      extendedProps: {
        request,
      },
    };
  });

  function handleDateClick(info) {
    setSelectedDate(info.dateStr);
  }

  return (
    <FullCalendar
      events={events}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      dateClick={handleDateClick}
    />
  );
}

export default Calendar;
