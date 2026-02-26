import { createContext, useContext, useEffect, useState } from "react";
import { getEvents } from "../utils/storage";

const EventsContext = createContext(null);

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function initEvents() {
      const events = await getEvents();
      setEvents(events);
    }

    initEvents();
  }, []);

  return (
    <EventsContext.Provider value={{ events, setEvents }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvent() {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useMenu must be used inside EventsProvider");
  }
  return context;
}
