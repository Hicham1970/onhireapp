import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Download, 
    Save, 
    ArrowDownCircle,
    ArrowUpCircle,
    Calculator,
    Anchor,
    Clock,
    Ship
} from 'lucide-react';
import { useDraftSurvey } from '../context/DraftSurveyContext';
import { useAuth } from '../context/AuthContext';
import { 
    calculateCargoWeight, 
    sumDeductibles, 
    calculateTrimCorrections, 
    calculateSGSCorrectedDrafts,
    calculateSGSMiddleMeans
} from '../utils/draftSurveyUtils';
import { saveDraftSurvey } from '../services/draftSurveyServices';

const StatusCard = ({ label, value, unit, icon: Icon, color }: { label: string, value: number, unit: string, icon: any, color: string }) => (
    <div className={`p-6 rounded-[2rem] border-2 ${color} bg-white dark:bg-slate-900 shadow-xl overflow-hidden relative`}>
         <Icon className="absolute -bottom-4 -right-4 w-24 h-24 opacity-5" />
         <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{label}</p>
         <div className="flex items-baseline gap-2">
             <span className="text-4xl font-black font-mono">{value.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</span>
             <span className="text-sm font-bold opacity-60">{unit}</span>
         </div>
    </div>
);

const TableHeader = ({ title }: { title: string }) => (
    <div className="bg-slate-100 dark:bg-slate-800 p-3 flex items-center justify-between border-b dark:border-slate-700">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{title}</span>
        <div className="flex gap-20 pr-10">
            <span className="text-xs font-bold text-blue-600">INITIAL</span>
            <span className="text-xs font-bold text-emerald-600">FINAL</span>
        </div>
    </div>
);

const TableRow = ({ label, unit, valBase, valComp, bold = false }: { label: string, unit: string, valBase: number, valComp: number, bold?: boolean }) => (
    <div className={`flex justify-between items-center px-4 py-2 border-b dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${bold ? 'font-bold text-slate-900 dark:text-white bg-slate-50/50 dark:bg-slate-900/30' : 'text-slate-600 dark:text-slate-400'}`}>
        <span className="text-xs">{label} ({unit})</span>
        <div className="flex gap-16 min-w-[200px] justify-end font-mono">
            <span className="w-20 text-right">{valBase.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</span>
            <span className="w-20 text-right">{valComp.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</span>
        </div>
    </div>
);

const DraftSurveyReport = () => {
    const { survey } = useDraftSurvey();
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [isSaving, setIsSaving] = useState(false);

    const { informations, particulars, initial, final } = survey;

    const initialRes = useMemo(() => {
        const stepData = initial;
        const corr = calculateSGSCorrectedDrafts(stepData.drafts, particulars);
        const { quarterMean } = calculateSGSMiddleMeans(corr.fwd.corrected, corr.mid.corrected, corr.aft.corrected);
        
        const h = stepData.hydrostatics;
        const trimCorr = calculateTrimCorrections(
            stepData.trim || 0, h.tpc, h.mtc, h.lcf, particulars.lbp
        );
        const corrDisplTrim = h.displacement + trimCorr;
        const densityCorrDispl = corrDisplTrim * (stepData.density / 1.025);
        const deducts = sumDeductibles(stepData.deductibles);
        const net = densityCorrDispl - deducts;

        return { corr, quarterMean, trimCorr, corrDisplTrim, densityCorrDispl, deducts, net };
    }, [initial, particulars]);

    const finalRes = useMemo(() => {
        const stepData = final;
        const corr = calculateSGSCorrectedDrafts(stepData.drafts, particulars);
        const { quarterMean } = calculateSGSMiddleMeans(corr.fwd.corrected, corr.mid.corrected, corr.aft.corrected);
        
        const h = stepData.hydrostatics;
        const trimCorr = calculateTrimCorrections(
            stepData.trim || 0, h.tpc, h.mtc, h.lcf, particulars.lbp
        );
        const corrDisplTrim = h.displacement + trimCorr;
        const densityCorrDispl = corrDisplTrim * (stepData.density / 1.025);
        const deducts = sumDeductibles(stepData.deductibles);
        const net = densityCorrDispl - deducts;

        return { corr, quarterMean, trimCorr, corrDisplTrim, densityCorrDispl, deducts, net };
    }, [final, particulars]);

    const cargoWeight = calculateCargoWeight(initialRes.net, finalRes.net, informations.operationType);

    const handleSave = async () => {
        if (!currentUser?.uid) {
            alert("Veuillez vous connecter pour enregistrer.");
            return;
        }
        setIsSaving(true);
        try {
            await saveDraftSurvey(currentUser.uid, {
                ...survey,
                userId: currentUser.uid,
                cargoWeight,
                status: 'Completed'
            });
            alert("Draft Survey enregistré avec succès !");
            navigate('/dashboard');
        } catch (error) {
            console.error("Save error:", error);
            alert("Erreur lors de l'enregistrement.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">DRAFT SURVEY REPORT (Recap)</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 italic">Format conforme aux standards d'expertise SGS.</p>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
                    >
                        {isSaving ? <Save className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        Terminer l'Expertise
                    </button>
                    <button className="flex items-center gap-2 bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all">
                        <Download className="w-5 h-5" />
                        Exporter PDF
                    </button>
                </div>
            </div>

            <div className={`p-8 rounded-[2.5rem] border-2 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 transition-all relative overflow-hidden ${
                informations.operationType === 'Loading' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-emerald-600 border-emerald-400 text-white'
            }`}>
                 <Anchor className="absolute -top-10 -left-10 w-64 h-64 opacity-10 rotate-12" />
                 <div className="flex items-center gap-8 relative z-10">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-[2rem] flex items-center justify-center shadow-inner">
                        {informations.operationType === 'Loading' ? <ArrowDownCircle className="w-12 h-12" /> : <ArrowUpCircle className="w-12 h-12" />}
                    </div>
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-80 mb-2">Total Cargo {informations.operationType === 'Loading' ? 'LOADED' : 'DISCHARGED'}</p>
                        <h2 className="text-6xl font-black font-mono tracking-tighter shadow-sm">
                            {cargoWeight.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })} <span className="text-2xl font-normal opacity-70">MT</span>
                        </h2>
                    </div>
                 </div>
                 <div className="bg-black/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 text-right min-w-[300px] relative z-10">
                    <div className="flex items-center gap-2 justify-end mb-4">
                        <Ship className="w-4 h-4 opacity-70" />
                        <span className="text-sm font-bold uppercase tracking-widest">{informations.vesselName}</span>
                    </div>
                    <div className="space-y-1 opacity-80 text-sm italic">
                        <p>{informations.portLoading} ➔ {informations.portDischarging}</p>
                        <p>B/L: {informations.blWeight.toFixed(3)} MT ({informations.blDate})</p>
                    </div>
                 </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
                <div className="p-6 border-b dark:border-slate-800 flex items-center gap-3">
                    <Calculator className="w-5 h-5 text-blue-600" />
                    <h3 className="font-black text-xs uppercase tracking-widest italic">Drafts and Calculations</h3>
                </div>

                <div className="overflow-x-auto">
                    <div className="min-w-[700px]">
                        <TableHeader title="FORE" />
                        <TableRow label="Port" unit="m" valBase={initial.drafts.fwdPort} valComp={final.drafts.fwdPort} />
                        <TableRow label="Starboard" unit="m" valBase={initial.drafts.fwdStbd} valComp={final.drafts.fwdStbd} />
                        <TableRow label="Mean" unit="m" valBase={initialRes.corr.fwd.mean} valComp={finalRes.corr.fwd.mean} />
                        <TableRow label="Stern Correction (Auto)" unit="m" valBase={initialRes.corr.fwd.autoCorr} valComp={finalRes.corr.fwd.autoCorr} />
                        <TableRow label="Corrected Fore" unit="m" valBase={initialRes.corr.fwd.corrected} valComp={finalRes.corr.fwd.corrected} bold />

                        <TableHeader title="AFT" />
                        <TableRow label="Port" unit="m" valBase={initial.drafts.aftPort} valComp={final.drafts.aftPort} />
                        <TableRow label="Starboard" unit="m" valBase={initial.drafts.aftStbd} valComp={final.drafts.aftStbd} />
                        <TableRow label="Mean" unit="m" valBase={initialRes.corr.aft.mean} valComp={finalRes.corr.aft.mean} />
                        <TableRow label="Stern Correction (Auto)" unit="m" valBase={initialRes.corr.aft.autoCorr} valComp={finalRes.corr.aft.autoCorr} />
                        <TableRow label="Corrected Aft" unit="m" valBase={initialRes.corr.aft.corrected} valComp={finalRes.corr.aft.corrected} bold />

                        <TableHeader title="MID" />
                        <TableRow label="Port" unit="m" valBase={initial.drafts.midPort} valComp={final.drafts.midPort} />
                        <TableRow label="Starboard" unit="m" valBase={initial.drafts.midStbd} valComp={final.drafts.midStbd} />
                        <TableRow label="Mean" unit="m" valBase={initialRes.corr.mid.mean} valComp={finalRes.corr.mid.mean} />
                        <TableRow label="Mid Correction (Auto)" unit="m" valBase={initialRes.corr.mid.autoCorr} valComp={finalRes.corr.mid.autoCorr} />
                        <TableRow label="Corrected Mid" unit="m" valBase={initialRes.corr.mid.corrected} valComp={finalRes.corr.mid.corrected} bold />

                        <TableHeader title="FINAL MEANS & DISPLACEMENTS" />
                        <TableRow label="Mean Fore/Aft" unit="m" valBase={initialRes.corr.fwd.corrected} valComp={finalRes.corr.fwd.corrected} />
                        <TableRow label="Mean of Mean" unit="m" valBase={initialRes.quarterMean} valComp={finalRes.quarterMean} />
                        <TableRow label="Quarter Mean (Lookup Draft)" unit="m" valBase={initialRes.quarterMean} valComp={finalRes.quarterMean} bold />
                        
                        <div className="h-4 bg-slate-50 dark:bg-slate-900"></div>

                        <TableRow label="Corresponding Displacement" unit="MT" valBase={initial.hydrostatics.displacement} valComp={final.hydrostatics.displacement} />
                        <TableRow label="Trim Correction (1st + 2nd)" unit="MT" valBase={initialRes.trimCorr} valComp={finalRes.trimCorr} />
                        <TableRow label="Corrected displacement For Trim" unit="MT" valBase={initialRes.corrDisplTrim} valComp={finalRes.corrDisplTrim} bold />
                        <TableRow label="Density of Dock water" unit="Kg/l" valBase={initial.density} valComp={final.density} />
                        <TableRow label="Corrected displacement For Density" unit="MT" valBase={initialRes.densityCorrDispl} valComp={finalRes.densityCorrDispl} bold />
                        <TableRow label="Deductibles Liquids" unit="MT" valBase={initialRes.deducts} valComp={finalRes.deducts} />
                        <TableRow label="Net Light / Loaded displacement" unit="MT" valBase={initialRes.net} valComp={finalRes.net} bold />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Timestamps
                    </p>
                    <div className="space-y-4 text-xs">
                        <div className="flex justify-between">
                            <span className="text-slate-500 italic">Initial Study:</span>
                            <span className="font-bold">{initial.commencedDate} {initial.commencedTime}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500 italic">Final Study:</span>
                            <span className="font-bold">{final.commencedDate} {final.commencedTime}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DraftSurveyReport;
