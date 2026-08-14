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
import Loader from "@/components/Loader/Loader.tsx";
import { Student, Admin, mapAdmin, mapStudent } from "../types/user.js";

interface UserContextType {
  users: Student[] | Admin[];
  students: Student[];
  admins: Admin[];
  currentUser: Student | Admin | null;
  loginCurrentUser: (currentUser: Student | Admin | null) => void;
  logoutCurrentUser: () => void;
  updateStudent: (
    studentId: string,
    authId: string,
    update: Partial<Student>,
  ) => Promise<void>;
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

        if (profile?.user_type === "student") {
          const { data: studentProfile } = await supabase
            .from("students")
            .select("*  ")
            .eq("user_id", authData.user.id)
            .single();

          currentUser = mapStudent({
            ...profile,
            ...(studentProfile as Record<string, any>),
          });
        } else {
          const { data: adminProfile } = await supabase
            .from("admins")
            .select("*")
            .eq("user_id", authData.user.id)
            .single();

          currentUser = mapAdmin({ ...profile, ...adminProfile });
        }
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

  const loginCurrentUser = (currentUser: Student | Admin | null) => {
    dispatch({ type: "LOGIN", payload: currentUser });
  };

  const logoutCurrentUser = () => {
    dispatch({ type: "LOGOUT" });
  };

  async function updateStudent(
    studentId: string,
    authId: string,
    update: Partial<Student>,
  ) {
    setLoading(true);

    // update students table
    const { error: studentError } = await supabase
      .from("students")
      .update({
        first_name: update.firstName,
        last_name: update.lastName,
        middle_name: update.middleName ?? null,
        // suffix: update.suffix ?? null,
        id_number: update.idNumber,
        year_level: update.yearLevel,
        contact_number: update.contactNumber ?? null,
      })
      .eq("id", studentId);

    if (studentError) {
      console.error("Failed to update student:", studentError);
      setLoading(false);
      return;
    }

    // update email in users table if provided
    if (update.email) {
      const { error: userError } = await supabase
        .from("users")
        .update({ email: update.email })
        .eq("id", authId);

      if (userError) {
        console.error("Failed to update email:", userError);
        setLoading(false);
        return;
      }
    }

    // update currentUser in context
    dispatch({
      type: "UPDATE_CURRENT_USER",
      payload: { ...state.currentUser, ...update } as Student,
    });

    setLoading(false);
  }

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
        updateStudent,
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
