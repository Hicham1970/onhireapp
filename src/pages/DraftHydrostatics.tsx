import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, ChevronRight, BarChart, Calculator, ArrowDownUp } from 'lucide-react';
import { useDraftSurvey } from '../context/DraftSurveyContext';
import { Hydrostatics } from '../types/draftSurvey';

interface Props {
    step: 'initial' | 'final';
}

const TableInput = ({ value, onChange, placeholder = "0" }: { value: number | string, onChange: (val: string) => void, placeholder?: string }) => (
    <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-center border-none focus:ring-0 text-slate-900 dark:text-white font-mono"
        placeholder={placeholder}
    />
);

const DraftHydrostatics = ({ step }: Props) => {
    const { survey, updateInitial, updateFinal } = useDraftSurvey();
    const navigate = useNavigate();
    
    const currentData = step === 'initial' ? survey.initial : survey.final;
    const quarterMean = currentData.quarterMean || 0;

    // Local state for interpolation table to handle smooth typing
    const [localInterp, setLocalInterp] = useState({
        draftSup: '0',
        draftInf: '0',
        dispSup: '0',
        dispInf: '0',
        tpcSup: '0',
        tpcInf: '0',
        lcfSup: '0',
        lcfInf: '0',
        mtcPlus50: '0',
        mtcMinus50: '0'
    });

    const [density, setDensity] = useState(currentData.density?.toString() || '1.025');
    const [manualHydro, setManualHydro] = useState(currentData.hydrostatics);

    // Sync local state when step changes
    useEffect(() => {
        setManualHydro(currentData.hydrostatics);
        if (currentData.density) setDensity(currentData.density.toString());
    }, [step, currentData]);

    // Automation: Interpolation Logic
    const calculatedValues = useMemo(() => {
        const draftSup = parseFloat(localInterp.draftSup) || 0;
        const draftInf = parseFloat(localInterp.draftInf) || 0;
        const dispSup = parseFloat(localInterp.dispSup) || 0;
        const dispInf = parseFloat(localInterp.dispInf) || 0;
        const tpcSup = parseFloat(localInterp.tpcSup) || 0;
        const tpcInf = parseFloat(localInterp.tpcInf) || 0;
        const lcfSup = parseFloat(localInterp.lcfSup) || 0;
        const lcfInf = parseFloat(localInterp.lcfInf) || 0;
        const mtcPlus50 = parseFloat(localInterp.mtcPlus50) || 0;
        const mtcMinus50 = parseFloat(localInterp.mtcMinus50) || 0;
        
        const diffDraft = draftSup - draftInf;
        if (diffDraft === 0) return { disp: 0, tpc: 0, lcf: 0, mtc: 0 };

        const qmFixed = parseFloat(quarterMean.toFixed(2));
        const dSupFixed = parseFloat(draftSup.toFixed(2));
        const dInfFixed = parseFloat(draftInf.toFixed(2));

        // Corrected standard linear interpolation: y = y1 + (x - x1) * (y2 - y1) / (x2 - x1)
        const disp = dispInf + ((dispSup - dispInf) / diffDraft) * (qmFixed - draftInf);
        const tpc = tpcInf + ((tpcSup - tpcInf) / (dSupFixed - dInfFixed)) * (qmFixed - dInfFixed);
        const lcf = lcfInf + ((lcfSup - lcfInf) / (dSupFixed - dInfFixed)) * (qmFixed - dInfFixed);
        const mtc = mtcPlus50 - mtcMinus50; // deltaMtc

        return { disp, tpc, lcf, mtc };
    }, [localInterp, quarterMean]);

    // Apply calculated values to manualHydro when they change
    useEffect(() => {
        if (calculatedValues.disp !== 0 || calculatedValues.tpc !== 0) {
            setManualHydro(prev => ({
                ...prev,
                displacement: calculatedValues.disp,
                tpc: calculatedValues.tpc,
                lcf: calculatedValues.lcf,
                mtc: calculatedValues.mtc
            }));
        }
    }, [calculatedValues]);

    const handleNext = () => {
        const updates = { 
            hydrostatics: manualHydro,
            density: parseFloat(density) || 0
        };
        if (step === 'initial') {
            updateInitial(updates);
            navigate('/draft-survey/initial/deductibles');
        } else {
            updateFinal(updates);
            navigate('/draft-survey/final/deductibles');
        }
    };

    const updateInterpField = (field: keyof typeof localInterp, value: string) => {
        setLocalInterp(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Données Hydrostatiques ({step === 'initial' ? 'Initial' : 'Final'})
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 italic">Module d'interpolation automatique des tables navire.</p>
                </div>
                <div className="flex flex-col items-end gap-2 px-6 py-3 bg-blue-600 rounded-2xl text-white shadow-lg">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Draft de Lecture (QM)</span>
                    <span className="text-3xl font-black font-mono">{quarterMean.toFixed(3)} m</span>
                </div>
            </div>

            {/* Interpolation Table SGS Style */}
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4">
                    <div className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-xl border border-slate-700">
                        <span className="text-[10px] font-black text-slate-500 uppercase">Densité</span>
                        <input 
                            type="text" 
                            value={density} 
                            onChange={(e) => setDensity(e.target.value)}
                            className="w-16 bg-transparent border-none text-blue-400 font-mono font-bold focus:ring-0 p-0 text-right"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-blue-500 font-black text-[10px] uppercase tracking-[0.2em] mb-8">Interpolation Module</h3>
                    
                    <div className="grid grid-cols-4 gap-4 text-center">
                        <div className="text-slate-500 text-[10px] font-bold uppercase">Table Reference</div>
                        <div className="text-slate-500 text-[10px] font-bold uppercase">Displacement (MT)</div>
                        <div className="text-slate-500 text-[10px] font-bold uppercase">TPC (MT/cm)</div>
                        <div className="text-slate-500 text-[10px] font-bold uppercase">LCF (m)</div>

                        {/* Superior Row */}
                        <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                            <p className="text-[10px] text-slate-600 mb-1 font-bold">Draft Sup</p>
                            <TableInput value={localInterp.draftSup} onChange={(v) => updateInterpField('draftSup', v)} />
                        </div>
                        <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                            <TableInput value={localInterp.dispSup} onChange={(v) => updateInterpField('dispSup', v)} />
                        </div>
                        <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                            <TableInput value={localInterp.tpcSup} onChange={(v) => updateInterpField('tpcSup', v)} />
                        </div>
                        <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                            <TableInput value={localInterp.lcfSup} onChange={(v) => updateInterpField('lcfSup', v)} />
                        </div>

                        {/* Quarter Mean (Result Row) */}
                        <div className="bg-emerald-600/10 rounded-xl p-4 border-2 border-emerald-600/50 text-emerald-500 font-black">
                             <p className="text-[10px] opacity-70 mb-1">Quarter Mean</p>
                             <div className="text-xl font-mono">{quarterMean.toFixed(2)}</div>
                        </div>
                        <div className="bg-emerald-600/10 rounded-xl p-4 border-2 border-emerald-600/50 text-emerald-500 font-black">
                             <div className="text-xl font-mono">{isNaN(calculatedValues.disp) ? 'NaN' : calculatedValues.disp.toFixed(2)}</div>
                        </div>
                        <div className="bg-emerald-600/10 rounded-xl p-4 border-2 border-emerald-600/50 text-emerald-500 font-black">
                             <div className="text-xl font-mono">{isNaN(calculatedValues.tpc) ? 'NaN' : calculatedValues.tpc.toFixed(3)}</div>
                        </div>
                        <div className="bg-emerald-600/10 rounded-xl p-4 border-2 border-emerald-600/50 text-emerald-500 font-black">
                             <div className="text-xl font-mono">{isNaN(calculatedValues.lcf) ? 'NaN' : calculatedValues.lcf.toFixed(3)}</div>
                        </div>

                        {/* Inferior Row */}
                        <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                            <p className="text-[10px] text-slate-600 mb-1 font-bold">Draft Inf</p>
                            <TableInput value={localInterp.draftInf} onChange={(v) => updateInterpField('draftInf', v)} />
                        </div>
                        <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                            <TableInput value={localInterp.dispInf} onChange={(v) => updateInterpField('dispInf', v)} />
                        </div>
                        <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                            <TableInput value={localInterp.tpcInf} onChange={(v) => updateInterpField('tpcInf', v)} />
                        </div>
                        <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                            <TableInput value={localInterp.lcfInf} onChange={(v) => updateInterpField('lcfInf', v)} />
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <ArrowDownUp className="w-4 h-4 text-amber-500" /> MTC Correction Data
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                                <p className="text-[10px] text-slate-500 mb-1">MTC (+50cm)</p>
                                <TableInput value={localInterp.mtcPlus50} onChange={(v) => updateInterpField('mtcPlus50', v)} />
                            </div>
                            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                                <p className="text-[10px] text-slate-500 mb-1">MTC (-50cm)</p>
                                <TableInput value={localInterp.mtcMinus50} onChange={(v) => updateInterpField('mtcMinus50', v)} />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end">
                        <div className="bg-blue-600/10 border-2 border-blue-600 p-6 rounded-2xl text-blue-500 w-full md:w-auto min-w-[200px]">
                            <p className="text-[10px] font-bold uppercase mb-2">Calculated Delta MTC</p>
                            <span className="text-3xl font-black font-mono">{(parseFloat(localInterp.mtcPlus50) - parseFloat(localInterp.mtcMinus50)).toFixed(3)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 shadow-xl">
                <div className="flex items-center justify-between mb-8">
                     <h3 className="font-bold flex items-center gap-2 text-slate-900 dark:text-white uppercase text-xs tracking-widest text-slate-400">
                        <Calculator className="w-4 h-4" /> Valeurs Finales Retention
                    </h3>
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full font-bold">MODE : SYNC AUTO</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400">DISPLACEMENT (MT)</label>
                        <input type="number" readOnly value={manualHydro.displacement.toFixed(2)} className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl p-3 font-mono font-bold" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400">TPC</label>
                        <input type="number" readOnly value={manualHydro.tpc.toFixed(3)} className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl p-3 font-mono font-bold" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400">LCF</label>
                        <input type="number" readOnly value={manualHydro.lcf.toFixed(3)} className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl p-3 font-mono font-bold" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400">DELTA MTC</label>
                        <input type="number" readOnly value={manualHydro.mtc.toFixed(3)} className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl p-3 font-mono font-bold" />
                    </div>
                </div>

                <div className="mt-12 flex justify-end pt-8 border-t border-slate-100 dark:border-slate-700">
                    <button 
                        onClick={handleNext}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold shadow-lg transition-all group"
                    >
                        Suivant: Déductibles
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DraftHydrostatics;
