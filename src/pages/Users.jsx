import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers, getUser } from "../api/api";
import { useAuth } from "../context/AuthContext";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) return;
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      try {
        // Vérifier si l'utilisateur est administrateur avant de charger la liste
        const userData = await getUser(currentUser.uid);
        if (!userData || userData.role !== 'admin') {
          setError("Accès réservé aux administrateurs.");
          return;
        }

        const data = await getUsers();
        // Convertir l'objet Firebase en tableau
        const usersList = Object.keys(data || {}).map(key => ({
          id: key,
          ...data[key]
        }));
        setUsers(usersList);
      } catch (error) {
        if (error.message && error.message.toLowerCase().includes("permission denied")) {
          setError("Accès refusé. Vérifiez les règles de sécurité Firebase (database.rules.json).");
        } else {
          setError(error.message);
        }
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [authLoading, currentUser]);

  if (loading || authLoading) return <div className="mt-20 text-center">Chargement des utilisateurs...</div>;

  return (
    <div className="space-y-3 grid mt-20 px-10 max-w-2xl mx-auto">
      {users.map((user) => {
        return (
          <Link
            to={`/users/${user.username}`}
            key={user.id}
            className="flex flex-col gap-2 p-4 border rounded hover:bg-gray-50 transition-colors bg-white shadow-sm block"
          >
            <h3 className="font-semibold text-lg">{user.username}</h3>
            <p className="text-gray-600">{user.email}</p>
          </Link>
        );
      })}
      {error && (
        <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 font-medium mb-2">Erreur: {error}</p>
          <p className="text-sm text-red-500">
            Si vous êtes administrateur, assurez-vous que les règles de la base de données autorisent la lecture du nœud "users".
          </p>
        </div>
      )}
    </div>
  );
}

export default Users;
