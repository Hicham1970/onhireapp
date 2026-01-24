import { createContext, useReducer } from "react";
import reducer, { initialState } from "../store/userReducer";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, dispatchUser] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;