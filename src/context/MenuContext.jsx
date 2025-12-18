import { createContext, useContext, useState } from "react";

const MenuContext = createContext(null);

export function MenuProvider({ children }) {
  const [menuButtonVisibility, setMenuButtonVisibility] = useState(false);

  function toggleMenuButton() {
    setMenuButtonVisibility((prev) => !prev);
  }

  return (
    <MenuContext.Provider value={{ menuButtonVisibility, toggleMenuButton }}>
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
