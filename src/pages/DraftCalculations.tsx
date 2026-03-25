import React, { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Calculator, List } from 'lucide-react';
import { useDraftSurvey } from '../context/DraftSurveyContext';
import { 
    calculateSGSCorrectedDrafts, 
    calculateSGSMiddleMeans,
    calculateTrim
} from '../utils/draftSurveyUtils';

interface Props {
    step: 'initial' | 'final';
}

const StatusCard = ({ label, value, unit, color }: { label: string, value: number, unit: string, color: string }) => (
    <div className={`p-6 rounded-2xl border ${color} bg-white dark:bg-slate-800 shadow-sm`}>
        <p className="text-xs font-bold text-slate-400 uppercase mb-1 tracking-widest">{label}</p>
        <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono">{value.toFixed(3)}</span>
            <span className="text-xs font-bold opacity-60 uppercase">{unit}</span>
        </div>
    </div>
);

const TableRow = ({ label, value, unit, bold = false }: { label: string, value: number | string, unit: string, bold?: boolean }) => (
    <div className={`flex justify-between py-2 border-b border-slate-50 dark:border-slate-700/50 ${bold ? 'font-bold text-blue-600' : 'text-slate-600 dark:text-slate-400'}`}>
        <span className="text-sm">{label}</span>
        <span className="font-mono">{typeof value === 'number' ? value.toFixed(3) : value} {unit}</span>
    </div>
);

const DraftCalculations = ({ step }: Props) => {
    const { survey, updateInitial, updateFinal } = useDraftSurvey();
    const navigate = useNavigate();
    
    const currentData = step === 'initial' ? survey.initial : survey.final;
    const { drafts } = currentData;
    const { particulars } = survey;

    const corrected = useMemo(() => {
        console.log(`[CALC ${step}] Calling SGS corrections`, { drafts, particulars });
        const result = calculateSGSCorrectedDrafts(drafts, particulars);
        console.log(`[CALC ${step}] SGS result:`, result);
        return result;
    }, [drafts, particulars, step]);

    const means = useMemo(() => {
        console.log(`[CALC ${step}] SGS Middle Means input:`, { fwd: corrected.fwd.corrected, mid: corrected.mid.corrected, aft: corrected.aft.corrected });
        const result = calculateSGSMiddleMeans(corrected.fwd.corrected, corrected.mid.corrected, corrected.aft.corrected, survey.particulars.keelThickness || 0);
        console.log(`[CALC ${step}] Middle Means result:`, result);
        return result;
    }, [corrected, step]);

    const trim = useMemo(() => {
        // We use the corrected trim for the status card
        return corrected.aft.corrected - corrected.fwd.corrected;
    }, [corrected]);

    const handleNext = () => {
        const updates = { 
            meanDraft: (corrected.fwd.corrected + corrected.aft.corrected) / 2,
            mom: means.meanOfMean,
            quarterMean: means.quarterMean,
            trim: trim,
        };
        if (step === 'initial') {
            updateInitial(updates);
            navigate('/draft-survey/initial/displacement');
        } else {
            updateFinal(updates);
            navigate('/draft-survey/final/displacement');
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Calculs de Tirant d'Eau ({step === 'initial' ? 'Initial' : 'Final'})
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1 italic">Validation des corrections de stern (LBM: {corrected.lbm.toFixed(2)}m) et du Quarter Mean.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatusCard label="Quarter Mean" value={means.quarterMean} unit="m" color="border-blue-200 dark:border-blue-800 text-blue-600" />
                <StatusCard label="LBM" value={corrected.lbm} unit="m" color="border-emerald-200 dark:border-emerald-800 text-emerald-600" />
                <StatusCard label="Trim Apparent" value={corrected.apparentTrim} unit="m" color="border-slate-200 dark:border-slate-800 text-slate-400" />
                <StatusCard label="True Trim" value={trim} unit="m" color="border-amber-200 dark:border-amber-800 text-amber-600" />
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 shadow-xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-6">
                         <h3 className="font-bold flex items-center gap-2 text-slate-900 dark:text-white uppercase text-xs tracking-widest text-slate-400">
                            <List className="w-4 h-4" /> Détail des Corrections Automatiques
                        </h3>
                        <div className="space-y-8">
                            <div>
                                <p className="text-xs font-bold text-blue-500 mb-2 font-mono uppercase tracking-widest flex justify-between">
                                    <span>FORE (AVANT)</span>
                                    <span className="text-[10px] opacity-70">Dist: {particulars.fwdDraftMarkDist}m</span>
                                </p>
                                <TableRow label="Draft Moyenne" value={corrected.fwd.mean} unit="m" />
                                <TableRow label="Stern Correction (Auto)" value={corrected.fwd.autoCorr} unit="m" />
                                <TableRow label="Corrected Fore" value={corrected.fwd.corrected} unit="m" bold />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-amber-500 mb-2 font-mono uppercase tracking-widest flex justify-between">
                                    <span>AFT (ARRIÈRE)</span>
                                    <span className="text-[10px] opacity-70">Dist: {particulars.aftDraftMarkDist}m</span>
                                </p>
                                <TableRow label="Draft Moyenne" value={corrected.aft.mean} unit="m" />
                                <TableRow label="Stern Correction (Auto)" value={corrected.aft.autoCorr} unit="m" />
                                <TableRow label="Corrected Aft" value={corrected.aft.corrected} unit="m" bold />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-emerald-500 mb-2 font-mono uppercase tracking-widest flex justify-between">
                                    <span>MID (MILIEU)</span>
                                    <span className="text-[10px] opacity-70">Dist: {particulars.midDraftMarkDist}m</span>
                                </p>
                                <TableRow label="Draft Moyenne" value={corrected.mid.mean} unit="m" />
                                <TableRow label="Mid Correction (Auto)" value={corrected.mid.autoCorr} unit="m" />
                                <TableRow label="Corrected Mid" value={corrected.mid.corrected} unit="m" bold />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="font-bold flex items-center gap-2 text-slate-900 dark:text-white uppercase text-xs tracking-widest text-slate-400">
                            <Calculator className="w-4 h-4" /> Moyennes Successives
                        </h3>
                        <div className="p-8 bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border border-slate-200 dark:border-slate-700 space-y-6">
                            <div className="space-y-1">
                                <p className="text-xs text-slate-500 font-bold uppercase">Mean Fore/Aft</p>
                                <p className="text-3xl font-black font-mono text-slate-900 dark:text-white">{means.meanForeAft.toFixed(3)} <span className="text-sm font-normal opacity-50">m</span></p>
                                <p className="text-[10px] text-slate-400 italic">Formule: (Fore + Aft) / 2</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-slate-500 font-bold uppercase">Mean of Mean</p>
                                <p className="text-3xl font-black font-mono text-slate-900 dark:text-white">{means.meanOfMean.toFixed(3)} <span className="text-sm font-normal opacity-50">m</span></p>
                                <p className="text-[10px] text-slate-400 italic">Formule: (Mean F/A + Mid) / 2</p>
                            </div>
                            <div className="space-y-1 pt-4 border-t border-slate-200 dark:border-slate-700">
                                <p className="text-xs text-blue-600 font-bold uppercase">Quarter Mean (Tirant d'eau final)</p>
                                <p className="text-4xl font-black font-mono text-blue-600">{means.quarterMean.toFixed(3)} <span className="text-sm font-normal opacity-50">m</span></p>
                                <p className="text-[10px] text-slate-400 italic">Formule: (Fore + 6*Mid + Aft) / 8</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="mt-12 flex justify-end pt-8 border-t border-slate-100 dark:border-slate-700">
                    <button 
                        onClick={handleNext}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold shadow-lg transition-all group"
                    >
                        Suivant: Hydrostatiques
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DraftCalculations;
