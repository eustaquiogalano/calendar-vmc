import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { supabase } from "../supabase-client.ts"; // adjust path
import {
  DocumentRequest,
  NewDocumentRequest,
  toDocumentRequest,
} from "../types/documentRequest.ts";
import { Student, Admin } from "../types/user";
import { useUser } from "./UserContext";

interface RequestContextType {
  requests: DocumentRequest[];
  addRequest: (newRequest: NewDocumentRequest) => Promise<void>;
  updateRequestStatus: (
    requestID: string,
    status: DocumentRequest["status"],
  ) => Promise<void>;
  deleteRequest: (requestID: string) => Promise<void>;
  loading: boolean;
}

const DocumentRequestContext = createContext<RequestContextType | null>(null);

export function DocumentRequestProvider({ children }: { children: ReactNode }) {
  const { currentUser } = useUser();
  const [requests, setRequests] = useState<DocumentRequest[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    async function initRequests(user: Student | Admin) {
      // Admin sees all requests, student sees only their own
      const query = supabase
        .from("document_requests")
        .select("*, students(first_name, last_name)")
        .order("date", { ascending: false });

      if (user.userType === "student") {
        query.eq("student_id", user.id);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Failed to fetch requests:", error);
        return;
      }

      setRequests((data ?? []).map(toDocumentRequest));
    }

    initRequests(currentUser);
  }, [currentUser]);

  async function addRequest(newRequest: NewDocumentRequest) {
    setLoading(true);

    const { data, error } = await supabase
      .from("document_requests")
      .insert({
        student_id: currentUser?.id, // snake_case for Supabase
        document: newRequest.document,
        purpose: newRequest.purpose,
        date: newRequest.date,
        status: newRequest.status,
      })
      .select("*, students(first_name, last_name)")
      .single();

    if (error) {
      console.error("Failed to add request:", error);
      setLoading(false);
      return;
    }

    setRequests((prev) => [toDocumentRequest(data), ...prev]);
    setLoading(false);
  }

  async function updateRequestStatus(
    requestID: string,
    status: DocumentRequest["status"],
  ) {
    setLoading(true);

    const { data, error } = await supabase
      .from("document_requests")
      .update({ status })
      .eq("id", requestID)
      .select()
      .single();

    if (error) {
      console.error("Failed to update request status:", error);
      setLoading(false);
      return;
    }

    setRequests((prev) =>
      prev.map((r) => (r.id === requestID ? toDocumentRequest(data) : r)),
    );

    setLoading(false);
  }

  async function deleteRequest(requestID: string) {
    setLoading(true);

    const { error } = await supabase
      .from("document_requests")
      .delete()
      .eq("id", requestID);

    if (error) {
      console.error("Failed to delete request:", error);
      setLoading(false);
      return;
    }

    setRequests((prev) => prev.filter((r) => r.id !== requestID));
    setLoading(false);
  }

  return (
    <DocumentRequestContext.Provider
      value={{
        requests,
        addRequest,
        updateRequestStatus,
        deleteRequest,
        loading,
      }}
    >
      {children}
    </DocumentRequestContext.Provider>
  );
}

export function useDocumentRequest() {
  const context = useContext(DocumentRequestContext);
  if (!context) {
    throw new Error(
      "useDocumentRequest must be used inside DocumentRequestProvider",
    );
  }
  return context;
}
