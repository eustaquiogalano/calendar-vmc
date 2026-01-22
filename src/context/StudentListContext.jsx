import { createContext, useContext, useState } from "react";
import mockStudentDatabase from "../services/mockStudentDatabase";

const StudentListContext = createContext(null);

export function StudentListProvider({ children }) {
  const [studentList, setStudentList] = useState([...mockStudentDatabase]);

  function updateRequestStatus(studentID, requestID, status) {
    const newList = studentList.map((student) => {
      if (student.idNumber === studentID) {
        const updatedRequests = student.requestedDocuments.map((request) => {
          if (request.id === requestID) {
            return { ...request, status: status };
          }
          return request;
        });
        return { ...student, requestedDocuments: updatedRequests };
      }
      return student;
    });

    setStudentList(newList);
  }

  function updateRequestList(studentID, requestList) {
    const newList = studentList.map((student) => {
      if (student.idNumber === studentID) {
        console.log("rd", `${student.requestedDocuments}`);

        student.requestedDocuments = [
          ...student.requestedDocuments,
          ...requestList,
        ];
        return student;
      }
      return student;
    });

    console.log("rq", requestList);

    setStudentList(newList);
  }

  return (
    <StudentListContext.Provider value={{ studentList, updateRequestStatus }}>
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
