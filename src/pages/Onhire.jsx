import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getSurveys, deleteSurvey, getFullReports, deleteFullReport, getAllReports } from '../api/api';
import { ChevronRight, Edit3, Trash2, Plus, Ship, FileText, Loader2, Camera } from 'lucide-react';
import FullReport from '../components/reports/FullReport';
import { useSearchParams } from 'react-router-dom';

const Onhire = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'surveys');
  const [surveys, setSurveys] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingReports, setLoadingReports] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (currentUser) {
      loadSurveys();
    }
  }, [currentUser?.uid]);

  const loadSurveys = useCallback(async () => {
    if (!currentUser?.uid) return;
    try {
      const userSurveys = isAdmin() ? await getAllSurveys() : await getSurveys(currentUser.uid);
      setSurveys(userSurveys || []);
    } catch (error) {
      console.error('Error loading surveys:', error);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.uid, isAdmin]);

  const loadReports = useCallback(async () => {
    if (!currentUser?.uid) return;
    setLoadingReports(true);
    try {
      const userReports = isAdmin() ? await getAllReports() : await getFullReports(currentUser.uid);
      setReports(userReports || []);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setLoadingReports(false);
    }
  }, [currentUser?.uid, isAdmin]);

  useEffect(() => {
    if (activeTab === 'reports') {
      loadReports();
    }
  }, [activeTab, loadReports]);

  const handleDeleteSurvey = async (surveyId, ownerId) => {
    if (!confirm('Supprimer ce survey?')) return;
    
    setDeletingId(surveyId);
    try {
      await deleteSurvey(ownerId || currentUser.uid, surveyId);
      setSurveys(surveys.filter(s => s.id !== surveyId));
      alert('Survey supprimé !');
    } catch (error) {
      alert('Erreur: ' + error.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleEditSurvey = (surveyId, ownerId) => {
    if (isAdmin() && ownerId) {
      navigate(`/admin/edit-survey/${ownerId}/${surveyId}`);
    } else {
      navigate(`/edit-survey/${surveyId}`);
    }
  };

  const handleDeleteReport = async (reportId, userId) => {
    if (!confirm('Supprimer ce rapport ?')) return;
    try {
      await deleteFullReport(userId || currentUser.uid, reportId);
      setReports(reports.filter(r => r.id !== reportId));
    } catch (error) {
      alert('Erreur: ' + error.message);
    }
  };

  if (!currentUser) {
    return <div>Veuillez vous connecter</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Onhire App</h1>
          <p className="text-slate-600 dark:text-slate-400">Gestion surveys et rapports</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 mb-6 shadow-sm border">
          <button 
            onClick={() => {
              setActiveTab('surveys');
              setSearchParams({});
            }}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${activeTab === 'surveys' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
          >
            <Ship className="w-5 h-5 inline mr-2" />
            Mes Surveys ({surveys.length})
          </button>
          <button 
            onClick={() => {
              setActiveTab('pictures');
              setSearchParams({ tab: 'pictures' });
            }}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${activeTab === 'pictures' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
          >
            <Camera className="w-5 h-5 inline mr-2" />
            Inspection Photos
          </button>
          <button 
            onClick={() => {
              setActiveTab('reports');
              setSearchParams({ tab: 'reports' });
            }}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${activeTab === 'reports' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
          >
            <FileText className="w-5 h-5 inline mr-2" />
            Rapports ({reports.length || 0})
          </button>
        </div>

        {/* Surveys Tab */}
        {activeTab === 'surveys' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Mes Surveys</h2>
              <button 
                onClick={() => navigate('/create-survey')}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 shadow-lg transition-all"
              >
                <Plus className="w-5 h-5" />
                Nouveau Survey
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-slate-400 mr-3" />
                Chargement surveys...
              </div>
            ) : surveys.length === 0 ? (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <Ship className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Aucun survey. Créez-en un nouveau !</p>
              </div>
            ) : (
              <div className="space-y-3">
                {surveys.map(survey => (
                  <div key={survey.id} className="bg-white dark:bg-slate-800 p-6 rounded-xl border shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-xl flex items-center justify-center">
                          <Ship className="w-8 h-8 text-emerald-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-xl text-slate-900 dark:text-white truncate">{survey.name}</h3>
                          {survey.userId && isAdmin() && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full dark:bg-blue-900/50 dark:text-blue-300">
                              {survey.userId.slice(0,8)}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">IMO: {survey.imo}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{survey.date}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          HFO: <span className="font-mono">{survey.finalHFO || 0}</span> MT | MGO: <span className="font-mono">{survey.finalMGO || 0}</span> MT
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEditSurvey(survey.id, survey.userId)}
                          className="p-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl transition-colors shadow-sm hover:shadow-md"
                          title="Editer"
                        >
                          <Edit3 className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteSurvey(survey.id, survey.userId)}
                          className="p-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl transition-colors shadow-sm hover:shadow-md"
                          title="Supprimer"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Pictures Tab */}
        {activeTab === 'pictures' && (
          <div>
            <FullReport />
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Mes Rapports</h2>
              <button 
                onClick={() => {
                  setActiveTab('pictures');
                  setSearchParams({ tab: 'pictures' });
                }}
                className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 shadow-lg transition-all"
              >
                <Plus className="w-5 h-5" />
                Nouveau Rapport
              </button>
            </div>

            {loadingReports ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-slate-400 mr-3" />
                Chargement rapports...
              </div>
            ) : reports.length === 0 ? (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Aucun rapport trouvé. Créez-en un nouveau !</p>
              </div>
            ) : (
              <div className="space-y-3">
                {reports.map((report) => (
                  <div key={report.id} className="bg-white dark:bg-slate-800 p-6 rounded-xl border shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center">
                          <FileText className="w-8 h-8 text-purple-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-xl text-slate-900 dark:text-white truncate">
                            {report.vesselName || 'Rapport sans nom'}
                          </h3>
                          {report.userId && isAdmin() && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full dark:bg-blue-900/50 dark:text-blue-300">
                              {report.userId.slice(0,8)}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">IMO: {report.vesselImo || 'N/A'}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {report.createdAt ? new Date(report.createdAt).toLocaleDateString('fr-FR') : 'Date N/A'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            // If Admin, use admin edit route, otherwise if we have user edit route use that
                            if (isAdmin()) {
                              navigate(`/admin/edit-report/${report.userId}/${report.id}`);
                            } else {
                              // If a user route doesn't exist, this might just open the current logic or do nothing
                              alert("Fonctionnalité d'édition réservée à l'administrateur ou route manquante.");
                            }
                          }}
                          className="p-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl transition-colors shadow-sm hover:shadow-md"
                          title="Editer"
                        >
                          <Edit3 className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteReport(report.id, report.userId)}
                          className="p-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl transition-colors shadow-sm hover:shadow-md"
                          title="Supprimer"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Onhire;

