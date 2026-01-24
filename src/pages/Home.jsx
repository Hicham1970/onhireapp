import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/Hooks";
import Login from "./Login";

export const Home = () => {
  const { user } = useUser();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Login />;
};

export default Home;
