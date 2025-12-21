import { createContext, useContext, useState } from "react";

const RequestContext = createContext(null);

export function RequestProvider({ children }) {
  const [requestList, setRequestList] = useState([]);

  return (
    <RequestContext.Provider
      value={{
        requestList,
        setRequestList,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
}

export function useRequest() {
  const context = useContext(RequestContext);
  if (!context) {
    throw new Error("useMenu must be used inside RequestProvider");
  }
  return context;
}
