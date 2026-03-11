import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers, getUser } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { Ship, Users as UsersIcon, ArrowRight, Loader2, Search } from "lucide-react";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser, loading: authLoading } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (authLoading) return;
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const userData = await getUser(currentUser.uid);
        if (!userData || userData.role !== 'admin') {
          setError("Accès réservé aux administrateurs.");
          return;
        }

        const data = await getUsers();
        const usersList = Object.keys(data || {}).map(key => ({
          id: key,
          ...data[key]
        }));
        setUsers(usersList);
      } catch (error) {
        if (error.message && error.message.toLowerCase().includes("permission denied")) {
          setError("Accès refusé. Vérifiez les règles de sécurité Firebase.");
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

  const filteredUsers = users.filter(user => 
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-slate-500">Chargement des utilisateurs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl text-white mb-4 shadow-lg shadow-blue-500/25">
            <UsersIcon className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Utilisateurs
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Gérez les utilisateurs de l'application
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
            <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
            <p className="text-sm text-red-500 dark:text-red-500 mt-1">
              Si vous êtes administrateur, vérifiez les règles de la base de données.
            </p>
          </div>
        )}

        {/* Users List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <Link
                to={`/users/${user.username}`}
                key={user.id}
                className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {user.username?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                    {user.username || 'Utilisateur'}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                    {user.email}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <UsersIcon className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <p className="text-slate-500">Aucun utilisateur trouvé</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;

