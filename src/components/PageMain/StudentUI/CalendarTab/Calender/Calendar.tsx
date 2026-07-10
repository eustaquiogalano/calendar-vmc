import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import "./Calendar.css";
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
  const { requests } = useDocumentRequest();
  const { events: schoolEvents } = useEvent();

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
