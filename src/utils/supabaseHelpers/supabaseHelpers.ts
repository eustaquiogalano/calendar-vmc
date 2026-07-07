import { supabase } from "../../supabase-client"; // adjust path to your supabase client

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

export interface User {
  id: string; // Supabase auth UUID (replaces idNumber as primary key)
  user_type: "student" | "admin";
  username: string;
  email: string;
  name: string;
  id_number: string;
  year_level: number;
}

export interface DocumentRequest {
  id: string;
  student_id: string; // references users.id
  document: string;
  purpose: string;
  date: string;
  status:
    | "PENDING"
    | "PROCESSING"
    | "READY_FOR_PICKUP"
    | "COMPLETED"
    | "REJECTED";
}

export interface SchoolEvent {
  id: string;
  name: string;
  type: string;
  date: string;
  start_time: string;
  end_time: string;
}

// ─────────────────────────────────────────────
// USER HELPERS
// ─────────────────────────────────────────────

// Get all users (admin use)
export async function getUsers(): Promise<User[]> {
  const { data, error } = await supabase.from("users").select("*");

  if (error) throw error;
  return data ?? [];
}

// Get all students only
export async function getStudentUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_type", "student");

  if (error) throw error;
  return data ?? [];
}

// Get all admins only
export async function getAdminUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_type", "admin");

  if (error) throw error;
  return data ?? [];
}

// Get the currently logged-in user's profile from the users table
export async function getCurrentUser(): Promise<User | null> {
  const { data: authData } = await supabase.auth.getUser();
  if (!authData.user) return null;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", authData.user.id)
    .single();

  if (error) throw error;
  return data ?? null;
}

// Add a new student user profile (call this after Supabase auth signup)
export async function addStudentUser(newUser: Omit<User, "id">): Promise<User> {
  const { data, error } = await supabase
    .from("users")
    .insert({ ...newUser, user_type: "student" })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Update any field on a user row
export async function updateUser(
  userId: string,
  update: Partial<User>,
): Promise<User> {
  const { data, error } = await supabase
    .from("users")
    .update(update)
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ─────────────────────────────────────────────
// DOCUMENT REQUEST HELPERS
// ─────────────────────────────────────────────

// Get all document requests (admin: all students)
export async function getAllRequests(): Promise<DocumentRequest[]> {
  const { data, error } = await supabase
    .from("document_requests")
    .select("*")
    .order("date", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

// Get document requests for a specific student
export async function getRequestsByStudent(
  studentId: string,
): Promise<DocumentRequest[]> {
  const { data, error } = await supabase
    .from("document_requests")
    .select("*")
    .eq("student_id", studentId)
    .order("date", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

// Add a new document request (student submits)
export async function addRequestHF(
  newRequest: Omit<DocumentRequest, "id">,
): Promise<DocumentRequest> {
  const { data, error } = await supabase
    .from("document_requests")
    .insert(newRequest)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Update request status (admin updates: PENDING → PROCESSING → READY_FOR_PICKUP → COMPLETED)
export async function updateRequestStatusHF(
  requestId: string,
  update: Partial<DocumentRequest>,
): Promise<DocumentRequest> {
  const { data, error } = await supabase
    .from("document_requests")
    .update(update)
    .eq("id", requestId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Delete a document request
export async function deleteRequestHF(requestId: string): Promise<void> {
  const { error } = await supabase
    .from("document_requests")
    .delete()
    .eq("id", requestId);

  if (error) throw error;
}

// ─────────────────────────────────────────────
// SCHOOL EVENT HELPERS
// ─────────────────────────────────────────────

// Get all events
export async function getEvents(): Promise<SchoolEvent[]> {
  const { data, error } = await supabase
    .from("school_events")
    .select("*")
    .order("date", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

// Add a new event (admin only)
export async function addEvent(
  newEvent: Omit<SchoolEvent, "id">,
): Promise<SchoolEvent> {
  const { data, error } = await supabase
    .from("school_events")
    .insert(newEvent)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Update an existing event (admin only)
export async function updateEvent(
  eventId: string,
  update: Partial<SchoolEvent>,
): Promise<SchoolEvent> {
  const { data, error } = await supabase
    .from("school_events")
    .update(update)
    .eq("id", eventId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Delete an event (admin only)
export async function deleteEvent(eventId: string): Promise<void> {
  const { error } = await supabase
    .from("school_events")
    .delete()
    .eq("id", eventId);

  if (error) throw error;
}
