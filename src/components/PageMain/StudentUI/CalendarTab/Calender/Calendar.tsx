import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import "./Calendar.css";
import { getEvents } from "../../../../../utils/storage/storage";
import { useEffect, useState } from "react";
import { format, parse } from "date-fns";
import { DocumentRequest } from "../../../../../types/documentRequest";
import { SchoolEvent } from "../../../../../types/schoolEvent";
import { useDocumentRequest } from "@/context/DocumentRequestContext";
import { useEvent } from "@/context/EventsContext";

// FullCalendar event shape
interface CalendarEvent {
  title: string;
  start: string;
  allDay: boolean;
  extendedProps: {
    request?: DocumentRequest;
    event?: SchoolEvent;
  };
}

function Calendar({
  setSelectedDate,
}: {
  setSelectedDate: (date: string) => void;
}) {
  // const [events, setEvents] = useState([]);
  const { requests } = useDocumentRequest();
  const { events: schoolEvents } = useEvent();

  // useEffect(() => {
  //   async function initEvents() {
  //     const studentEvents = requests.map((request) => {
  //       return {
  //         title: request.document,
  //         start: request.date,
  //         allDay: true,
  //         extendedProps: {
  //           request,
  //         },
  //       };
  //     });

  //     // let schoolEvents = await getEvents();
  //     let updatedSchoolEvents = schoolEvents.map((event) => {
  //       return {
  //         title: event.name,
  //         start: event.date,
  //         allDay: true,
  //         extendedProps: {
  //           event,
  //         },
  //       };
  //     });

  //     setEvents([...events, ...updatedSchoolEvents, ...studentEvents]);
  //   }

  //   initEvents();
  // }, []);

  const calendarEvents: CalendarEvent[] = [
    ...requests.map((request) => ({
      title: request.document,
      start: request.date,
      allDay: true,
      extendedProps: { request },
    })),
    ...schoolEvents.map((event) => ({
      title: event.name,
      start: event.date,
      allDay: true,
      extendedProps: { event },
    })),
  ];

  function handleDateClick(info: DateClickArg) {
    setSelectedDate(info.dateStr);
  }

  return (
    <FullCalendar
      events={calendarEvents}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      dateClick={handleDateClick}
    />
  );
}

export default Calendar;
