// shape when creating a new request (no id yet — Supabase generates it)
export interface NewDocumentRequest {
  announcementType: "request";
  studentId: string;
  document: string;
  purpose: string;
  date: string;
  status:
    | "PENDING"
    | "ACCEPTED_PROCESSING"
    | "READY_FOR_PICKUP"
    | "COMPLETED"
    | "REJECTED";
}

// shape after it's been saved (has id from Supabase)
export interface DocumentRequest extends NewDocumentRequest {
  id: string;
}

export const documentStatusLabel: Record<DocumentRequest["status"], string> = {
  PENDING: "Pending",
  ACCEPTED_PROCESSING: "Accepted & Processing",
  READY_FOR_PICKUP: "Ready for Pickup",
  COMPLETED: "Completed",
  REJECTED: "Rejected",
};

export const toDocumentRequest = (
  row: Record<string, unknown>,
): DocumentRequest => {
  return {
    announcementType: "request",
    id: row.id as string,
    studentId: row.student_id as string,
    document: row.document as string,
    purpose: row.purpose as string,
    date: row.date as string,
    status: row.status as DocumentRequest["status"],
  };
};
