export type EventType =
  | "Academic"
  | "Holiday"
  | "School Activity"
  | "Administrative"
  | "Other";

export interface NewSchoolEvent {
  announcementType: "event";
  name: string;
  type: EventType;
  date: string;
  startTime?: string | null;
  endTime?: string | null; // nullable — matches the table
}

export interface SchoolEvent extends NewSchoolEvent {
  id: string;
  createdAt: string;
}

export const toSchoolEvent = (row: Record<string, unknown>): SchoolEvent => {
  return {
    announcementType: "event",
    id: row.id as string,
    name: row.name as string,
    type: row.type as EventType,
    date: row.date as string,
    startTime: (row.start_time as string | null) ?? undefined,
    endTime: (row.end_time as string | null) ?? undefined,
    createdAt: row.created_at as string,
  };
};
