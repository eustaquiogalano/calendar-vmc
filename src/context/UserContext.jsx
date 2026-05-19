import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  getAdminUsers,
  getCurrentUser,
  addRequestHF,
  getStudentUsers,
  getUsers,
  setInitialUsers,
  updateRequestStatusHF,
  deleteRequestHF,
} from "../utils/storage/storage";
import usersReducer from "../reducers/userReducer";
import Loader from "@/components/Loader/Loader";

const UserContext = createContext(null);

const initialState = {
  users: [],
  currentUser: null,
  admins: [],
  students: [],
};

export function UserProvider({ children }) {
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

  async function updateRequestStatus(student, requestID, status, request) {
    setLoading(true);
    let studentID = student.idNumber;

    await updateRequestStatusHF(studentID, requestID, {
      ...request,
      status: status,
    });

    setLoading(false);
  }

  async function addRequest(newRequest) {
    setLoading(true);
    await addRequestHF(newRequest);

    setLoading(false);
  }

  async function deleteRequest(student, requestID) {
    setLoading(true);
    await deleteRequestHF(student.idNumber, requestID);

    setLoading(false);
  }

  const loginCurrentUser = (currentUser) => {
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
