import { createContext, useContext, useState } from "react";

const RequestContext = createContext(null);

export function RequestProvider({ children }) {
  const [requestList, setRequestList] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [deletionID, setDeletionID] = useState("");

  function getAllDates() {
    let dateList = requestList.map((request) => {
      return request.date;
    });

    return dateList;
  }

  return (
    <RequestContext.Provider
      value={{
        requestList,
        setRequestList,
        selectedDate,
        setSelectedDate,
        getAllDates,
        deletionID,
        setDeletionID,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
}

export function useRequest() {
  const context = useContext(RequestContext);
  if (!context) {
    throw new Error("useRequest must be used inside RequestProvider");
  }
  return context;
}
