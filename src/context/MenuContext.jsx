import { createContext, useContext, useState } from "react";

const MenuContext = createContext(null);

export function MenuProvider({ children }) {
  const [menuButtonVisibility, setMenuButtonVisibility] = useState(false);
  const [menuBodyVisibility, setMenuBodyVisibility] = useState(false);

  function toggleMenuButton() {
    setMenuButtonVisibility((prev) => !prev);
  }

  function toggleMenuBody() {
    setMenuBodyVisibility((prev) => !prev);
  }

  return (
    <MenuContext.Provider
      value={{
        menuButtonVisibility,
        toggleMenuButton,
        menuBodyVisibility,
        toggleMenuBody,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used inside MenuProvider");
  }
  return context;
}
