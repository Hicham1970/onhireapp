import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FullReport from '../components/reports/FullReport';
import { ChevronLeft } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { getFullReports } from '../api/api';

const EditReport = () => {
  const { currentUser, userData } = useAuth();
  const isAdmin = userData?.role === 'admin';
  const { userId } = useParams();
  const { reportId } = useParams();
  const navigate = useNavigate();

  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadReport();
  }, [userId, reportId]);

  const loadReport = async () => {
    try {
      setLoading(true);
      const uidToUse = isAdmin ? userId : currentUser.uid;
      const reports = await getFullReports(uidToUse);
      const foundReport = reports.find(r => r.id === reportId);
      if (foundReport) {
        setReportData(foundReport);
      } else {
        setError('Report not found');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mr-3" />
        <span>Chargement rapport...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8">
          <div className="text-red-600 mb-4">Erreur</div>
          <p>{error}</p>
          <button onClick={() => navigate('/admin/dashboard')} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
            Retour Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 p-6 border-b border-slate-200">
          <button 
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100"
          >
            <ChevronLeft className="w-5 h-5" />
            Admin Dashboard
          </button>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {reportData.vesselName || 'Rapport'} - Edition
          </h1>
        </div>
        <FullReport 
          initialData={reportData}
          onSaved={() => navigate('/admin/dashboard')}
          onCancel={() => navigate('/admin/dashboard')}
        />
      </div>
    </div>
  );
};

export default EditReport;

