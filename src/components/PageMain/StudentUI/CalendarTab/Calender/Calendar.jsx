import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";
import { getEvents } from "../../../../../utils/storage/storage";
import { useEffect, useState } from "react";
import { format, parse } from "date-fns";

function Calendar({ requests, setSelectedDate }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function initEvents() {
      const studentEvents = requests.map((request) => {
        return {
          title: request.document,
          start: request.date,
          allDay: true,
          extendedProps: {
            request,
          },
        };
      });

      let schoolEvents = await getEvents();
      let updatedSchoolEvents = schoolEvents.map((event) => {
        return {
          title: event.name,
          start: event.date,
          allDay: true,
          extendedProps: {
            event,
          },
        };
      });

      setEvents([...events, ...updatedSchoolEvents, ...studentEvents]);
    }

    initEvents();
  }, []);

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
