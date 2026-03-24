import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDraftSurvey } from '../context/DraftSurveyContext';
import DraftSurveyLayout from '../layouts/DraftSurveyLayout';
import Loader from '../components/Loader';
import { getDraftSurveyById as getDraftSurvey } from '../services/draftSurveyServices';
import { Helmet } from 'react-helmet-async';

const EditDraftSurvey = () => {
  const { userId, surveyId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { 
    survey,
    updateInformations, 
    updateParticulars,
    updateInitial, 
    updateFinal,
    initial: surveyInitial,
    final: surveyFinal 
  } = useDraftSurvey();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!surveyId) {
      navigate('/draft-survey/infos');
      return;
    }

    const loadSurvey = async () => {
      if (!currentUser) {
        setError('Vous devez être connecté');
        setLoading(false);
        return;
      }

      try {
        const targetUserId = userId || currentUser.uid;
        const surveyData = await getDraftSurvey(targetUserId, surveyId);
        if (surveyData) {
          updateInformations(surveyData.informations || {});
          updateParticulars(surveyData.particulars || {});
          updateInitial(surveyData.initial || {});
          updateFinal(surveyData.final || {});
          Object.assign(survey, surveyData);
        } else {
          setError('Survey non trouvé');
          navigate(userId ? '/admin/dashboard' : '/dashboard');
        }
      } catch (err) {
        console.error('Load survey error:', err);
        setError('Erreur chargement survey: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSurvey();
  }, [surveyId, navigate, currentUser, updateInformations, updateParticulars, updateInitial, updateFinal]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{error}</h2>
          <button 
            onClick={() => navigate(userId ? '/admin/dashboard' : '/dashboard')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retour Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Éditer Draft Survey | OnHireApp</title>
      </Helmet>
      <DraftSurveyLayout surveyId={surveyId}>
        <div className="p-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border p-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                  {survey.informations.vesselName || 'Draft Survey'}
                </h1>
                <p className="text-slate-500 dark:text-slate-400">
                  Éditer {survey.informations.operationType === 'onhire' ? 'OnHire' : 'OffHire'} - ID: {surveyId}
                </p>
              </div>
            </div>



            <div className="flex gap-4">
              <button 
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                onClick={() => navigate(`/draft-survey/final/readings`)}
              >
                Continuer Finales
              </button>
              <button 
                className="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 py-3 px-6 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
                onClick={() => navigate(userId ? '/admin/dashboard' : '/dashboard')}
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </DraftSurveyLayout>
    </>
  );
};

export default EditDraftSurvey;

