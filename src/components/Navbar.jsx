import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useAlert, useUser } from "../hooks/Hooks";

function Navbar() {
  const { id } = useParams();
  const { dispatchAlert } = useAlert();
  const { user, dispatchUser } = useUser();
  const location = useLocation();

  // Masquer la Navbar globale sur la page OnHire car elle a son propre layout
  if (location.pathname === '/onhire') return null;

  const handleLogout = () => {
    dispatchUser({ type: "LOG_OUT" });
    dispatchAlert({
      type: "SHOW",
      payload: "Log out",
      variant: "Danger",
    });
    window.location.href = "/";
  };

  return (
    <div className="backdrop-blur-md fixed inset-0 h-16 w-full bg-white bg-opacity-50 justify-between flex items-center px-10 py-5">
      <Link to="/onhire" className="text-xl font-semibold">
        OnHire
      </Link>
      <div className="flex gap-2">
        <Link
          to="/users"
          className=" right-10 grid place-content-center bg-blue-700 text-white font-medium text-lg px-5 h-10 w-28 rounded-3xl"
        >
          Admin
        </Link>
        {user && (
          <button
            onClick={handleLogout}
            className=" right-10 bg-red-700 text-white font-medium text-lg px-5 h-10 w-28 rounded-3xl"
            type="submit"
          >
            Log out
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
