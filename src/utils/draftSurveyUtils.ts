import { DraftReadings, VesselParticulars, Deductibles, OperationType } from "../types/draftSurvey";

/**
 * Calculates LBM (Length Between Marks).
 * Convention: Distances are from their respective perpendiculars (FP, AP).
 * - fwdDist: Positive if the mark is FORWARD of the FP. Negative if AFT.
 * - aftDist: Positive if the mark is FORWARD of the AP. Negative if AFT.
 */
export const calculateLBM = (lbp: number, fwdDist: number, aftDist: number) => {
    // If fwd mark is forward, it extends the length. If aft mark is forward, it shortens it.
    return lbp + fwdDist - aftDist;
};

/**
 * Calculates draft corrections based on trim.
 * This uses a consistent convention for all distances:
 * - Positive (>0): Mark is FORWARD of the reference point (FP, AP, Midship).
 * - Negative (<0): Mark is AFT of the reference point.
 * The calculated correction is algebraic and should always be ADDED to the mean draft.
 */
export const calculateDraftCorrections = (
    apparentTrim: number,
    lbp: number,
    fwdDist: number,
    aftDist: number,
    midDist: number
) => {
    const lbm = calculateLBM(lbp, fwdDist, aftDist); // Must use the same convention
    if (lbm === 0) return { fwdCorr: 0, aftCorr: 0, midCorr: 0, lbm: lbp };
    
    // If trim is by stern (positive) and mark is forward (positive), the reading is smaller, so correction is positive.
    const fwdCorr = (apparentTrim * fwdDist) / lbm;

    const aftCorr = (apparentTrim * aftDist) / lbm;

    const midCorr = (apparentTrim * midDist) / lbm;

    return { fwdCorr, aftCorr, midCorr, lbm };
};

/**
 * Calcul des tirants d'eau corrigés
 */
export const calculateSGSCorrectedDrafts = (drafts: DraftReadings, particulars: VesselParticulars) => {
    const { fwdPort, fwdStbd, midPort, midStbd, aftPort, aftStbd } = drafts;
    const { lbp, fwdDraftMarkDist, aftDraftMarkDist, midDraftMarkDist } = particulars;

    const fwdMean = (fwdPort + fwdStbd) / 2;
    const midMean = (midPort + midStbd) / 2;
    const aftMean = (aftPort + aftStbd) / 2;

    const apparentTrim = aftMean - fwdMean;
    const { fwdCorr, aftCorr, midCorr, lbm } = calculateDraftCorrections(
        apparentTrim, lbp, fwdDraftMarkDist, aftDraftMarkDist, midDraftMarkDist
    );

    const correctedFwd = fwdMean + fwdCorr;
    const correctedMid = midMean + midCorr;
    const correctedAft = aftMean + aftCorr;

    return {
        fwd: { mean: fwdMean, corrected: correctedFwd, autoCorr: fwdCorr },
        mid: { mean: midMean, corrected: correctedMid, autoCorr: midCorr },
        aft: { mean: aftMean, corrected: correctedAft, autoCorr: aftCorr },
        apparentTrim,
        lbm
    };
};

/**
 * Calcul des moyennes intermédiaires (SGS Style)
 */
export const calculateSGSMiddleMeans = (fwdCorr: number, midCorr: number, aftCorr: number) => {
    const meanForeAft = (fwdCorr + aftCorr) / 2;
    const meanOfMean = (meanForeAft + midCorr) / 2;
    const quarterMean = (fwdCorr + 6 * midCorr + aftCorr) / 8;

    return {
        meanForeAft,
        meanOfMean,
        quarterMean
    };
};

/**
 * Calcul du Trim (Différence AR - AV)
 */
export const calculateTrim = (fwd: number, aft: number) => {
    return aft - fwd;
};

/**
 * Calcul des corrections de Trim (1ère et 2ème)
 */
export const calculateTrimCorrections = (trim: number, tpc: number, mtc: number, lcf: number, lbp: number) => {
    // 1st Correction = (Trim * LCF * TPC * 100) / LBP
    const firstTrimCorr = (trim * lcf * tpc * 100) / lbp;
    
    // 2nd Correction = (50 * Trim^2 * MTC) / LBP
    const secondTrimCorr = (50 * Math.pow(trim, 2) * mtc) / lbp;
    
    return firstTrimCorr + secondTrimCorr;
};

/**
 * Somme des déductibles
 */
export const sumDeductibles = (deductibles: Deductibles) => {
    return Object.values(deductibles).reduce((a, b) => a + b, 0);
};

/**
 * Calcul Final du Cargo
 */
export const calculateCargoWeight = (initialNet: number, finalNet: number, type: OperationType) => {
    if (type === 'Loading') {
        return finalNet - initialNet;
    } else {
        return initialNet - finalNet;
    }
};

/**
 * Calcul du Net Displacement (Après corrections de trim et densité)
 */
export const calculateNetDisplacement = (
    displacementTable: number, 
    trimCorr: number, 
    density: number, 
    deductibles: number
) => {
    const correctedForTrim = displacementTable + trimCorr;
    const correctedForDensity = correctedForTrim * (density / 1.025);
    return correctedForDensity - deductibles;
};
