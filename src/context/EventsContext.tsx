import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase-client";
import {
  SchoolEvent,
  NewSchoolEvent,
  toSchoolEvent,
} from "../types/schoolEvent";

interface EventsContextType {
  events: SchoolEvent[];
  addEvent: (newEvent: NewSchoolEvent) => Promise<void>;
  updateEvent: (
    eventId: string,
    update: Partial<NewSchoolEvent>,
  ) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
  loading: boolean;
}

const EventsContext = createContext<EventsContextType | null>(null);

export function EventsProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function initEvents() {
      const { data, error } = await supabase
        .from("school_events")
        .select("*")
        .order("date", { ascending: true });

      if (error) {
        console.error("Failed to fetch events:", error);
        return;
      }

      setEvents((data ?? []).map(toSchoolEvent));
    }

    initEvents();
  }, []);

  async function addEvent(newEvent: NewSchoolEvent) {
    setLoading(true);

    const { data, error } = await supabase
      .from("school_events")
      .insert({
        name: newEvent.name,
        type: newEvent.type,
        date: newEvent.date,
        start_time: newEvent.startTime,
        end_time: newEvent.endTime ?? null,
      })
      .select()
      .single();

    if (error) {
      console.error("Failed to add event:", error);
      setLoading(false);
      return;
    }

    setEvents((prev) => [...prev, toSchoolEvent(data)]);
    setLoading(false);
  }

  async function updateEvent(eventId: string, update: Partial<NewSchoolEvent>) {
    setLoading(true);

    const { data, error } = await supabase
      .from("school_events")
      .update({
        ...(update.name !== undefined && { name: update.name }),
        ...(update.type !== undefined && { type: update.type }),
        ...(update.date !== undefined && { date: update.date }),
        ...(update.startTime !== undefined && { start_time: update.startTime }),
        ...(update.endTime !== undefined && { end_time: update.endTime }),
      })
      .eq("id", eventId)
      .select()
      .single();

    if (error) {
      console.error("Failed to update event:", error);
      setLoading(false);
      return;
    }

    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? toSchoolEvent(data) : e)),
    );
    setLoading(false);
  }

  async function deleteEvent(eventId: string) {
    setLoading(true);

    const { error } = await supabase
      .from("school_events")
      .delete()
      .eq("id", eventId);

    if (error) {
      console.error("Failed to delete event:", error);
      setLoading(false);
      return;
    }

    setEvents((prev) => prev.filter((e) => e.id !== eventId));
    setLoading(false);
  }

  return (
    <EventsContext.Provider
      value={{ events, addEvent, updateEvent, deleteEvent, loading }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEvent() {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEvent must be used inside EventsProvider");
  }
  return context;
}
