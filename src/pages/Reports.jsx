import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getFullReports, deleteFullReport } from '../api/api';
import { ChevronRight, Edit3, Trash2, Plus, FileText, Loader2, Ship, Camera } from 'lucide-react';
import FullReport from '../components/reports/FullReport';
import { useSearchParams } from 'react-router-dom';

const Reports = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'reports');
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (currentUser) {
      loadReports();
    }
  }, [currentUser?.uid]);

  const loadReports = useCallback(async () => {
    if (!currentUser?.uid) return;
    try {
      const userReports = await getFullReports(currentUser.uid);
      setReports(userReports || []);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.uid]);

  const handleDeleteReport = async (reportId) => {
    if (!confirm('Supprimer ce rapport?')) return;
    
    setDeletingId(reportId);
    try {
      await deleteFullReport(currentUser.uid, reportId);
      setReports(reports.filter(r => r.id !== reportId));
      alert('Rapport supprimé !');
    } catch (error) {
      alert('Erreur: ' + error.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleEditReport = (reportId) => {
    navigate(`/edit-report/${reportId}`);
  };

  if (!currentUser) {
    return <div>Veuillez vous connecter</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Rapports d'Inspection</h1>
          <p className="text-slate-600 dark:text-slate-400">Gestion des rapports complets</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 mb-6 shadow-sm border">
          <button 
            onClick={() => {
              setActiveTab('reports');
              setSearchParams({});
            }}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${activeTab === 'reports' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
          >
            <FileText className="w-5 h-5 inline mr-2" />
            Mes Rapports ({reports.length})
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
        </div>

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Mes Rapports</h2>
              <button 
                onClick={() => navigate('/onhire?tab=pictures')}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 shadow-lg transition-all"
              >
                <Plus className="w-5 h-5" />
                Nouveau Rapport
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-slate-400 mr-3" />
                Chargement rapports...
              </div>
            ) : reports.length === 0 ? (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Aucun rapport. Créez-en un nouveau !</p>
              </div>
            ) : (
              <div className="space-y-3">
                {reports.map(report => (
                  <div key={report.id} className="bg-white dark:bg-slate-800 p-6 rounded-xl border shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center">
                          <FileText className="w-8 h-8 text-purple-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-xl text-slate-900 dark:text-white truncate">{report.vesselName}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Créé le {report.createdAt ? new Date(report.createdAt).toLocaleDateString('fr-FR') : 'N/A'}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Statut: <span className="font-medium">{report.status || 'Draft'}</span>
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEditReport(report.id)}
                          className="p-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl transition-colors shadow-sm hover:shadow-md"
                          title="Editer"
                        >
                          <Edit3 className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteReport(report.id)}
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
      </div>
    </div>
  );
};

export default Reports;

