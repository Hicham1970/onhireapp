import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BarChart } from 'lucide-react';
import { useDraftSurvey } from '../context/DraftSurveyContext';

const DraftSurveyDisplacement = () => {
    const { survey, updateInitial } = useDraftSurvey();
    const navigate = useNavigate();
    
    const [localHydro, setLocalHydro] = useState(survey.initial.hydrostatics);

    const handleNext = () => {
        updateInitial({ ...survey.initial, hydrostatics: localHydro });
        navigate('/draft-survey/final');
    };

    const updateField = (field: keyof typeof localHydro, value: string) => {
        setLocalHydro(prev => ({ ...prev, [field]: parseFloat(value) || 0 }));
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <button 
                        onClick={() => navigate('/draft-survey/initial')}
                        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Retour
                    </button>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Hydrostatiques (Initial)</h1>
                    <div className="w-20" />
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-xl">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-900 dark:text-white">
                        <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white">
                            <BarChart className="w-6 h-6" />
                        </div>
                        Données de la Table Hydrostatique
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="md:col-span-2 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl text-purple-800 dark:text-purple-200 text-sm">
                            Entrez les valeurs extraites de la table hydrostatique pour le tirant d'eau moyen des moyens (MOM) calculé.
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Déplacement (Table) (MT)</label>
                            <input 
                                type="number"
                                step="0.01"
                                value={localHydro.displacement}
                                onChange={(e) => updateField('displacement', e.target.value)}
                                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 dark:bg-slate-700 dark:text-white"
                                placeholder="Displacement from table"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">TPC (Tons Per Centimeter)</label>
                            <input 
                                type="number"
                                step="0.01"
                                value={localHydro.tpc}
                                onChange={(e) => updateField('tpc', e.target.value)}
                                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 dark:bg-slate-700 dark:text-white"
                                placeholder="ex: 45.23"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">MTC (Moment to Change Trim 1cm)</label>
                            <input 
                                type="number"
                                step="0.01"
                                value={localHydro.mtc}
                                onChange={(e) => updateField('mtc', e.target.value)}
                                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 dark:bg-slate-700 dark:text-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">LCF (Longitudinal Center of Flotation) (m)</label>
                            <input 
                                type="number"
                                step="0.001"
                                value={localHydro.lcf}
                                onChange={(e) => updateField('lcf', e.target.value)}
                                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 dark:bg-slate-700 dark:text-white"
                                placeholder="Distance from Midship or AP"
                            />
                        </div>

                        <div className="md:col-span-2 pt-10 flex justify-between border-t border-slate-100 dark:border-slate-700">
                             <button 
                                onClick={() => navigate('/draft-survey/initial')}
                                className="px-8 py-4 text-slate-600 font-bold hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all shadow-sm rounded-xl border"
                            >
                                Précédent
                            </button>
                            <button 
                                onClick={handleNext}
                                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all group"
                            >
                                Suivant: Valeurs Finales
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DraftSurveyDisplacement;
