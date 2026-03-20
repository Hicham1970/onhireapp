import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../hooks/Hooks";
import Profile from "../components/Profile";
import { Ship, ClipboardCheck, Gauge, Camera, FileText, BarChart3, ArrowRight, Loader2, Clock, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { getSurveys, getFullReports, getVessels } from "../api/api";

function DashboardUser() {
  const { user } = useUser() || {};
  const { currentUser, loading, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [surveys, setSurveys] = useState([]);
  const [reports, setReports] = useState([]);
  const [vessels, setVessels] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser?.uid) return;
      
      setLoadingData(true);
      setError(null);
      
      try {
        const [userSurveys, userReports, userVessels] = await Promise.all([
          getSurveys(currentUser.uid),
          getFullReports(currentUser.uid),
          getVessels(currentUser.uid)
        ]);
        
        setSurveys(userSurveys || []);
        setReports(userReports || []);
        setVessels(userVessels || []);
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
        setError("Erreur de chargement des données");
        setSurveys([]);
        setReports([]);
        setVessels([]);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [currentUser?.uid]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-slate-500">Chargement...</p>
      </div>
    </div>;
  }

  return (
    <>
      <Helmet>
        <title>Dashboard | MarineSurveyorDev - Maritime Surveys</title>
        <meta name="description" content="User dashboard for managing on-hire surveys, vessel inspections, reports, and maritime data. Secure access to your surveys." />
      </Helmet>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Bienvenue, {user?.username || (currentUser ? currentUser.displayName : "") || "Utilisateur"}
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              Gérez vos expertises maritimes et accédez à tous vos outils
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {loadingData ? (
              Array.from({length: 4}, (_, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 animate-pulse">
                  <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-lg w-20 mb-2"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
                </div>
              ))
            ) : error ? (
              <div className="md:col-span-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </div>
            ) : (
              <>
                <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Ship className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">{vessels.length}</p>
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
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">{surveys.length}</p>
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
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">{reports.length}</p>
                      <p className="text-xs text-slate-500">Rapports</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Profile
                username={user?.username || currentUser?.displayName || "Utilisateur"}
                email={user?.email || currentUser?.email}
              />
            </div>

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
                  to="/draft-survey/infos"
                  className="flex items-center gap-4 p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                    <ClipboardCheck className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-cyan-600 transition-colors">
                      Draft Survey
                    </h3>
                    <p className="text-sm text-slate-500">Nouvelle expertise</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" />
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

              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white text-lg">Activité récente</h3>
                  <button
                    onClick={() => window.location.reload()}
                    className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors p-1 -m-1 rounded"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Actualiser
                  </button>
                </div>
                
                {loadingData ? (
                  <div className="space-y-3">
                    {Array.from({length: 3}, (_, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg animate-pulse">
                        <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                        <div className="flex-1 space-y-1">
                          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">Aucune donnée récente disponible</p>
                ) : (
                  <div className="space-y-4 max-h-64 overflow-y-auto">
                    {surveys.slice(0, 3).map((survey) => (
                      <Link
                        key={survey.id}
                        to={`/onhire?tab=surveys&id=${survey.id}`}
                        className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-900/50 rounded-lg group transition-all -mx-3 px-3"
                      >
                        <div className="w-2 h-2 bg-emerald-500 rounded-full group-hover:scale-110 transition-transform"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-white truncate group-hover:text-emerald-600">
                            {survey.vesselName || survey.name || 'Nouvelle expertise'}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Expertise créée
                          </p>
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {survey.createdAt ? new Date(survey.createdAt).toLocaleDateString('fr-FR', { 
                            day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' 
                          }) : 'Récemment'}
                        </div>
                      </Link>
                    ))}
                    
                    {reports.slice(0, 3).map((report) => (
                      <Link
                        key={report.id}
                        to={`/reports?id=${report.id}`}
                        className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-900/50 rounded-lg group transition-all -mx-3 px-3"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-110 transition-transform"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-white truncate group-hover:text-blue-600">
                            {report.vesselName || report.shipName || 'Rapport généré'}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Rapport d'inspection
                          </p>
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {report.createdAt ? new Date(report.createdAt).toLocaleDateString('fr-FR', { 
                            day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' 
                          }) : 'Récemment'}
                        </div>
                      </Link>
                    ))}
                    
                    {surveys.length === 0 && reports.length === 0 && (
                      <div className="text-center py-8 text-sm text-slate-500 dark:text-slate-400">
                        Aucune activité récente. 
                        <Link to="/create-survey" className="font-medium hover:text-blue-600 dark:hover:text-blue-400 ml-1">
                          Créer votre première expertise
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardUser;
