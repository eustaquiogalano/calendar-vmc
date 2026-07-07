import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  ReactNode,
} from "react";
import { supabase } from "../supabase-client.ts";
import usersReducer from "../reducers/userReducer.ts";
import Loader from "@/components/Loader/Loader";
import { Student, Admin } from "../types/user.js";

interface DocumentRequest {
  id: string;
  document: string;
  purpose: string;
  date: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

interface UserContextType {
  users: Student[] | Admin[];
  students: Student[];
  admins: Admin[];
  currentUser: Student | Admin | null;
  loginCurrentUser: (currentUser: Student | Admin | null) => void;
  logoutCurrentUser: () => void;
  updateRequestStatus: (
    student: Student,
    requestID: string,
    status: "PENDING" | "APPROVED" | "REJECTED",
    request: DocumentRequest,
  ) => Promise<void>;
  addRequest: (newRequest: DocumentRequest) => Promise<void>;
  deleteRequest: (student: Student, requestID: string) => Promise<void>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType | null>(null);

interface State {
  users: Student[] | Admin[];
  currentUser: Student | Admin | null;
  admins: Admin[];
  students: Student[];
}

const initialState: State = {
  users: [],
  currentUser: null,
  admins: [],
  students: [],
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function initUsers() {
      // Fetch all users
      const { data: users } = await supabase.from("users").select("*");
      const { data: students } = await supabase.from("students").select("*");
      const { data: admins } = await supabase.from("admins").select("*");

      // Get current logged in user
      const { data: authData } = await supabase.auth.getUser();
      let currentUser = null;

      if (authData.user) {
        const { data: profile } = await supabase
          .from("users")
          .select("*")
          .eq("id", authData.user.id)
          .single();

        currentUser = profile;
      }

      dispatch({
        type: "INIT_USERS",
        payload: {
          users: users ?? [],
          students: students ?? [],
          admins: admins ?? [],
          currentUser,
        },
      });

      setReady(true);
    }

    initUsers();
  }, [loading]);

  async function updateRequestStatus(
    student: Student,
    requestID: string,
    status: "PENDING" | "APPROVED" | "REJECTED",
    request: DocumentRequest,
  ) {
    setLoading(true);

    await supabase
      .from("document_requests")
      .update({ ...request, status })
      .eq("id", requestID);

    setLoading(false);
  }

  async function addRequest(newRequest: DocumentRequest) {
    setLoading(true);

    await supabase.from("document_requests").insert(newRequest);

    setLoading(false);
  }

  async function deleteRequest(student: Student, requestID: string) {
    setLoading(true);

    await supabase.from("document_requests").delete().eq("id", requestID);

    setLoading(false);
  }

  const loginCurrentUser = (currentUser: Student | Admin | null) => {
    dispatch({ type: "LOGIN", payload: currentUser });
  };

  const logoutCurrentUser = () => {
    dispatch({ type: "LOGOUT" });
  };

  if (!ready) return <Loader />;

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        students: state.students,
        admins: state.admins,
        currentUser: state.currentUser,
        loginCurrentUser,
        logoutCurrentUser,
        updateRequestStatus,
        addRequest,
        deleteRequest,
        loading,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used inside User Provider");
  }
  return context;
}
