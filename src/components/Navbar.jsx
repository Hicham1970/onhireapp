import React from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useAlert, useUser } from "../hooks/Hooks";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Navbar() {
  const { id } = useParams();
  const { dispatchAlert } = useAlert();
  const { user, dispatchUser } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  // Masquer la Navbar globale sur la page OnHire car elle a son propre layout
  if (location.pathname === '/onhire') return null;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatchUser({ type: "LOG_OUT" });
      dispatchAlert({
        type: "SHOW",
        payload: "Déconnexion réussie",
        variant: "Success",
      });
      navigate('/login');
    } catch (error) {
      console.error("Erreur de déconnexion:", error);
    }
  };

  return (
    <div className="backdrop-blur-md fixed top-0 left-0 right-0 h-16 bg-white bg-opacity-50 justify-between flex items-center px-10 py-5 z-50 shadow-sm">
      <Link to="/onhire" className="text-xl font-semibold">
        OnHire
      </Link>
      <div className="flex gap-2">
        <Link
          to="/users"
          className="grid place-content-center bg-blue-700 text-white font-medium text-lg px-5 h-10 w-28 rounded-3xl hover:bg-blue-800 transition-colors"
        >
          Admin
        </Link>
        {user && (
          <button
            onClick={handleLogout}
            className="bg-red-700 text-white font-medium text-lg px-5 h-10 w-28 rounded-3xl hover:bg-red-800 transition-colors"
          >
            Log out
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
