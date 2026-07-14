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
  student?: {
    firstName: string;
    lastName: string;
    idNumber: string;
    yearLevel: number;
    email: string;
  };
}

export const documentStatusLabel: Record<DocumentRequest["status"], string> = {
  PENDING: "Pending",
  ACCEPTED_PROCESSING: "Accepted & Processing",
  READY_FOR_PICKUP: "Ready for Pickup",
  COMPLETED: "Completed",
  REJECTED: "Rejected",
};

export function toDocumentRequest(data: Record<string, any>): DocumentRequest {
  return {
    id: data.id,
    announcementType: "request",
    studentId: data.student_id,
    document: data.document,
    purpose: data.purpose,
    date: data.date,
    status: data.status,
    student: data.students
      ? {
          firstName: data.students.first_name,
          lastName: data.students.last_name,
          idNumber: data.students.id_number,
          yearLevel: data.students.year_level,
          email: data.students.email,
        }
      : undefined,
  };
}
