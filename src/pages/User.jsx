import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getUsers } from "../api/api";
import { Mail, Calendar, ArrowLeft, User as UserIcon, Loader2, Shield } from "lucide-react";

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-slate-500">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <Link to="/users" className="text-blue-600 hover:underline">
            Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  if (!profileUser) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link 
          to="/users" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à la liste
        </Link>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden">
          {/* Header Banner */}
          <div className="h-32 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500"></div>
          
          {/* Profile Content */}
          <div className="px-8 pb-8">
            <div className="relative -mt-12 mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl border-4 border-white dark:border-slate-800">
                {profileUser.username?.charAt(0).toUpperCase() || <UserIcon />}
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                {profileUser.username}
              </h1>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full">
                USER
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold">Email</p>
                  <p className="text-slate-900 dark:text-white font-medium">{profileUser.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold">Membre depuis</p>
                  <p className="text-slate-900 dark:text-white font-medium">
                    {profileUser.createdAt ? new Date(profileUser.createdAt).toLocaleDateString('fr-FR', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    }) : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;

