import { createContext, useContext, useState } from "react";
import mockStudentDatabase from "../services/mockStudentDatabase";

const StudentListContext = createContext(null);

export function StudentListProvider({ children }) {
  const [studentList, setStudentList] = useState([...mockStudentDatabase]);

  return (
    <StudentListContext.Provider value={{ studentList }}>
      {children}
    </StudentListContext.Provider>
  );
}

export function useStudentList() {
  const context = useContext(StudentListContext);
  if (!context) {
    throw new Error("useMenu must be used inside RequestProvider");
  }
  return context;
}
