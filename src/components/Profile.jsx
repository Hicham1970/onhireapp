import React from "react";
import { useAlert, useUser } from "../hooks/Hooks";
import { Link } from "react-router-dom";
import { Mail, Calendar, Settings, LogOut, Ship, ClipboardCheck, Gauge, Camera, User as UserIcon, Loader2 } from "lucide-react";

function Profile({ username, email, password }) {
  const { dispatchAlert } = useAlert();
  const { dispatchUser } = useUser();

  const handleLogout = () => {
    dispatchUser({ type: "LOG_OUT" });
    dispatchAlert({
      type: "SHOW",
      payload: "Déconnexion réussie",
      variant: "Success",
    });
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden mb-6">
          {/* Banner */}
          <div className="h-32 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500"></div>
          
          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="relative -mt-12 mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl border-4 border-white dark:border-slate-800">
                {username?.charAt(0).toUpperCase() || <UserIcon />}
              </div>
            </div>

            {/* User Info */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {username || 'Utilisateur'}
                </h1>
                <p className="text-slate-500 dark:text-slate-400">{email}</p>
              </div>
              <div className="flex gap-3">
                <Link
                  to={`/users/${username}/edit`}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Modifier le profil
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </button>
              </div>
            </div>

          {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl text-center">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Ship className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">12</p>
                <p className="text-xs text-slate-500">Navires</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl text-center">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <ClipboardCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">48</p>
                <p className="text-xs text-slate-500">Expertises</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl text-center">
                <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Gauge className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">127</p>
                <p className="text-xs text-slate-500">Calculs Carburant</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

