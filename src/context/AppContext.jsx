import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [itemsOnCart, setItemsOnCart] = useState([]);

  return (
    <AppContext.Provider value={{ itemsOnCart, setItemsOnCart }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);