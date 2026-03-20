import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Anchor, ChevronRight, Clock } from 'lucide-react';
import { useDraftSurvey } from '../context/DraftSurveyContext';
import { DraftReadings as DraftReadingsType } from '../types/draftSurvey';

interface Props {
    step: 'initial' | 'final';
}

interface InputProps {
    label: string;
    field: keyof DraftReadingsType;
    value: number;
    unit?: string;
    onChange: (field: keyof DraftReadingsType, value: string) => void;
}

const InputField = ({ label, field, value, unit = "m", onChange }: InputProps) => (
    <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</label>
        <div className="relative">
            <input 
                type="number"
                step="0.001"
                value={value}
                onChange={(e) => onChange(field, e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white transition-all font-mono"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold uppercase">{unit}</span>
        </div>
    </div>
);

const DraftReadings = ({ step }: Props) => {
    const { survey, updateInitial, updateFinal } = useDraftSurvey();
    const navigate = useNavigate();
    
    const currentData = step === 'initial' ? survey.initial : survey.final;
    const [localDrafts, setLocalDrafts] = useState(currentData.drafts);
    const [times, setTimes] = useState({
        commencedDate: currentData.commencedDate || '',
        commencedTime: currentData.commencedTime || '',
        completedDate: currentData.completedDate || '',
        completedTime: currentData.completedTime || ''
    });

    useEffect(() => {
        setLocalDrafts(currentData.drafts);
        setTimes({
            commencedDate: currentData.commencedDate || '',
            commencedTime: currentData.commencedTime || '',
            completedDate: currentData.completedDate || '',
            completedTime: currentData.completedTime || ''
        });
    }, [step]);

    const handleNext = () => {
        const payload = { 
            drafts: localDrafts,
            ...times
        };
        if (step === 'initial') {
            updateInitial(payload);
            navigate('/draft-survey/initial/calculations');
        } else {
            updateFinal(payload);
            navigate('/draft-survey/final/calculations');
        }
    };

    const updateDraftField = (field: keyof DraftReadingsType, value: string) => {
        const val = parseFloat(value) || 0;
        setLocalDrafts(prev => ({ ...prev, [field]: val }));
    };

    const updateTimeField = (field: string, value: string) => {
        setTimes(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Lectures des Tirants d'Eau ({step === 'initial' ? 'Initial' : 'Final'})
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1 italic">Saisir les tirants d'eau observés et les temps d'expertise.</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 shadow-xl space-y-10">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                        <p className="font-bold text-xs uppercase tracking-widest text-blue-600 flex items-center gap-2">
                            <Clock className="w-4 h-4" /> Commencé
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs text-slate-400">Date</label>
                                <input type="date" value={times.commencedDate} onChange={(e) => updateTimeField('commencedDate', e.target.value)} className="w-full p-2 rounded-lg border dark:bg-slate-700" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-slate-400">Heure</label>
                                <input type="time" value={times.commencedTime} onChange={(e) => updateTimeField('commencedTime', e.target.value)} className="w-full p-2 rounded-lg border dark:bg-slate-700" />
                            </div>
                        </div>
                    </div>
                    <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                        <p className="font-bold text-xs uppercase tracking-widest text-emerald-600 flex items-center gap-2">
                            <Clock className="w-4 h-4" /> Terminé
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs text-slate-400">Date</label>
                                <input type="date" value={times.completedDate} onChange={(e) => updateTimeField('completedDate', e.target.value)} className="w-full p-2 rounded-lg border dark:bg-slate-700" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-slate-400">Heure</label>
                                <input type="time" value={times.completedTime} onChange={(e) => updateTimeField('completedTime', e.target.value)} className="w-full p-2 rounded-lg border dark:bg-slate-700" />
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="dark:border-slate-700" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white border-b pb-2">
                            <Anchor className="w-5 h-5 text-blue-600" /> AVANT (FORE)
                        </h3>
                        <div className="space-y-4">
                            <InputField label="Port (m)" field="fwdPort" value={localDrafts.fwdPort} onChange={updateDraftField} />
                            <InputField label="Starboard (m)" field="fwdStbd" value={localDrafts.fwdStbd} onChange={updateDraftField} />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white border-b pb-2">
                            <Anchor className="w-5 h-5 text-amber-600" /> ARRIÈRE (AFT)
                        </h3>
                        <div className="space-y-4">
                            <InputField label="Port (m)" field="aftPort" value={localDrafts.aftPort} onChange={updateDraftField} />
                            <InputField label="Starboard (m)" field="aftStbd" value={localDrafts.aftStbd} onChange={updateDraftField} />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white border-b pb-2">
                            <Anchor className="w-5 h-5 text-emerald-600" /> MILIEU (MID)
                        </h3>
                        <div className="space-y-4">
                            <InputField label="Port (m)" field="midPort" value={localDrafts.midPort} onChange={updateDraftField} />
                            <InputField label="Starboard (m)" field="midStbd" value={localDrafts.midStbd} onChange={updateDraftField} />
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-700 flex justify-end">
                    <button 
                        onClick={handleNext}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold shadow-lg transition-all group"
                    >
                        Suivant: Corrections & MOM
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DraftReadings;
