import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplets, ChevronRight, Calculator } from 'lucide-react';
import { useDraftSurvey } from '../context/DraftSurveyContext';
import { Deductibles } from '../types/draftSurvey';
import { sumDeductibles } from '../utils/draftSurveyUtils';

interface Props {
    step: 'initial' | 'final';
}

interface InputProps {
    label: string;
    field: keyof Deductibles;
    value: number;
    onChange: (field: keyof Deductibles, value: string) => void;
}

const InputField = ({ label, field, value, onChange }: InputProps) => (
    <div className="space-y-1">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</label>
        <div className="relative">
            <input 
                type="number"
                step="0.01"
                value={value}
                onChange={(e) => onChange(field, e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white transition-all font-mono"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] font-bold">MT</span>
        </div>
    </div>
);

const DraftDeductibles = ({ step }: Props) => {
    const { survey, updateInitial, updateFinal } = useDraftSurvey();
    const navigate = useNavigate();
    
    const currentData = step === 'initial' ? survey.initial : survey.final;
    const [localDeducts, setLocalDeducts] = useState(currentData.deductibles);

    useEffect(() => {
        setLocalDeducts(currentData.deductibles);
    }, [step]);

    const handleNext = () => {
        if (step === 'initial') {
            updateInitial({ deductibles: localDeducts });
            navigate('/draft-survey/final/readings');
        } else {
            updateFinal({ deductibles: localDeducts });
            navigate('/draft-survey/report');
        }
    };

    const updateField = (field: keyof Deductibles, value: string) => {
        const val = parseFloat(value) || 0;
        setLocalDeducts(prev => ({ ...prev, [field]: val }));
    };

    const total = sumDeductibles(localDeducts);
    console.log(`[DEDUCT ${step}] Total deductibles:`, total, localDeducts);
    console.log(`[DEDUCT ${step}] Context data:`, currentData);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Liste des Déductibles ({step === 'initial' ? 'Initial' : 'Final'})
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1 italic">Indiquer le poids de tous les liquides et stocks à bord.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Ballast Water" field="ballastWater" value={localDeducts.ballastWater} onChange={updateField} />
                        <InputField label="Fresh Water" field="freshWater" value={localDeducts.freshWater} onChange={updateField} />
                        <InputField label="Fuel Oil (HFO)" field="fuelOil" value={localDeducts.fuelOil} onChange={updateField} />
                        <InputField label="Diesel Oil (MDO)" field="dieselOil" value={localDeducts.dieselOil} onChange={updateField} />
                        <InputField label="Lube Oil" field="lubeOil" value={localDeducts.lubeOil} onChange={updateField} />
                        <InputField label="Others (Sludge, etc.)" field="others" value={localDeducts.others} onChange={updateField} />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-blue-600 p-8 rounded-[2rem] text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
                        <Droplets className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10" />
                        <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-80 mb-4">Total Déductibles</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black font-mono">{total.toFixed(3)}</span>
                            <span className="text-sm font-bold opacity-60">MT</span>
                        </div>
                    </div>

                    <div className="p-8 bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-200 dark:border-slate-700">
                        <h4 className="font-bold flex items-center gap-2 mb-4 text-slate-900 dark:text-white uppercase text-xs tracking-widest">
                            <Calculator className="w-4 h-4 text-blue-600" /> Résumé
                        </h4>
                        <div className="space-y-2 text-sm text-slate-500">
                            <div className="flex justify-between">
                                <span>Eau Ballast:</span>
                                <span>{localDeducts.ballastWater.toFixed(2)} MT</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Huiles/Carburant:</span>
                                <span>{(localDeducts.fuelOil + localDeducts.dieselOil + localDeducts.lubeOil).toFixed(2)} MT</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-end">
                <button 
                    onClick={handleNext}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold shadow-lg transition-all group"
                >
                    {step === 'initial' ? 'Suivant: Draft Final' : 'Voir le Rapport Final'}
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default DraftDeductibles;
