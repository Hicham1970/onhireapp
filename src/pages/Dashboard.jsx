import React, { useEffect } from "react";
import { useUser, useAppState } from "../hooks/Hooks";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Profile from "../components/Profile";

function Dashboard() {
  const { user } = useUser();
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Attendre la fin du chargement de l'authentification
    if (loading) return;

    // Si le chargement est terminé et qu'il n'y a pas d'utilisateur, rediriger
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, loading, navigate]);

  // `user` provient de UserContext et peut prendre un cycle de rendu pour se mettre à jour
  // après `currentUser`. On affiche le profil dès que `user` et `currentUser` sont disponibles.
  if (user && currentUser) {
    return (
      <div className="flex justify-center mt-20">
        <Profile
          username={user.username}
          email={user.email}
        />
      </div>
    );
  }
  
  // Si l'authentification est en cours, ou si on attend que UserContext se synchronise
  if (loading || currentUser) {
    return <div className="flex justify-center mt-20">Chargement...</div>;
  }

  // Si non-connecté, la redirection via useEffect est en cours
  return null;
}

export default Dashboard;
