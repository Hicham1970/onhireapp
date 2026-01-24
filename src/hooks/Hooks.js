import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { AlertContext } from "../context/AlertContext";

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  const { state, dispatchUser } = context;
  return { ...state, dispatchUser };
};

export const useAppState = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAppState must be used within a UserProvider");
  }
  return context.state;
};

export const useAlert = () => {
  return useContext(AlertContext);
};