import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Anchor, Fuel } from 'lucide-react';
import { useDraftSurvey } from '../context/DraftSurveyContext';

const DraftSurveyValeursInitial = () => {
    const { survey, updateInitial } = useDraftSurvey();
    const navigate = useNavigate();
    
    const [localData, setLocalData] = useState(survey.initial);

    const handleNext = () => {
        updateInitial(localData);
        navigate('/draft-survey/displacement');
    };

    const updateDraft = (field: keyof typeof localData.drafts, value: string) => {
        setLocalData(prev => ({
            ...prev,
            drafts: { ...prev.drafts, [field]: parseFloat(value) || 0 }
        }));
    };

    const updateDeductible = (field: keyof typeof localData.deductibles, value: string) => {
        setLocalData(prev => ({
            ...prev,
            deductibles: { ...prev.deductibles, [field]: parseFloat(value) || 0 }
        }));
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <button 
                        onClick={() => navigate('/draft-survey/caracteristiques')}
                        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Retour
                    </button>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Valeurs Initiales</h1>
                    <div className="w-20" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Draft Readings */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-xl">
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-900 dark:text-white">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                                <Anchor className="w-6 h-6" />
                            </div>
                            Lectures de Tirants d'eau
                        </h2>

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 font-bold text-slate-500 text-sm uppercase tracking-wider">Avant (Forward)</div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-500">Babord (Port)</label>
                                    <input type="number" step="0.001" value={localData.drafts.fwdPort} onChange={(e) => updateDraft('fwdPort', e.target.value)} className="w-full px-4 py-2 border rounded-xl dark:bg-slate-700 dark:text-white" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-500">Tribord (Stbd)</label>
                                    <input type="number" step="0.001" value={localData.drafts.fwdStbd} onChange={(e) => updateDraft('fwdStbd', e.target.value)} className="w-full px-4 py-2 border rounded-xl dark:bg-slate-700 dark:text-white" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 font-bold text-slate-500 text-sm uppercase tracking-wider">Milieu (Midship)</div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-500">Babord (Port)</label>
                                    <input type="number" step="0.001" value={localData.drafts.midPort} onChange={(e) => updateDraft('midPort', e.target.value)} className="w-full px-4 py-2 border rounded-xl dark:bg-slate-700 dark:text-white" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-500">Tribord (Stbd)</label>
                                    <input type="number" step="0.001" value={localData.drafts.midStbd} onChange={(e) => updateDraft('midStbd', e.target.value)} className="w-full px-4 py-2 border rounded-xl dark:bg-slate-700 dark:text-white" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 font-bold text-slate-500 text-sm uppercase tracking-wider">Arrière (Aft)</div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-500">Babord (Port)</label>
                                    <input type="number" step="0.001" value={localData.drafts.aftPort} onChange={(e) => updateDraft('aftPort', e.target.value)} className="w-full px-4 py-2 border rounded-xl dark:bg-slate-700 dark:text-white" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-500">Tribord (Stbd)</label>
                                    <input type="number" step="0.001" value={localData.drafts.aftStbd} onChange={(e) => updateDraft('aftStbd', e.target.value)} className="w-full px-4 py-2 border rounded-xl dark:bg-slate-700 dark:text-white" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Deductibles */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-xl">
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-900 dark:text-white">
                            <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center text-white">
                                <Fuel className="w-6 h-6" />
                            </div>
                            Poids Déductibles (MT)
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Fuel Oil (HFO)</label>
                                <input type="number" step="0.1" value={localData.deductibles.fuelOil} onChange={(e) => updateDeductible('fuelOil', e.target.value)} className="w-full px-4 py-2 border rounded-xl dark:bg-slate-700 dark:text-white" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Diesel Oil (MGO)</label>
                                <input type="number" step="0.1" value={localData.deductibles.dieselOil} onChange={(e) => updateDeductible('dieselOil', e.target.value)} className="w-full px-4 py-2 border rounded-xl dark:bg-slate-700 dark:text-white" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Lube Oil</label>
                                <input type="number" step="0.1" value={localData.deductibles.lubeOil} onChange={(e) => updateDeductible('lubeOil', e.target.value)} className="w-full px-4 py-2 border rounded-xl dark:bg-slate-700 dark:text-white" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Eau Douce (FW)</label>
                                <input type="number" step="0.1" value={localData.deductibles.freshWater} onChange={(e) => updateDeductible('freshWater', e.target.value)} className="w-full px-4 py-2 border rounded-xl dark:bg-slate-700 dark:text-white" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Ballast</label>
                                <input type="number" step="0.1" value={localData.deductibles.ballastWater} onChange={(e) => updateDeductible('ballastWater', e.target.value)} className="w-full px-4 py-2 border rounded-xl dark:bg-slate-700 dark:text-white" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Autres (Slops, etc.)</label>
                                <input type="number" step="0.1" value={localData.deductibles.others} onChange={(e) => updateDeductible('others', e.target.value)} className="w-full px-4 py-2 border rounded-xl dark:bg-slate-700 dark:text-white" />
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-700">
                             <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Densité de l'eau (Dock Water Density)</label>
                                <input 
                                    type="number"
                                    step="0.0001"
                                    value={localData.density}
                                    onChange={(e) => setLocalData(prev => ({ ...prev, density: parseFloat(e.target.value) || 1.025 }))}
                                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white font-mono"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 flex justify-between">
                    <button 
                        onClick={() => navigate('/draft-survey/caracteristiques')}
                        className="px-8 py-4 text-slate-600 font-bold hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all shadow-sm rounded-xl border bg-white dark:bg-slate-800"
                    >
                        Précédent
                    </button>
                    <button 
                        onClick={handleNext}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all group"
                    >
                        Suivant: Déplacement
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DraftSurveyValeursInitial;