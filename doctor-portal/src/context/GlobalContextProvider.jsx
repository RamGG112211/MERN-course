/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export default function GlobalContextProvider({ children }) {
  const [user, setUser] = useState({
    id: "",
    name: "",
    accessToken: "",
    email: "",
  });

  const login = (userData) => setUser(userData);

  const logout = () =>
    setUser({
      id: "",
      name: "",
      accessToken: "",
      email: "",
    });

  return (
    <GlobalContext.Provider value={{ user, login, logout }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
