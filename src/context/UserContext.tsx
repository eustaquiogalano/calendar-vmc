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

interface DocumentRequest {
  id: string;
  document: string;
  purpose: string;
  date: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

interface UserContextType {
  users: User[];
  students: User[];
  admins: User[];
  currentUser: User | null;
  loginCurrentUser: (currentUser: User | null) => void;
  logoutCurrentUser: () => void;
  updateRequestStatus: (
    student: User,
    requestID: string,
    status: "PENDING" | "APPROVED" | "REJECTED",
    request: DocumentRequest,
  ) => Promise<void>;
  addRequest: (newRequest: DocumentRequest) => Promise<void>;
  deleteRequest: (student: User, requestID: string) => Promise<void>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType | null>(null);

interface State {
  users: User[];
  currentUser: User | null;
  admins: User[];
  students: User[];
}

const initialState: State = {
  users: [],
  currentUser: null,
  admins: [],
  students: [],
};

interface User {
  userType: string;
  username: string;
  password: string;
  email: string;
  name: string;
  idNumber: string;
  yearLevel: number;
  isLoggedIn: boolean;
  requestedDocuments: Array<{
    id: string;
    document: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    purpose: string;
    date: string;
  }>;
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function initUsers() {
      await setInitialUsers();

      const users = await getUsers();
      const students = await getStudentUsers();
      const admins = await getAdminUsers();
      const currentUser = await getCurrentUser();

      dispatch({
        type: "INIT_USERS",
        payload: { users, students, admins, currentUser },
      });

      setReady(true);
    }

    initUsers();
  }, [loading]);

  async function updateRequestStatus(
    student: User,
    requestID: string,
    status: "PENDING" | "APPROVED" | "REJECTED",
    request: DocumentRequest,
  ) {
    setLoading(true);
    let studentID = student.idNumber;

    await updateRequestStatusHF(studentID, requestID, {
      ...request,
      status: status,
    });

    setLoading(false);
  }

  async function addRequest(newRequest: DocumentRequest) {
    setLoading(true);
    await addRequestHF(newRequest);

    setLoading(false);
  }

  async function deleteRequest(student: User, requestID: string) {
    setLoading(true);
    await deleteRequestHF(student.idNumber, requestID);

    setLoading(false);
  }

  const loginCurrentUser = (currentUser: User | null) => {
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
