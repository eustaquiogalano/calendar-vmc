import { createContext, useContext, useEffect, useState } from "react";
import {
  getAdminUsers,
  getCurrentUser,
  addRequestHF,
  getStudentUsers,
  getUsers,
  setInitialUsers,
  updateRequestStatusHF,
  deleteRequestHF,
} from "../utils/storage";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [admins, setAdmins] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function initUsers() {
      await setInitialUsers();

      const users = await getUsers();
      setUsers(users);

      const students = await getStudentUsers();
      setStudents(students);

      const admins = await getAdminUsers();
      setAdmins(admins);

      const currentUser = await getCurrentUser();
      setCurrentUser(currentUser);

      setReady(true);
    }

    initUsers();
  }, [loading]);

  async function updateRequestStatus(student, requestID, status, request) {
    let studentID = student.idNumber;

    await updateRequestStatusHF(studentID, requestID, {
      ...request,
      status: status,
    });

    setLoading((prev) => !prev);
  }

  async function addRequest(newRequest) {
    await addRequestHF(newRequest);

    setLoading((prev) => !prev);
  }

  async function deleteRequest(student, requestID) {
    await deleteRequestHF(student.idNumber, requestID);

    setLoading((prev) => !prev);
  }

  if (!ready) return <div>loading...</div>;

  return (
    <UserContext.Provider
      value={{
        users,
        students,
        admins,
        currentUser,
        setCurrentUser,
        updateRequestStatus,
        addRequest,
        deleteRequest,
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
