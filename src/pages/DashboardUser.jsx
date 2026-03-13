import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../hooks/Hooks";
import Profile from "../components/Profile";
import { Ship, ClipboardCheck, Gauge, Camera, FileText, BarChart3, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

function DashboardUser() {
  const { user } = useUser() || {};
  const { currentUser, loading, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!currentUser) {
      navigate("/");
      return;
    }
    if (isAdmin()) {
      navigate("/admin/dashboard");
      return;
    }
  }, [currentUser, loading, navigate, isAdmin]);

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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Bienvenue, {user?.username || currentUser.displayName || "Utilisateur"}
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Gérez vos expertises maritimes et accédez à tous vos outils
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Ship className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">12</p>
                <p className="text-xs text-slate-500">Navires</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                <ClipboardCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">48</p>
                <p className="text-xs text-slate-500">Expertises</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                <Gauge className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">127</p>
                <p className="text-xs text-slate-500">Calculs</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">23</p>
                <p className="text-xs text-slate-500">Rapports</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <Profile
              username={user?.username || currentUser.displayName || "Utilisateur"}
              email={user?.email || currentUser.email}
            />
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Actions rapides</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                to="/create-survey"
                className="flex items-center gap-4 p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <Ship className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    OnHire App
                  </h3>
                  <p className="text-sm text-slate-500">Créer une expertise</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </Link>

              <Link
                to="/onhire?tab=pictures"
                className="flex items-center gap-4 p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                  <Camera className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                    Inspection Report
                  </h3>
                  <p className="text-sm text-slate-500">Créer un rapport</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
              </Link>

              <Link
                to="/onhire?tab=vessels"
                className="flex items-center gap-4 p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25">
                  <Gauge className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                    Fuel Calculator
                  </h3>
                  <p className="text-sm text-slate-500">Calculer le carburant</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
              </Link>

              <Link
                to="/onhire?tab=ai"
                className="flex items-center gap-4 p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
                    Analytique
                  </h3>
                  <p className="text-sm text-slate-500">Voir les statistiques</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
              </Link>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Activité récente</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Nouvelle expertise créée pour "MV Oceanic Voyager"</p>
                  <span className="text-xs text-slate-400 ml-auto">Il y a 2h</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Rapport d'inspection généré</p>
                  <span className="text-xs text-slate-400 ml-auto">Il y a 5h</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Calcul de carburant effectué</p>
                  <span className="text-xs text-slate-400 ml-auto">Hier</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardUser;

