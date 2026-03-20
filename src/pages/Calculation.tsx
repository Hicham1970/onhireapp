import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calculator, RefreshCw } from 'lucide-react';
import { useDraftSurvey } from '../context/DraftSurveyContext';
import { calculateMOM, sumDeductibles, calculateDraftCorrections } from '../utils/draftSurveyUtils';

const DraftSurveyCalculation = () => {
    const { survey } = useDraftSurvey();
    const navigate = useNavigate();
    
    // Simplification for demo: using initial survey data
    const { drafts, deductibles, density } = survey.initial;
    const { lbp, fwdDraftMarkDist, aftDraftMarkDist, midDraftMarkDist } = survey.particulars;

    // Calculations
    const meanFwd = (drafts.fwdPort + drafts.fwdStbd) / 2;
    const meanAft = (drafts.aftPort + drafts.aftStbd) / 2;
    const meanMid = (drafts.midPort + drafts.midStbd) / 2;

    const apparentTrim = meanAft - meanFwd;
    const corrections = calculateDraftCorrections(apparentTrim, lbp, fwdDraftMarkDist, aftDraftMarkDist, midDraftMarkDist);
    
    const correctedFwd = meanFwd + corrections.fwdCorr;
    const correctedAft = meanAft + corrections.aftCorr;
    const correctedMid = meanMid + corrections.midCorr;
    
    const trueTrim = correctedAft - correctedFwd;
    const mom = calculateMOM(correctedFwd, correctedAft, correctedMid);
    const totalDeductibles = sumDeductibles(deductibles);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="bg-gradient-to-r from-green-600 to-teal-600 p-8 text-white relative">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-black mb-2">Calcul des Résultats</h1>
                                <p className="text-green-100 opacity-90">Synthèse et calcul du déplacement net</p>
                            </div>
                            <Calculator className="w-16 h-16 opacity-20 absolute top-4 right-4" />
                        </div>
                    </div>

                    <div className="p-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             {/* Drafts Section */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <RefreshCw className="w-5 h-5 text-blue-500" />
                                    Tirants d'eau Moyens
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                        <span className="text-slate-600 dark:text-slate-400">AV (Fwd) Moyen:</span>
                                        <span className="font-bold text-slate-900 dark:text-white">{meanFwd.toFixed(3)} m</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                        <span className="text-slate-600 dark:text-slate-400">AR (Aft) Moyen:</span>
                                        <span className="font-bold text-slate-900 dark:text-white">{meanAft.toFixed(3)} m</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                        <span className="text-slate-600 dark:text-slate-400">Milieu (Mid) Moyen:</span>
                                        <span className="font-bold text-slate-900 dark:text-white">{meanMid.toFixed(3)} m</span>
                                    </div>
                                </div>
                            </div>

                            {/* Corrections Section */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <Calculator className="w-5 h-5 text-amber-500" />
                                    Résultats des Calculs
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                        <span className="text-blue-700 dark:text-blue-300 font-semibold">Moyenne des Moyennes (MOM):</span>
                                        <span className="font-black text-blue-900 dark:text-blue-100">{mom.toFixed(3)} m</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                        <span className="text-slate-600 dark:text-slate-400">Trim Apparent:</span>
                                        <span className="font-bold text-slate-900 dark:text-white">{apparentTrim.toFixed(3)} m</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                                        <span className="text-amber-700 dark:text-amber-300">Total Déductibles:</span>
                                        <span className="font-bold text-amber-900 dark:text-amber-100">{totalDeductibles.toFixed(2)} MT</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-600 rounded-2xl p-6 text-white text-center">
                            <p className="text-blue-100 text-sm mb-1">PROCHAINE ÉTAPE: Entrée du déplacement (Hydrostatiques)</p>
                            <h2 className="text-2xl font-bold">Trim de MOM: {trueTrim.toFixed(3)} m</h2>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between pb-20">
                    <button 
                        onClick={() => navigate('/draft-survey/initial')}
                        className="flex items-center gap-2 text-slate-600 font-bold hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Retour: Valeurs Initiales
                    </button>
                    <button 
                        onClick={() => navigate('/draft-survey/report')}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all group"
                    >
                        Générer le Rapport
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DraftSurveyCalculation;