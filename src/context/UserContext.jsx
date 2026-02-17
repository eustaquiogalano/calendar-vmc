import { createContext, useContext, useEffect, useState } from "react";
import {
  getAdminUsers,
  getCurrentUser,
  getStudentUsers,
  getUsers,
  setInitialUsers,
  updateRequestStatus,
} from "../utils/storage";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [admins, setAdmins] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

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
    }

    initUsers();
  }, [loading]);

  async function updateRequest(student, requestID, status, request) {
    let studentID = student.idNumber;

    await updateRequestStatus(studentID, requestID, {
      ...request,
      status: status,
    });

    setLoading((prev) => !prev);
  }

  return (
    <UserContext.Provider
      value={{ users, students, admins, currentUser, updateRequest }}
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
