import { createContext, useEffect, useReducer, useState } from "react";
import { Expense } from "../types/Expense";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextProps = {
  token: string;
  isAuthenticated: boolean;
  authenticate: (token: string) => void;
  logOut: () => void;
};

const initialValue: AuthContextProps = {
  token: "",
  isAuthenticated: false,
  authenticate: () => {},
  logOut: () => {},
};

const AuthContext = createContext(initialValue);

export { AuthContext };

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string>("");

  const authenticate = (token: string) => {
    setToken(token);
    AsyncStorage.setItem("token", token);
  };

  const logOut = () => {
    setToken("");
    AsyncStorage.removeItem("token");
  };

  // Value to pass through context
  const value: AuthContextProps = {
    token,
    isAuthenticated: !!token,
    authenticate,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
