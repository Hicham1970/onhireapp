import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDraftSurvey } from '../context/DraftSurveyContext';
import { saveDraftSurvey } from '../services/draftSurveyServices';
import DraftHydrostatics from './DraftHydrostatics';
import DraftCalculations from './DraftCalculations';
import DraftDeductibles from './DraftDeductibles';
import DraftReadings from './DraftReadings';
import { ChevronLeft, Save, Check, Loader2, Ship, Calculator, AlertCircle } from 'lucide-react';
import { DraftSurvey } from '../types/draftSurvey';

const steps = ['hydrostatics', 'calculations', 'deductibles', 'readings', 'final'];

const NewDraftSurveyAdmin = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { survey, resetSurvey } = useDraftSurvey();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const stepComponent = {
    hydrostatics: DraftHydrostatics,
    calculations: DraftCalculations,
    deductibles: DraftDeductibles,
    readings: DraftReadings,
  }[steps[currentStep]];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = async () => {
    if (!currentUser) return;
    setLoading(true);
    setError('');
    try {
      // Admin can choose userId or currentUser
      const adminSurvey: DraftSurvey = {
        ...survey,
        userId: currentUser.uid, // Default to admin or select user
        status: 'Draft'
      };
      const result = await saveDraftSurvey(adminSurvey.userId, adminSurvey);
      setSuccess(true);
      setTimeout(() => navigate('/admin/dashboard'), 2000);
    } catch (err: any) {
      setError(err.message || 'Erreur sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    resetSurvey();
  }, [resetSurvey]);

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center p-12 max-w-md mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-2xl">
          <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Draft Survey créé !</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">Redirection vers le dashboard...</p>
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/admin/dashboard')}
            className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Nouveau Draft Survey</h1>
            <p className="text-slate-600 dark:text-slate-400">Étape {currentStep + 1} sur {steps.length}</p>
          </div>
        </div>

        {/* Steps Progress */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 mb-8 border shadow-sm">
          <div className="flex items-center gap-4">
            {steps.map((step, index) => (
              <div key={step} className="flex-1 flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  index <= currentStep 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1 h-1 bg-slate-200 dark:bg-slate-700">
                  <div className={`h-1 rounded-full transition-all ${
                    index < currentStep ? 'bg-blue-600' : 'bg-transparent'
                  }`} style={{ width: '100%' }} />
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-5 gap-4 mt-4 text-sm">
            {steps.map((step, index) => (
              <span key={step} className={`font-medium text-center capitalize ${
                index === currentStep 
                  ? 'text-blue-600 font-bold' 
                  : 'text-slate-500 dark:text-slate-400'
              }`}>
                {step.replace('draft', '').replace(/^\w/, c => c.toUpperCase())}
              </span>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border shadow-sm p-8 mb-8 min-h-[500px]">
          <stepComponent />
        </div>

        {/* Navigation & Save */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 transition-colors font-medium"
            >
              <ChevronLeft className="w-5 h-5" />
              Précédent
            </button>
            <button 
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 shadow-lg hover:shadow-xl transition-all font-medium"
            >
              Suivant
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <button 
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 shadow-lg hover:shadow-xl transition-all font-bold text-lg"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Ship className="w-5 h-5" />}
            {loading ? 'Sauvegarde...' : 'Sauvegarder Draft'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-red-800 dark:text-red-300 mb-1">Erreur</p>
                <p className="text-red-700 dark:text-red-200">{error}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewDraftSurveyAdmin;

