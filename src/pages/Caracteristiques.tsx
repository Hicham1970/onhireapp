import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ship, ChevronRight, Globe, Layers } from 'lucide-react';
import { useDraftSurvey } from '../context/DraftSurveyContext';
import { VesselParticulars } from '../types/draftSurvey';

interface InputFieldProps {
    label: string;
    field: keyof VesselParticulars;
    value: string | number;
    unit?: string;
    type?: string;
    onChange: (field: keyof VesselParticulars, value: string) => void;
}

const InputField = ({ label, field, value, unit = 'm', type = "number", onChange }: InputFieldProps) => (
    <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</label>
        <div className="relative">
            <input 
                type={type}
                value={value as any}
                onChange={(e) => onChange(field, e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white transition-all font-mono"
            />
            {unit && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">{unit}</span>}
        </div>
    </div>
);

const DraftSurveyCaracteristiques = () => {
    const { survey, updateParticulars } = useDraftSurvey();
    const navigate = useNavigate();
    
    const [localParticulars, setLocalParticulars] = useState(survey.particulars);

    const handleNext = () => {
        updateParticulars(localParticulars);
        navigate('/draft-survey/initial/readings');
    };

    const updateField = (field: keyof VesselParticulars, value: string) => {
        const val = typeof localParticulars[field] === 'number' ? (parseFloat(value) || 0) : value;
        setLocalParticulars(prev => ({ ...prev, [field]: val }));
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Caractéristiques du Navire</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Données techniques extraites des certificats du navire.</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 shadow-xl space-y-10">
                
                <div className="space-y-6">
                    <h3 className="font-bold flex items-center gap-2 text-slate-900 dark:text-white uppercase text-xs tracking-widest text-slate-400">
                        <Ship className="w-4 h-4" /> Dimensions & Capacités
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <InputField label="L.B.P." field="lbp" value={localParticulars.lbp} onChange={updateField} />
                        <InputField label="L.O.A." field="loa" value={localParticulars.loa} onChange={updateField} />
                        <InputField label="Breadth" field="breadth" value={localParticulars.breadth} onChange={updateField} />
                        <InputField label="Summer Draft" field="summerDraft" value={localParticulars.summerDraft || 0} onChange={updateField} />
                        <InputField label="Summer Deadweight" field="summerDeadweight" value={localParticulars.summerDeadweight || 0} unit="MT" onChange={updateField} />
                        <InputField label="Number of Holds" field="numHolds" value={localParticulars.numHolds} unit="" onChange={updateField} />
                        <InputField label="Number of Ballast Tks" field="numBallastTanks" value={localParticulars.numBallastTanks} unit="" onChange={updateField} />
                        <InputField label="Light Ship" field="lightShip" value={localParticulars.lightShip} unit="MT" onChange={updateField} />
                    </div>
                </div>

                <hr className="dark:border-slate-700" />

                <div className="space-y-6">
                    <h3 className="font-bold flex items-center gap-2 text-slate-900 dark:text-white uppercase text-xs tracking-widest text-slate-400">
                        <Globe className="w-4 h-4" /> Registre & Tonnage
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <InputField label="Flag" field="flag" value={localParticulars.flag} type="text" unit="" onChange={updateField} />
                        <InputField label="Port of Registry" field="portOfRegistry" value={localParticulars.portOfRegistry} type="text" unit="" onChange={updateField} />
                        <InputField label="Gross Tonnage" field="grossTonnage" value={localParticulars.grossTonnage} unit="RT" onChange={updateField} />
                        <InputField label="Net Tonnage" field="netTonnage" value={localParticulars.netTonnage} unit="RT" onChange={updateField} />
                    </div>
                </div>

                <hr className="dark:border-slate-700" />

                <div className="space-y-6">
                    <h3 className="font-bold flex items-center gap-2 text-slate-900 dark:text-white uppercase text-xs tracking-widest text-slate-400">
                        <Layers className="w-4 h-4" /> Correction des Marques
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <InputField label="Dist. Fwd Mark" field="fwdDraftMarkDist" value={localParticulars.fwdDraftMarkDist} onChange={updateField} />
                        <InputField label="Dist. Aft Mark" field="aftDraftMarkDist" value={localParticulars.aftDraftMarkDist} onChange={updateField} />
                        <InputField label="Dist. Mid Mark" field="midDraftMarkDist" value={localParticulars.midDraftMarkDist} onChange={updateField} />
                        <InputField label="Keel Thickness" field="keelThickness" value={localParticulars.keelThickness} unit="mm" onChange={updateField} />
                    </div>
                </div>

                <div className="mt-12 flex justify-end">
                    <button 
                        onClick={handleNext}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold shadow-lg transition-all group"
                    >
                        Suivant: Draft Initial
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DraftSurveyCaracteristiques;