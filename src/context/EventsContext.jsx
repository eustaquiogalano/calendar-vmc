import { createContext, useContext, useState } from "react";

const EventsContext = createContext(null);

export function EventsProvider({ children }) {
  const [eventList, setEventList] = useState([]);
  return (
    <EventsContext.Provider value={{ eventList, setEventList }}>
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
