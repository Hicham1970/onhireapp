import { createContext, useReducer } from "react";
import reducer, { initialState } from "../store/alertReducer";

export const AlertContext = createContext();

const AlertProvider = ({ children }) => {
  const [alertState, dispatchAlert] = useReducer(reducer, initialState);

  return (
    <AlertContext.Provider value={{ alertState, dispatchAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;