import { createContext, useContext, useState } from "react";

const RequestContext = createContext(null);

export function RequestProvider({ children }) {
  const [request, setRequest] = useState({});

  return (
    <RequestContext.Provider
      value={{
        request,
        setRequest,
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
