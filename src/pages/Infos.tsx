import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowDownCircle, ArrowUpCircle, Clock } from 'lucide-react';
import { useDraftSurvey } from '../context/DraftSurveyContext';
import { OperationType, DraftSurvey } from '../types/draftSurvey';

type LocalInfo = DraftSurvey['informations'];

interface InputFieldProps {
    label: string;
    field: keyof LocalInfo;
    value: string | number;
    type?: string;
    placeholder?: string;
    onChange: (field: keyof LocalInfo, value: string) => void;
}

const InputField = ({ label, field, value, type = "text", placeholder = "", onChange }: InputFieldProps) => (
    <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</label>
        <input 
            type={type}
            value={value as string}
            onChange={(e) => onChange(field, e.target.value)}
            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
            placeholder={placeholder}
        />
    </div>
);

const DraftSurveyInfos = () => {
    const { survey, updateInformations } = useDraftSurvey();
    const navigate = useNavigate();
    
    const [localInfo, setLocalInfo] = useState(survey.informations);

    const handleNext = () => {
        updateInformations(localInfo);
        navigate('/draft-survey/caracteristiques');
    };

    const updateField = (field: keyof LocalInfo, value: string) => {
        setLocalInfo(prev => ({ ...prev, [field]: value }));
    };

    const setOpType = (type: OperationType) => {
        setLocalInfo(prev => ({ ...prev, operationType: type }));
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Contexte de l'Expertise</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Détails de cargaison, ports et mouvements navire.</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 shadow-xl space-y-10">
                
                <div className="space-y-4">
                    <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest">Type d'Opération</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button 
                            onClick={() => setOpType('Loading')}
                            className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${
                                localInfo.operationType === 'Loading' 
                                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100' 
                                : 'border-slate-100 dark:border-slate-700 hover:border-slate-200 text-slate-600'
                            }`}
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                localInfo.operationType === 'Loading' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700'
                            }`}>
                                <ArrowDownCircle className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <p className="font-bold">CHARGEMENT (Loading)</p>
                            </div>
                        </button>

                        <button 
                            onClick={() => setOpType('Unloading')}
                            className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${
                                localInfo.operationType === 'Unloading' 
                                ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-100' 
                                : 'border-slate-100 dark:border-slate-700 hover:border-slate-200 text-slate-600'
                            }`}
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                localInfo.operationType === 'Unloading' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-700'
                            }`}>
                                <ArrowUpCircle className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <p className="font-bold">DÉCHARGEMENT (Unloading)</p>
                            </div>
                        </button>
                    </div>
                </div>

                <hr className="dark:border-slate-700" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InputField label="Nom du Navire" field="vesselName" value={localInfo.vesselName} onChange={updateField} placeholder="ex: CABRERA" />
                    <InputField label="Cargaison" field="cargo" value={localInfo.cargo} onChange={updateField} placeholder="ex: COAL" />
                    <InputField label="Poids B/L (MT)" field="blWeight" value={localInfo.blWeight} type="number" onChange={updateField} />
                    <InputField label="Date B/L" field="blDate" value={localInfo.blDate} type="date" onChange={updateField} />
                    <InputField label="Port de Chargement" field="portLoading" value={localInfo.portLoading} onChange={updateField} placeholder="ex: PUERTO BOLIVAR" />
                    <InputField label="Port de Déchargement" field="portDischarging" value={localInfo.portDischarging} onChange={updateField} placeholder="ex: CASABLANCA" />
                </div>

                <hr className="dark:border-slate-700" />

                <div className="space-y-6">
                    <h3 className="font-bold flex items-center gap-2 text-slate-900 dark:text-white uppercase text-xs tracking-widest text-slate-400">
                        <Clock className="w-4 h-4" /> Mouvements Navire
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                            <p className="font-bold text-sm text-slate-800 dark:text-white">Arrivée sur Rade (Arrived on)</p>
                            <div className="grid grid-cols-2 gap-4">
                                <InputField label="Date" field="arrivedDate" value={localInfo.arrivedDate || ''} type="date" onChange={updateField} />
                                <InputField label="Heure" field="arrivedTime" value={localInfo.arrivedTime || ''} type="time" onChange={updateField} />
                            </div>
                        </div>
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                            <p className="font-bold text-sm text-slate-800 dark:text-white">Accostage (Berthed on)</p>
                            <div className="grid grid-cols-2 gap-4">
                                <InputField label="Date" field="berthedDate" value={localInfo.berthedDate || ''} type="date" onChange={updateField} />
                                <InputField label="Heure" field="berthedTime" value={localInfo.berthedTime || ''} type="time" onChange={updateField} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex justify-end">
                    <button 
                        onClick={handleNext}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold shadow-lg transition-all group"
                    >
                        Suivant: Caractéristiques
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DraftSurveyInfos;