import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getSurveys, getVessels, getFullReports, getUsers } from '../api/api';
import { getAllDraftSurveys } from '../services/adminServices';
import Profile from '../components/Profile';
import { Ship, ClipboardCheck, Shield, ChevronLeft, Loader2, Users, User, BarChart3 } from 'lucide-react';

const DashboardAdmin = () => {
  const { currentUser, loading, isAdmin, userData } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [surveys, setSurveys] = useState([]);
  const [fullReports, setFullReports] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [vessels, setVessels] = useState([]);
  const [allDraftSurveys, setAllDraftSurveys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loading || !currentUser || !isAdmin()) {
      navigate('/dashboard');
      return;
    }

    // Load admin data
    Promise.all([
      getSurveys(currentUser.uid),
      getFullReports(currentUser.uid),
      getUsers(),
      getVessels(currentUser.uid),
      getAllDraftSurveys()
    ]).then(([userSurveys, reports, usersData, dbVessels, allDraftSurveys]) => {
      setSurveys(userSurveys || []);
      setFullReports(reports || []);
      setAllUsers(Object.keys(usersData || {}).map(key => ({ id: key, ...usersData[key] })));
      setVessels(dbVessels || []);
      setAllDraftSurveys(allDraftSurveys || []);
    }).finally(() => setIsLoading(false));
  }, [currentUser, loading, isAdmin, navigate]);

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-slate-500">Chargement Admin...</p>
        </div>
      </div>
    );
  }

  const totalUsers = allUsers.length;
  const totalSurveys = surveys.length;
  const totalReports = fullReports.length;
  const totalVessels = vessels.length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Retour Dashboard
            </button>
            <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl border border-emerald-200">
              <Shield className="w-6 h-6 text-emerald-600" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
                <p className="text-sm text-slate-500">Gestion complète</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <Ship className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{totalVessels}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Navires</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                <ClipboardCheck className="w-7 h-7 text-emerald-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{totalSurveys + allDraftSurveys.length}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Total Expertises</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
<ClipboardCheck className="w-7 h-7 text-purple-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{totalReports}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Rapports</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center">
                <User className="w-7 h-7 text-indigo-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{totalUsers}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Utilisateurs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Users Management */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <User className="w-6 h-6 text-indigo-600" />
              Gestion Utilisateurs
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {allUsers.slice(0, 5).map(user => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center text-sm font-bold">
                      {user.username?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="font-medium">{user.username || 'N/A'}</p>
                      <p className="text-sm text-slate-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">USER</span>
                    <button className="p-1 text-red-500 hover:bg-red-100 rounded transition-colors" title="Supprimer">
<Shield className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border p-6">
            <h3 className="text-xl font-bold mb-6">Activité Récente</h3>
            <div className="space-y-4">
              {[...allDraftSurveys.slice(0, 3), ...surveys.slice(0, 2)].map((item, index) => (
                <div key={item.id || item.surveyId || index} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                    {item.informations?.vesselName?.charAt(0) || 'DS'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.informations?.vesselName || item.vesselName || 'Draft Survey'}</p>
                    <p className="text-xs text-slate-500">{item.cargoWeight ? `Cargo: ${item.cargoWeight.toFixed(0)} MT` : item.date || 'Draft Survey'}</p>
                  </div>
                  <div className="text-xs text-slate-500">
                    {new Date(item.updatedAt || item.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric', month: 'short'
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <button className="group p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Ship className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold mb-2">Nouveau Survey</h4>
            <p className="opacity-90">Créer expertise</p>
          </button>
          <button className="group p-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <ClipboardCheck className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold mb-2">Rapports Photos</h4>
            <p className="opacity-90">Inspection complète</p>
          </button>
          <button className="group p-6 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <User className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold mb-2">Gestion Users</h4>
            <p className="opacity-90">Tous les comptes</p>
          </button>
          <button className="group p-6 bg-gradient-to-br from-slate-500 to-slate-600 text-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
<Shield className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold mb-2">Analytics</h4>
            <p className="opacity-90">Statistiques globales</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;

