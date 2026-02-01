import React from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useAlert, useUser } from "../hooks/Hooks";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Ship } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { id } = useParams();
  const { dispatchAlert } = useAlert();
  const { user, dispatchUser } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatchUser({ type: "LOG_OUT" });
      dispatchAlert({
        type: "SHOW",
        payload: "Déconnexion réussie",
        variant: "Success",
      });
      navigate('/');
    } catch (error) {
      console.error("Erreur de déconnexion:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-16 z-50 flex items-center justify-between px-6 backdrop-blur-md bg-white/70 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm transition-all duration-300">
      <Link to={currentUser ? "/dashboard" : "/"} className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-white hover:opacity-80 transition-opacity">
        <Ship className="w-8 h-8 text-blue-600" />
        <span>OnHire</span>
      </Link>
      <div className="flex gap-3">
        {currentUser && (
          <>
            <Link
              to="/users"
              className="flex items-center justify-center bg-blue-600 text-white font-medium text-sm px-5 py-2 rounded-full hover:bg-blue-700 transition-colors shadow-sm"
            >
              Admin
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white font-medium text-sm px-5 py-2 rounded-full hover:bg-red-700 transition-colors shadow-sm"
            >
              Log out
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
