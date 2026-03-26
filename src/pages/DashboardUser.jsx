import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../hooks/Hooks";
import Profile from "../components/Profile";
import { Calculator, Ship, ClipboardCheck, Gauge, Camera, FileText, BarChart3, ArrowRight, Loader2, Clock, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { getSurveys, getFullReports, getVessels } from "../api/api";
import { getDraftSurveys, deleteDraftSurvey } from "../services/draftSurveyServices";

function DashboardUser() {
  const { user } = useUser() || {};
  const { currentUser, loading, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [surveys, setSurveys] = useState([]);
  const [draftSurveys, setDraftSurveys] = useState([]);
  const [reports, setReports] = useState([]);
  const [vessels, setVessels] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(null);



  const fetchData = async () => {
    if (!currentUser?.uid) return;
    
    setLoadingData(true);
    setError(null);
    
    try {
      const [userSurveys, draftSurveys, userReports, userVessels] = await Promise.all([
        getSurveys(currentUser.uid),
        getDraftSurveys(currentUser.uid),
        getFullReports(currentUser.uid),
        getVessels(currentUser.uid)
      ]);
      
      setSurveys(userSurveys || []);
      setDraftSurveys(draftSurveys || []);
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
        const [userSurveys, draftSurveys, userReports, userVessels] = await Promise.all([
          getSurveys(currentUser.uid),
          getDraftSurveys(currentUser.uid),
          getFullReports(currentUser.uid),
          getVessels(currentUser.uid)
        ]);
        
        setSurveys(userSurveys || []);
        setDraftSurveys(draftSurveys || []);
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
        <title>Dashboard | Manage Surveys | MarineSurveyorDev</title>
        <meta name="description" content="User dashboard: manage draft surveys, on-hire/off-hire reports, vessel inspections, analytics. Secure maritime data platform." />
        <meta name="keywords" content="survey dashboard, draft survey, vessel reports, maritime dashboard" />
        <meta property="og:title" content="Dashboard | Manage Surveys | MarineSurveyorDev" />
        <meta property="og:description" content="Manage your maritime surveys and reports" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Bienvenue, {user?.username || (currentUser ? currentUser.displayName : "") || "Utilisateur"}
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              Manage your maritime surveys and access all your tools
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
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">{draftSurveys.length}</p>
                      <p className="text-xs text-slate-500">Draft Surveys</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                    <ClipboardCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{surveys.length + draftSurveys.length}</p>
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
                      <p className="text-xs text-slate-500">Reports</p>
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
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Quick Actions</h2>
              
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
                      On/OffHire App
                    </h3>
                    <p className="text-sm text-slate-500">Create Bunker Survey</p>
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
                    <p className="text-sm text-slate-500">Create a Photo report</p>
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
                    <p className="text-sm text-slate-500">New Operation</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" />
                </Link>
                <Link
                  to="/petrocal"
                  className="flex items-center gap-4 p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                    <Calculator className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-cyan-600 transition-colors">
                      Petrocal
                    </h3>
                    <p className="text-sm text-slate-500">Oil & Gas Unit Converter</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" />
                </Link>
                <Link
to="/reports"
                  className="flex items-center gap-4 p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                    <BarChart3 className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
                      Analytics
                    </h3>
                    <p className="text-sm text-slate-500">All Statistics</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
                </Link>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white text-lg">Recent Activity</h3>
                  <button
                    onClick={fetchData}
                    disabled={loadingData}
                    className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors p-1 -m-1 rounded"
                  >
                    <RefreshCw className={`w-3 h-3 ${loadingData ? 'animate-spin' : ''}`} />
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
                <div className="space-y-4 max-h-80 overflow-y-auto">
                    {[...draftSurveys, ...surveys, ...reports].slice(0, 8).map((item) => {
                      const handleDelete = item.id && item.__typename !== 'Report' ? async () => {
                        if (!window.confirm('Supprimer cet élément?')) return;
                        try {
                          if (item.informations) {
                            await deleteDraftSurvey(currentUser.uid, item.id);
                            setDraftSurveys(prev => prev.filter(s => s.id !== item.id));
                          }
                        } catch (err) {
                          alert('Erreur suppression: ' + err.message);
                        }
                      } : null;
                      return (
                        <div key={item.id} className="flex items-center justify-between gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-900/50 rounded-lg group transition-all -mx-3 px-3">
                          <Link
                            to={item.informations ? `/draft-survey/edit/${item.id}` : `/reports?id=${item.id}`}
                            className="flex items-center gap-3 flex-1"
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full group-hover:scale-110 transition-transform"></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-900 dark:text-white truncate group-hover:text-blue-600">
                                {item.vesselName || item.informations?.vesselName || item.shipName || 'Activité'}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                {item.informations ? 'Draft Survey' : item.vesselName ? 'Rapport' : 'Survey'}
                              </p>
                            </div>
                            <div className="text-xs text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {item.updatedAt || item.createdAt ? new Date(item.updatedAt || item.createdAt).toLocaleDateString('fr-FR', { 
                                day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' 
                              }) : 'Récemment'}
                            </div>
                          </Link>
                          {handleDelete && (
                            <button
                              onClick={handleDelete}
                              className="p-1.5 text-red-500 hover:bg-red-100 hover:text-red-700 rounded transition-all ml-2"
                              title="Supprimer"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      );
                    })}
                    {[...draftSurveys, ...surveys, ...reports].length === 0 && (
                      <div className="text-center py-8 text-sm text-slate-500 dark:text-slate-400">
                        No recente activity. 
                        <Link to="/create-survey" className="font-medium hover:text-blue-600 dark:hover:text-blue-400 ml-1">
                          Create a new inspection
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
