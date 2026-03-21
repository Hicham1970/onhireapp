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
    Ship,
    AlertTriangle,
    Package,
    Weight
} from 'lucide-react';
import { useDraftSurvey } from '../context/DraftSurveyContext';
import { useAuth } from '../context/AuthContext';
import {
    calculateCargoWeight,
    sumDeductibles,
    calculateSGSCorrectedDrafts,
    calculateSGSMiddleMeans
} from '../utils/draftSurveyUtils';
import { saveDraftSurvey } from '../services/draftSurveyServices';

// ─── Error Boundary ─────────────────────────────────────────────────────────────
class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { error: Error | null }
> {
    constructor(props: any) {
        super(props);
        this.state = { error: null };
    }
    static getDerivedStateFromError(error: Error) { return { error }; }
    render() {
        if (this.state.error) {
            return (
                <div className="p-8 bg-red-50 dark:bg-red-900/20 rounded-3xl border-2 border-red-400 space-y-4">
                    <div className="flex items-center gap-3 text-red-600">
                        <AlertTriangle className="w-6 h-6" />
                        <h2 className="font-black text-lg">Erreur de rendu — Recap</h2>
                    </div>
                    <pre className="text-xs font-mono bg-red-100 dark:bg-red-900/40 p-4 rounded-xl overflow-auto text-red-800 dark:text-red-200 whitespace-pre-wrap">
                        {this.state.error.message}{'\n\n'}{this.state.error.stack}
                    </pre>
                    <p className="text-sm text-red-500">
                        Verifiez que tous les champs (LBP, hydrostatiques, lectures) sont correctement saisis.
                    </p>
                </div>
            );
        }
        return this.props.children;
    }
}

// ─── Sub-components ─────────────────────────────────────────────────────────────
const TableHeader = ({ title }: { title: string }) => (
    <div className="bg-slate-100 dark:bg-slate-800 p-3 flex items-center justify-between border-b dark:border-slate-700">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{title}</span>
        <div className="flex gap-20 pr-10">
            <span className="text-xs font-bold text-blue-600">INITIAL</span>
            <span className="text-xs font-bold text-emerald-600">FINAL</span>
        </div>
    </div>
);

const TableRow = ({
    label, unit, valBase, valComp, bold = false, highlight = false
}: {
    label: string; unit: string; valBase: number; valComp: number; bold?: boolean; highlight?: boolean;
}) => {
    const fmt = (v: number) => {
        const n = Number(v);
        return (isFinite(n) && !isNaN(n))
            ? n.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })
            : '—';
    };
    return (
        <div className={`flex justify-between items-center px-4 py-2 border-b dark:border-slate-700/50 transition-colors
            ${highlight ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 font-bold border-emerald-200 dark:border-emerald-800' :
            bold ? 'font-bold text-slate-900 dark:text-white bg-slate-50/50 dark:bg-slate-900/30' :
            'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}>
            <span className="text-xs">{label} ({unit})</span>
            <div className="flex gap-16 min-w-[200px] justify-end font-mono">
                <span className="w-20 text-right">{fmt(valBase)}</span>
                <span className="w-20 text-right">{fmt(valComp)}</span>
            </div>
        </div>
    );
};

// ─── Net Displacement Summary Card ──────────────────────────────────────────────
const NetCard = ({
    label, value, sublabel, color
}: {
    label: string; value: number; sublabel: string; color: string;
}) => {
    const fmt = (v: number) => {
        const n = Number(v);
        return (isFinite(n) && !isNaN(n))
            ? n.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })
            : '—';
    };
    return (
        <div className={`p-5 rounded-2xl border-2 ${color}`}>
            <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">{label}</p>
            <p className="text-3xl font-black font-mono">{fmt(value)} <span className="text-sm font-normal opacity-60">MT</span></p>
            <p className="text-xs italic opacity-60 mt-1">{sublabel}</p>
        </div>
    );
};

// ─── Main Component ─────────────────────────────────────────────────────────────
const DraftSurveyReportInner = () => {
    const { survey } = useDraftSurvey();
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [isSaving, setIsSaving] = useState(false);

    const { informations, particulars, initial, final } = survey;
    const isLoading = informations.operationType === 'Loading';

    const safeNum = (v: number) => (isFinite(v) && !isNaN(v) ? v : 0);

    const computeStep = (stepData: typeof initial, stepName: string) => {
        try {
            console.log(`=== RECAP ${stepName.toUpperCase()} COMPUTE START ===`, { stepData, particulars });
            const corr = calculateSGSCorrectedDrafts(stepData.drafts, particulars);
            console.log(`Corrections SGS:`, corr);
            const { quarterMean } = calculateSGSMiddleMeans(
                corr.fwd.corrected, corr.mid.corrected, corr.aft.corrected
            );
            const h = stepData.hydrostatics;
            const lbp = safeNum(particulars.lbp) || 1;
            console.log(`Hydrostatics & LBP:`, { h, lbp });
            // Trim corrige = Aft corrige - Fwd corrige (m)
            const trimCorrected = safeNum(corr.aft.corrected - corr.fwd.corrected);
            console.log(`Trim Corrigé:`, trimCorrected);
            // 1ere correction: (Trim * TPC * LCF * 100) / LBP
            const firstTrimCorr = safeNum((trimCorrected * 100 * safeNum(h.tpc) * safeNum(h.lcf)) / lbp);
            console.log(`1ère Correction Trim:`, firstTrimCorr);
            // 2eme correction: (Trim^2 * 50 * deltaMTC) / LBP
            const secondTrimCorr = safeNum((trimCorrected * trimCorrected * 50 * safeNum(h.mtc)) / lbp);
            console.log(`2ème Correction Trim:`, secondTrimCorr);
            const trimCorr = trimCorrected !== 0 ? firstTrimCorr + secondTrimCorr : 0;
            console.log(`Total Trim Corr:`, trimCorr);
            const corrDisplTrim = safeNum(h.displacement) + trimCorr;
            console.log(`Displacement Corrigé Trim:`, corrDisplTrim);
            const density = safeNum(stepData.density) || 1.025;
            console.log(`Densité:`, density);
            // Correction densite: Disp_trim * (densite_dock / 1.025)
            const densityCorrDispl = safeNum(corrDisplTrim * (density / 1.025));
            console.log(`Displacement Corrigé Densité:`, densityCorrDispl);
            const deducts = safeNum(sumDeductibles(stepData.deductibles));
            console.log(`Déductibles Total:`, deducts);
            // Net displacement (apres deductibles)
            const net = safeNum(densityCorrDispl - deducts);
            console.log(`NET ${stepName.toUpperCase()}:`, net);
            console.log(`=== RECAP ${stepName.toUpperCase()} COMPUTE END ===`);
            return {
                corr,
                quarterMean: safeNum(quarterMean),
                trimCorrected,
                firstTrimCorr,
                secondTrimCorr,
                trimCorr,
                corrDisplTrim: safeNum(corrDisplTrim),
                densityCorrDispl,
                deducts,
                net
            };
        } catch (e) {
            console.error('[Recap] compute error:', e);
            const zero = { mean: 0, corrected: 0, autoCorr: 0 };
            return {
                corr: { fwd: zero, mid: zero, aft: zero },
                quarterMean: 0, trimCorrected: 0, firstTrimCorr: 0,
                secondTrimCorr: 0, trimCorr: 0, corrDisplTrim: 0,
                densityCorrDispl: 0, deducts: 0, net: 0
            };
        }
    };

    const initialRes = useMemo(() => computeStep(initial, 'initial'), [initial, particulars]);
    const finalRes   = useMemo(() => computeStep(final, 'final'),   [final, particulars]);

    // ─── Cargo Logic ───────────────────────────────────────────────────────────
    // Loading:  initial = Net Light,  final = Net Loaded   → cargo = final - initial
    // Unloading: initial = Net Loaded, final = Net Light   → cargo = initial - final
    const netLight  = isLoading ? initialRes.net : finalRes.net;
    const netLoaded = isLoading ? finalRes.net   : initialRes.net;
    console.log('NET LIGHT:', netLight, 'NET LOADED:', netLoaded, 'isLoading:', isLoading, 'CARGO:', safeNum(netLoaded - netLight));
    const cargoWeight = safeNum(netLoaded - netLight);

    // Labels contextualises pour la table
    const initialNetLabel = isLoading ? 'Net Light Displacement (Navire Vide)' : 'Net Loaded Displacement (Navire Charge)';
    const finalNetLabel   = isLoading ? 'Net Loaded Displacement (Navire Charge)' : 'Net Light Displacement (Navire Vide)';

    const handleSave = async () => {
        if (!currentUser?.uid) { alert('Veuillez vous connecter pour enregistrer.'); return; }
        setIsSaving(true);
        try {
            await saveDraftSurvey(currentUser.uid, {
                ...survey,
                userId: currentUser.uid,
                cargoWeight,
                status: 'Completed'
            });
            alert('Draft Survey enregistre avec succes !');
            navigate('/dashboard');
        } catch (error) {
            console.error('Save error:', error);
            alert("Erreur lors de l'enregistrement.");
        } finally {
            setIsSaving(false);
        }
    };

    console.log('=== DRAFTSURVEYREPORT RENDER START ===', { surveyKeys: Object.keys(survey), initialKeys: Object.keys(initial), finalKeys: Object.keys(final), isLoading });
    console.log('initialRes:', initialRes, 'finalRes:', finalRes, 'cargoWeight:', cargoWeight);
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
<h1 className="text-3xl font-bold text-slate-900 dark:text-white bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 rounded-xl shadow-2xl">DRAFT SURVEY REPORT</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 italic">
                        Format conforme aux standards d'expertise SGS.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
                    >
                        <Save className={`w-5 h-5 ${isSaving ? 'animate-spin' : ''}`} />
                        Terminer l'Expertise
                    </button>
                    <button 

                        onClick={async () => {
                          try {
                            const { generateDraftSurveyPDF } = await import('../utils/pdfDraftSurveyGenerator');
                            await generateDraftSurveyPDF(survey);
                          } catch(err) {
                            console.error('PDF Error:', err);
                            alert('Erreur PDF: ' + (err.message || 'Generation échouée'));
                          }
                        }}

                        className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
                      >
                        <Download className="w-5 h-5" /> DS PDF
                      </button>
                </div>
            </div>

            {/* Cargo Banner */}
            <div className={`p-8 rounded-[2.5rem] border-2 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden
                ${isLoading ? 'bg-blue-600 border-blue-400 text-white' : 'bg-emerald-600 border-emerald-400 text-white'}`}>
                <Anchor className="absolute -top-10 -left-10 w-64 h-64 opacity-10 rotate-12" />
                <div className="flex items-center gap-8 relative z-10">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-[2rem] flex items-center justify-center shadow-inner">
                        {isLoading ? <ArrowDownCircle className="w-12 h-12" /> : <ArrowUpCircle className="w-12 h-12" />}
                    </div>
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-80 mb-2">
                            Total Cargo {isLoading ? 'LOADED' : 'DISCHARGED'}
                        </p>
                        <h2 className="text-6xl font-black font-mono tracking-tighter">
                            {cargoWeight.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}
                            <span className="text-2xl font-normal opacity-70"> MT</span>
                        </h2>
                        <p className="text-sm opacity-70 mt-1 font-mono">
                            = Net Loaded ({netLoaded.toFixed(3)}) - Net Light ({netLight.toFixed(3)})
                        </p>
                    </div>
                </div>
                <div className="bg-black/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 text-right min-w-[300px] relative z-10">
                    <div className="flex items-center gap-2 justify-end mb-4">
                        <Ship className="w-4 h-4 opacity-70" />
                        <span className="text-sm font-bold uppercase tracking-widest">{informations.vesselName}</span>
                    </div>
                    <div className="space-y-1 opacity-80 text-sm italic">
                        <p>{informations.portLoading} &rarr; {informations.portDischarging}</p>
                        <p>B/L: {Number(informations.blWeight || 0).toFixed(3)} MT ({informations.blDate})</p>
                    </div>
                </div>
            </div>

            {/* Net Light / Net Loaded Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <NetCard
                    label={isLoading ? 'Net Light (Initial)' : 'Net Loaded (Initial)'}
                    value={initialRes.net}
                    sublabel={isLoading ? 'Light ship + constants' : 'Cargo + constants'}
                    color={isLoading
                        ? 'border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300'
                        : 'border-orange-300 dark:border-orange-600 text-orange-700 dark:text-orange-300'}
                />
                <NetCard
                    label={isLoading ? 'Net Loaded (Final)' : 'Net Light (Final)'}
                    value={finalRes.net}
                    sublabel={isLoading ? 'Cargo + constants' : 'Light ship + constants'}
                    color={isLoading
                        ? 'border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300'
                        : 'border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300'}
                />
                <NetCard
                    label={isLoading ? 'Cargo Charge' : 'Cargo Decharge'}
                    value={cargoWeight}
                    sublabel="Net Loaded - Net Light"
                    color={isLoading
                        ? 'border-emerald-400 dark:border-emerald-600 text-emerald-700 dark:text-emerald-300 bg-emerald-50/50 dark:bg-emerald-900/10'
                        : 'border-orange-400 dark:border-orange-600 text-orange-700 dark:text-orange-300 bg-orange-50/50 dark:bg-orange-900/10'}
                />
            </div>

            {/* Calculations Table */}
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

                        <TableHeader title="MEANS AND DISPLACEMENTS" />
                        <TableRow
                            label="Mean Fore/Aft"
                            unit="m"
                            valBase={(initialRes.corr.fwd.corrected + initialRes.corr.aft.corrected) / 2}
                            valComp={(finalRes.corr.fwd.corrected + finalRes.corr.aft.corrected) / 2}
                        />
                        <TableRow label="Quarter Mean (Lookup Draft)" unit="m" valBase={initialRes.quarterMean} valComp={finalRes.quarterMean} bold />

                        <div className="h-4 bg-slate-50 dark:bg-slate-900" />

                        <TableRow label="Corresponding Displacement" unit="MT" valBase={initial.hydrostatics.displacement} valComp={final.hydrostatics.displacement} />
                        <TableRow label="Trim Corrige (Aft - Fwd)" unit="m" valBase={initialRes.trimCorrected} valComp={finalRes.trimCorrected} />
                        <TableRow label="1ere Correction de Trim (TPC x LCF x Trim x 100 / LBP)" unit="MT" valBase={initialRes.firstTrimCorr} valComp={finalRes.firstTrimCorr} />
                        <TableRow label="2eme Correction de Trim (Trim^2 x 50 x dMTC / LBP)" unit="MT" valBase={initialRes.secondTrimCorr} valComp={finalRes.secondTrimCorr} />
                        <TableRow label="Total Correction Trim (1+2)" unit="MT" valBase={initialRes.trimCorr} valComp={finalRes.trimCorr} bold />
                        <TableRow label="Corrected Displacement For Trim" unit="MT" valBase={initialRes.corrDisplTrim} valComp={finalRes.corrDisplTrim} bold />
                        <TableRow label="Density of Dock Water" unit="Kg/l" valBase={safeNum(initial.density) || 1.025} valComp={safeNum(final.density) || 1.025} />
                        <TableRow label="Corrected Displacement For Density" unit="MT" valBase={initialRes.densityCorrDispl} valComp={finalRes.densityCorrDispl} bold />
                        <TableRow label="Deductibles (Liquides)" unit="MT" valBase={initialRes.deducts} valComp={finalRes.deducts} />
                        <TableRow
                            label={`Initial: ${initialNetLabel}`}
                            unit="MT"
                            valBase={initialRes.net}
                            valComp={finalRes.net}
                            highlight
                        />
                        <div className="px-4 py-3 bg-slate-900 dark:bg-white flex justify-between items-center">
                            <span className="text-xs font-black uppercase tracking-widest text-white dark:text-slate-900">
                                {isLoading ? 'CARGO CHARGE' : 'CARGO DECHARGE'} = Net Loaded - Net Light
                            </span>
                            <span className="font-black font-mono text-xl text-emerald-400 dark:text-emerald-600">
                                {cargoWeight.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })} MT
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Timestamps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Timestamps
                    </p>
                    <div className="space-y-4 text-xs">
                        <div className="flex justify-between">
                            <span className="text-slate-500 italic">Initial Study:</span>
                            <span className="font-bold">{initial.commencedDate || '-'} {initial.commencedTime || ''}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500 italic">Final Study:</span>
                            <span className="font-bold">{final.commencedDate || '-'} {final.commencedTime || ''}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Exported wrapper with ErrorBoundary ────────────────────────────────────────
const DraftSurveyReport = () => (
    <ErrorBoundary>
        <DraftSurveyReportInner />
    </ErrorBoundary>
);

export default DraftSurveyReport;
