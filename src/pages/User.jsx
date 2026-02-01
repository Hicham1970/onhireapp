import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getUsers } from "../api/api";
import { Mail, Calendar, User as UserIcon, ArrowLeft } from "lucide-react";

function User() {
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const usersData = await getUsers();
        const foundUser = Object.values(usersData).find(u => u.username === username);

        if (!foundUser) {
          setError("Utilisateur non trouvé");
        } else {
          setProfileUser(foundUser);
        }
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement du profil");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [username]);

  if (loading) return <div className="flex justify-center mt-20">Chargement...</div>;
  if (error) return <div className="flex justify-center mt-20 text-red-500">{error}</div>;
  if (!profileUser) return null;

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <Link to="/users" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Retour à la liste
      </Link>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-2xl font-bold text-slate-600 dark:text-slate-300">
          {profileUser.username?.charAt(0).toUpperCase() || <UserIcon />}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{profileUser.username}</h1>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">USER</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
          <Mail className="w-5 h-5 text-slate-400" />
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold">Email</p>
            <p className="text-slate-900 dark:text-white">{profileUser.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
          <Calendar className="w-5 h-5 text-slate-400" />
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold">Membre depuis</p>
            <p className="text-slate-900 dark:text-white">
              {profileUser.createdAt ? new Date(profileUser.createdAt).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
